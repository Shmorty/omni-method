import { AngularDelegate } from '@ionic/angular';
import { Category } from '../../store/assessments/assessment.model';

// export const DATA: Category[] = [
//   {
//     id: 1,
//     label: 'Strength',
//     assessments: [
//       {
//         id: 1,
//         icon: '/assets/images/dead-lift.png',
//         label: 'Deadlift',
//         units: '1RM (lbs)',
//         scores: [
//           {
//             rawScore: 455,
//             calculatedScore: 92,
//             scoreDate: new Date(2022, 9, 1),
//           },
//           {
//             rawScore: 420,
//             calculatedScore: 90,
//             scoreDate: new Date(2022, 8, 12),
//           },
//           {
//             rawScore: 380,
//             calculatedScore: 88,
//             scoreDate: new Date(2022, 7, 30),
//           },
//         ], // 455
//         description:
//           'A deadlift is a resistance exercise in which you hinge your hips to lift a loaded barbell off the floor.  The 1RM deadlift assessment tests your maximum force production while lifting a loaded barbell off of the floor. This test is to be performed without equipment including belts, straps, or sleeves.',
//       },
//       {
//         id: 2,
//         icon: '/assets/images/back-squat.png',
//         label: 'Back Squat',
//         units: '1RM (lbs)',
//         scores: [
//           {
//             rawScore: 375,
//             calculatedScore: 455,
//             scoreDate: new Date(2022, 8, 15),
//           },
//           {
//             rawScore: 360,
//             calculatedScore: 425,
//             scoreDate: new Date(2022, 8, 5),
//           },
//         ], // 375
//       },
//       {
//         id: 3,
//         icon: '/assets/icon/favicon.png',
//         label: 'Weighted Pull-up',
//         units: '1RM (lbs)',
//         scores: [
//           {
//             rawScore: 307,
//             calculatedScore: 455,
//             scoreDate: new Date(2022, 7, 12),
//           },
//         ], // 307
//       },
//       {
//         id: 4,
//         icon: '/assets/images/bench-press.png',
//         label: 'Bench',
//         units: '1RM (lbs)',
//         scores: [
//           {
//             rawScore: 240,
//             calculatedScore: 0,
//             scoreDate: new Date(2022, 9, 7),
//           },
//         ], // 240
//       },
//       // {
//       //   id: 6,
//       //   icon: '/assets/images/over-head-press.png',
//       //   label: 'Overhead Press',
//       //   units: '1RM (lbs)',
//       //   scores: [{
//       //     rawScore: 165,
//       //     calculatedScore: 0,
//       //     scoreDate: new Date()
//       //   }], // 165
//       // },
//     ],
//   },
//   {
//     id: 2,
//     label: 'Endurance',
//     assessments: [
//       {
//         id: 6,
//         icon: '/assets/icon/favicon.png',
//         label: 'Squats',
//         units: 'Reps',
//         scores: [
//           {
//             rawScore: 50,
//             calculatedScore: 455,
//             scoreDate: new Date(2022, 8, 24),
//           },
//         ], // 50
//       },
//       {
//         id: 7,
//         icon: '/assets/images/push-up.png',
//         label: 'Pushups',
//         units: 'Reps',
//         scores: [
//           {
//             rawScore: 57,
//             calculatedScore: 0,
//             scoreDate: new Date(2022, 8, 1),
//           },
//         ], // 57
//       },
//       {
//         id: 8,
//         icon: '/assets/icon/favicon.png',
//         label: 'Pullups',
//         units: 'Reps',
//         scores: [
//           {
//             rawScore: 21,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 21
//       },
//       {
//         id: 9,
//         icon: '/assets/images/plank.png',
//         label: 'Plank',
//         units: 'Time',
//         scores: [
//           {
//             rawScore: 5,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 5
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: 'Power',
//     assessments: [
//       {
//         id: 10,
//         icon: '/assets/icon/favicon.png',
//         label: 'Standing Long Jump',
//         units: 'Length (in)',
//         scores: [
//           {
//             rawScore: 29,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 29
//       },
//       {
//         id: 11,
//         icon: '/assets/icon/favicon.png',
//         label: 'Push Press',
//         units: 'lbs*ft',
//         scores: [
//           {
//             rawScore: 325,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 325
//       },
//       {
//         id: 12,
//         icon: '/assets/images/power-clean.png',
//         label: 'Power Clean',
//         units: '1RM (lbs)',
//         scores: [
//           {
//             rawScore: 225,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 225
//       },
//       {
//         id: 13,
//         icon: '/assets/images/100-meter-sprint.png',
//         label: '100 meter sprint',
//         units: 'Time',
//         scores: [
//           {
//             rawScore: 13.24,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 13.24
//       },
//     ],
//   },
//   {
//     id: 4,
//     label: 'Flexibility',
//     assessments: [
//       {
//         id: 14,
//         icon: '/assets/images/middle-split.png',
//         label: 'Posterior',
//         scores: [
//           {
//             rawScore: 8,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 8
//       },
//       {
//         id: 15,
//         icon: '/assets/images/toe-touch.png',
//         label: 'Anterior',
//         scores: [
//           {
//             rawScore: 7,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 7
//       },
//       {
//         id: 16,
//         icon: '/assets/icon/favicon.png',
//         label: 'Lateral',
//         scores: [
//           {
//             rawScore: 7,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 7
//       },
//     ],
//   },
//   {
//     id: 5,
//     label: 'Metabolic',
//     assessments: [
//       {
//         id: 17,
//         icon: '/assets/images/2-minute-distance.png',
//         label: '2 minute distance',
//         scores: [
//           {
//             rawScore: 0.403,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 0.403
//       },
//       {
//         id: 18,
//         icon: '/assets/images/1-hour-distance.png',
//         label: '1 hour distance',
//         scores: [
//           {
//             rawScore: 7.27,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 7.27
//       },
//       {
//         id: 19,
//         icon: '/assets/images/breath-hold.png',
//         label: 'CO2 Tolerance',
//         scores: [
//           {
//             rawScore: 3.75,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 3.75
//       },
//     ],
//   },
//   {
//     id: 6,
//     label: 'Neuromotor',
//     assessments: [
//       {
//         id: 20,
//         icon: '/assets/icon/favicon.png',
//         label: 'Agility',
//         scores: [
//           {
//             rawScore: 32,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 32
//       },
//       {
//         id: 21,
//         icon: '/assets/icon/favicon.png',
//         label: 'Balance',
//         scores: [
//           {
//             rawScore: 7.5,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 7.5
//       },
//       {
//         id: 22,
//         icon: '/assets/icon/favicon.png',
//         label: 'Coordination',
//         scores: [
//           {
//             rawScore: 6,
//             calculatedScore: 0,
//             scoreDate: new Date(),
//           },
//         ], // 6
//       },
//     ],
//   },
// ];
