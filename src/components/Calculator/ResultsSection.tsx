import { saveUserImpactData } from '@/appwrite/actions/userAction';
import { BarChart, Leaf, PieChart, Trophy } from 'lucide-react';
import React, { useMemo, useEffect } from 'react';

// Carbon Calculator form data interface
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

// Results data interface
interface CategoryBreakdown {
  transport: number;
  energy: number;
  food: number;
  shopping: number;
}

// Updated props interface to accept data from CarbonCalculator
interface ResultsSectionProps {
  data: FormData;
  totalFootprint: number;
  userId?: string;
  onSaveComplete?: () => void;
  onSaveError?: (error: any) => void;
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  savingAmount: number;
}

// Outside the component, at module level
const dataAlreadySaved = new Set();

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  data, 
  totalFootprint, 
  userId,
  onSaveComplete,
  onSaveError
}) => {
  // National average carbon footprint (in kg CO₂)
  const nationalAverage = 5000;
  // Calculate breakdown percentages based on form data
  const breakdown = useMemo<CategoryBreakdown>(() => {
    // Calculate footprint for each category
    let transportFootprint = 0;
    const { mode, distance } = data.transport;
    if (mode === 'car') {
      const carFactor = data.transport.carType === 'electric' ? 0.05 : 0.2;
      transportFootprint = distance * carFactor;
    } else if (mode === 'public') {
      transportFootprint = distance * 0.07;
    } else if (mode === 'walking' || mode === 'cycling') {
      transportFootprint = distance * 0.01;
    }
    
    // Energy footprint
    const { consumption, source, energySaving } = data.energy;
    const energyFactor = source === 'renewable' ? 0.3 : 0.8;
    const savingsFactor = energySaving ? 0.8 : 1;
    const energyFootprint = consumption * energyFactor * savingsFactor;
    
    // Food footprint
    const { dietType, meatFrequency, wasteLevel } = data.food;
    const dietFactor = dietType === 'vegan' ? 0.5 : dietType === 'vegetarian' ? 0.7 : 1;
    const meatFactor = meatFrequency * 0.1;
    const wasteFactor = wasteLevel === 'low' ? 0.7 : wasteLevel === 'medium' ? 1 : 1.3;
    const foodFootprint = (dietFactor + meatFactor) * wasteFactor * 5;
    
    // Shopping footprint
    const { clothingFrequency, sustainableBrands, recyclingHabits } = data.shopping;
    const clothingFactor = 
      clothingFrequency === 'rarely' ? 1 : 
      clothingFrequency === 'occasionally' ? 2 : 
      clothingFrequency === 'frequently' ? 4 : 1;
    const brandFactor = sustainableBrands ? 0.7 : 1;
    const recyclingFactor = 
      recyclingHabits === 'always' ? 0.6 : 
      recyclingHabits === 'sometimes' ? 0.8 : 1;
    const shoppingFootprint = clothingFactor * brandFactor * recyclingFactor * 2;
    
    // Calculate percentage for each category
    const total = transportFootprint + energyFootprint + foodFootprint + shoppingFootprint;
    
    return {
      transport: Math.round((transportFootprint / total) * 100),
      energy: Math.round((energyFootprint / total) * 100),
      food: Math.round((foodFootprint / total) * 100),
      shopping: Math.round((shoppingFootprint / total) * 100),
    };
  }, [data]);

  // Generate tailored recommendations based on the user's data
  const recommendations = useMemo<Recommendation[]>(() => {
    const recs: Recommendation[] = [];
    
    // Transport recommendations
    if (data.transport.mode === 'car' && data.transport.carType !== 'electric') {
      recs.push({
        category: 'Transportation',
        title: 'Switch to Electric Vehicle',
        description: 'Switching to an electric vehicle could reduce your carbon footprint by up to 2 tons CO₂ per year.',
        savingAmount: 2000,
      });
    } else if (data.transport.mode === 'car') {
      recs.push({
        category: 'Transportation',
        title: 'Use Public Transport',
        description: 'Using public transport for your daily commute could save around 500 kg CO₂ per year.',
        savingAmount: 500,
      });
    }
    
    // Energy recommendations
    if (data.energy.source !== 'renewable') {
      recs.push({
        category: 'Energy Usage',
        title: 'Switch to Renewable Energy',
        description: 'Switching to renewable energy sources could reduce your footprint by up to 1.5 tons CO₂ annually.',
        savingAmount: 1500,
      });
    }
    if (!data.energy.energySaving) {
      recs.push({
        category: 'Energy Usage',
        title: 'Install Energy-Efficient Solutions',
        description: 'Using LED bulbs and energy-efficient appliances could save 300 kg CO₂ per year.',
        savingAmount: 300,
      });
    }
    
    // Food recommendations
    if (data.food.dietType === 'omnivore' && data.food.meatFrequency > 3) {
      recs.push({
        category: 'Diet Changes',
        title: 'Reduce Meat Consumption',
        description: 'Reducing meat consumption by just one meal per week could save 196 kg CO₂ per year.',
        savingAmount: 196,
      });
    }
    if (data.food.wasteLevel === 'high') {
      recs.push({
        category: 'Food Waste',
        title: 'Reduce Food Waste',
        description: 'Planning meals better and composting food waste can save up to 150 kg CO₂ annually.',
        savingAmount: 150,
      });
    }
    
    // Shopping recommendations
    if (data.shopping.clothingFrequency === 'frequently') {
      recs.push({
        category: 'Shopping Habits',
        title: 'Buy Less, Choose Well',
        description: 'Reducing new clothing purchases by 50% could save around 250 kg CO₂ per year.',
        savingAmount: 250,
      });
    }
    if (!data.shopping.sustainableBrands) {
      recs.push({
        category: 'Shopping Habits',
        title: 'Choose Sustainable Brands',
        description: 'Opting for sustainable brands can reduce your shopping footprint by 20%, saving about 100 kg CO₂ annually.',
        savingAmount: 100,
      });
    }
    
    // Return top 3 recommendations based on highest potential savings
    return recs.sort((a, b) => b.savingAmount - a.savingAmount).slice(0, 3);
  }, [data]);

  // Calculate comparison percentage
  const comparisonPercentage = useMemo(() => 
    Math.round((totalFootprint / nationalAverage) * 100),
    [totalFootprint, nationalAverage]
  );
  
  // Calculate potential CO₂ savings if all recommendations are followed
  const potentialSavings = useMemo(() => 
    recommendations.reduce((total, rec) => total + rec.savingAmount, 0),
    [recommendations]
  );
  
  useEffect(() => {
    const saveResults = async () => {
      // Use the userId as a key to track what's been saved
      const saveKey = `${userId}-${totalFootprint}`;
      if (!userId || dataAlreadySaved.has(saveKey)) return;
      
      try {
        await saveUserImpactData({
          data,
          totalFootprint,
          recommendations,
          potentialSavings,
          userId
        });
        
        // Add to our set of saved items
        dataAlreadySaved.add(saveKey);

        if (onSaveComplete) {
          onSaveComplete();
        }
      } catch (error) {
        console.error("Failed to save carbon footprint data:", error);
        if (onSaveError) {
          onSaveError(error);
        }
      }
    };

    saveResults();
  }, []);
  
  return (
    <div className='space-y-4 lg:space-y-6'>
      <header className="flex items-center space-x-4 mb-6">
        <div className="rounded-full p-2 bg-emerald-100">
          <Leaf className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h2 className="font-semibold">Your Carbon Footprint Results</h2>
          <p className="text-sm text-gray-500">Based on your lifestyle choices</p>
        </div>
      </header>

      {/* Main Score */}
      <section className='text-center p-6 bg-emerald-50 rounded-lg mb-5'>
        <div className='text-3xl font-bold text-emerald-800'>{totalFootprint.toLocaleString()} kg CO₂</div>
        <p className='text-xs text-gray-600'>Your estimated annual carbon footprint</p>
      </section>

      {/* Breakdown */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Pie chart */}
        <section className='bg-white rounded-lg p-4 lg:p-6 shadow-sm'>
          <header className='flex items-center mb-4 space-x-4'>
            <PieChart className='w-5 h-5 text-emerald-700' />
            <h3 className='font-semibold text-gray-800'>Breakdown by Category</h3>
          </header>
          <div className='space-y-3'>
            {Object.entries(breakdown).map(([category, percentage]) => (
              <div key={category}>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='text-gray-600 capitalize'>{category}</span>
                  <span className='font-medium'>{percentage}%</span>
                </div>
                <div 
                  className='h-2 w-full bg-gray-300 rounded-full' 
                  role="progressbar" 
                >
                  <div 
                    className='bg-emerald-600 h-2 rounded-full' 
                    style={{width:`${percentage}%`}} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className='bg-white rounded-lg p-4 lg:p-6 shadow-sm'>
          <header className='flex items-center space-x-4 mb-4'>
            <BarChart className='w-5 h-5 text-emerald-700'/>
            <h3 className='text-gray-800 font-semibold'>How You Compare</h3>
          </header>
          <div className='space-y-4' >
            <div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Your Footprint</span>
                <span className='font-bold'>{totalFootprint.toLocaleString()} kg</span>
              </div>
              <div 
                className='h-2 rounded-xl w-full bg-gray-300'
                role="progressbar"
              >
                <div 
                  className='h-2 bg-emerald-600 rounded-full' 
                  style={{width: `${comparisonPercentage}%`}} 
                />
              </div>
            </div>
          
            <div>
              <div className='flex justify-between text-sm '>
                <span className='text-gray-600'>National Average</span>
                <span className='font-bold'>{nationalAverage.toLocaleString()} kg</span>
              </div>
              <div className='h-2 rounded-xl w-full bg-gray-300'>
                <div className='h-2 bg-gray-400 rounded-full' style={{width: '100%'}} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
        <header className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Recommendations</h3>
        </header>
        <div className="mb-4 px-4 py-3 bg-emerald-50 rounded-lg">
          <p className="text-sm text-emerald-700">
            If you follow these recommendations, you could save approximately{' '}
            <span className="font-bold">{potentialSavings.toLocaleString()} kg CO₂</span> per year.
          </p>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-emerald-50 rounded-lg">
              <h4 className="font-medium text-emerald-800 mb-1">{rec.title}</h4>
              <p className="text-xs text-gray-500 mb-2">Category: {rec.category}</p>
              <p className="text-sm text-emerald-600">{rec.description}</p>
              <p className="text-xs font-medium text-emerald-800 mt-2">
                Potential savings: {rec.savingAmount.toLocaleString()} kg CO₂/year
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResultsSection;