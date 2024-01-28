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
import {onDocumentCreated, onDocumentDeleted, onDocumentUpdated} from "firebase-functions/v2/firestore";
import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
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
  checklist?: [];
  calculatedScore?: number;
  currentWeight?: number;
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

enum FitnessLevels {
  NONE = "none",
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced"
}

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
 *
 * @param {object[]} scoreData
 * @param {FirebaseFirestore.DocumentData} data
 * @return {Observable}
 */
async function saveScoreToDb(scoreData: object[], data: FirebaseFirestore.DocumentData): Promise<object[]> {
  logger.info("saveScore", scoreData);
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", {year: "numeric"}).format(d);
  const mo = new Intl.DateTimeFormat("en", {month: "2-digit"}).format(d);
  const da = new Intl.DateTimeFormat("en", {day: "2-digit"}).format(d);
  const scoreDate = `${ye}-${mo}-${da}`;
  logger.info("scoreDate", scoreDate);
  const today = new Date().toLocaleString("sv").replace(" ", "T");
  // let newScore: Score;
  let newScore: object;
  scoreData.forEach((entry) => {
    newScore = {
      ...entry,
      uid: data.id,
      scoreDate: today,
      currentWeight: data.weight,
      expired: false,
      notes: "Quick score",
    };
    // write score to db
    // TODO: return merged promises
    const path = `user/${data.id}/score/${entry["aid"]}#${scoreDate}`;
    db.doc(path).set(newScore);
    // .then((result) => {
    //   logger.info("result", result);
    // }
    // );
  });
  return Promise.resolve(scoreData);
}

