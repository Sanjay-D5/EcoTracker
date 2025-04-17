import { Client, Account, ID } from "appwrite";
import { appwriteConfig } from "../../appwrite/config";

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);

export const createAccount = async (email: string, password: string, name: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    
    if (!newAccount) throw new Error("Failed to create account. Please try again later.");
    
    // Successfully created account - now create session separately
    try {
      // Log the user in after successful account creation
      const session = await login(email, password);
      return session;
    } catch (loginError) {
      console.error("Created account but login failed:", loginError);
      // If login fails after account creation, still consider signup successful
      // but prompt user to login manually
      throw new Error("Account created successfully, but automatic login failed. Please try signing in manually.");
    }
  } catch (error: any) {
    // Transform Appwrite errors into more user-friendly messages
    if (error.code === 409) {
      throw new Error("An account with this email already exists.");
    } else if (error.code === 400) {
      throw new Error("Invalid email or password format.");
    } else if (error.code === 429) {
      throw new Error("Too many requests. Please try again later.");
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      console.error("Account creation error:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    
    if (!session) {
      throw new Error("Failed to create session");
    }
    
    // Store the session info
    localStorage.setItem("userSession", JSON.stringify(session));

    return session;
  } catch (error: any) {
    console.error("Login error details:", error);
    
    // More detailed error handling
    if (error.code === 401) {
      throw new Error("Invalid email or password.");
    } else if (error.code === 429) {
      throw new Error("Too many login attempts. Please try again later.");
    } else if (error.code === 400) {
      throw new Error("Invalid request format. Please check your credentials.");
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to login. Please try again.");
    }
  }
};

export const getCurrentUser = async () => {
  try {
    // First check if we have a session in localStorage
    const sessionData = localStorage.getItem("userSession");
    if (!sessionData) {
      console.log("No session found in localStorage");
      return null;
    }
    
    // Then try to get the account info
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("Get current user error:", error);
    // Clear invalid session data if it exists
    localStorage.removeItem("userSession");
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    
    // Clear stored session data
    localStorage.removeItem("userSession");
    
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear the local session data even if API call fails
    localStorage.removeItem("userSession");
    throw error;
  }
};