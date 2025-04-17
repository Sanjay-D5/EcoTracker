import { memo } from 'react';
import Button from '../Button';
import { CheckCircle, Share2 } from 'lucide-react';

// Define the props interface for the component
interface DailyTipCardProps {
    tip: string;
    icon: string;
    impact: string;
    tipCompleted: boolean;
    onMarkDone?: () => void;
    onShare?: () => void;
}

const DailyTipCard = memo<DailyTipCardProps>(({tip, icon, impact, tipCompleted, onMarkDone, onShare}) => {
    
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-8 shadow-md"> 
        <div className="p-4 lg:p-6">
            <div className="flex items-start gap-4">
                <img src={icon} alt="tip icon" className="w-10 h-10" />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{tip}</h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Button 
                            onClick={onMarkDone} 
                            className={`flex items-center px-4 py-2 rounded-xl font-medium text-sm ${tipCompleted ? 
                                "bg-emerald-100 text-emerald-800" : "bg-emerald-500 text-white hover:bg-emerald-600"
                            }`}
                        >
                            {tipCompleted ? 'Completed' : 'Mask as Done'}
                            {tipCompleted && <CheckCircle className="ml-1 w-4 h-4" />}
                        </Button>
                        <Button 
                            className='flex items-center px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm rounded-full font-medium'
                            onClick={onShare}
                        > 
                            <Share2 className='w-4 h-4 mr-2'/> Share Tip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-gray-100 p-3 lg:p-5 border-t border-gray-200'>
            <h4 className="font-semibold text-gray-700 mb-2">Why This Matters</h4>
            <p className="text-gray-600 text-sm">{impact}</p>
        </div>
    </div>
  );
});

export default DailyTipCard