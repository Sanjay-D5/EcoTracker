import { Car } from "lucide-react";
import React, { useCallback, useId } from "react";

interface TransportData {
  mode: string;
  distance: number;
  carType: string;
}

interface TransportSectionProps {
  data: TransportData;
  onChange: (data: Partial<TransportData>) => void;
}

type TransportMode = {
  value: string;
  label: string;
};

type CarType = {
  value: string;
  label: string;
};

// Define options as constants to prevent re-creation on each render
const TRANSPORT_MODE: TransportMode[] = [
  { value: "car", label: "Car" },
  { value: "bike", label: "Bike" },
  { value: "public_transport", label: "Public Transport" },
  { value: "walking", label: "Walking" },
  { value: "electric_vehicle", label: "Electric Vehicle" }
];

const CARTYPES: CarType[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" }
];

const TransportSection: React.FC<TransportSectionProps> = ({ data, onChange }) => {
  // Use useId for accessibility
  const modeId = useId();
  const distanceId = useId();
  const carTypeId = useId();

  // Handle distance change with proper number conversion
  const handleDistanceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange({ distance: isNaN(value) ? 0 : value });
  }, [onChange]);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center space-x-4 mb-4 lg:mb-6">
        <div className="rounded-full p-2 bg-emerald-100">
          <Car className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">Transportation</h2>
          <p className="text-sm text-gray-600">Tell us about your daily commute</p>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        <div>
          <label htmlFor={modeId} className="block font-medium text-gray-700 mb-2">
            How do you usually commute?
          </label>
          <select
            id={modeId}
            value={data.mode}
            onChange={(e) => onChange({ mode: e.target.value })}
            className="w-full p-1 lg:p-2 border border-gray-300 rounded-lg 
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                      transition-colors duration-200"
          >
            <option value="">Select transport mode</option>
            {TRANSPORT_MODE.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
          <p id={`${modeId}-description`} className="mt-1 text-xs text-gray-500">
            Choose your most common transportation method
          </p>
        </div>

        <div>
          <label htmlFor={distanceId} className="block font-medium text-gray-700 mb-2">
            Distance travelled daily (km)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id={distanceId}
              min="0"
              max="100"
              step="1"
              value={data.distance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="w-16 flex-shrink-0">
              <input
                type="number"
                value={data.distance}
                onChange={handleDistanceChange}
                min="0"
                max="100"
                className="w-full p-1 text-center border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 km</span>
            <span>50 km</span>
            <span>100 km</span>
          </div>
        </div>

        {data.mode === "car" && (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fadeIn">
            <label htmlFor={carTypeId} className="block font-medium text-gray-700 mb-2">
              Car type & fuel efficiency
            </label>
            <select
              id={carTypeId}
              value={data.carType}
              onChange={(e) => onChange({ carType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                        transition-colors duration-200"
            >
              <option value="">Select car type</option>
              {CARTYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-gray-600">
              The fuel type affects your carbon footprint calculation
            </p>
          </div>
        )}
      </div>

      <div className="p-2 lg:p-4 bg-emerald-50 rounded-lg border border-emerald-100">
        <h3 className="text-emerald-800 font-semibold flex items-center">
          <span className="mr-1">🌱</span> Did you know?
        </h3>
        <p className="text-emerald-700 mt-1 text-sm">
          Switching to public transport or cycling can reduce your carbon footprint by up to 2.6 tons per year!
        </p>
        {data.mode === "car" && data.carType === "petrol" && (
          <p className="text-emerald-600 mt-2 text-sm">
            Switching from a petrol car to an electric vehicle could reduce your emissions by up to 50%!
          </p>
        )}
      </div>
    </div>
  );
};

export default TransportSection;