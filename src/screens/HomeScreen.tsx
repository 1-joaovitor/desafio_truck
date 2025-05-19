import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { fetchAllFilms } from '../store/slices/films/filmsSlice';
import FilterBar from '../components/FilterBar/FilterBar';
import FilmList from '../components/FilmList/FilmList';
import SortBar from '../components/SortBar/SortBar';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllFilms({ limit: 6 }));
  }, [dispatch]);

  return (
    <>
      <div className="py-10 mb-6 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg rounded-b-3xl relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-tight">
          Studio Ghibli Films
        </h1>
        <p className="text-center text-indigo-100 mt-2 text-md font-medium">
          Explore, filtre e organize os clássicos do Studio Ghibli
        </p>
      </div>
      
      <div className="container mx-auto px-4">
        <FilterBar>
          <SortBar />
        </FilterBar>
        <FilmList />
      </div>
    </>
  );
};

export default HomeScreen;