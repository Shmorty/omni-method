/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated, onDocumentDeleted, onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as data from "./assessments.json";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();
const db = getFirestore();
export const oneDay = 1000 * 3600 * 24;

// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   nickname: string;
//   gender: string;
//   height: {
//     feet: number;
//     inches: number;
//   };
//   weight: number;
//   omniScore: number;
//   categoryScore: [];
// }

interface Score {
  uid: string;
  aid: string;
  cid: string;
  scoreDate: string;
  expired: boolean;
  rawScore: number;
  calculatedScore?: number;
  notes?: string;
}
const wrValues = {
  DLFT: 939,
  BKSQ: 800,
  WTPU: 500,
  BNCH: 600,
  SQTS: 150,
  PSHU: 150,
  PLUP: 49,
  STLJ: 147,
  PSHP: 495,
  PWCL: 400,
  PSPR: 9.58,
  PIKE: 0,
  BKBN: 0,
  STRD: 0,
  TWOMDST: 0.5,
  ONEHRDST: 13.25,
  STAPN: 11.5,
  AGLTY: 13,
  BLNC: 10,
  COORD: 47,
};
const WR = new Map(Object.entries(wrValues));

/**
 * Looks up the user's body weight
 * @param {string} uid unique user id
 * @return {Promise} with user's bodyweight
 */
async function getBodyWeight(uid: string): Promise<number> {
  logger.info("lookup weight for", uid);
  const userSnapshot = await db.doc(`user/${uid}`).get();
  const userData = userSnapshot.data();
  const weight = userData["weight"];
  logger.info("weight", weight);
  return Promise.resolve(weight);
}

/**
 * calculates number of days since scoreDate
 * @param {string} scoreDate
 * @return {number}
 */
// function calculateDays(scoreDate: string) {
//   const date = new Date(scoreDate);
//   const days = Math.ceil((Date.now().valueOf() - date.valueOf()) / oneDay);
//   return days;
// }

export const newScore = onDocumentCreated(
  "user/{uid}/score/{sid}",
  (event) => {
    // calculate assessment score
    logger.info("newScore event", event);
    const snapshot = event.data;
    if (!snapshot) {
      logger.info("no data associated with event");
      return null;
    }
    const data = snapshot.data();
    logger.info("data", JSON.stringify(data));
    if (data.calculatedScore) {
      logger.info("calculatedScore already set");
      return null;
    }
    return (
      // calculate assessment score
      calcAssessmentScore(data as Score)
        .then((score) => {
          logger.info("new assessment score", score);
          // write calculated score to db
          return snapshot.ref.set(
            {
              calculatedScore: score,
            },
            { merge: true }
          );
        })
        // calculate category score
        .then(() => calcCategoryScore(event.params.uid, data["cid"]))
        // update Omni Score data:{uid: val, cid: val, score: val}
        .then((res) => updateOmniScore(res))
    );
  }
);

export const updatedScore = onDocumentUpdated(
  "user/{uid}/score/{sid}",
  (event) => {
    // calculate assessment score
    logger.info("updatedScore event", event);
    const snapshot = event.data;
    if (!snapshot) {
      logger.info("no data associated with event");
      return null;
    }
    const data = snapshot.after.data();
    logger.info("data", JSON.stringify(data));
    if (snapshot.after.data().rawScore === snapshot.before.data().rawScore) {
      logger.info("rawScore unchanged");
      return null;
    }
    if (data.calculatedScore) {
      logger.info("calculatedScore already set");
      return null;
    }
    return (
      // calculate assessment score
      calcAssessmentScore(data as Score)
        .then((score) => {
          logger.info("new assessment score", score);
          // write calculated score to db
          return snapshot.after.ref.set(
            {
              calculatedScore: score,
            },
            { merge: true }
          );
        })
        // calculate category score
        .then(() => calcCategoryScore(event.params.uid, data["cid"]))
        // update Omni Score data:{uid: val, cid: val, score: val}
        .then((res) => updateOmniScore(res))
    );
  }
);

export const scoreDeleted = onDocumentDeleted("user/{uid}/score/{sid}", (event) => {
  logger.info("scoreDeleted event");
  const snapshot = event.data;
  logger.info("event.data snapshot", snapshot);
  if (!snapshot) {
    logger.info("no data with event scoreDeleted");
    return null;
  }
  const data = snapshot.data();
  logger.info("scoreDeleted recalc category", data["cid"]);
  return calcCategoryScore(event.params.uid, data["cid"])
    .then((res) => updateOmniScore(res));
});

/**
 * Updates category score for given user and category
 * @param {string} uid
 * @param {string} cid
 * @return {Promise}
 */
async function calcCategoryScore(uid: string, cid: string): Promise<unknown> {
  let catScore = 0;
  let assessmentCount = 0;
  const promiseArray: Promise<number>[] = [];
  const collectionRef = await db.collection(`user/${uid}/score`);
  // loop through assessments for current category
  data.assessments
    .filter((assessment) => assessment.cid === cid)
    // eslint-disable-next-line space-before-function-paren
    .forEach(async (assessmentMeta) => {
      logger.info(assessmentMeta.aid);
      assessmentCount++;
      // collect promise for each assessment in category
      promiseArray.push(
        collectionRef
          .where("aid", "==", assessmentMeta.aid)
          .where("expired", "!=", true)
          .get()
          .then((snap) => {
            // pop the most recent score
            if (!snap.empty) {
              return snap.docs.pop().get("calculatedScore");
            }
            return null;
          })
          .catch((err) => logger.info(err))
      );
    });
  // add assessment scores for category
  catScore = await Promise.all(promiseArray).then((arr) =>
    arr.reduce((partialSum, a) => partialSum + a, 0)
  );
  catScore = Math.round(catScore / assessmentCount);
  logger.info("set category score", cid, catScore);
  // Now set it back into the user table
  return Promise.resolve({ uid: uid, cid: cid, catScore: catScore });
}

