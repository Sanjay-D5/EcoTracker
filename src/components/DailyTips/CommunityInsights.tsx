import { ArrowRight, Users } from "lucide-react"
import Button from "../Button"

interface CommunityInsightsProps {
    id: number;
    user: string;
    tip: string;
    date: string;
    userInput?: string;
    onUserInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
}

const CommunityInsights: React.FC<CommunityInsightsProps> = ({
    id,
    user,
    tip,
    date,
    userInput = "",
    onUserInputChange,
    onSubmit
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        e.preventDefault();
        onSubmit();
      }
    };

    const isSubmitDisabled = !userInput.trim();

  return (
    <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-md"> 
        <div className="p-4 lg:p-5">
            <div className="flex items-center justify-start gap-2 mb-4">
                <span><Users className="h-4 w-4"/></span>
                <h3 className="font-semibold text-lg">
                    Community Insights
                </h3>
            </div>
        
            <div className="space-y-4">
                <div className= "bg-gray-100 rounded-lg p-3">
                    <div key={id} className="flex items-start">
                        <div className="px-2 py-1 rounded-full bg-emerald-300 flex items-center justify-center min-w-8">
                            <span className="text-emerald-800 font-bold">{user.charAt(0)}</span>
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="text-gray-700">{tip}</p>
                            <p className="text-sm text-gray-500 mt-1">{date}</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>

        {/* Share your tip */}
        <div className="px-6 pb-6">
            <label htmlFor="tip-input" className="block font-medium text-gray-700 mb-2">Share your eco tip</label>
            <div className="relative">
                <input 
                    id="tip-input"
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"  
                    value={userInput}
                    onChange={onUserInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Share your eco tip..."
                />
                <Button 
                    className={`absolute right-2 top-2 p-1 rounded-lg ${isSubmitDisabled ? 'text-gray-300' : 'hover:bg-gray-100 text-emerald-500'}`} 
                    onClick={onSubmit}
                    disabled={isSubmitDisabled}
                    type="button"
                >   
                    <ArrowRight className="h-5 w-5"/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CommunityInsights