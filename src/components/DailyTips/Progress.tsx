import { Award, Verified } from "lucide-react"
import { progress } from "../../constants"
import { memo } from "react";

interface ProgressProps {
    streak: number; // Changed from Streak to streak for consistent camelCase naming
}

const Progress = memo<ProgressProps>(({ streak}) => {
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 mb-6">
                <div className="flex items-center">
                   <div className="mr-2 h-6 w-6">🔥</div>
                    <div>
                        <p className="font-medium lg:text-sm">You're on a {streak}-day streak!</p>
                        <p className="text-gray-500 lg:text-xs">Keep it up!</p>
                    </div> 
                </div>
            </div>
            <h3 className="font-medium flex items-center mb-3"><Award className="h-4 w-4 mr-1 font-bold" />Your Eco Badges</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {progress.map((item, index) => (
                    <div key={index} className="rounded-lg border border-emerald-500 bg-emerald-100 text-center p-2 transition-transform hover:scale-105">
                        <div className="text-xl mb-1">{item.badge}</div>
                        <p className="font-semibold text-sm">{item.text}</p>
                    </div>
                ))}
            </div>
            <h4 className="font-medium mb-4">Weekly Progress</h4>
            <div className="flex justify-between mb-2">
                {weekDays.map((day, index) => {
                    const isCompleted = index < streak;
                    return (
                        <div key={index} className="text-center ">
                        <div className={`p-1 rounded-full  mb-1 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-400'}`}>
                            <Verified className="h-4 w-4 text-white"/>
                        </div>
                        <span className="text-gray-500 text-sm">{day}</span>
                    </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
});

// Display name for debugging purposes
Progress.displayName = 'Progress';

export default Progress