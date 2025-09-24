import React from 'react';
import { BookOpen, User, Clock } from 'lucide-react';

interface RecentActivityProps {
  onSectionChange: (section: string) => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ onSectionChange }) => {
  const activities = [
    {
      id: 1,
      type: 'borrow',
      title: 'Harry Potter borrowed by Alice Johnson',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      type: 'return',
      title: 'Pride and Prejudice returned by Carol Davis',
      time: '4 hours ago',
      icon: BookOpen,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      type: 'member',
      title: 'New member registered: Bob Smith',
      time: '1 day ago',
      icon: User,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 4,
      type: 'overdue',
      title: 'The Great Gatsby is overdue (Bob Smith)',
      time: '2 days ago',
      icon: Clock,
      color: 'text-red-600 bg-red-50'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-amber-900">Recent Activity</h3>
        <button 
          onClick={() => onSectionChange('transactions')}
          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-amber-25 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-amber-900 font-medium text-sm">{activity.title}</p>
                <p className="text-amber-600 text-xs">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;