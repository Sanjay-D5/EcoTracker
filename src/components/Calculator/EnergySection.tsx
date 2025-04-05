import { Home, Zap } from 'lucide-react';
import React, { useId, useCallback } from 'react';

interface EnergyData {
  consumption: number;
  source: string;
  energySaving: boolean;
}

interface EnergySectionProps {
  data: EnergyData;
  onChange: (data: Partial<EnergyData>) => void;
}

interface EnergySource {
  value: string;
  label: string;
}

// Moved outside component to avoid recreation on re-renders
const ENERGY_SOURCES: EnergySource[] = [
  {value: "renewable_Energy", label: "Renewable Energy"},
  {value: "coal", label: "Coal"},
  {value: "natural_Gas", label: "Natural Gas"},
  {value: "mixed_Sources", label: "Mixed Sources"},
];

const EnergySection: React.FC<EnergySectionProps> = ({data, onChange}) => {
  // Use useId for accessibility
  const consumptionId = useId();
  const sourceId = useId();
  const energySavingId = useId();
  
  // Memoize handlers to avoid recreation on re-renders
  const handleConsumptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      onChange({consumption: value});
    }
  }, [onChange]);
  
  const handleSourceChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({source: e.target.value});
  }, [onChange]);
  
  const handleEnergySavingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({energySaving: e.target.checked});
  }, [onChange]);

  return (
    <div className='space-y-4 lg:space-y-6'>
      <div className="flex items-center space-x-4 mb-4 lg:mb-6">
        <div className="rounded-full p-2 bg-emerald-100">
          <Home className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">Energy Usage</h2>
          <p className="text-sm text-gray-500">Tell us about your Energy consumption</p>
        </div>
      </div>
      
      <div className="space-y-4 lg:space-y-6">
        <div>
          <label htmlFor={consumptionId} className="block font-medium text-gray-700 mb-2">
            Monthly electricity consumption (kWh)
          </label>
          <div className='flex items-center space-x-2'>
            <input 
              type="number" 
              id={consumptionId}
              min="0"
              step="1"
              value={data.consumption || ''} 
              onChange={handleConsumptionChange}
              className='w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500' 
              placeholder='Enter kWh'
            />
            <Zap className='w-4 h-4 lg:w-5 lg:h-5 text-yellow-500'/>
          </div>
          <p className='text-gray-500 text-sm'>Find this on your electricity bill</p>
        </div>

        <div>
          <label htmlFor={sourceId} className="block font-semibold text-gray-700 mb-2">
            Primary energy source
          </label>
          <select 
            id={sourceId} 
            value={data.source} 
            onChange={handleSourceChange} 
            className="w-full p-1 lg:p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select energy source</option>
            {ENERGY_SOURCES.map((source) => (
              <option key={source.value} value={source.value}>{source.label}</option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-3'>
          <input 
            type="checkbox" 
            id={energySavingId}
            checked={data.energySaving} 
            onChange={handleEnergySavingChange}
            className='h-4 w-4 text-emerald-500 focus:ring-green-500 border-gray-300 rounded'
          />
          <label htmlFor={energySavingId} className='text-gray-600'>
            I use energy-saving appliances
          </label>
        </div>
      </div>
      
      <div className="p-2 lg:p-4 bg-emerald-50 rounded-lg" role="note">
        <h3 className="text-emerald-800 font-semibold"><span className="mr-1">🌱</span>Energy Saving Tip</h3>
        <p className="text-emerald-600 mt-1 text-sm">Using LED bulbs can reduce your lighting energy consumption by up to 80%!</p>
      </div>
    </div>
  );
};

export default EnergySection;