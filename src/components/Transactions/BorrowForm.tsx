import React, { useState } from 'react';
import { Book, Member } from '../../types/library';
import { Search, User, BookOpen, Calendar } from 'lucide-react';

interface BorrowFormProps {
  books: Book[];
  members: Member[];
  onBorrowBook: (bookId: string, memberId: string) => boolean;
}

const BorrowForm: React.FC<BorrowFormProps> = ({ books, members, onBorrowBook }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');

  const availableBooks = books.filter(book => book.copiesAvailable > 0);
  const filteredBooks = availableBooks.filter(book =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const handleBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook && selectedMember) {
      const success = onBorrowBook(selectedBook, selectedMember);
      if (success) {
        setSelectedBook('');
        setSelectedMember('');
        setBookSearch('');
        setMemberSearch('');
        alert('Book borrowed successfully!');
      } else {
        alert('Failed to borrow book. Please try again.');
      }
    }
  };

  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-amber-900 mb-2">Borrow a Book</h3>
        <p className="text-amber-600">Select a book and member to create a new borrowing record</p>
      </div>

      <form onSubmit={handleBorrow} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Book Selection */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Select Book *
            </label>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                />
              </div>
              <select
                required
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              >
                <option value="">Choose a book...</option>
                {filteredBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} ({book.copiesAvailable} available)
                  </option>
                ))}
              </select>
            </div>
            {selectedBook && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                {(() => {
                  const book = books.find(b => b.id === selectedBook);
                  return book && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${book.coverColor} rounded-lg flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">{book.title}</h4>
                        <p className="text-amber-700 text-sm">by {book.author}</p>
                        <p className="text-amber-600 text-xs">ISBN: {book.isbn}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Member Selection */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Select Member *
            </label>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                />
              </div>
              <select
                required
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              >
                <option value="">Choose a member...</option>
                {filteredMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.membershipType}) - {member.email}
                  </option>
                ))}
              </select>
            </div>
            {selectedMember && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                {(() => {
                  const member = members.find(m => m.id === selectedMember);
                  return member && (
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">{member.name}</h4>
                        <p className="text-amber-700 text-sm">{member.email}</p>
                        <p className="text-amber-600 text-xs capitalize">{member.membershipType}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Borrow Details */}
        {selectedBook && selectedMember && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-900">Borrowing Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-amber-600">Borrow Date:</span>
                <p className="font-medium text-amber-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-amber-600">Due Date:</span>
                <p className="font-medium text-amber-900">{dueDate}</p>
              </div>
              <div>
                <span className="text-amber-600">Loan Period:</span>
                <p className="font-medium text-amber-900">14 days</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedBook || !selectedMember}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Borrow Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm;