import React, { useState, useEffect } from 'react';
import { Book } from '../../types/library';
import { categories } from '../../data/mockData';

interface BookFormProps {
  initialData?: Book;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    totalCopies: 1,
    copiesAvailable: 1,
    coverColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
  });

  const coverColors = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-emerald-400 to-cyan-400',
    'bg-gradient-to-br from-rose-400 to-pink-400',
    'bg-gradient-to-br from-purple-400 to-indigo-400',
    'bg-gradient-to-br from-orange-400 to-red-400',
    'bg-gradient-to-br from-amber-400 to-orange-500',
    'bg-gradient-to-br from-teal-400 to-green-400',
    'bg-gradient-to-br from-slate-400 to-gray-500'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        isbn: initialData.isbn,
        category: initialData.category,
        totalCopies: initialData.totalCopies,
        copiesAvailable: initialData.copiesAvailable,
        coverColor: initialData.coverColor
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Book Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Author *
          </label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            ISBN *
          </label>
          <input
            type="text"
            required
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter ISBN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Category *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          >
            {categories.slice(1).map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Total Copies *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.totalCopies}
            onChange={(e) => {
              const total = parseInt(e.target.value);
              setFormData({ 
                ...formData, 
                totalCopies: total,
                copiesAvailable: Math.min(formData.copiesAvailable, total)
              });
            }}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Available Copies *
          </label>
          <input
            type="number"
            required
            min="0"
            max={formData.totalCopies}
            value={formData.copiesAvailable}
            onChange={(e) => setFormData({ ...formData, copiesAvailable: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Cover Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {coverColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, coverColor: color })}
              className={`h-12 rounded-xl ${color} ${
                formData.coverColor === color 
                  ? 'ring-4 ring-amber-300' 
                  : 'hover:scale-105'
              } transition-all duration-200`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-amber-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;