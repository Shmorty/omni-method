/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import * as logger from "firebase-functions/logger";
import * as data from "../assessments.json";

export interface Score {
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
function calcChecklistScore(req: Score): number {
    const max = data.checklists.filter((list) => list.aid === req.aid)[0]["skills"].length;
    logger.info("max", max);
    return Math.round(req.rawScore / max * 1000);
}

// export function calcAssessmentScore(req: Score): Promise<number> {
// , getBodyWeight: (uid: string) => Promise<number>
export async function calcAssessmentScore(req: Score, getBodyWeight: (uid: string) => Promise<number>): Promise<number> {
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
