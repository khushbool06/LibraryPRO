export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copiesAvailable: number;
  totalCopies: number;
  coverColor: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  membershipType: 'student' | 'faculty' | 'public';
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  lateFee: number;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface LibraryStats {
  totalBooks: number;
  borrowedBooks: number;
  overdueBooks: number;
  totalMembers: number;
  availableBooks: number;
}