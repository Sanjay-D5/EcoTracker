export const appwriteConfig = {
    endpointUrl: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    usersId: import.meta.env.VITE_APPWRITE_USER_DATA_ID,
    userImpactId: import.meta.env.VITE_APPWRITE_USER_IMPACT_ID,
    
    bucketId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
};