import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { Header, MobileNavigation, Sidebar } from '@/components';
import { getCurrentUser } from '@/appwrite/actions/authServices';

interface User {
  fullName?: string;
  avatar?: string;
  email?: string;
  ownerId?: string;
  accountId?: string;
  $id?: string;
}

const Home = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const user = await getCurrentUser();
          if(!user) {
            navigate('/sign-in');
          } else {
            console.log("User data:", user);
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/sign-in");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }, [navigate]);
    
    // Show loading indicator
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      );
    }

    
  return (
    <div className='flex h-screen'>
        <Sidebar {...(currentUser || {})}/>
        <section className='flex flex-1 flex-col h-full'>
            <MobileNavigation {...(currentUser || {})}/>
            <Header />
            
            <div className='h-full flex-1 overflow-auto px-5 py-7 bg-emerald-50 sm:rounded-[20px]'>
              <Outlet />
            </div>
        </section>
    </div>
  )
}

export default Home