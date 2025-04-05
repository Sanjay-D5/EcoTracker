import { Leaf } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "../constants";
import { cn } from "@/lib/utils";

interface Props{
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({fullName, avatar, email}: Props) => {
  return (

    <aside className="hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <NavLink to='/home'>
        <span className="flex items-center justify-center">
          <Leaf className="text-emerald-700 mr-1 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"/>
          <h1 className="font-semibold text-3xl hidden lg:block">Eco Tracker</h1>
        </span>
      </NavLink>

      <nav className="text-[16px] leading-[24px] font-semibold mt-9 flex-1 gap-2 text-emerald-700">
        <ul className="flex flex-1 flex-col gap-3">
          {navItems.map(({url, name, icon}) => (
            <NavLink 
              key={name}
              to={`/home${url}`}
              className={({isActive}) => cn("flex justify-center items-center text-emerald-500 gap-4 rounded-xl h-[52px] lg:w-full lg:justify-start lg:px-[30px]  lg:rounded-full hover:text-white hover:bg-emerald-500", {"bg-emerald-500 text-white" : isActive})} end
            >
              <li className="flex items-center gap-2">
                <img src={icon} alt={name} width={24} height={24} />
                <p className="hidden lg:block">{name}</p>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-emerald-200 p-1 lg:justify-start lg:p-2 ">
        <img src={avatar} alt="avatar" className="bg-white p-1 rounded-full h-10 w-10 text-emerald-800"/>
        <div className="hidden lg:block">
          <p className="font-semibold">{fullName}</p>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar