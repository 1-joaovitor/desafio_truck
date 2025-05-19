import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatisticsCards from '../components/Dashboard/StatisticsCards';
import FilmStatisticsChart from '../components/Dashboard/FilmStatisticsChart';

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 pb-12 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta, {user?.name}!</p>
        </div>
        <StatisticsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <FilmStatisticsChart variant="distribution" />
          <FilmStatisticsChart variant="ratings" />
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;