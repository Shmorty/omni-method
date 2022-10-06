import { Category } from '../../store/models/category.model';

export const DATA: Category[] = [
  {
    id: 1,
    label: 'Strength',
    assessments: [
      {
        id: 1,
        icon: '/assets/images/dead-lift.png',
        label: 'Deadlift',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 455,
          calculatedScore: 455,
          date: new Date("10-01-2022")
        }], // 455
        description: "A deadlift is a resistance exercise in which you hinge your hips to lift a loaded barbell off the floor.  The 1RM deadlift assessment tests your maximum force production while lifting a loaded barbell off of the floor. This test is to be performed without equipment including belts, straps, or sleeves."
      },
      {
        id: 2,
        icon: '/assets/images/back-squat.png',
        label: 'Squat',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 375,
          calculatedScore: 455,
          date: new Date("09-15-2022")
        }], // 375
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Weighted Pull-up',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 307,
          calculatedScore: 455,
          date: new Date("08-12-2022")
        }], // 307
      },
      {
        id: 4,
        icon: '/assets/images/bench-press.png',
        label: 'Bench',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 240,
          calculatedScore: 0,
          date: new Date()
        }], // 240
      },
      {
        id: 5,
        icon: '/assets/images/over-head-press.png',
        label: 'Overhead Press',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 165,
          calculatedScore: 0,
          date: new Date()
        }], // 165
      },
    ],
  },
  {
    id: 2,
    label: 'Endurance',
    assessments: [
      {
        id: 1,
        icon: '/assets/icon/favicon.png',
        label: 'Squats',
        units: 'Reps',
        scores: [{
          rawScore: 50,
          calculatedScore: 455,
          date: new Date()
        }], // 50
      },
      {
        id: 2,
        icon: '/assets/images/push-up.png',
        label: 'Pushups',
        units: 'Reps',
        scores: [{
          rawScore: 57,
          calculatedScore: 0,
          date: new Date()
        }], // 57
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Pullups',
        units: 'Reps',
        scores: [{
          rawScore: 21,
          calculatedScore: 0,
          date: new Date()
        }], // 21
      },
      {
        id: 4,
        icon: '/assets/images/plank.png',
        label: 'Plank',
        units: 'Time',
        scores: [{
          rawScore: 5,
          calculatedScore: 0,
          date: new Date()
        }], // 5
      },
    ],
  },
  {
    id: 3,
    label: 'Power',
    assessments: [
      {
        id: 1,
        icon: '/assets/icon/favicon.png',
        label: 'Vertical Jump',
        units: 'Height (in)',
        scores: [{
          rawScore: 29,
          calculatedScore: 0,
          date: new Date()
        }], // 29
      },
      {
        id: 2,
        icon: '/assets/icon/favicon.png',
        label: 'Chest Launch',
        units: 'lbs*ft',
        scores: [{
          rawScore: 325,
          calculatedScore: 0,
          date: new Date()
        }], // 325
      },
      {
        id: 3,
        icon: '/assets/images/power-clean.png',
        label: 'Power Clean',
        units: '1RM (lbs)',
        scores: [{
          rawScore: 225,
          calculatedScore: 0,
          date: new Date()
        }], // 225
      },
      {
        id: 4,
        icon: '/assets/images/100-meter-sprint.png',
        label: '100 meter sprint',
        units: 'Time',
        scores: [{
          rawScore: 13.24,
          calculatedScore: 0,
          date: new Date()
        }], // 13.24
      },
    ],
  },
  {
    id: 4,
    label: 'Flexibility',
    assessments: [
      {
        id: 1,
        icon: '/assets/images/middle-split.png',
        label: 'Posterior',
        scores: [{
          rawScore: 8,
          calculatedScore: 0,
          date: new Date()
        }], // 8
      },
      {
        id: 2,
        icon: '/assets/images/toe-touch.png',
        label: 'Anterior',
        scores: [{
          rawScore: 7,
          calculatedScore: 0,
          date: new Date()
        }], // 7
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Lateral',
        scores: [{
          rawScore: 7,
          calculatedScore: 0,
          date: new Date()
        }], // 7
      },
    ],
  },
  {
    id: 5,
    label: 'Metabolic',
    assessments: [
      // {
      //   id: 1,
      //   icon: '/assets/images/breath-hold.png',
      //   label: 'VO2 Max',
      //   scores: [], // 51.09
      // },
      {
        id: 2,
        icon: '/assets/images/2-minute-distance.png',
        label: '2 minute distance',
        scores: [{
          rawScore: 0.403,
          calculatedScore: 0,
          date: new Date()
        }], // 0.403
      },
      {
        id: 3,
        icon: '/assets/images/1-hour-distance.png',
        label: '1 hour distance',
        scores: [{
          rawScore: 7.27,
          calculatedScore: 0,
          date: new Date()
        }], // 7.27
      },
      {
        id: 4,
        icon: '/assets/images/breath-hold.png',
        label: 'CO2 Tolerance',
        scores: [{
          rawScore: 3.75,
          calculatedScore: 0,
          date: new Date()
        }], // 3.75
      },
    ],
  },
  {
    id: 6,
    label: 'Neuromotor',
    assessments: [
      {
        id: 1,
        icon: '/assets/icon/favicon.png',
        label: 'Agility',
        scores: [{
          rawScore: 32,
          calculatedScore: 0,
          date: new Date()
        }], // 32
      },
      {
        id: 2,
        icon: '/assets/icon/favicon.png',
        label: 'Balance',
        scores: [{
          rawScore: 7.5,
          calculatedScore: 0,
          date: new Date()
        }], // 7.5 
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Coordination',
        scores: [{
          rawScore: 6,
          calculatedScore: 0,
          date: new Date()
        }], // 6
      },
    ],
  },
];
