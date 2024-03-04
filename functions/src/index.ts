/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {onDocumentCreated, onDocumentDeleted, onDocumentUpdated} from "firebase-functions/v2/firestore";
// import {onSchedule} from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import * as data from "./assessments.json";
import {createPresetScores} from "./scoring/create-preset-scores";
import {Score, calcAssessmentScore} from "./scoring/calculate-assessment-score";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

initializeApp();
const db = getFirestore();
export const oneDay = 1000 * 3600 * 24;

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
  // const scoreDate = new Date().toLocaleDateString();
  logger.info("scoreDate", scoreDate);
  // const today = new Date().toLocaleString("sv").replace(" ", "T");
  // let newScore: Score;
  let newScore: object;
  scoreData.forEach((entry) => {
    newScore = {
      ...entry,
      uid: data.id,
      // scoreDate: today,
      scoreDate: scoreDate,
      currentWeight: data.weight,
      expired: false,
      notes: "Quick score",
    };
    // write score to db
    // TODO: return merged promises
    const path = `user/${data.id}/score/${entry["aid"]}#${scoreDate}`;
    db.doc(path).set(newScore)
      .then((result) => {
        logger.info("WriteResult", result);
      }
      );
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
    logger.info("new user ", JSON.stringify(data));
    if (data.omniScore === 0) {
      const scoreData = createPresetScores(data.fitnessLevel, data.height, data.weight);
      // write scores to db
      if (scoreData.length > 0) {
        saveScoreToDb(scoreData, data).then(() => {
          logger.info("saved preset scores");
        });
      }
    }
    return Promise.resolve(result);
  }
);

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
      calcAssessmentScore(data as Score, getBodyWeight)
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
      // .then((res) => updateOmniScoreTransaction(res))
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
      calcAssessmentScore(data as Score, getBodyWeight)
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

// export const nightly = "every day 00:00";
// export const hourly = "every hour";
// export const fiveMin = "every 5 minutes";
// export const expireScores = onSchedule(hourly, (event) => {
//   logger.info("onSchedule expireScores", event);
//   // db.collection()
// });

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
  const collectionRef = db.collection(`user/${uid}/score`);
  logger.info("calcCategoryScore " + cid);
  // loop through assessments for current category
  data.assessments
    .filter((assessment) => assessment.cid === cid)
    // eslint-disable-next-line space-before-function-paren
    .forEach(async (assessmentMeta) => {
      assessmentCount++;
      // read score for each assessment save promise to array
      logger.info(cid + " get score for assessment " + assessmentMeta.aid);
      promiseArray.push(
        collectionRef.where("aid", "==", assessmentMeta.aid)
          .where("expired", "!=", true)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              logger.info(cid + " no data found for " + assessmentMeta.aid);
              return 0;
            } else {
              logger.info(cid + " " + assessmentMeta.aid + " records found " + snapshot.size);
              const score = snapshot.docs.pop().get("calculatedScore");
              if (score) {
                return score;
              } else {
                logger.info(cid + " " + assessmentMeta.aid + " no score");
                return 0;
              }
            }
          })
          .catch((err) => {
            logger.info(cid + " no data found err " + err);
            return 0;
          })
      );
    });
  // collect scores from each promise
  logger.info(cid + " promiseArray length: " + promiseArray.length);
  catScore = await Promise.all(promiseArray).then((arr) => {
    logger.info(cid + " reduce arr", arr);
    return arr.reduce((partialSum, a) => partialSum + a, 0);
  });
  logger.info(cid + " total catScore: " + catScore + " assessmentCount " + assessmentCount);
  // calculate category score
  if (assessmentCount > 0) {
    catScore = Math.round(catScore / assessmentCount);
  }
  logger.info(cid + " catScore " + catScore);
  if (!catScore) {
    logger.warn(cid + " no category score");
    return Promise.resolve(0);
  }
  // Now set it back as promise
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
  const uid = req["uid"];
  const cid = req["cid"];
  const catScore = req["catScore"];

  // update just one category
  await db.collection("user").doc(uid).update({[`categoryScore.${cid}`]: catScore});

  // get user from db
  const userSnapshot = await db.doc(`user/${uid}`).get();
  const userData = userSnapshot.data();
  if (userData) {
    logger.info("userData " + JSON.stringify(userData));
    let unadjustedScore = 0;
    // add category scores
    for (const element in userData.categoryScore) {
      // logger.info(`${element}: ${userData.categoryScore[element]}`);
      if (userData.categoryScore[element] != 0) {
        unadjustedScore += userData.categoryScore[element];
      }
    }
    logger.info("unadjustedScore", unadjustedScore);
    const omniScore = Math.round(Math.pow(unadjustedScore / 1500, 2) * 1500);
    // write score to history
    const d = new Date();
    const ye = new Intl.DateTimeFormat("en", {year: "numeric"}).format(d);
    const mo = new Intl.DateTimeFormat("en", {month: "2-digit"}).format(d);
    const yyyymm = `${ye}-${mo}`;
    const historyScore = {omniScore: omniScore, categoryScore: userData.categoryScore};
    logger.info("save historyScore " + yyyymm + " " + JSON.stringify(historyScore));
    db.doc(`user/${uid}/history/${yyyymm}`).set(historyScore);
    if (userData.omniScore != omniScore) {
      logger.info("write new omniScore to db " + omniScore);
      // write updated record to db
      return db.collection("user").doc(uid).update({["omniScore"]: omniScore});
      // userData.omniScore = omniScore;
      // return userSnapshot.ref.update(userData);

      // db.collection("user").doc(uid).collection("scoreHistory").
    }
    logger.info("omniScore unchanged");
    return Promise.resolve(omniScore);
  }
  logger.warn("DIDN'T FIND USER DATA " + uid);
  return null;
}
