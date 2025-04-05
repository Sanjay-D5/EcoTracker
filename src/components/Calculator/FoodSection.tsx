import { Apple } from 'lucide-react';
import React, { useId, useCallback } from 'react';

interface FoodData {
  dietType: string;
  meatFrequency: number;
  wasteLevel: string;
}

interface FoodSectionProps {
  data: FoodData;
  onChange: (data: Partial<FoodData>) => void;
}

// Diet type options defined outside component to prevent recreation on re-renders
const DIET_TYPES = [
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'omnivore', label: 'Omnivore' },
];

// Waste level options defined outside component
const WASTE_LEVELS = [
  { value: 'low', label: 'Low (I rarely waste food)' },
  { value: 'medium', label: 'Medium (Some waste)' },
  { value: 'high', label: 'High (Regular waste)' },
];

const FoodSection: React.FC<FoodSectionProps> = ({ data, onChange }) => {
  // Use useId for accessibility
  const dietTypeId = useId();
  const meatFrequencyId = useId();
  const wasteLevelId = useId();
  
  // Memoize handlers to avoid recreation on re-renders
  const handleDietTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ dietType: e.target.value });
  }, [onChange]);
  
  const handleMeatFrequencyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ meatFrequency: Number(e.target.value) });
  }, [onChange]);
  
  const handleWasteLevelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ wasteLevel: e.target.value });
  }, [onChange]);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center space-x-4 mb-4 lg:mb-6">
        <div className="rounded-full p-2 bg-emerald-100">
          <Apple className="w-6 h-6 text-emerald-500"/>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Food Consumption</h2>
          <p className="text-sm text-gray-500">Tell us about your eating habits</p>
        </div>
      </div>
      
      <div className="space-y-4 lg:space-y-6">
        <div>
          <label htmlFor={dietTypeId} className="block font-medium text-gray-700 mb-2">Diet Type</label>
          <select
            id={dietTypeId}
            value={data.dietType}
            onChange={handleDietTypeChange}
            className="w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select diet type</option>
            {DIET_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        {data.dietType === 'omnivore' && (
          <div>
            <label htmlFor={meatFrequencyId} className="block font-semibold text-gray-700 mb-1 lg:mb-2">
              Meals with meat per week
            </label>
            <input 
              type="range" 
              id={meatFrequencyId} 
              min="0" 
              max="21" 
              value={data.meatFrequency} 
              onChange={handleMeatFrequencyChange} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-1 lg:mt-2 text-sm text-gray-600">
              {data.meatFrequency} {data.meatFrequency === 1 ? 'Meal' : 'Meals'}
            </div>
          </div>
        )}

        <div>
          <label htmlFor={wasteLevelId} className="block font-semibold text-gray-700 mb-2">
            Food waste habits
          </label>
          
          <select 
            id={wasteLevelId} 
            value={data.wasteLevel} 
            onChange={handleWasteLevelChange} 
            className="w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select waste level</option>
            {WASTE_LEVELS.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-2 lg:p-4 bg-emerald-50 rounded-lg" role="note">
        <h3 className="text-emerald-800 font-semibold"><span className="mr-1">🌱</span>Food Impact Fact</h3>
        <p className="text-emerald-600 mt-1 text-sm">
          Reducing meat consumption by just one meal per week can save up to 196 kg of CO2 per year!
        </p>
      </div>
    </div>
  );
};

export default FoodSection;