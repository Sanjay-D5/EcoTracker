import { Apple, ArrowLeft, Car, ChevronRight, Home, PieChart, ShoppingBag } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { Button, EnergySection, FoodSection, Progressbar, ResultsSection, ShoppingSection, TransportSection } from "@/components";
import { getCurrentUser } from "@/appwrite/actions/authServices";
import { saveUserImpactData } from "@/appwrite/actions/userAction";


type CalculatorSection = 'transport' | 'energy' | 'food' | 'shopping' | 'results';

// TypeScript interfaces for each section's data structure
interface TransportData {
  mode: string;
  distance: number;
  carType: string;
}

interface EnergyData {
  consumption: number;
  source: string;
  energySaving: boolean;
}

interface FoodData {
  dietType: string;
  meatFrequency: number;
  wasteLevel: string;
}

interface ShoppingData {
  clothingFrequency: string;
  sustainableBrands: boolean;
  recyclingHabits: string;
}

interface FormData {
  transport: TransportData;
  energy: EnergyData;
  food: FoodData;
  shopping: ShoppingData;
}

// Initial form data with default values for better UX
const initialFormData: FormData = {
  transport: {
    mode: '',
    distance: 0,
    carType: '',
  },
  energy: {
    consumption: 0,
    source: '',
    energySaving: false,
  },
  food: {
    dietType: '',
    meatFrequency: 0,
    wasteLevel: '',
  },
  shopping: {
    clothingFrequency: '',
    sustainableBrands: false,
    recyclingHabits: '',
  },
};

// Array of calculator sections
const SECTIONS: CalculatorSection[] = ['transport', 'energy', 'food', 'shopping', 'results'];

// Section titles for better accessibility and UI
const SECTION_TITLES: Record<CalculatorSection, string> = {
  transport: 'Transportation',
  energy: 'Home Energy',
  food: 'Food & Diet',
  shopping: 'Shopping Habits',
  results: 'Your Results'
};

