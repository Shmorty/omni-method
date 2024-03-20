/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import * as logger from "firebase-functions/logger";

const FitnessLevels = {
  NONE: "none",
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

interface Height {
  feet: number,
  inches: number
}

export function createPresetScores(fitnessLevel: string,
  height: Height, weight: number) {
  const scores = [];
  const heightInches = height.feet * 12 + height.inches;
  const bmi = (weight / (heightInches * heightInches)) * 703;
  logger.info("createPresetScores for user",
    fitnessLevel, weight, heightInches);
  switch (fitnessLevel) {
    case FitnessLevels.NONE: {
      // deadlift = weight * 0.6
      scores.push({
        aid: "DLFT", cid: "STRG",
        rawScore: Math.ceil(weight * 0.6 / 5) * 5,
      });
      // squat = weight * 0.45
      scores.push({
        aid: "BKSQ", cid: "STRG",
        rawScore: Math.ceil(weight * 0.45 / 5) * 5,
      });
      // bench = weight * 0.35
      scores.push({
        aid: "BNCH", cid: "STRG",
        rawScore: Math.ceil(weight * 0.35 / 5) * 5,
      });
      // weightedPullup = weight * -0.35
      scores.push({
        aid: "WTPU", cid: "STRG",
        rawScore: Math.ceil(weight * -0.35 / 5) * 5,
      });
      // pushUps = 0
      scores.push({
        aid: "PSHU", cid: "ENDR",
        rawScore: 0,
      });
      // pullUps = 0
      scores.push({
        aid: "PLUP", cid: "ENDR",
        rawScore: 0,
      });
      // squats = 0
      scores.push({
        aid: "SQTS", cid: "ENDR",
        rawScore: 0,
      });
      // longJump = height * 0.5
      scores.push({
        aid: "STLJ", cid: "POWR",
        rawScore: heightInches * 0.5,
      });
      // pushPress = weight * 0.3
      scores.push({
        aid: "PSHP", cid: "POWR",
        rawScore: Math.ceil(weight * 0.3 / 5) * 5,
      });
      // 100 meter sprint = 20
      scores.push({
        aid: "PSPR", cid: "POWR",
        rawScore: 20,
      });
      // Clean weight * 0.4
      scores.push({
        aid: "PWCL", cid: "POWR",
        rawScore: Math.ceil(weight * 0.4 / 5) * 5,
      });
      // Pike = 1
      scores.push({
        aid: "PIKE", cid: "FLEX",
        rawScore: 1,
        checklist: [true],
      });
      // Backbend = 1
      scores.push({
        aid: "BKBN", cid: "FLEX",
        rawScore: 1,
        checklist: [true],
      });
      // Straddle = 90
      scores.push({
        aid: "STRD", cid: "FLEX",
        rawScore: 90,
      });
      // 1 Hour Run BMI * 0.15
      // increment 0.05
      scores.push({
        aid: "ONEHRDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(Math.ceil(bmi * 0.15 / 0.05) * 5) / 100,
      });
      // 2 Minute Sprint bmi * 0.007 (increment 0.001)
      scores.push({
        aid: "TWOMDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(bmi * 0.007 / 0.001) / 1000,
      });
      // Half Spider Web = 27
      scores.push({
        aid: "AGLTY", cid: "NEUR",
        rawScore: 27,
      });
      break;
    }
    case FitnessLevels.BEGINNER: {
      logger.info("fitnessLevel BEGINNER");
      // deadlift = weight * 1
      scores.push({
        aid: "DLFT", cid: "STRG",
        rawScore: Math.ceil(weight * 1 / 5) * 5,
      });
      // squat = weight * 0.75
      scores.push({
        aid: "BKSQ", cid: "STRG",
        rawScore: Math.ceil(weight * 0.75 / 5) * 5,
      });
      // bench = weight * 0.5
      scores.push({
        aid: "BNCH", cid: "STRG",
        rawScore: Math.ceil(weight * 0.5 / 5) * 5,
      });
      // weightedPullup = 0
      scores.push({
        aid: "WTPU", cid: "STRG",
        rawScore: 0,
      });
      // pushUps = 1
      scores.push({
        aid: "PSHU", cid: "ENDR",
        rawScore: 1,
      });
      // pullUps = 0
      scores.push({
        aid: "PLUP", cid: "ENDR",
        rawScore: 0,
      });
      // squats = 2
      scores.push({
        aid: "SQTS", cid: "ENDR",
        rawScore: 2,
      });
      // longJump = height * 0.8
      scores.push({
        aid: "STLJ", cid: "POWR",
        rawScore: Math.ceil(heightInches * 0.8 / 0.5) * 0.5,
      });
      // pushPress = weight * 0.5
      scores.push({
        aid: "PSHP", cid: "POWR",
        rawScore: Math.ceil(weight * 0.5 / 5) * 5,
      });
      // 100 meter sprint = 16
      scores.push({
        aid: "PSPR", cid: "POWR",
        rawScore: 16,
      });
      // Clean weight * 0.75
      scores.push({
        aid: "PWCL", cid: "POWR",
        rawScore: Math.ceil(weight * 0.75 / 5) * 5,
      });
      // Pike = 3
      scores.push({
        aid: "PIKE", cid: "FLEX",
        rawScore: 3,
        checklist: [true, true, true],
      });
      // Backbend = 3
      scores.push({
        aid: "BKBN", cid: "FLEX",
        rawScore: 3,
        checklist: [true, true, true],
      });
      // Straddle = 110
      scores.push({
        aid: "STRD", cid: "FLEX",
        rawScore: 110,
      });
      // 1 Hour Run BMI * 0.224
      // increment 0.05
      scores.push({
        aid: "ONEHRDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(Math.ceil(bmi * 0.224 / 0.05) * 5) / 100,
      });
      // 2 Minute Sprint bmi * 0.01
      scores.push({
        aid: "TWOMDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(bmi * 0.01 / 0.001) / 1000,
      });
      // Half Spider Web = 22
      scores.push({
        aid: "AGLTY", cid: "NEUR",
        rawScore: 22,
      });
      break;
    }
    case FitnessLevels.INTERMEDIATE: {
      logger.info("fitnessLevel INTERMEDIATE");
      // deadlift = weight * 1.5
      scores.push({
        aid: "DLFT", cid: "STRG",
        rawScore: Math.ceil(weight * 1.5 / 5) * 5,
      });
      // squat = weight * 1.25
      scores.push({
        aid: "BKSQ", cid: "STRG",
        rawScore: Math.ceil(weight * 1.25 / 5) * 5,
      });
      // bench = weight * 0.75
      scores.push({
        aid: "BNCH", cid: "STRG",
        rawScore: Math.ceil(weight * 0.75 / 5) * 5,
      });
      // weightedPullup = weight * 0.1
      scores.push({
        aid: "WTPU", cid: "STRG",
        rawScore: Math.ceil(weight * 0.1 / 5) * 5,
      });
      // pushUps = 18
      scores.push({
        aid: "PSHU", cid: "ENDR",
        rawScore: 18,
      });
      // pullUps = 5
      scores.push({
        aid: "PLUP", cid: "ENDR",
        rawScore: 5,
      });
      // squats = 20
      scores.push({
        aid: "SQTS", cid: "ENDR",
        rawScore: 20,
      });
      // longJump = height * 1
      scores.push({
        aid: "STLJ", cid: "POWR",
        rawScore: Math.ceil(heightInches * 1 / 0.5) * 0.5,
      });
      // pushPress = weight * 0.75
      scores.push({
        aid: "PSHP", cid: "POWR",
        rawScore: Math.ceil(weight * 0.75 / 5) * 5,
      });
      // 100 meter sprint = 14
      scores.push({
        aid: "PSPR", cid: "POWR",
        rawScore: 14,
      });
      // Clean weight * 1
      scores.push({
        aid: "PWCL", cid: "POWR",
        rawScore: Math.ceil(weight * 1 / 5) * 5,
      });
      // Pike = 5
      scores.push({
        aid: "PIKE", cid: "FLEX",
        rawScore: 5,
        checklist: [true, true, true, true, true],
      });
      // Backbend = 5
      scores.push({
        aid: "BKBN", cid: "FLEX",
        rawScore: 5,
        checklist: [true, true, true, true, true],
      });
      // Straddle = 130
      scores.push({
        aid: "STRD", cid: "FLEX",
        rawScore: 130,
      });
      // 1 Hour Run BMI * 0.275
      // increment 0.05
      scores.push({
        aid: "ONEHRDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(Math.ceil(bmi * 0.275 / 0.05) * 5) / 100,
      });
      // 2 Minute Sprint bmi * 0.012
      scores.push({
        aid: "TWOMDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(bmi * 0.012 / 0.001) / 1000,
      });
      // Half Spider Web = 20
      scores.push({
        aid: "AGLTY", cid: "NEUR",
        rawScore: 20,
      });
      break;
    }
    case FitnessLevels.ADVANCED: {
      logger.info("fitnessLevel ADVANCED");
      // deadlift = weight * 2
      scores.push({
        aid: "DLFT", cid: "STRG",
        rawScore: Math.ceil(weight * 2 / 5) * 5,
      });
      // squat = weight * 1.5
      scores.push({
        aid: "BKSQ", cid: "STRG",
        rawScore: Math.ceil(weight * 1.5 / 5) * 5,
      });
      // bench = weight * 1.25
      scores.push({
        aid: "BNCH", cid: "STRG",
        rawScore: Math.ceil(weight * 1.25 / 5) * 5,
      });
      // weightedPullup = weight * 0.25
      scores.push({
        aid: "WTPU", cid: "STRG",
        rawScore: Math.ceil(weight * 0.25 / 5) * 5,
      });
      // pushUps = 40
      scores.push({
        aid: "PSHU", cid: "ENDR",
        rawScore: 40,
      });
      // pullUps = 14
      scores.push({
        aid: "PLUP", cid: "ENDR",
        rawScore: 14,
      });
      // squats = 45
      scores.push({
        aid: "SQTS", cid: "ENDR",
        rawScore: 45,
      });
      // longJump = height * 1.25
      scores.push({
        aid: "STLJ", cid: "POWR",
        rawScore: Math.ceil(heightInches * 1.25 / 0.5) * 0.5,
      });
      // pushPress = weight * 1
      scores.push({
        aid: "PSHP", cid: "POWR",
        rawScore: Math.ceil(weight * 1 / 5) * 5,
      });
      // 100 meter sprint = 13
      scores.push({
        aid: "PSPR", cid: "POWR",
        rawScore: 13,
      });
      // Clean weight * 1.25
      scores.push({
        aid: "PWCL", cid: "POWR",
        rawScore: Math.ceil(weight * 1.25 / 5) * 5,
      });
      // Pike = 7
      scores.push({
        aid: "PIKE", cid: "FLEX",
        rawScore: 7,
        checklist: [true, true, true, true, true, true, true],
      });
      // Backbend = 6
      scores.push({
        aid: "BKBN", cid: "FLEX",
        rawScore: 6,
        checklist: [true, true, true, true, true, true],
      });
      // Straddle = 150
      scores.push({
        aid: "STRD", cid: "FLEX",
        rawScore: 150,
      });
      // 1 Hour Run BMI * 0.325
      // increment 0.05
      scores.push({
        aid: "ONEHRDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(Math.ceil(bmi * 0.325 / 0.05) * 5) / 100,
      });
      // 2 Minute Sprint bmi * 0.014
      scores.push({
        aid: "TWOMDST", cid: "META",
        bmi: bmi,
        rawScore: Math.ceil(bmi * 0.014 / 0.001) / 1000,
      });
      // Half Spider Web = 17
      scores.push({
        aid: "AGLTY", cid: "NEUR",
        rawScore: 17,
      });
      break;
    }
    default: {
      logger.info("No fitnessLevel");
      break;
    }
  }
  return scores;
}
