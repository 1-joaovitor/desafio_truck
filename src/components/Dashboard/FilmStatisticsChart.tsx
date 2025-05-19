import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PieChart, BarChart } from 'lucide-react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';


ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface FilmStatisticsChartProps {
  variant: 'distribution' | 'ratings';
  className?: string;
}

const FilmStatisticsChart: React.FC<FilmStatisticsChartProps> = ({ 
  variant, 
  className = '' 
}) => {
  const films = useSelector((state: RootState) => state.films.films);
  const watchedIds = useSelector((state: RootState) => state.films.watchedIds);
  const favoriteIds = useSelector((state: RootState) => state.films.favoriteIds);
  const notes = useSelector((state: RootState) => state.notes.notes);


  const pieChartData = useMemo(() => {
    const watchedOnly = watchedIds.filter(id => !favoriteIds.includes(id)).length;
    const favoriteOnly = favoriteIds.filter(id => !watchedIds.includes(id)).length;
    const both = watchedIds.filter(id => favoriteIds.includes(id)).length;
    const unrated = films.length - (watchedOnly + favoriteOnly + both);

    return {
      labels: ['Assistidos', 'Favoritos', 'Assistidos e Favoritos', 'Sem interação'],
      datasets: [
        {
          data: [watchedOnly, favoriteOnly, both, unrated],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)', 
            'rgba(255, 99, 132, 0.7)', 
            'rgba(153, 102, 255, 0.7)',
            'rgba(201, 203, 207, 0.5)', 
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [watchedIds, favoriteIds, films.length]);

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
    maintainAspectRatio: false,
  };


  const barChartData = useMemo(() => {
   
    const ratingCounts = [0, 0, 0, 0, 0];
    
    notes.forEach(note => {
      if (note.rating >= 1 && note.rating <= 5) {
        ratingCounts[note.rating - 1]++;
      }
    });

    return {
      labels: ['1 Estrela', '2 Estrelas', '3 Estrelas', '4 Estrelas', '5 Estrelas'],
      datasets: [
        {
          label: 'Número de Avaliações',
          data: ratingCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',   
            'rgba(255, 159, 64, 0.7)',  
            'rgba(255, 205, 86, 0.7)',   
            'rgba(75, 192, 192, 0.7)',   
            'rgba(54, 162, 235, 0.7)',   
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        }
      ]
    };
  }, [notes]);

  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribuição de Avaliações por Estrelas',
        color: '#4B5563',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    maintainAspectRatio: false,
  };

  if (variant === 'distribution') {
    return (
      <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 ${className}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <PieChart className="h-5 w-5 text-indigo-500 mr-2" />
          Distribuição de Filmes por Status
        </h2>
        <div className="h-64">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <BarChart className="h-5 w-5 text-indigo-500 mr-2" />
        Avaliações por Estrelas
      </h2>
      <div className="h-64">
        <Bar options={barChartOptions} data={barChartData} />
      </div>
    </div>
  );
};

export default FilmStatisticsChart;