import { setSortOption } from '../../store/slices/films/filmsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import BaseSelect from '../base/BaseSelect';

interface SortBarProps {
  children?: React.ReactNode;
}

const SortBar: React.FC<SortBarProps> = ({ children }) => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.films.sortOption);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(event.target.value));
  };

  return (
    <div className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-2 shadow-sm">
      <label htmlFor="sort" className="text-indigo-700 font-semibold text-sm">Ordenar:</label>
      <BaseSelect
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
        className="px-3 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
      >
        <option value="title-asc">Título (A-Z)</option>
        <option value="title-desc">Título (Z-A)</option>
        <option value="duration-asc">Duração (Menor para Maior)</option>
        <option value="duration-desc">Duração (Maior para Menor)</option>
        <option value="rating-asc">Nota Pessoal (Menor para Maior)</option>
        <option value="rating-desc">Nota Pessoal (Maior para Menor)</option>
        <option value="rt_score-asc">RT Score (Menor para Maior)</option>
        <option value="rt_score-desc">RT Score (Maior para Menor)</option>
      </BaseSelect>
      {children}
    </div>
  );
};

export default SortBar;