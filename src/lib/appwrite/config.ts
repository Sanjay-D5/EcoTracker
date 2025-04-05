export const appwriteConfig = {
    endpointUrl: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersId: import.meta.env.VITE_APPWRITE_USER_DATA_ID,
    userImpactId: import.meta.env.VITE_APPWRITE_USER_TRACKER_ID,
    ecoTipId: import.meta.env.VITE_APPWRITE_ECO_TIPS,
    challengeLogsId: import.meta.env.VITE_APPWRITE_CHALLENGE_LOGS,
    userChallengesId: import.meta.env.VITE_APPWRITE_USER_CHALLENGES,
    challengesId: import.meta.env.VITE_APPWRITE_CHALLENGES,
    progressId: import.meta.env.VITE_APPWRITE_USER_PROGRESS,

    bucketId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    secretKey: import.meta.env.VITE_APPWRITE_SECRET,
};