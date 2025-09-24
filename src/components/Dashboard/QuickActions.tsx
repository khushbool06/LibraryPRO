import React from 'react';
import { Plus, Search, ArrowLeftRight, Users } from 'lucide-react';

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onSectionChange }) => {
  const actions = [
    {
      id: 'add-book',
      title: 'Add New Book',
      description: 'Add a book to catalogue',
      icon: Plus,
      color: 'from-blue-400 to-blue-600',
      section: 'books'
    },
    {
      id: 'search',
      title: 'Search Books',
      description: 'Find books quickly',
      icon: Search,
      color: 'from-green-400 to-green-600',
      section: 'search'
    },
    {
      id: 'transactions',
      title: 'Borrow/Return',
      description: 'Manage transactions',
      icon: ArrowLeftRight,
      color: 'from-amber-400 to-amber-600',
      section: 'transactions'
    },
    {
      id: 'members',
      title: 'Add Member',
      description: 'Register new member',
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      section: 'members'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
      <h3 className="text-xl font-bold text-amber-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSectionChange(action.section)}
              className="flex items-center space-x-4 p-4 rounded-xl border border-amber-100 hover:shadow-lg transition-all duration-200 hover:bg-amber-25 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-amber-900">{action.title}</h4>
                <p className="text-amber-600 text-sm">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;