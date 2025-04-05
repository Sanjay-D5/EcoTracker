import { LogOut, Search } from 'lucide-react'

import Button from './Button'
import { signOutUser } from '@/lib/actions/user.action';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate("/sign-in");
  }

  return (
    <header className='hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10'>
      <div className='flex h-[52px] flex-1 items-center gap-3 rounded-full px-3 shadow-lg'>
        <Search />
        <input type="search" placeholder='search...' className='w-full border-none'/>
      </div>
      <Button className='bg-gray-300 p-3 rounded-full' onClick={handleSignOut}>
       <LogOut className='text-red-400' />
      </Button>
    </header>
  )
}

export default Header