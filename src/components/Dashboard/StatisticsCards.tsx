import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Star, Eye, Heart, BarChart } from 'lucide-react';

const StatisticsCards: React.FC = () => {
  const watchedIds = useSelector((state: RootState) => state.films.watchedIds);
  const favoriteIds = useSelector((state: RootState) => state.films.favoriteIds);
  const notes = useSelector((state: RootState) => state.notes.notes);

  const averageRating = useMemo(() => {
    if (notes.length === 0) return 0;
    const sum = notes.reduce((acc, note) => acc + note.rating, 0);
    return (sum / notes.length).toFixed(1);
  }, [notes]);

  const stats = [
    {
      label: 'Filmes favoritos',
      value: favoriteIds.length,
      color: 'from-pink-500 to-rose-500',
      icon: <Heart className="h-5 w-5 text-pink-500" />
    },
    {
      label: 'Filmes assistidos',
      value: watchedIds.length,
      color: 'from-blue-500 to-cyan-500',
      icon: <Eye className="h-5 w-5 text-blue-500" />
    },
    {
      label: 'Avaliações',
      value: notes.length,
      color: 'from-yellow-500 to-amber-500',
      icon: <Star className="h-5 w-5 text-yellow-500" />
    },
    {
      label: 'Média de notas',
      value: averageRating,
      color: 'from-green-500 to-emerald-500',
      icon: <BarChart className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
          <div className="p-6">
            <div className="flex items-center mb-2">
              {stat.icon}
              <p className="text-gray-500 text-sm ml-2">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;