
import Sidebar from '../components/Sidebar'
import MobileNavigation from '../components/MobileNavigation'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { getCurrentUser } from '@/lib/actions/user.action';
import Header from '@/components/Header';

interface User {
    fullName: string;
    avatar: string;
    email: string;
    ownerId: number;
    accountId: number;
    $id: number;
}

const Home = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async () => {
        const user = await getCurrentUser();

        if(!user){
            navigate("/sign-in")
        } else {
            setCurrentUser(user);
        }
      } 

      fetchUser();
    }, [navigate]);
    
    
    if(!currentUser) return null;
  return (
    <div className='flex h-screen'>
        <Sidebar {...currentUser}/>
        <section className='flex flex-1 flex-col h-full'>
            <MobileNavigation {...currentUser}/>
            <Header />
            
            <div className='h-full flex-1 overflow-auto px-5 py-7 bg-emerald-50 sm:mr-7  sm:rounded-[30px] md:m-2 md:px-9 md:py-10 '>
              <Outlet />
            </div>
        </section>
    </div>
  )
}

export default Home