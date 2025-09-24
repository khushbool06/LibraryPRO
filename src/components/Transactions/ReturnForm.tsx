import React, { useState } from 'react';
import { Book, Member, BorrowRecord } from '../../types/library';
import { Search, BookOpen, User, Calendar, DollarSign } from 'lucide-react';

interface ReturnFormProps {
  borrowRecords: BorrowRecord[];
  books: Book[];
  members: Member[];
  onReturnBook: (recordId: string) => boolean;
}

const ReturnForm: React.FC<ReturnFormProps> = ({ borrowRecords, books, members, onReturnBook }) => {
  const [selectedRecord, setSelectedRecord] = useState('');
  const [search, setSearch] = useState('');

  const activeBorrows = borrowRecords.filter(record => record.status === 'borrowed');
  const filteredRecords = activeBorrows.filter(record => {
    const book = books.find(b => b.id === record.bookId);
    const member = members.find(m => m.id === record.memberId);
    const searchLower = search.toLowerCase();
    
    return (book?.title.toLowerCase().includes(searchLower)) ||
           (book?.author.toLowerCase().includes(searchLower)) ||
           (member?.name.toLowerCase().includes(searchLower)) ||
           (member?.email.toLowerCase().includes(searchLower));
  });

  const handleReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecord) {
      const success = onReturnBook(selectedRecord);
      if (success) {
        setSelectedRecord('');
        setSearch('');
        alert('Book returned successfully!');
      } else {
        alert('Failed to return book. Please try again.');
      }
    }
  };

  const getSelectedRecordDetails = () => {
    const record = borrowRecords.find(r => r.id === selectedRecord);
    if (!record) return null;

    const book = books.find(b => b.id === record.bookId);
    const member = members.find(m => m.id === record.memberId);
    const isOverdue = new Date() > new Date(record.dueDate);
    const daysOverdue = isOverdue ? Math.ceil((Date.now() - new Date(record.dueDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    const lateFee = isOverdue ? daysOverdue * 1.00 : 0;

    return { record, book, member, isOverdue, daysOverdue, lateFee };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-amber-900 mb-2">Return a Book</h3>
        <p className="text-amber-600">Select a borrowed book to process its return</p>
      </div>

      <form onSubmit={handleReturn} className="space-y-6">
        {/* Search and Select */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Search and Select Borrowed Book *
          </label>
          <div className="space-y-3">
            <div className="relative">
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
              required
              value={selectedRecord}
              onChange={(e) => setSelectedRecord(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            >
              <option value="">Choose a borrowed book...</option>
              {filteredRecords.map((record) => {
                const book = books.find(b => b.id === record.bookId);
                const member = members.find(m => m.id === record.memberId);
                const isOverdue = new Date() > new Date(record.dueDate);
                
                return (
                  <option key={record.id} value={record.id}>
                    {book?.title} by {book?.author} - {member?.name} 
                    {isOverdue ? ' (OVERDUE)' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Return Details */}
        {selectedRecord && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            {(() => {
              const details = getSelectedRecordDetails();
              if (!details) return null;

              const { record, book, member, isOverdue, daysOverdue, lateFee } = details;

              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Return Details</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Book Info */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-amber-900">Book Information</h5>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${book?.coverColor} rounded-lg flex items-center justify-center`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h6 className="font-semibold text-amber-900">{book?.title}</h6>
                          <p className="text-amber-700 text-sm">by {book?.author}</p>
                          <p className="text-amber-600 text-xs">ISBN: {book?.isbn}</p>
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-amber-900">Borrower Information</h5>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h6 className="font-semibold text-amber-900">{member?.name}</h6>
                          <p className="text-amber-700 text-sm">{member?.email}</p>
                          <p className="text-amber-600 text-xs capitalize">{member?.membershipType}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-blue-200">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-sm">Borrowed</span>
                      </div>
                      <p className="font-medium text-blue-900">
                        {new Date(record.borrowDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-sm">Due Date</span>
                      </div>
                      <p className="font-medium text-blue-900">
                        {new Date(record.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-sm">Return Date</span>
                      </div>
                      <p className="font-medium text-blue-900">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-sm">Late Fee</span>
                      </div>
                      <p className={`font-medium ${lateFee > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${lateFee.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {isOverdue && (
                    <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-red-600" />
                        <span className="text-red-800 font-medium">
                          This book is {daysOverdue} day(s) overdue
                        </span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        Late fee of $1.00 per day will be applied.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedRecord}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Process Return
          </button>
        </div>
      </form>

      {activeBorrows.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">No Books to Return</h3>
          <p className="text-amber-600">All borrowed books have been returned.</p>
        </div>
      )}
    </div>
  );
};

export default ReturnForm;