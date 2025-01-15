import Calendar from './components/Calendar';
import Header from './components/Header';
import React from 'react';
import data from './data/time_entries.json';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <Header title="Redmine Time Tracker" />

      {/* Main content */}
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Time Entries Calendar</h2>

        {/* Calendar Component */}
        <Calendar timeEntries={data.time_entries} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Redmine Time Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
