import React from "react";

interface Progressbarprops {
    currentStep: number;
    totalSteps: number;
}
const Progressbar: React.FC<Progressbarprops> = ({currentStep, totalSteps}) => {
    const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full">
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-green-600 transition-all duration-300 ease-in-out" style={{width:`${progress}%`}}/>
        </div>
        <div className="mt-2 text-right text-xs lg:text-sm">
            Steps {currentStep} of {totalSteps}
        </div>
    </div>
  )
}

export default Progressbar