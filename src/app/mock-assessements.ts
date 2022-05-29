import { Assessment, Category } from "./assessment";

export const DATA: Category[] = [
    {   id: 1, 
        label: 'Strength', 
        assessments: [
            { id: 1, label: "Deadlift", score: 455},
            { id: 2, label: "Squat", score: 375},
            { id: 4, label: "Pull-up", score: 307},
            { id: 3, label: "Bench", score: 240},
            { id: 5, label: "Overhead Press", score: 165}
        ]
    },
    {   id: 2, 
        label: 'Endurance', 
        assessments: [
            { id: 1, label: "Squats", score: 50},
            { id: 2, label: "Pushups", score: 57},
            { id: 3, label: "Pullups", score: 21},
            { id: 4, label: "Plank", score: 5}
        ]
    },
    {   id: 3, 
        label: 'Power', 
        assessments: [
            { id: 1, label: "Vertical Jump", score: 29},
            { id: 2, label: "Chest Launch", score: 325},
            { id: 3, label: "Power Clean", score: 225},
            { id: 4, label: "100 meter sprint", score: 13.24}
        ]
    },
    {   id: 4,
        label: 'Flexibility',
        assessments: [
            { id: 1, label: "Posterior", score: 8},
            { id: 2, label: "Anterior", score: 7},
            { id: 3, label: "Lateral", score: 7}
        ]
    },
    {   id: 5,
        label: 'Metabolic', 
        assessments: [
            { id: 1, label: "VO2 Max", score: 51.09},
            { id: 2, label: "2 minute distance", score: 0.403},
            { id: 3, label: "1 hour distance", score: 7.27},
            { id: 4, label: "CO2 Tolerance", score: 3.75}
        ]
    },
    {   id: 6,
        label: 'Neuromotor', 
        assessments: [
            { id: 1, label: "Agility", score: 32},
            { id: 2, label: "Balance", score: 7.5},
            { id: 3, label: "Coordination", score: 6}
        ]
    }
]
export const ASSESSMENTS: Assessment[] = [
    { id: 1, label: "Deadlift", score: 485},
    { id: 2, label: "Squat", score: 463},
    { id: 4, label: "Pull-up", score: 614},
    { id: 3, label: "Bench", score: 400},
    { id: 5, label: "Overhead Press", score: 407}
];
