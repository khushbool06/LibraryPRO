import React, { useState } from 'react';
import { Book, Member, BorrowRecord } from '../../types/library';
import { Search, BookOpen, User, Calendar, Check, Clock, AlertTriangle } from 'lucide-react';

interface TransactionHistoryProps {
  borrowRecords: BorrowRecord[];
  books: Book[];
  members: Member[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ borrowRecords, books, members }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecords = borrowRecords.filter(record => {
    const book = books.find(b => b.id === record.bookId);
    const member = members.find(m => m.id === record.memberId);
    const searchLower = search.toLowerCase();
    
    const matchesSearch = (book?.title.toLowerCase().includes(searchLower)) ||
                         (book?.author.toLowerCase().includes(searchLower)) ||
                         (member?.name.toLowerCase().includes(searchLower)) ||
                         (member?.email.toLowerCase().includes(searchLower));
                         
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'borrowed': return Clock;
      case 'returned': return Check;
      case 'overdue': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'borrowed': return 'bg-blue-100 text-blue-800';
      case 'returned': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-amber-900 mb-2">Transaction History</h3>
        <p className="text-amber-600">View all borrowing and returning transactions</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by book title, author, or member name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredRecords.sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime()).map((record) => {
          const book = books.find(b => b.id === record.bookId);
          const member = members.find(m => m.id === record.memberId);
          const StatusIcon = getStatusIcon(record.status);
          
          return (
            <div key={record.id} className="bg-white border border-amber-100 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Book Info */}
                  <div className={`w-16 h-20 ${book?.coverColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-amber-900">{book?.title}</h4>
                        <p className="text-amber-700">by {book?.author}</p>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="capitalize">{record.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-amber-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{member?.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Borrowed: {new Date(record.borrowDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(record.dueDate).toLocaleDateString()}</span>
                      </div>
                      {record.returnDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Returned: {new Date(record.returnDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-amber-600">
                        <span>Member: {member?.email}</span>
                        <span>•</span>
                        <span className="capitalize">{member?.membershipType}</span>
                      </div>
                      {record.lateFee > 0 && (
                        <div className="text-red-600 font-medium text-sm">
                          Late Fee: ${record.lateFee.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">No transactions found</h3>
          <p className="text-amber-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;