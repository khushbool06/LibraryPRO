import React, { useState } from 'react';
import { Book } from '../../types/library';
import { categories } from '../../data/mockData';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import BookCard from './BookCard';
import BookForm from './BookForm';
import Modal from '../UI/Modal';

interface BookCatalogueProps {
  books: Book[];
  onAddBook: (book: Omit<Book, 'id'>) => void;
  onUpdateBook: (id: string, book: Partial<Book>) => void;
  onDeleteBook: (id: string) => void;
}

const BookCatalogue: React.FC<BookCatalogueProps> = ({
  books,
  onAddBook,
  onUpdateBook,
  onDeleteBook
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      onUpdateBook(editingBook.id, bookData);
      setIsEditModalOpen(false);
      setEditingBook(null);
    }
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDeleteBook(bookId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Book Catalogue</h1>
          <p className="text-amber-600">Manage your library's book collection</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-amber-200 text-amber-900 shadow-md'
                  : 'bg-white border border-amber-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => handleEditBook(book)}
            onDelete={() => handleDeleteBook(book.id)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">No books found</h3>
          <p className="text-amber-600">Try adjusting your search criteria or add a new book.</p>
        </div>
      )}

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={(bookData) => {
            onAddBook(bookData);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBook(null);
        }}
        title="Edit Book"
      >
        {editingBook && (
          <BookForm
            initialData={editingBook}
            onSubmit={handleUpdateBook}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingBook(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default BookCatalogue;