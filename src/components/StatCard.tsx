import { FC } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  highlight?: boolean;
}

export const StatCard: FC<StatCardProps> = ({ title, value, subtitle, highlight }) => (
  <div 
    className={`p-6 rounded-xl shadow-md ${
      highlight 
        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white" 
        : "bg-white border border-emerald-100"
    }`}
  >
    <h3 className={highlight ? "text-white" : "text-gray-700 font-semibold"}>{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {subtitle && (
      <p className={highlight ? "text-gray-200" : "text-gray-500 text-sm"}>
        {subtitle}
      </p>
    )}
  </div>
);