export const newUser = onDocumentCreated(
  "user/{uid}",
  (event) => {
    // new user
    logger.info("newUser event", event);
    const result = 0;
    const snapshot = event.data;
    if (!snapshot) {
      logger.info("no data associated with newUser event");
      return null;
    }
    // logger.info("begin creating starting scores");
    const data = snapshot.data();
    logger.info("data", data);
    if (data.omniScore === 0) {
      const scoreData = [];
      const height = data.height.feet * 12 + data.height.inches;
      logger.info("newUser omniScore is zero");
      // TODO: refactor switch statement
      switch (data.fitnessLevel) {
        case FitnessLevels.NONE: {
          // deadlift = weight * 0.6
          scoreData.push({
            aid: "DLFT", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.6 / 5) * 5,
            rawScore1: data.weight * 0.6,
          });
          // squat = weight * 0.45
          scoreData.push({
            aid: "BKSQ", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.45 / 5) * 5,
          });
          // bench = weight * 0.35
          scoreData.push({
            aid: "BNCH", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.35 / 5) * 5,
          });
          // weightedPullup = weight * -0.35
          scoreData.push({
            aid: "WTPU", cid: "STRG",
            rawScore: Math.ceil(data.weight * -0.35 / 5) * 5,
          });
          // pushUps = 0
          scoreData.push({
            aid: "PSHU", cid: "ENDR",
            rawScore: 0,
          });
          // pullUps = 0
          scoreData.push({
            aid: "PLUP", cid: "ENDR",
            rawScore: 0,
          });
          // squats = 0
          scoreData.push({
            aid: "SQTS", cid: "ENDR",
            rawScore: 0,
          });
          // longJump = height * 0.5
          scoreData.push({
            aid: "STLJ", cid: "POWR",
            rawScore: height * 0.5,
          });
          // pushPress = weight * 0.3
          scoreData.push({
            aid: "PSHP", cid: "POWR",
            rawScore: Math.ceil(data.weight * 0.3 / 5) * 5,
          });
          // 100 meter sprint = 20
          scoreData.push({
            aid: "PSPR", cid: "POWR",
            rawScore: 20,
          });
          // Clean weight * 0.4
          scoreData.push({
            aid: "PWCL", cid: "POWR",
            rawScore: Math.ceil(data.weight * 0.4 / 5) * 5,
          });
          // Pike = 1
          scoreData.push({
            aid: "PIKE", cid: "FLEX",
            rawScore: 1,
            checklist: [true],
          });
          // Backbend = 1
          scoreData.push({
            aid: "BKBN", cid: "FLEX",
            rawScore: 1,
            checklist: [true],
          });
          // Straddle = 90
          scoreData.push({
            aid: "STRD", cid: "FLEX",
            rawScore: 90,
          });
          // 1 Hour Run BMI * 0.15
          // increment 0.05
          const bmi = (data.weight / (height * height)) * 703;
          scoreData.push({
            aid: "ONEHRDST", cid: "META",
            bmi: bmi,
            rawScore: Math.ceil(bmi * 0.15 / 0.05) * 0.05,
          });
          // 2 Minute Sprint bmi * 0.007 * 30
          // (bmi* 0.21) increment 0.001
          // scoreData.push({
          //   aid: "TWOMDST", cid: "META",
          //   bmi: bmi,
          //   rawScore: Math.ceil(bmi * 0.21 / 0.001) * 0.001,
          // });
          // Half Spider Web = 27
          scoreData.push({
            aid: "AGLTY", cid: "NEUR",
            rawScore: 27,
          });

          // write to db
          saveScoreToDb(scoreData, data).then(() => {
            logger.info("saved no experience quick scores");
          });
          break;
        }
        case FitnessLevels.BEGINNER: {
          logger.info("fitnessLevel BEGINNER");
          // deadlift = weight * 1
          scoreData.push({
            aid: "DLFT", cid: "STRG",
            rawScore: Math.ceil(data.weight * 1 / 5) * 5,
          });
          // squat = weight * 0.75
          scoreData.push({
            aid: "BKSQ", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.75 / 5) * 5,
          });
          // bench = weight * 0.5
          scoreData.push({
            aid: "BNCH", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.5 / 5) * 5,
          });
          // weightedPullup = 0
          scoreData.push({
            aid: "WTPU", cid: "STRG",
            rawScore: 0,
          });
          // pushUps = 1
          scoreData.push({
            aid: "PSHU", cid: "ENDR",
            rawScore: 1,
          });
          // pullUps = 0
          scoreData.push({
            aid: "PLUP", cid: "ENDR",
            rawScore: 0,
          });
          // squats = 2
          scoreData.push({
            aid: "SQTS", cid: "ENDR",
            rawScore: 2,
          });
          // longJump = height * 0.8
          scoreData.push({
            aid: "STLJ", cid: "POWR",
            rawScore: Math.ceil(height * 0.8 / 0.5) * 0.5,
          });
          // pushPress = weight * 0.5
          scoreData.push({
            aid: "PSHP", cid: "POWR",
            rawScore: Math.ceil(data.weight * 0.5 / 5) * 5,
          });
          // 100 meter sprint = 16
          scoreData.push({
            aid: "PSPR", cid: "POWR",
            rawScore: 16,
          });
          // Clean weight * 0.75
          scoreData.push({
            aid: "PWCL", cid: "POWR",
            rawScore: Math.ceil(data.weight * 0.75 / 5) * 5,
          });
          // Pike = 3
          scoreData.push({
            aid: "PIKE", cid: "FLEX",
            rawScore: 3,
            checklist: [true, true, true],
          });
          // Backbend = 3
          scoreData.push({
            aid: "BKBN", cid: "FLEX",
            rawScore: 3,
            checklist: [true, true, true],
          });
          // Straddle = 110
          scoreData.push({
            aid: "STRD", cid: "FLEX",
            rawScore: 110,
          });
          // 1 Hour Run BMI * 0.224
          // increment 0.05
          const bmi = (data.weight / (height * height)) * 703;
          scoreData.push({
            aid: "ONEHRDST", cid: "META",
            bmi: bmi,
            rawScore: Math.ceil(bmi * 0.224 / 0.05) * 0.05,
          });
          // 2 Minute Sprint bmi * 0.01 * 30  (bmi* 0.3)
          // scoreData.push({
          //   aid: "TWOMDST", cid: "META",
          //   bmi: bmi,
          //   rawScore: Math.ceil(bmi * 0.3 / 0.001) * 0.001,
          // });
          // Half Spider Web = 22
          scoreData.push({
            aid: "AGLTY", cid: "NEUR",
            rawScore: 22,
          });

          // write to db
          saveScoreToDb(scoreData, data).then(() => {
            logger.info("saved beginner quick scores");
          });
          break;
        }
        case FitnessLevels.INTERMEDIATE: {
          logger.info("fitnessLevel INTERMEDIATE");
          // deadlift = weight * 1.5
          scoreData.push({
            aid: "DLFT", cid: "STRG",
            rawScore: Math.ceil(data.weight * 1.5 / 5) * 5,
          });
          // squat = weight * 1.25
          scoreData.push({
            aid: "BKSQ", cid: "STRG",
            rawScore: Math.ceil(data.weight * 1.25 / 5) * 5,
          });
          // bench = weight * 0.75
          scoreData.push({
            aid: "BNCH", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.75 / 5) * 5,
          });
          // weightedPullup = weight * 0.1
          scoreData.push({
            aid: "WTPU", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.1 / 5) * 5,
          });
          // pushUps = 18
          scoreData.push({
            aid: "PSHU", cid: "ENDR",
            rawScore: 18,
          });
          // pullUps = 5
          scoreData.push({
            aid: "PLUP", cid: "ENDR",
            rawScore: 5,
          });
          // squats = 20
          scoreData.push({
            aid: "SQTS", cid: "ENDR",
            rawScore: 20,
          });
          // longJump = height * 1
          scoreData.push({
            aid: "STLJ", cid: "POWR",
            rawScore: Math.ceil(height * 1 / 0.5) * 0.5,
          });
          // pushPress = weight * 0.75
          scoreData.push({
            aid: "PSHP", cid: "POWR",
            rawScore: Math.ceil(data.weight * 0.75 / 5) * 5,
          });
          // 100 meter sprint = 14
          scoreData.push({
            aid: "PSPR", cid: "POWR",
            rawScore: 14,
          });
          // Clean weight * 1
          scoreData.push({
            aid: "PWCL", cid: "POWR",
            rawScore: Math.ceil(data.weight * 1 / 5) * 5,
          });
          // Pike = 5
          scoreData.push({
            aid: "PIKE", cid: "FLEX",
            rawScore: 5,
            checklist: [true, true, true, true, true],
          });
          // Backbend = 5
          scoreData.push({
            aid: "BKBN", cid: "FLEX",
            rawScore: 5,
            checklist: [true, true, true, true, true],
          });
          // Straddle = 130
          scoreData.push({
            aid: "STRD", cid: "FLEX",
            rawScore: 130,
          });
          // 1 Hour Run BMI * 0.275
          // increment 0.05
          const bmi = (data.weight / (height * height)) * 703;
          scoreData.push({
            aid: "ONEHRDST", cid: "META",
            bmi: bmi,
            rawScore: Math.ceil(bmi * 0.275 / 0.05) * 0.05,
          });
          // 2 Minute Sprint bmi * 0.01 * 30  (bmi* 0.3)
          // scoreData.push({
          //   aid: "TWOMDST", cid: "META",
          //   bmi: bmi,
          //   rawScore: Math.ceil(bmi * 0.3 / 0.001) * 0.001,
          // });
          // Half Spider Web = 20
          scoreData.push({
            aid: "AGLTY", cid: "NEUR",
            rawScore: 20,
          });

          // write to db
          saveScoreToDb(scoreData, data).then(() => {
            logger.info("saved intermediate quick scores");
          });
          break;
        }
        case FitnessLevels.ADVANCED: {
          logger.info("fitnessLevel ADVANCED");
          // deadlift = weight * 2
          scoreData.push({
            aid: "DLFT", cid: "STRG",
            rawScore: Math.ceil(data.weight * 2 / 5) * 5,
          });
          // squat = weight * 1.5
          scoreData.push({
            aid: "BKSQ", cid: "STRG",
            rawScore: Math.ceil(data.weight * 1.5 / 5) * 5,
          });
          // bench = weight * 1.25
          scoreData.push({
            aid: "BNCH", cid: "STRG",
            rawScore: Math.ceil(data.weight * 1.25 / 5) * 5,
          });
          // weightedPullup = weight * 0.25
          scoreData.push({
            aid: "WTPU", cid: "STRG",
            rawScore: Math.ceil(data.weight * 0.25 / 5) * 5,
          });
          // pushUps = 40
          scoreData.push({
            aid: "PSHU", cid: "ENDR",
            rawScore: 40,
          });
          // pullUps = 14
          scoreData.push({
            aid: "PLUP", cid: "ENDR",
            rawScore: 14,
          });
          // squats = 45
          scoreData.push({
            aid: "SQTS", cid: "ENDR",
            rawScore: 45,
          });
          // longJump = height * 1.25
          scoreData.push({
            aid: "STLJ", cid: "POWR",
            rawScore: Math.ceil(height * 1.25 / 0.5) * 0.5,
          });
          // pushPress = weight * 1
          scoreData.push({
            aid: "PSHP", cid: "POWR",
            rawScore: Math.ceil(data.weight * 1 / 5) * 5,
          });
          // 100 meter sprint = 13
          scoreData.push({
            aid: "PSPR", cid: "POWR",
            rawScore: 13,
          });
          // Clean weight * 1.25
          scoreData.push({
            aid: "PWCL", cid: "POWR",
            rawScore: Math.ceil(data.weight * 1.25 / 5) * 5,
          });
          // Pike = 7
          scoreData.push({
            aid: "PIKE", cid: "FLEX",
            rawScore: 7,
            checklist: [true, true, true, true, true, true, true],
          });
          // Backbend = 6
          scoreData.push({
            aid: "BKBN", cid: "FLEX",
            rawScore: 6,
            checklist: [true, true, true, true, true, true],
          });
          // Straddle = 150
          scoreData.push({
            aid: "STRD", cid: "FLEX",
            rawScore: 150,
          });
          // 1 Hour Run BMI * 0.325
          // increment 0.05
          const bmi = (data.weight / (height * height)) * 703;
          scoreData.push({
            aid: "ONEHRDST", cid: "META",
            bmi: bmi,
            rawScore: Math.ceil(bmi * 0.325 / 0.05) * 0.05,
          });
          // 2 Minute Sprint bmi * 0.01 * 30  (bmi* 0.3)
          // scoreData.push({
          //   aid: "TWOMDST", cid: "META",
          //   bmi: bmi,
          //   rawScore: Math.ceil(bmi * 0.3 / 0.001) * 0.001,
          // });
          // Half Spider Web = 17
          scoreData.push({
            aid: "AGLTY", cid: "NEUR",
            rawScore: 17,
          });

          // write to db
          saveScoreToDb(scoreData, data).then(() => {
            logger.info("saved intermediate quick scores");
          });
          break;
        }
        default: {
          logger.info("No fitnessLevel");
          break;
        }
      }
    }
    return Promise.resolve(result);
  }
);

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
            {merge: true}
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
            {merge: true}
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

export const nightly = "every day 00:00";
export const hourly = "every hour";
export const fiveMin = "every 5 minutes";
export const expireScores = onSchedule(hourly, (event) => {
  logger.info("onSchedule expireScores", event);
  // db.collection()
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
  // this code needs review
  catScore = await Promise.all(promiseArray).then((arr) =>
    arr.reduce((partialSum, a) => partialSum + a, 0)
  );
  catScore = Math.round(catScore / assessmentCount);
  logger.info("set category score", cid, catScore);
  // Now set it back into the user table
  return Promise.resolve({uid: uid, cid: cid, catScore: catScore});
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
  if (userData) {
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
      // result = req.rawScore * 100;
      if (req.rawScore < 80) {
        result = 0;
      } else if (req.rawScore > 180) {
        result = 1000;
      } else {
        result = (req.rawScore - 80) * 10;
      }
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
        result = Math.round((req.rawScore / wr) * 1000);
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
