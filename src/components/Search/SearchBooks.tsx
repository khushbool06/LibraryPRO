import React, { useState } from 'react';
import { Book } from '../../types/library';
import { Search, BookOpen, Filter } from 'lucide-react';
import { categories } from '../../data/mockData';
import BookCard from '../Books/BookCard';

interface SearchBooksProps {
  books: Book[];
  onUpdateBook: (id: string, book: Partial<Book>) => void;
  onDeleteBook: (id: string) => void;
}

const SearchBooks: React.FC<SearchBooksProps> = ({ books, onUpdateBook, onDeleteBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const filteredAndSortedBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.isbn.includes(searchTerm) ||
                           book.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      
      const matchesAvailability = availabilityFilter === 'all' ||
                                  (availabilityFilter === 'available' && book.copiesAvailable > 0) ||
                                  (availabilityFilter === 'unavailable' && book.copiesAvailable === 0);
      
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'availability':
          return b.copiesAvailable - a.copiesAvailable;
        default:
          return 0;
      }
    });

  const handleEditBook = (book: Book) => {
    // This would typically open an edit modal
    console.log('Edit book:', book);
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDeleteBook(bookId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Search Books</h1>
        <p className="text-amber-600">Find books in your library collection</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by title, author, ISBN, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-amber-900">Filters & Sorting</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-amber-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
              <option value="availability">Availability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-amber-900">
            Search Results ({filteredAndSortedBooks.length} books)
          </h3>
          {searchTerm && (
            <p className="text-amber-600">
              Showing results for "{searchTerm}"
            </p>
          )}
        </div>

        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={() => handleEditBook(book)}
                onDelete={() => handleDeleteBook(book.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">No books found</h3>
            <p className="text-amber-600 mb-4">
              {searchTerm 
                ? `No books match your search for "${searchTerm}"`
                : "No books match your current filters"
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setAvailabilityFilter('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;