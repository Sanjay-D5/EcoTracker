import { Award, Calendar, Clock, Users } from 'lucide-react';
import Button from '../Button';

interface Challenges {
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
  progress: number; // 0-100
  startDate: string;
  dailyLogs: DailyLog[];
  completed: boolean;
}

export interface DailyLog {
  date: string;
  completed: boolean;
  note: string;
}

interface ChallengeCardProps {
  challenge: Challenges;
  userChallenge?: UserChallenge;
  onJoin: (challengeId: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({challenge, userChallenge, onJoin}) => {
  const isParticipating = !!userChallenge;
  const isCompleted = userChallenge?.completed || false;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Environmental': return '🌍';
      case 'Waste': return '🚯';
      case 'Transport': return '🚲';
      case 'Food': return '🍽️';
      case 'Energy': return '⚡';
      default: return '🌱';
    }
  }
  return (
    <div key={challenge.id} className='bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1'>
      <div className='relative h-48 overflow-hidden'>
        <img src={challenge.image} alt={challenge.name} className='w-full h-full object-cover'/>
        {challenge.isNew && (
          <div className='bg-green-400 text-white font-semibold absolute top-2 right-2 px-2 py-1 rounded-lg'>
            NEW
          </div>
        )}
        <div className='absolute top-2 left-2 bg-white/90 px-2 py-1 font-semibold rounded-xl flex items-center'>
          <span className='mr-1'>{getCategoryIcon(challenge.category)}</span>
          <span>{challenge.category}</span>
        </div>
      </div>
      <div className='px-5 py-3 space-y-3'>
        <h1 className='font-bold text-xl'>{challenge.name}</h1>
        <p className='text-gray-500 font-medium text-sm'>{challenge.description}</p>
        <div className='flex flex-wrap flex-col gap-3 text-sm'>
          <div className='flex items-center'>
            <Clock className='h-4 w-4 text-gray-500 mr-1'/>
            <span>{challenge.duration} days</span>
          </div>
          <div className='flex items-center text-sm'>
            <Users className='h-4 w-4 text-gray-500 mr-1'/>
            <span>{challenge.participants.toLocaleString()} participants</span>
          </div>
        </div>
        <div className='flex text-sm'>
          <Award className='h-4 w-4 text-gray-500 mr-1'/>
          <span>{challenge.impactScore} impact points</span>
        </div>
      

        {isParticipating ? (
          <div className='space-y-2 mt-2'>
            <div className='flex justify-between items-center'>
              <span className='font-medium'>Your progress</span>
              <span>{userChallenge.progress}%</span>
            </div>
            <div className='bg-gray-300 rounded-xl h-2'>
              <div className='bg-emerald-500 rounded-xl h-2' style={{width: `${userChallenge.progress}%`}}/>
            </div>
            <div className='flex items-center mt-2 text-sm'>
              <Calendar className='text-gray-700 h-4 w-4 mr-2'/>
              <span>Started on {new Date(userChallenge.startDate).toLocaleDateString()}</span>
            </div>
            {isCompleted && (
              <div className='mt-2 bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg font-medium text-center'>
                Challenge Completed! 🎉
              </div>
            )}
          </div>
        ): (
          <Button 
            onClick={() => onJoin(challenge.id)}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Take the Challenge
          </Button>
        )}
      </div>
    </div>
  )
}

export default ChallengeCard