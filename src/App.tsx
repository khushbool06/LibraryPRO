import React, { useState } from 'react';
import { useLibrary } from './hooks/useLibrary';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import BookCatalogue from './components/Books/BookCatalogue';
import MemberManagement from './components/Members/MemberManagement';
import TransactionManagement from './components/Transactions/TransactionManagement';
import SearchBooks from './components/Search/SearchBooks';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const {
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
  } = useLibrary();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard stats={stats} onSectionChange={setActiveSection} />;
      case 'books':
        return (
          <BookCatalogue
            books={books}
            onAddBook={addBook}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
          />
        );
      case 'members':
        return (
          <MemberManagement
            members={members}
            onAddMember={addMember}
            onUpdateMember={updateMember}
            onDeleteMember={deleteMember}
            getBorrowHistory={getMemberBorrowHistory}
          />
        );
      case 'transactions':
        return (
          <TransactionManagement
            books={books}
            members={members}
            borrowRecords={borrowRecords}
            onBorrowBook={borrowBook}
            onReturnBook={returnBook}
            getOverdueRecords={getOverdueRecords}
          />
        );
      case 'search':
        return (
          <SearchBooks
            books={books}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
          />
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-amber-900 mb-2">Settings</h2>
              <p className="text-amber-600">Settings panel will be available in the next update.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard stats={stats} onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-cream-25 to-orange-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;