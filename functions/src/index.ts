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
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

interface Score {
  uid: string;
  aid: string;
  scoreDate: string;
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
  const weight = 172;
  logger.info("lookup weight for", uid);
  return Promise.resolve(weight);
}

export const calculateScore = onDocumentCreated(
  "user/{uid}/score/{sid}",
  (event) => {
    logger.info("user score documentCreated event", event);
    const snapshot = event.data;
    if (!snapshot) {
      logger.info("no data associated with event");
      return null;
    }
    const data = snapshot.data();
    if (data.calculatedScore) {
      logger.info("calculatedScore already set");
      return null;
    }
    logger.info("data", data);
    return calcScore(data as Score).then(async (score) => {
      logger.info("calcScore", score);
      await snapshot.ref.set(
        {
          calculatedScore: score,
        },
        { merge: true }
      );
    });
  }
);

/**
 * Calculate the assessement score
 * @param {Score} req request parameter with the new score
 * @return {Promise} returns propmis containing the calculated score
 */
async function calcScore(req: Score): Promise<number> {
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
    case "STRD": // Straddle
    case "BLNC": // Balance
    case "COORD": // Coordination
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
