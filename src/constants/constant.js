//This file contains all of the constants that are used throughout the app

import responseData from "./sampleResponse.json"
import settingsData from "./storySettings.json"
export const constants = {
    ageGroups: ["3-8 years", "8-15 years"],
    readTimes: [
        {
            display: "Short (100-200 words)",
            value: "100-200 words"
        },
        {
            display: "Long (400-500 words)",
            value: "400-500 words"
        }
    ],
    settings: settingsData.data,
    staticContentDisplay: 'static',
    sampleResponse: responseData
}