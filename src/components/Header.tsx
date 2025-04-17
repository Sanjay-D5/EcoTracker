import { LogOut } from 'lucide-react'
import Button from './Button'
import { useNavigate } from 'react-router-dom';
import { logout } from '@/appwrite/actions/authServices';

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/sign-in");
  }

  return (
    <header className='hidden items-center justify-end p-5 sm:flex sm:py-2 '>
      <Button className='bg-gray-600 p-3 rounded-full cursor-pointer' onClick={handleSignOut}>
       <LogOut className='text-red-400 hover:text-white' />
      </Button>
    </header>
  )
}

export default Header