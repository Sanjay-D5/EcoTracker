import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface InfoCardProps {
  id: number;
  title: string;
  text: string;
  icon: string;
}

export const InfoCard: FC<InfoCardProps> = ({ id, title, text, icon }) => (
  <NavLink to={`/${title}`} key={id} className="rounded-xl hover:shadow-xl transition p-6 bg-white">
    <div className="flex items-center mb-3">
      <img src={icon} alt={title} className="w-6 h-6 text-emerald-300" />
      <h2 className="font-semibold ml-2">{title}</h2>
    </div>
    <p className="text-sm text-gray-600">{text}</p>
  </NavLink>
);