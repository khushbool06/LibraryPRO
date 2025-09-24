import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  textColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, textColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-amber-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-amber-900">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <div className={`w-2 h-2 rounded-full ${textColor.replace('text-', 'bg-')} mr-2`}></div>
        <span className={textColor}>Active</span>
      </div>
    </div>
  );
};

export default StatsCard;