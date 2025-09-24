import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ArrowLeftRight, 
  Search,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'books', label: 'Book Catalogue', icon: BookOpen },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'transactions', label: 'Borrow & Return', icon: ArrowLeftRight },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-amber-50 min-h-screen border-r border-amber-200 shadow-lg">
      <div className="p-6 border-b border-amber-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-900">LibraryPro</h1>
            <p className="text-xs text-amber-600">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-amber-200 text-amber-900 shadow-md'
                      : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;