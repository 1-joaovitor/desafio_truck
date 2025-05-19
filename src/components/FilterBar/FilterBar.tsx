import { RootState } from '@/store/store';
import {
  setFilter,
  setShowOnlyWatched,
  setShowOnlyFavorites,
  setShowOnlyRated,
  setMinStars,
} from '../../store/slices/films/filmsSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseInput from '../Base/BaseInput';
import { BookOpen, Eye, Heart, Star } from 'lucide-react';

interface FilterBarProps {
  children?: React.ReactNode;
}

const iconBtn =
  "relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-indigo-100 cursor-pointer group";

const tooltip =
  "absolute z-10 left-1/2 -translate-x-1/2 top-11 px-2 py-1 rounded bg-gray-900 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition";

const FilterBar: React.FC<FilterBarProps> = ({ children }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.films.filter);
  const showOnlyWatched = useSelector((state: RootState) => state.films.showOnlyWatched);
  const showOnlyFavorites = useSelector((state: RootState) => state.films.showOnlyFavorites);
  const showOnlyRated = useSelector((state: RootState) => state.films.showOnlyRated);
  const minStars = useSelector((state: RootState) => state.films.minStars);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ ...filter, title: e.target.value }));
  };

  const handleSynopsisToggle = () => {
    dispatch(setFilter({ ...filter, includeSynopsis: !filter.includeSynopsis }));
  };

  const handleStarFilter = (star: number) => {
    dispatch(setMinStars(star));
    dispatch(setShowOnlyRated(true));
  };

  return (
    <section className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-4 py-3 mb-8 flex flex-col gap-3">
      <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">


        <div className="relative flex-1">
          <BaseInput
            type="text"
            placeholder="Buscar por título ou sinopse..."
            value={filter.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-32"
          />
          <button
            type="button"
            onClick={handleSynopsisToggle}
            aria-label="Incluir sinopse"
            className={`absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1 justify-center h-8 px-3 rounded-lg transition-colors text-sm font-medium
      ${filter.includeSynopsis
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-400 hover:bg-indigo-50'}
    `}
            title="Incluir sinopse na busca"
          >
            <BookOpen size={18} />
            Incluir sinopse
          </button>
        </div>
        {children}
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-2">
        <button
          type="button"
          onClick={() => dispatch(setShowOnlyWatched(!showOnlyWatched))}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition font-medium text-sm ${showOnlyWatched
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-green-50'
            }`}
        >
          <Eye size={18} />
          Assistidos
        </button>
        <button
          type="button"
          onClick={() => dispatch(setShowOnlyFavorites(!showOnlyFavorites))}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition font-medium text-sm ${showOnlyFavorites
              ? 'bg-red-100 border-red-400 text-red-600'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-red-50'
            }`}
        >
          <Heart size={18} />
          Favoritos
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => dispatch(setShowOnlyRated(!showOnlyRated))}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition font-medium text-sm ${showOnlyRated
                ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-yellow-50'
              }`}
          >
            <Star size={18} />
            Nota
          </button>
          {showOnlyRated && (
            <div className="flex items-center ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarFilter(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={18}
                    className={
                      star <= minStars
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }
                    fill={star <= minStars ? '#facc15' : 'none'}
                  />
                </button>
              ))}
              <span className="ml-1 text-xs text-gray-600">mín.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;