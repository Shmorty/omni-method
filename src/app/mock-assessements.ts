import { IonSplitPane } from '@ionic/angular';
import { Assessment } from './store/models/assessment.model';
import { Category } from './store/models/category.model';

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
        score: 455,
        description: "A deadlift is a resistance exercise in which you hinge your hips to lift a loaded barbell off the floor.  The 1RM deadlift assessment tests your maximum force production while lifting a loaded barbell off of the floor. This test is to be performed without equipment including belts, straps, or sleeves."
      },
      {
        id: 2,
        icon: '/assets/images/back-squat.png',
        label: 'Squat',
        units: '1RM (lbs)',
        score: 375,
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Weighted Pull-up',
        units: '1RM (lbs)',
        score: 307,
      },
      {
        id: 4,
        icon: '/assets/images/bench-press.png',
        label: 'Bench',
        units: '1RM (lbs)',
        score: 240,
      },
      {
        id: 5,
        icon: '/assets/images/over-head-press.png',
        label: 'Overhead Press',
        units: '1RM (lbs)',
        score: 165,
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
        score: 50,
      },
      {
        id: 2,
        icon: '/assets/images/push-up.png',
        label: 'Pushups',
        units: 'Reps',
        score: 57,
      },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Pullups',
        units: 'Reps',
        score: 21,
      },
      {
        id: 4,
        icon: '/assets/images/plank.png',
        label: 'Plank',
        units: 'Time',
        score: 5,
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
        score: 29,
      },
      {
        id: 2,
        icon: '/assets/icon/favicon.png',
        label: 'Chest Launch',
        units: 'lbs*ft',
        score: 325,
      },
      {
        id: 3,
        icon: '/assets/images/power-clean.png',
        label: 'Power Clean',
        units: '1RM (lbs)',
        score: 225,
      },
      {
        id: 4,
        icon: '/assets/images/100-meter-sprint.png',
        label: '100 meter sprint',
        units: 'Time',
        score: 13.24,
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
        score: 8,
      },
      {
        id: 2,
        icon: '/assets/images/toe-touch.png',
        label: 'Anterior',
        score: 7,
      },
      { id: 3, icon: '/assets/icon/favicon.png', label: 'Lateral', score: 7 },
    ],
  },
  {
    id: 5,
    label: 'Metabolic',
    assessments: [
      {
        id: 1,
        icon: '/assets/images/breath-hold.png',
        label: 'VO2 Max',
        score: 51.09,
      },
      {
        id: 2,
        icon: '/assets/images/2-minute-distance.png',
        label: '2 minute distance',
        score: 0.403,
      },
      {
        id: 3,
        icon: '/assets/images/1-hour-distance.png',
        label: '1 hour distance',
        score: 7.27,
      },
      {
        id: 4,
        icon: '/assets/images/breath-hold.png',
        label: 'CO2 Tolerance',
        score: 3.75,
      },
    ],
  },
  {
    id: 6,
    label: 'Neuromotor',
    assessments: [
      { id: 1, icon: '/assets/icon/favicon.png', label: 'Agility', score: 32 },
      { id: 2, icon: '/assets/icon/favicon.png', label: 'Balance', score: 7.5 },
      {
        id: 3,
        icon: '/assets/icon/favicon.png',
        label: 'Coordination',
        score: 6,
      },
    ],
  },
];
export const ASSESSMENTS: Assessment[] = [
  { id: 1, icon: '', label: 'Deadlift', score: 485 },
  { id: 2, icon: '', label: 'Squat', score: 463 },
  { id: 4, icon: '', label: 'Pull-up', score: 614 },
  { id: 3, icon: '', label: 'Bench', score: 400 },
  { id: 5, icon: '', label: 'Overhead Press', score: 407 },
];
