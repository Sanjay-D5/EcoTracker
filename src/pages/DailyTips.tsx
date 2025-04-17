import { ArrowLeft, BookOpen } from "lucide-react"
import Button from "../components/Button"
import { useCallback, useState } from "react";
import { communityInsights, ecoNews, tipsData } from "../constants";
import { CommunityInsights, DailyTipCard, Progress } from "@/components";

interface TipData {
  id: number;
  tip: string;
  icon: string;
  impact: string;
  tipCompleted: boolean;
}

interface CommunityInsightData {
  id: number;
  user: string;
  tip: string;
  date: string;
}

const DailyTips = () => {
  
  // State to track which tip to display
  const [currentTip, setCurrentTip] = useState<TipData>(tipsData[0]);
  const [currentInsight, setCurrentInsight] = useState<CommunityInsightData>(communityInsights[0]);
  const [tipCompleted, setTipCompleted] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [streak, setStreak] = useState<number>(0);

  // Handle tip completion with useCallback for better performance
  const markTipAsCompleted = useCallback(() => {
    if(tipCompleted) return; // Prevent double completion

    setTipCompleted(true);
    setStreak(prevStreak => prevStreak + 1);

    const timer = setTimeout(() => {
      setTipCompleted(false);

      const nextTipIndex = (tipsData.findIndex(tip => tip.id === currentTip.id) + 1) % tipsData.length;
      setCurrentTip(tipsData[nextTipIndex]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [tipCompleted]);

  const handleSubmitUserTip = useCallback((): void => {
    if(!userInput.trim()) return;

    console.log(`User submitted tip: ${userInput}`);
    // Here you would typically send this to your backend
    setUserInput("");
    
    // Rotate to next community insight for demo purposes
    const nextInsightIndex = (communityInsights.findIndex(insight => insight.id === currentInsight.id) + 1) % communityInsights.length;
    setCurrentInsight(communityInsights[nextInsightIndex]);
    
  },[userInput]);

  const handleshareTip = ():void => {
    console.log(`Share tip : ${currentTip.tip}`);
  }

  const handleUserInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-8">
      <header className="bg-white shadow-sm rounded-xl">
        <div className="container mx-auto p-2 lg:py-3 lg:px-3 flex items-center space-x-1 lg:space-x-4">
          <div>
            <Button 
              className="rounded-xl lg:p-1 hover:bg-gray-200 transition-colors" 
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          <div className="">
            <h1 className="font-semibold text-xl lg:text-xl">Your Daily Eco Tip</h1>
            <p className="text-gray-600 text-xs lg:text-lg">Small actions, big impact. Get personalized tips to live more sustainably.</p>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="p-3 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg p-2 lg:p-3 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-2">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">Hey Friend, ready to make a greener choice today?</h1>
              <p className="text-sm opacity-90">Small changes, big impact! Here's a quick tip to help you reduce your footprint.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* main section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Personalized Eco Tip for Today</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">  
          {/* left column */}
          <div className="lg:col-span-2 space-y-4">

            {/* Daily tips */}
            <DailyTipCard
              tip={currentTip.tip}
              icon={currentTip.icon}
              impact={currentTip.impact}
              tipCompleted={tipCompleted}
              onMarkDone={markTipAsCompleted}
              onShare={handleshareTip}
            />

            {/* Community */}
            <CommunityInsights 
              id={currentInsight.id}
              user={currentInsight.user}
              tip={currentInsight.tip}
              date={currentInsight.date}
              userInput={userInput}
              onUserInputChange={handleUserInputChange}
              onSubmit={handleSubmitUserTip}
            />

          </div>

          
          {/* Right column */}
          <div className="lg:col-span-1 ">
            <Progress streak={streak}/>     
          </div>
        </div>

        {/* Additional Resources / render Eco news and link*/}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-5">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <BookOpen className="w-5 h-5 mr-2" /> Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ecoNews.map((news, index) => (
                <a 
                  key={index} 
                  href={news.link} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50
                  transition-colors"
                  target="_blank"
                >
                  <h4 className="font-medium text-gray-800">{news.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{news.text}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DailyTips