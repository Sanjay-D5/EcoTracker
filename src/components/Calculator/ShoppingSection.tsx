import { ShoppingBag } from 'lucide-react';
import React, { useId, useCallback } from 'react';

interface ShoppingData {
  clothingFrequency: string;
  sustainableBrands: boolean;
  recyclingHabits: string;
}

interface ShoppingSectionProps {
  data: ShoppingData;
  onChange: (data: Partial<ShoppingData>) => void;
}

// Move constants outside component to prevent recreation on re-renders
const CLOTHING_FREQUENCY = [
  { value: 'rarely', label: 'Rarely (Few times per year)' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
];

const RECYCLING_HABITS = [
  { value: 'always', label: 'Always' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'never', label: 'Never' },
];

const ShoppingSection: React.FC<ShoppingSectionProps> = ({ data, onChange }) => {
  // Generate unique IDs for accessibility
  const clothingFrequencyId = useId();
  const sustainableBrandsId = useId();
  const recyclingHabitsId = useId();
  
  // Memoize event handlers
  const handleClothingFrequencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ clothingFrequency: e.target.value });
  }, [onChange]);
  
  const handleSustainableBrandsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ sustainableBrands: e.target.checked });
  }, [onChange]);
  
  const handleRecyclingHabitsChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ recyclingHabits: e.target.value });
  }, [onChange]);

  return (
    <div className='space-y-4 lg:space-y-6'>
      <div className="flex items-center space-x-4 mb-4 lg:mb-6">
        <div className="rounded-full p-2 bg-emerald-100">
          <ShoppingBag className="w-6 h-6 text-emerald-500"/>
        </div>
        <div>
          <h2 className="font-semibold">Shopping & Lifestyle</h2>
          <p className="text-sm text-gray-500">Tell us about your shopping habits</p>
        </div>
      </div>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <label htmlFor={clothingFrequencyId} className="block font-semibold text-gray-700 mb-2">
            How often do you buy new clothes?
          </label>
          <select 
            id={clothingFrequencyId} 
            value={data.clothingFrequency} 
            onChange={handleClothingFrequencyChange}
            className="w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select frequency</option>
            {CLOTHING_FREQUENCY.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-3'>
          <input 
            type="checkbox" 
            id={sustainableBrandsId} 
            checked={data.sustainableBrands}
            onChange={handleSustainableBrandsChange}
            className='h-4 w-4 accent-emerald-500 focus:ring-green-500 border-gray-300 rounded'
          />
          <label htmlFor={sustainableBrandsId} className='text-gray-600'>I prefer sustainable brands</label>
        </div>

        <div>
          <label htmlFor={recyclingHabitsId} className="block font-semibold text-gray-700 mb-2">
            How often do you recycle?
          </label>
          <select 
            id={recyclingHabitsId} 
            value={data.recyclingHabits} 
            onChange={handleRecyclingHabitsChange}
            className="w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select recycling frequency</option>
            {RECYCLING_HABITS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-2 lg:p-4 bg-emerald-50 rounded-lg" role="note">
        <h3 className="text-emerald-800 font-semibold"><span className="mr-1">🌱</span>Shopping Tip</h3>
        <p className="text-emerald-600 mt-1 text-sm">
          The fashion industry accounts for 10% of global carbon emissions. Choosing sustainable brands and shopping less frequently can make a big impact!
        </p>
      </div>
    </div>
  );
};

export default ShoppingSection;