import { Client, Databases, ID, Query } from "appwrite";
import { appwriteConfig } from "../../appwrite/config";
import { getCurrentUser } from "./authServices";

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

// Interface for the saveUserImpactData function params
interface SaveUserImpactParams {
  data: {
    transport: {
      mode: string;
      distance: number;
      carType: string;
    };
    energy: {
      consumption: number;
      source: string;
      energySaving: boolean;
    };
    food: {
      dietType: string;
      meatFrequency: number;
      wasteLevel: string;
    };
    shopping: {
      clothingFrequency: string;
      sustainableBrands: boolean;
      recyclingHabits: string;
    };
  };
  totalFootprint: number;
  recommendations: Array<{
    category: string;
    title: string;
    description: string;
    savingAmount: number;
  }>;
  potentialSavings: number;
  userId?: string;
}

export const saveUserImpactData = async ({
  data,
  totalFootprint,
  recommendations,
  potentialSavings,
  userId
}: SaveUserImpactParams) => {
  try {
    // If no userId is provided, try to get the current user
    let userIdentifier = userId;
    
    if (!userIdentifier) {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("No user is currently logged in");
      }
      userIdentifier = currentUser.$id;
    }
    
    // Store the primary carbon footprint data
    const userImpactData = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userImpactId,
      ID.unique(),
      {
        userId: userIdentifier,
        date: new Date().toISOString(),
        
        // Transport data
        transport_mode: data.transport.mode,
        distance_traveled: data.transport.distance,
        car_type: data.transport.carType,
        
        // Energy data
        energy_source: data.energy.source,
        energy_saving: data.energy.energySaving,
        electricity_consumption: data.energy.consumption,
        
        // Food data
        diet_type: data.food.dietType,
        meat_meals: data.food.meatFrequency,
        food_waste: data.food.wasteLevel,
        
        // Shopping data
        clothing_frequency: data.shopping.clothingFrequency,
        sustainable_brands: data.shopping.sustainableBrands,
        recycling_habits: data.shopping.recyclingHabits,
        
        // Total carbon footprint
        carbon_footprint: totalFootprint,
        
        // Recommendations summary
        potential_savings: potentialSavings,
        top_recommendations: JSON.stringify(recommendations),
        
        // Properly formatted relationship - ensure this field exists in your schema
        userData: userIdentifier
      }
    );
    
    return userImpactData;
  } catch (error) {
    console.error("Appwrite service :: saveUserImpactData :: error", error);
    throw error;
  }
};

// Function to get user impact history
export const getUserImpactHistory = async (userId: string) => {
  try {
    const userImpacts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userImpactId, 
      [
        // Query to filter by userId
        Query.equal("userId", userId),
        // Sort by date descending (newest first)
        Query.orderDesc("date")
      ]
    );
    
    return userImpacts.documents;
  } catch (error) {
    console.error("Appwrite service :: getUserImpactHistory :: error", error);
    throw error;
  }
};