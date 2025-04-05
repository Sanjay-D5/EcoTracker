import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { Challenges, UserChallenge } from "../../pages/Challenges"
import Button from "../Button";
import { ChangeEvent, useState } from "react";

interface ProgressTrackerProps{
  userChallenge: UserChallenge;
  challenge: Challenges;
  onLogProgress: (challengeId: string, completed: boolean, note: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({userChallenge, challenge, onLogProgress }) => {
  const [noteText, setNoteText] = useState<string>("");
  const today = new Date().toISOString().split('T')[0];
  const hasLoggedToday = userChallenge.dailyLogs.some(log => log.date === today);
  
  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleLogProgress = (completed: boolean) => {
    onLogProgress(userChallenge.challengeId, completed, noteText);
    setNoteText(""); // Reset note after logging
  }

  const getMotivationalMessage = (progress: number) => {
    if (progress < 25) return "You've just started! Keep going! 🌱";
    if (progress < 50) return "Great start! You're making progress! 🌿";
    if (progress < 75) return "You're halfway there! Keep going! 🚀";
    if (progress < 100) return "Almost there! You can do it! 💪";
    return "Challenge completed! Amazing work! 🎉";
  };

  return (
    <div className="rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-3 bg-emerald-600">
        <h2 className="font-semibold text-white flex items-center">
          <Calendar className="h-4 w-4 mr-1"/>
          Your Progress: {challenge.name}
        </h2>
      </div>
      <div className="p-5 bg-white">
        <div>
          <div className="flex justify-between space-y-1">
            <span className="text-gray-600">Overall progress</span>
            <span>{userChallenge.progress}%</span>
          </div>
          <div className="h-2 bg-gray-300 rounded-xl">
            <div className="bg-emerald-500 h-2 rounded-xl" style={{width: `${userChallenge.progress}%`}}/>
          </div>
          <p className="text-emerald-600 font-medium mt-2">
            {getMotivationalMessage(userChallenge.progress)}
          </p>
        </div>
 
        {!hasLoggedToday && (
          <div className="bg-emerald-100 p-5 rounded-lg">
            <label className="font-medium block">Log your progress for today</label>
            <div className="p-2">
              <textarea 
                rows={2} 
                value={noteText}
                onChange={handleNoteChange}
                className="w-full outline outline-gray-400 rounded-lg p-2 text-sm" 
                placeholder="What did you do today for this challenge? (optional)"
              />
            </div>
            <div className="flex space-x-1">
              <Button
                onClick={() => handleLogProgress(true)}
                className="bg-emerald-600 flex-1 flex items-center justify-center text-white font-medium rounded-lg py-2 text-sm lg:text-base"
              >
                <CheckCircle className="h-4 w-4 mr-2"/>
                Completed
              </Button>
              <Button
                onClick={() => handleLogProgress(false)}
                className="bg-gray-300 flex-1 flex items-center justify-center text-black font-medium rounded-lg text-sm lg:text-base" 
              >
                <XCircle className="h-4 w-4 mr-2"/>
                Skipped
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Activity Log</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {userChallenge.dailyLogs.length > 0 ? (
              [...userChallenge.dailyLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((log, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <div className={`mt-0.5 mr-3 ${log.completed ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {log.completed ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(log.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          log.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.completed ? 'Completed' : 'Skipped'}
                        </span>
                      </div>
                      {log.note && <p className="text-sm text-gray-600">{log.note}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No activity logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;