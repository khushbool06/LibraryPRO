import { useState, useEffect } from 'react';
import { Book, Member, BorrowRecord, LibraryStats } from '../types/library';
import { mockBooks, mockMembers, mockBorrowRecords } from '../data/mockData';

export const useLibrary = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(mockBorrowRecords);
  const [stats, setStats] = useState<LibraryStats>({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
    totalMembers: 0,
    availableBooks: 0
  });

  useEffect(() => {
    const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.copiesAvailable, 0);
    const borrowedBooks = totalBooks - availableBooks;
    const overdueBooks = borrowRecords.filter(record => record.status === 'overdue').length;

    setStats({
      totalBooks,
      borrowedBooks,
      overdueBooks,
      totalMembers: members.length,
      availableBooks
    });
  }, [books, members, borrowRecords]);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(prev => prev.map(book => book.id === id ? { ...book, ...updatedBook } : book));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, updatedMember: Partial<Member>) => {
    setMembers(prev => prev.map(member => member.id === id ? { ...member, ...updatedMember } : member));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const borrowBook = (bookId: string, memberId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.copiesAvailable === 0) return false;

    const borrowDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newBorrowRecord: BorrowRecord = {
      id: Date.now().toString(),
      bookId,
      memberId,
      borrowDate,
      dueDate,
      lateFee: 0,
      status: 'borrowed'
    };

    setBorrowRecords(prev => [...prev, newBorrowRecord]);
    updateBook(bookId, { copiesAvailable: book.copiesAvailable - 1 });
    return true;
  };

  const returnBook = (recordId: string) => {
    const record = borrowRecords.find(r => r.id === recordId);
    if (!record) return false;

    const returnDate = new Date().toISOString().split('T')[0];
    const isLate = new Date(returnDate) > new Date(record.dueDate);
    const lateFee = isLate ? 5.00 : 0;

    setBorrowRecords(prev =>
      prev.map(r =>
        r.id === recordId
          ? { ...r, returnDate, lateFee, status: 'returned' as const }
          : r
      )
    );

    const book = books.find(b => b.id === record.bookId);
    if (book) {
      updateBook(record.bookId, { copiesAvailable: book.copiesAvailable + 1 });
    }

    return true;
  };

  const getMemberBorrowHistory = (memberId: string) => {
    return borrowRecords
      .filter(record => record.memberId === memberId)
      .map(record => ({
        ...record,
        book: books.find(book => book.id === record.bookId),
        member: members.find(member => member.id === record.memberId)
      }));
  };

  const getOverdueRecords = () => {
    return borrowRecords
      .filter(record => record.status === 'borrowed' && new Date() > new Date(record.dueDate))
      .map(record => ({
        ...record,
        book: books.find(book => book.id === record.bookId),
        member: members.find(member => member.id === record.memberId)
      }));
  };

  return {
    books,
    members,
    borrowRecords,
    stats,
    addBook,
    updateBook,
    deleteBook,
    addMember,
    updateMember,
    deleteMember,
    borrowBook,
    returnBook,
    getMemberBorrowHistory,
    getOverdueRecords
  };
};