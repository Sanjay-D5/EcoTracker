// **Create account flow**
// 1. User enters full name and email
// 2. Check if the user already exist using the email (we will use this to identify if we still need to create a user document or not)
// 3. Send OTP to user's email
// 4. This will send a secret key for creating a session. 
// 5. Create a new user document if the user is a new user
// 6. Return the user's accountId that will be used to complete the login
// 7. Verify OIP and authenticate the login

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "../utils";
import Cookies from "js-cookie";

const getUserByEmail = async (email: string) => {
    const {databases} = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal("email", [email])],
    )

    return result.total > 0 ? result.documents[0] : null;
}

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
}

export const sendEmailOTP = async ({email}: {email: string}) => {
    const {account} = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);

        return session.userId;
    } catch (error) {
        handleError(error, "Failed to send email OTP");
    }
};

export const createAccount = async ({fullName, email}: {fullName: string, email: string}) => {
    const existingUser = await getUserByEmail(email);

    const userId = await sendEmailOTP({email});

    if(!userId) throw new Error("Failed to send an OTP");

    if(!existingUser){
        const {databases} = await createAdminClient();

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: avatarPlaceholderUrl,
                userId,
            },
        );
    }

    return parseStringify({userId});

};

export const verifySecret = async ({userId, password}: {userId: string; password: string}) => {
    try {
        const {account} = await createAdminClient();
        
        const session = await account.createSession(userId, password);
        
        Cookies.set("appwrite-session",
            session.secret, {
                path: "/",
                sameSite: "strict",
                secure: true,
            }
        );
        return parseStringify({sessionId: session.$id});
        
    } catch (error) {
        handleError(error, "Failed to verify OTP");
    }
}

export const getCurrentUser = async () => {
    const {databases, account} = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal("userId", result.$id)],
    );

    if(user.total <= 0) return null;

    return parseStringify(user.documents[0]);
}

export const signOutUser = async () => {
    const {account} = await createSessionClient();

    try {
        await account.deleteSession("current");
        Cookies.remove("appwrite-session");
    } catch (error) {
        handleError(error, "Failed to sign out user")
    }
}

export const signInUser = async ({ email }: { email: string }) => {
    try {
        const existingUser = await getUserByEmail(email);

        // User exists, send OTP
        if(existingUser){
            await sendEmailOTP({email});
            return parseStringify({userId: existingUser.$id});
        }

        return parseStringify({userId: null, error: "User not found"});
    } catch (error) {
        handleError(error, "Failed to sign in user");
    }
}