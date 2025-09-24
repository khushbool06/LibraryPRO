import React from 'react';
import { Book } from '../../types/library';
import { Edit, Trash2, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`h-48 ${book.coverColor} flex items-center justify-center relative`}>
        <BookOpen className="w-16 h-16 text-white opacity-80" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-lg">
            {book.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-amber-700 mb-2">by {book.author}</p>
        <p className="text-amber-600 text-sm mb-4">ISBN: {book.isbn}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-600">Available Copies</p>
            <p className="text-lg font-bold text-amber-900">
              {book.copiesAvailable}/{book.totalCopies}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            book.copiesAvailable > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {book.copiesAvailable > 0 ? 'Available' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;