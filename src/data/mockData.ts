import { Book, Member, BorrowRecord } from '../types/library';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    category: 'Fiction',
    copiesAvailable: 3,
    totalCopies: 5,
    coverColor: 'bg-gradient-to-br from-emerald-400 to-cyan-400'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    category: 'Fiction',
    copiesAvailable: 2,
    totalCopies: 4,
    coverColor: 'bg-gradient-to-br from-rose-400 to-pink-400'
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    category: 'Romance',
    copiesAvailable: 4,
    totalCopies: 6,
    coverColor: 'bg-gradient-to-br from-purple-400 to-indigo-400'
  },
  {
    id: '4',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    category: 'Fiction',
    copiesAvailable: 1,
    totalCopies: 3,
    coverColor: 'bg-gradient-to-br from-orange-400 to-red-400'
  },
  {
    id: '5',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    isbn: '978-0-7475-3269-9',
    category: 'Fantasy',
    copiesAvailable: 0,
    totalCopies: 8,
    coverColor: 'bg-gradient-to-br from-blue-400 to-purple-500'
  },
  {
    id: '6',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-544-00341-5',
    category: 'Fantasy',
    copiesAvailable: 2,
    totalCopies: 5,
    coverColor: 'bg-gradient-to-br from-amber-400 to-orange-500'
  },
  {
    id: '7',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0-262-03384-8',
    category: 'Computer Science',
    copiesAvailable: 3,
    totalCopies: 4,
    coverColor: 'bg-gradient-to-br from-teal-400 to-green-400'
  },
  {
    id: '8',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0-13-235088-4',
    category: 'Computer Science',
    copiesAvailable: 2,
    totalCopies: 3,
    coverColor: 'bg-gradient-to-br from-slate-400 to-gray-500'
  }
];

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    joinDate: '2024-01-15',
    membershipType: 'student'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, City, State 12345',
    joinDate: '2024-02-20',
    membershipType: 'faculty'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine Rd, City, State 12345',
    joinDate: '2024-03-10',
    membershipType: 'public'
  }
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: '1',
    bookId: '5',
    memberId: '1',
    borrowDate: '2024-12-01',
    dueDate: '2024-12-15',
    lateFee: 0,
    status: 'borrowed'
  },
  {
    id: '2',
    bookId: '1',
    memberId: '2',
    borrowDate: '2024-11-20',
    dueDate: '2024-12-04',
    lateFee: 5.00,
    status: 'overdue'
  },
  {
    id: '3',
    bookId: '3',
    memberId: '3',
    borrowDate: '2024-11-25',
    dueDate: '2024-12-09',
    returnDate: '2024-12-06',
    lateFee: 0,
    status: 'returned'
  }
];

export const categories = [
  { name: 'All', icon: '📚', color: 'bg-amber-100 text-amber-800' },
  { name: 'Fiction', icon: '📖', color: 'bg-rose-100 text-rose-800' },
  { name: 'Fantasy', icon: '🏰', color: 'bg-purple-100 text-purple-800' },
  { name: 'Romance', icon: '💕', color: 'bg-pink-100 text-pink-800' },
  { name: 'Computer Science', icon: '💻', color: 'bg-teal-100 text-teal-800' },
  { name: 'Biography', icon: '👤', color: 'bg-indigo-100 text-indigo-800' },
  { name: 'History', icon: '⏳', color: 'bg-orange-100 text-orange-800' },
  { name: 'Science', icon: '🔬', color: 'bg-green-100 text-green-800' }
];