/**
 * Updates Omni score for given user
 * @param {unknown} req
 * @return {Promise}
 */
async function updateOmniScore(req: unknown): Promise<unknown> {
  // {uid: string, cid: string, catScore: number}
  logger.info("updateOmniScore", JSON.stringify(req));
  // get user from db
  logger.info(`user/${req["uid"]}`);
  const userSnapshot = await db.doc(`user/${req["uid"]}`).get();
  const userData = userSnapshot.data();
  logger.info("userData", JSON.stringify(userData));
  logger.info("catScore from db", userData.categoryScore[req["cid"]]);
  if (userData.categoryScore[req["cid"]] !== req["catScore"]) {
    // update scores
    logger.info("update user scores");
    Object.defineProperty(userData.categoryScore, req["cid"], {
      value: req["catScore"],
    });
    // userData.categoryScore[req["cid"]] = req["catScore"];
    let unadjustedScore = 0;
    // eslint-disable-next-line guard-for-in
    for (const element in userData.categoryScore) {
      logger.info(`${element}: ${userData.categoryScore[element]}`);
      unadjustedScore += userData.categoryScore[element];
    }
    logger.info("unadjustedScore", unadjustedScore);
    const omniScore = Math.round(Math.pow(unadjustedScore / 1500, 2) * 1500);
    logger.info("omniScore", omniScore);
    userData.omniScore = omniScore;
    // write updated record to db
    return userSnapshot.ref.update(userData);
    // return Promise.resolve(omniScore);
  }
  return null;
}

/**
 * calculate score for checklist assessment
 * @param {Score} req
 * @return {number}
 */
function calcChecklistScore(req: Score): number {
  const max = data.checklists.filter((list) => list.aid === req.aid)[0]["skills"].length;
  logger.info("max", max);
  return Math.round(req.rawScore / max * 1000);
}

/**
 * Calculate the assessment score
 * @param {Score} req request parameter with the new score
 * @return {Promise} returns propmis containing the calculated score
 */
async function calcAssessmentScore(req: Score): Promise<number> {
  const wr = WR.get(req.aid) || 0;
  let result = req.rawScore;
  switch (req.aid) {
    case "DLFT": // Deadlift
    case "BKSQ": // Squat
    case "BNCH": // Bench
    case "SQTS": // Squats
    case "PSHU": // Pushups
    case "PLUP": // Pullups
    case "STLJ": // Standing Long Jump
    case "PSHP": // Push Press
    case "PWCL": // Clean
    case "STAPN": // Static Apnea
      // result = Math.round((req.rawScore / wr) * 100000) / 100;
      result = Math.round((req.rawScore / wr) * 1000);
      break;
    case "WTPU": // Weighted Pull-up
      await getBodyWeight(req.uid).then((bodyWeight) => {
        logger.info("rawScore " + req.rawScore.toString());
        logger.info("got body weight: " + bodyWeight.toString());
        logger.info("world record " + wr.toString());
        result = ((req.rawScore + Number(bodyWeight)) / wr) * 1000;
        logger.info("set result " + result.toString());
      });
      break;
    case "PIKE": // Pike
    case "BKBN": // Backbend
    case "BLNC": // Balance
    case "COORD": // Coordination
      // result = req.rawScore * 100;
      result = calcChecklistScore(req);
      break;
    case "STRD": // Straddle
      result = req.rawScore * 100;
      break;
    case "PSPR": // 100 meter sprint
      // result = Math.round((Math.sqrt((req.rawScore - wr) / 0.125) * -1 + 10) * 10000) / 100;
      result = Math.round(
        (Math.sqrt((req.rawScore - wr) / 0.125) * -1 + 10) * 100
      );
      break;
    case "TWOMDST": // 2 minute distance
      // result = Math.round((Math.sqrt((wr - req.rawScore) / 0.005) * -1 + 10) * 10000) / 100;
      result = Math.round(
        (Math.sqrt((wr - req.rawScore) / 0.005) * -1 + 10) * 100
      );
      break;
    case "ONEHRDST": // 1 hour distance
      // result = Math.round((Math.sqrt((wr - req.rawScore) / 0.1325) * -1 + 10) * 10000) / 100;
      if (req.rawScore < 5.0) {
        result = Math.round(
          (Math.sqrt((wr - req.rawScore) / 0.1325) * -1 + 10) * 100
        );
      } else {
        result = Math.round((req.rawScore / 13.25) * 1000);
      }
      break;
    case "AGLTY": // Agility
      // result = Math.round((Math.sqrt((req.rawScore - wr) / 0.25) * -1 + 10) * 10000) / 100;
      result = Math.round(
        (Math.sqrt((req.rawScore - wr) / 0.25) * -1 + 10) * 100
      );
      break;
    default:
      // if falls through jusr return raw score
      break;
  }
  return Promise.resolve(result);
}
