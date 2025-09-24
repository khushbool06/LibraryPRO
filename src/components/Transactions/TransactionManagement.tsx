import React, { useState } from 'react';
import { Book, Member, BorrowRecord } from '../../types/library';
import { Search, ArrowRight, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import BorrowForm from './BorrowForm';
import ReturnForm from './ReturnForm';
import TransactionHistory from './TransactionHistory';

interface TransactionManagementProps {
  books: Book[];
  members: Member[];
  borrowRecords: BorrowRecord[];
  onBorrowBook: (bookId: string, memberId: string) => boolean;
  onReturnBook: (recordId: string) => boolean;
  getOverdueRecords: () => any[];
}

const TransactionManagement: React.FC<TransactionManagementProps> = ({
  books,
  members,
  borrowRecords,
  onBorrowBook,
  onReturnBook,
  getOverdueRecords
}) => {
  const [activeTab, setActiveTab] = useState<'borrow' | 'return' | 'history'>('borrow');
  const overdueRecords = getOverdueRecords();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Transaction Management</h1>
        <p className="text-amber-600">Manage book borrowing and returning operations</p>
      </div>

      {/* Overdue Alert */}
      {overdueRecords.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-semibold">Overdue Books Alert</h3>
              <p className="text-red-700 text-sm">
                {overdueRecords.length} book(s) are overdue. Please follow up with members.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2">
        {[
          { id: 'borrow', label: 'Borrow Book', icon: ArrowRight },
          { id: 'return', label: 'Return Book', icon: ArrowLeft },
          { id: 'history', label: 'Transaction History', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-amber-200 text-amber-900 shadow-md'
                  : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
        {activeTab === 'borrow' && (
          <BorrowForm
            books={books}
            members={members}
            onBorrowBook={onBorrowBook}
          />
        )}
        
        {activeTab === 'return' && (
          <ReturnForm
            borrowRecords={borrowRecords}
            books={books}
            members={members}
            onReturnBook={onReturnBook}
          />
        )}
        
        {activeTab === 'history' && (
          <TransactionHistory
            borrowRecords={borrowRecords}
            books={books}
            members={members}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionManagement;