import React from 'react';
import { LibraryStats } from '../../types/library';
import { BookOpen, Users, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

interface DashboardProps {
  stats: LibraryStats;
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onSectionChange }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Library Dashboard</h1>
        <p className="text-amber-600">Overview of your library's current status and activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Books"
          value={stats.totalBooks}
          icon={BookOpen}
          color="from-blue-400 to-blue-600"
          textColor="text-blue-700"
        />
        <StatsCard
          title="Available Books"
          value={stats.availableBooks}
          icon={BookOpen}
          color="from-green-400 to-green-600"
          textColor="text-green-700"
        />
        <StatsCard
          title="Borrowed Books"
          value={stats.borrowedBooks}
          icon={Clock}
          color="from-amber-400 to-amber-600"
          textColor="text-amber-700"
        />
        <StatsCard
          title="Overdue Books"
          value={stats.overdueBooks}
          icon={AlertTriangle}
          color="from-red-400 to-red-600"
          textColor="text-red-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity onSectionChange={onSectionChange} />
        </div>
        <div>
          <QuickActions onSectionChange={onSectionChange} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;