import React from 'react';
import Header from './components/Header';
import TimeEntriesContainer from './components/TimeEntriesContainer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header title="Redmine Time Tracker" />

      <main className="container mx-auto p-6">
        <TimeEntriesContainer />
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Redmine Time Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