const CarbonCalculator = () => {
  const [currentSection, setCurrentSection] = useState<CalculatorSection>('transport');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [dataSaved, setDataSaved] = useState<boolean>(false);

  const currentIndex = SECTIONS.indexOf(currentSection);

  // Fetch current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.$id);
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
      }
    };
    
    fetchUser();
  }, []);

  // Function to check if the current section is valid
  const validateCurrentSection = useCallback(() => {
    switch (currentSection) {
      case 'transport':
        const {mode, distance, carType} = formData.transport;
        return mode !== '' && distance > 0 && (mode !== 'car' || carType !== '');
      case 'energy':
        const { consumption, source } = formData.energy;
        return consumption > 0 && source !== '';
      case 'food':
        const { dietType, wasteLevel } = formData.food;
        return dietType !== '' && wasteLevel !== '';
      case 'shopping':
        const { clothingFrequency, recyclingHabits } = formData.shopping;
        return clothingFrequency !== '' && recyclingHabits !== '';  
      case 'results':
        return true;
      default:
        return false;
    }
  }, [currentSection, formData]);

  // Check if form is valid when the section changes
  useEffect(() => {
    setIsFormValid(validateCurrentSection());
  }, [currentSection, formData, validateCurrentSection]);
  
  // Reset "data saved" flag when leaving results section
  useEffect(() => {
    if (currentSection !== 'results') {
      setDataSaved(false);
    }
  }, [currentSection]);

  // Save form data to localStorage and handle navigation
  const handleNext = useCallback(() => {
    try {
      // Save current section data to localStorage
      localStorage.setItem('carbonCalculatorData', JSON.stringify(formData));
      
      const nextIndex = currentIndex + 1;
      if (nextIndex < SECTIONS.length) {
        setCurrentSection(SECTIONS[nextIndex]);
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      toast.error('Failed to save your progress');
    }
  }, [currentIndex, formData]);

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSection(SECTIONS[prevIndex]);
    }
  }, [currentIndex]);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('carbonCalculatorData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.error('Failed to parse saved data:', error);
      toast.error('Failed to load your saved data');
    }
  }, []);

  // Update form data for a specific section
  const updateFormData = useCallback((section: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [section]: { ...prev[section], ...data },
      };
      return updatedData;
    });
  }, []);

  // Calculate total carbon footprint
  const calculateTotalFootprint = useCallback(() => {
    let total = 0;
    
    // Transport calculation
    const { mode, distance } = formData.transport;
    if (mode === 'car') {
      const carFactor = formData.transport.carType === 'electric' ? 0.05 : 0.2;
      total += distance * carFactor;
    } else if (mode === 'public') {
      total += distance * 0.07;
    } else if (mode === 'walking' || mode === 'cycling') {
      total += distance * 0.01;
    }
    
    // Energy calculation
    const { consumption, source, energySaving } = formData.energy;
    const energyFactor = source === 'renewable' ? 0.3 : 0.8;
    const savingsFactor = energySaving ? 0.8 : 1;
    total += consumption * energyFactor * savingsFactor;
    
    // Food calculation
    const { dietType, meatFrequency, wasteLevel } = formData.food;
    const dietFactor = dietType === 'vegan' ? 0.5 : dietType === 'vegetarian' ? 0.7 : 1;
    const meatFactor = meatFrequency * 0.1;
    const wasteFactor = wasteLevel === 'low' ? 0.7 : wasteLevel === 'medium' ? 1 : 1.3;
    total += (dietFactor + meatFactor) * wasteFactor * 5;
    
    // Shopping calculation
    const { clothingFrequency, sustainableBrands, recyclingHabits } = formData.shopping;
    const clothingFactor = 
      clothingFrequency === 'rarely' ? 1 : 
      clothingFrequency === 'occasionally' ? 2 : 
      clothingFrequency === 'frequently' ? 4 : 1;
    const brandFactor = sustainableBrands ? 0.7 : 1;
    const recyclingFactor = 
      recyclingHabits === 'always' ? 0.6 : 
      recyclingHabits === 'sometimes' ? 0.8 : 1;
    total += clothingFactor * brandFactor * recyclingFactor * 2;
    
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }, [formData]);

  // Handler for saving results to Appwrite
  const handleSaveResults = useCallback(async () => {
    if (!userId) {
      toast.error('Please log in to save your results');
      return;
    }

    if (dataSaved) {
      toast.success('Your results have already been saved');
      return;
    }

    setIsLoading(true);

    try {
      // Calculate potential savings and recommendations
      // This would normally come from the ResultsSection component
      // but we're calculating them here to pass to the saveUserImpactData function
      const totalFootprint = calculateTotalFootprint();
      
      // Generate mock recommendations for demonstration purposes
      // In a real app, these would come from ResultsSection
      const mockRecommendations = [
        {
          category: "Transport",
          title: "Switch to Public Transport",
          description: "Using public transport could reduce your carbon footprint significantly.",
          savingAmount: 500
        },
        {
          category: "Energy",
          title: "Install Energy-Efficient Solutions",
          description: "Using LED bulbs and energy-efficient appliances could save energy.",
          savingAmount: 300
        }
      ];
      
      const potentialSavings = mockRecommendations.reduce((acc, rec) => acc + rec.savingAmount, 0);
      
      // Save the data to Appwrite
      await saveUserImpactData({
        data: formData,
        totalFootprint,
        recommendations: mockRecommendations,
        potentialSavings,
        userId
      });
      
      setDataSaved(true);
      toast.success('Your carbon footprint data has been saved!');
    } catch (error) {
      console.error('Failed to save results:', error);
      toast.error('Failed to save your results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userId, formData, calculateTotalFootprint, dataSaved]);

  // Get the appropriate icon for each section
  const getSectionIcon = (section: CalculatorSection) => {
    const iconProps = { className: "h-5 w-5 lg:h-6 lg:w-6"};
    
    switch (section) {
      case 'transport': return <Car {...iconProps} />;
      case 'energy': return <Home {...iconProps} />;
      case 'food': return <Apple {...iconProps}  />;
      case 'shopping': return <ShoppingBag {...iconProps}  />;
      case 'results': return <PieChart {...iconProps}  />;
    }
  };

  // Render the current section
  const renderSection = useCallback(() => {
    switch (currentSection) {
      case 'transport':
        return <TransportSection 
                data={formData.transport} 
                onChange={(data) => updateFormData('transport', data)} 
               />;
      case 'energy':
        return <EnergySection 
                data={formData.energy} 
                onChange={(data) => updateFormData('energy', data)} 
               />;
      case 'food':
        return <FoodSection 
                data={formData.food} 
                onChange={(data) => updateFormData('food', data)} 
               />;
      case 'shopping':
        return <ShoppingSection 
                data={formData.shopping} 
                onChange={(data) => updateFormData('shopping', data)} 
               />;
      case 'results':
        return (
          <>
            <ResultsSection
              data={formData} 
              totalFootprint={calculateTotalFootprint()}
              userId={userId}
              onSaveComplete={() => setDataSaved(true)}
              onSaveError={(error) => {
                console.error(error);
                toast.error('Failed to automatically save your results');
              }}
            />
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleSaveResults}
                disabled={isLoading || dataSaved || !userId}
                className={`${(isLoading || dataSaved || !userId) ? 'opacity-50 cursor-not-allowed' : ''} px-6`}
              >
                {isLoading ? 'Saving...' : dataSaved ? 'Saved!' : 'Save My Results'}
              </Button>
            </div>
            {!userId && (
              <p className="text-center text-sm text-red-500 mt-2">
                Please log in to save your results
              </p>
            )}
          </>
        );
      default:
        return null;
    }
  }, [currentSection, formData, updateFormData, calculateTotalFootprint, isLoading, dataSaved, userId, handleSaveResults]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-8">
      <header className="bg-white shadow-sm rounded-xl">
        <div className="container mx-auto p-2 lg:py-3 lg:px-3 flex items-center space-x-1 lg:space-x-2">
          <div>
            <Button 
              className="rounded-xl lg:p-1 hover:bg-gray-200 transition-colors" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          <div>
            <h1 className="font-semibold text-lg lg:text-xl">Carbon Footprint Calculator</h1>
            <p className="text-gray-600 text-xs lg:text-lg">Track your daily impact and find ways to reduce your carbon footprint.</p>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="container mx-auto mt-6 lg:mt-8 px-4">
        <Progressbar 
          currentStep={currentIndex + 1} 
          totalSteps={SECTIONS.length} 
        />
      </div>

      {/* Main content */}
      <main className="container mx-auto mt-5 lg:mt-8 px-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <nav>
            <ol className="flex space-x-2 lg:space-x-4 mb-3 lg:mb-6">
              {SECTIONS.map((section, index) => (
                <li 
                  key={section}
                  className={`flex items-center ${index <= currentIndex ? 'text-emerald-500' : 'text-gray-400'}`}
                >
                  {getSectionIcon(section)}
                  <span className="ml-2 text-sm font-medium hidden sm:inline capitalize">
                    {SECTION_TITLES[section]}
                  </span>
                  {index < SECTIONS.length - 1 && (
                    <ChevronRight className="w-4 h-4 ml-4 text-gray-400" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Section heading */}
          <h2 className="text-xl font-semibold mb-4 text-emerald-800">
            {SECTION_TITLES[currentSection]}
          </h2>

          {/* Form Content */}
          <div className="mt-6" role="form">
            <div className="sr-only">
              {SECTION_TITLES[currentSection]} Form Section
            </div>
            {renderSection()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Back
            </Button>

            {currentSection !== 'results' && (
              <Button 
                onClick={handleNext} 
                disabled={!isFormValid} 
                className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarbonCalculator;