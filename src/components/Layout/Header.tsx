import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-amber-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-amber-900">Good Morning, Librarian!</h2>
          <p className="text-amber-600">Today is {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-amber-900">Sarah Johnson</p>
              <p className="text-amber-600">Head Librarian</p>
            </div>
          </div>
          
          <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;