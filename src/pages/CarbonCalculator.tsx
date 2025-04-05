import { Apple, ArrowLeft, Car, ChevronRight, Home, PieChart, ShoppingBag } from "lucide-react"

import { useState, useCallback, useEffect } from "react";


import Button from "../components/Button";
import Progressbar from "../components/Progressbar";
import TransportSection from "../components/Calculator/TransportSection";
import EnergySection from "../components/Calculator/EnergySection";
import FoodSection from "../components/Calculator/FoodSection";
import ShoppingSection from "../components/Calculator/ShoppingSection";
import ResultsSection from "../components/Calculator/ResultsSection";


type CalculatorSection = 'transport' | 'energy' | 'food' | 'shopping' | 'results';

// Added explicit TypeScript interfaces for each section's data structure
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

// Created a comprehensive FormData interface
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

// Made the sections array a constant (SECTIONS) to avoid recreation
const SECTIONS: CalculatorSection[] = ['transport', 'energy', 'food', 'shopping', 'results'];

const CarbonCalculator = () => {
  const [currentSection, setCurrentSection] = useState<CalculatorSection>('transport');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormValid, setIsFormValid] = useState<Boolean>(false);

  const currentIndex = SECTIONS.indexOf(currentSection);

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
  

  // Added useCallback hooks for memoizing functions to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    // Save current section data to localStorage
    localStorage.setItem('carbonCalculatorData', JSON.stringify(formData));

    const nextIndex = currentIndex + 1;
    if (nextIndex < SECTIONS.length) {
      setCurrentSection(SECTIONS[nextIndex]);
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
    const savedData = localStorage.getItem('carbonCalculatorData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, [])

  // Extracted initialFormData outside the component to prevent recreation on each render
  // section: keyof FormData 
  // - section is a parameter name
  // - keyof FormData is a TypeScript operator that creates a union type of all the keys in the FormData type
  // - This means section can only be assigned values that are valid keys of the FormData type
  // Example: If FormData = { personal: {...}, contact: {...} }, then section can only be "personal" or "contact"

  // data: Partial<FormData[keyof FormData]>
  // - data is another parameter name
  // - FormData[keyof FormData] is an indexed access type - it gets the type of the values in FormData
  // - Partial<T> is a utility type that makes all properties of T optional
  // - This means data is an object that can have some or all of the properties of whatever type the values in FormData are
  
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

  // Simplified the getSectionIcon function with destructuring and consistent returns
  const getSectionIcon = (section: CalculatorSection) => {
    const iconProps = { className: "h-5 w-5 lg:h-6 lg:w-6" };
    
    switch (section) {
      case 'transport': return <Car {...iconProps} />;
      case 'energy': return <Home {...iconProps} />;
      case 'food': return <Apple {...iconProps} />;
      case 'shopping': return <ShoppingBag {...iconProps} />;
      case 'results': return <PieChart {...iconProps} />;
    }
  };

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
        return <ResultsSection data={formData} totalFootprint={calculateTotalFootprint()}/>;
      default:
        return null;
    }
  }, [currentSection, formData, updateFormData, calculateTotalFootprint]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-4">
      <header className="bg-white shadow-sm rounded-xl">
        <div className="container mx-auto p-1 lg:py-3 lg:px-3 flex items-center space-x-1 lg:space-x-4">
          <div>
            <Button 
              className="rounded-xl lg:p-1 hover:bg-gray-200 transition-colors" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          <div className="">
            <h1 className="font-semibold text-lg lg:text-xl">Carbon Footprint Calculator</h1>
            <p className="text-gray-600 text-xs lg:text-lg">Track your daily impact and find ways to reduce your carbon footprint.</p>
          </div>
          
        </div>
      </header>

      {/* Progress bar */}
      <div className="container mx-auto mt-6 lg:mt-8 px-4">
        <Progressbar currentStep={currentIndex + 1} totalSteps={SECTIONS.length} />
      </div>

      {/* Main content */}
      <main className="container mx-auto mt-5 lg:mt-8 px-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          {/* Wrapped the progress indicators in semantic <nav> and <ol> elements */}
          <nav>
            <ol className="flex space-x-2 lg:space-x-4 mb-3 lg:mb-6">
              {SECTIONS.map((section, index) => (
                <li 
                  key={section}
                  className={`flex items-center ${index <= currentIndex ? 'text-emerald-500' : 'text-gray-400'}`}
                >
                  {getSectionIcon(section)}
                  <span className="ml-2 text-sm font-medium hidden sm:inline capitalize">
                    {section}
                  </span>
                  {index < SECTIONS.length - 1 && (
                    <ChevronRight className="w-4 h-4 ml-4 text-gray-400" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Form */}
          <div className="mt-6">{renderSection()}</div>

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
              <Button onClick={handleNext} disabled={!isFormValid} className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}>
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