import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Leaf, LogOut } from "lucide-react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Separator } from "./ui/separator";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { logout } from "@/appwrite/actions/authServices";

interface Props {
  fullName?: string; 
  avatar?: string; 
  email?: string;
}

const MobileNavigation = ({fullName, avatar = avatarPlaceholderUrl, email}: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout()
    navigate('/sign-in');
  } 
  return (
    <header className="flex items-center justify-between h-[60px] px-5 sm:hidden ">
      <NavLink to='/home'>
        <span className="flex items-center justify-center">
          <Leaf className="text-emerald-700 mr-1 h-5 w-5 lg:h-10 lg:w-10"/>
          <h1 className="font-semibold text-xk lg:text-3xl">Eco Tracker</h1>
        </span>
      </NavLink>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <img src="/assets/icons/menu.svg" alt="Search" width={30} height={30} className="bg-gray-100 p-1 rounded-full"/>
        </SheetTrigger>
        <SheetContent className="h-screen px-3">
          <SheetTitle>
            <div className="my-2 flex items-center gap-2 rounded-full sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
              <img src={avatar} alt="avatar" width={35} height={35} className="p-1.5 bg-gray-300 rounded-full" />
              <div className="sm:hidden lg:block">
                <p className="capitalize">{fullName}</p>
                <p className="text-sm text-gray-500 font-medium">{email}</p>
              </div>
            </div>
            <Separator className="mb-4"/>
          </SheetTitle>
          <nav className="text-[16px] leading-[24px] font-semibold flex-1 gap-1">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({url, name, icon}) => (
                <NavLink
                  key={name}
                  to={`/home${url}`}
                  className={({isActive}) => cn(
                    "flex text-emerald-500 gap-4 w-full justify-start items-center px-6 rounded-full h-[52px] hover:text-white hover:bg-emerald-400 shadow-drop-2", {"hover:bg-emerald-300 shadow-drop-2" : isActive}
                  )}
                  onClick={() => setOpen(() => !open)}
                >
                  <li className="flex items-center gap-4">
                    <img src={icon} alt={name} width={24} height={24} className="h-6 w-6"/>
                    <p>{name}</p>
                  </li>
                </NavLink>
              ))}
            </ul>
          </nav>

          <Separator  className="my-5 bg-light-200/20"/>
          <Button className="flex items-center justify-center space-x-2 mb-3 bg-gray-300 rounded-lg cursor-pointer" onClick={handleSignOut}>
            <LogOut />
            <p>Logout</p>
          </Button>
        </SheetContent>
      </Sheet>

    </header>
  )
}

export default MobileNavigation