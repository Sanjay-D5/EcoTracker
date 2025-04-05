import { ArrowLeft, Leaf, Search } from "lucide-react"
import Button from "../components/Button"
import { ChangeEvent, useState } from "react"
import CategoryFilter from "../components/Challenges/CategoryFilter"
import SortOptions from "../components/Challenges/SortOptions"
import { challenges as allChallenges, userChallenges as initialUserChallenges } from "../constants"
import ChallengeCard from "../components/Challenges/ChallengeCard"
import ProgressTracker from "../components/Challenges/ProgressTracker"

export interface Challenges {
  id: string,
  name: string,
  description: string,
  category: string,
  impactScore: number,
  duration: number,
  participants: number,
  isNew: boolean,
  image: string
}
export interface UserChallenge {
  challengeId: string;
  progress: number;
  startDate: string;
  dailyLogs: DailyLog[];
  completed: boolean;
}
export interface DailyLog {
  date: string;
  completed: boolean;
  note: string;
}
interface Filters{
  category: string,
  sort: string,
  search: string,
}

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'progress'>('challenges');
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    sort: 'popular',
    search: ''
  })
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>(initialUserChallenges);

  const filteredChallenges = allChallenges.filter(challenge => {
    return ((filters.category === 'all' || challenge.category === filters.category) && (filters.search === '' || challenge.name.toLowerCase().includes(filters.search.toLowerCase()) || challenge.description.toLowerCase().includes(filters.search.toLowerCase())));
  }).sort((a, b) => {
    if(filters.sort === 'popular') return b.participants - a.participants;
    if(filters.sort === 'new') return b.isNew ? 1 : -1;
    if(filters.sort === 'duration-asc') return a.duration - b.duration;
    if(filters.sort === 'duration-desc') return b.duration - a.duration;
    return 0;
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFilter('search', e.target.value);
  }

  const joinChallenge = (challengeId: string): void => {
    // Check if user is already participating in this challenge
    if(userChallenges.some(uc => uc.challengeId === challengeId)){
      return; // User is already participating
    }
    const newUserChallenge: UserChallenge = {
      challengeId,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      dailyLogs: [],
      completed: false
    };
    
    setUserChallenges(prev => [...prev, newUserChallenge]);
  };

  const logProgress = (challengeId: string, completed: boolean, note: string): void => {
    const today = new Date().toISOString().split('T')[0];
    
    setUserChallenges(userChallenges.map(uc => {
      if (uc.challengeId === challengeId) {
        //Check if already logged today
        if(uc.dailyLogs.some(log => log.date === today)){
          return uc; // Skip if already logged today
        }

        // Create new log entry
        const newLog: DailyLog = { date: today, completed, note };
        
        // Calculate new progress
        const challenge = allChallenges.find(c => c.id === challengeId);
        const totalDays = challenge?.duration || 1;
        const completedDays = [...uc.dailyLogs, newLog].filter(log => log.completed).length;
        const newProgress = Math.min(Math.round((completedDays / totalDays) * 100), 100);
        
        return {
          ...uc,
          dailyLogs: [...uc.dailyLogs, newLog],
          progress: newProgress,
          completed: newProgress === 100
        };
      }
      return uc;
    }));
  };

  
  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({...prev, [key]: value}));
  }

  // Split user challenges by completion status
  const activeUserChallenges = userChallenges.filter(uc => !uc.completed);
  const completedUserChallenges = userChallenges.filter(uc => uc.completed);

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
            <h1 className="font-semibold text-xl lg:text-xl">Challenges & Rewards</h1>
            <p className="text-gray-600 text-xs lg:text-lg">Take on eco-challenges, track progress, and earn rewards!</p>
          </div>
        </div>
      </header>

      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <div className="flex rounded-sm shadow-sm bg-white">
          {['challenges', 'progress'].map(tab => (
            <Button 
              key={tab}
              onClick={() => setActiveTab(tab as 'challenges' | 'progress')}
              className={`flex-1 py-3 text-center font-medium ${activeTab === tab ? 'text-emerald-400 border-b-2 rounded-none border-emerald-600' : 'text-gray-500'}`} 
            >
              {tab.charAt(0).toLowerCase() + tab.slice(1)}
            </Button>
          ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="block space-y-4"> 
            <h1 className="flex items-center font-semibold text-xl md:text-2xl gap-2">
              <Leaf className="h-7 w-7 text-emerald-500"/>
              {`Eco ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </h1>

            <div className="relative">
              <input 
                type="search" 
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search Challenges..."
                className="pl-10 pr-4 p-2 w-full rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute top-3 left-3 text-gray-400" size={18}/>
            </div>

            <div className="flex flex-wrap gap-4">
              <CategoryFilter 
                selectedCategory={filters.category}
                onSelectedCategory={(value) => updateFilter('category' , value)}
              />
              <SortOptions 
                selectedSort={filters.sort}
                onSelectedSort={(value) => updateFilter('sort', value)}
              />
            </div>
          </div>

          {/* Cards */}
          {activeTab === 'challenges' && (
            <>
              {/* Active Challenegs */}
              {activeUserChallenges.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-4">
                    Your Active Challenges
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeUserChallenges.map(userChallenge => {
                      const challenge = allChallenges.find(c => c.id === userChallenge.challengeId);
                      if (!challenge) return null;
                      return (
                        <ChallengeCard
                          key={challenge.id}
                          challenge={challenge}
                          userChallenge={userChallenge}
                          onJoin={joinChallenge}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  {filters.search ? 'Search Results' : 'Discover Challenges'}
                </h3>
                {filteredChallenges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChallenges.map(challenge => {
                      const userChallenge = userChallenges.find(uc => uc.challengeId === challenge.id)
                      return (
                        <ChallengeCard
                          key={challenge.id}
                          challenge={challenge}
                          userChallenge={userChallenge}
                          onJoin={joinChallenge}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-600 mb-4">No challenges found matching your criteria.</p>
                    <Button
                      onClick={() => setFilters({category: 'all', search: '', sort: 'popular'})}
                      className="text-emerald-600 font-medium hover:text-emerald-700"
                    >
                      Clear all Filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Progress tab */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              {activeUserChallenges.length > 0 ? (
                activeUserChallenges.map(userChallenges => {
                  const challenge = allChallenges.find(c => c.id === userChallenges.challengeId);
                  if(!challenge) return null;
                  return (
                    <ProgressTracker 
                      key={userChallenges.challengeId}
                      userChallenge={userChallenges}
                      challenge={challenge}
                      onLogProgress={logProgress}
                    />
                  );
                })
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-gray-600 mb-4">You haven't joined any challenges yet.</p>
                  <Button
                    onClick={() => setActiveTab('challenges')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg"
                  >
                    Browse Challenges
                  </Button>
                </div>
              )}

              {/* Completed Challenges */}
              {completedUserChallenges.length > 0 && (
                <div>
                  <h3>Completed Challenges</h3>
                  <div>
                    {completedUserChallenges.map(userChallenge => {
                        const challenge = allChallenges.find(c => c.id === userChallenge.challengeId);
                        if (!challenge) return null;
                        return (
                          <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            userChallenge={userChallenge}
                            onJoin={joinChallenge}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Challenges