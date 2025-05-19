import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { RootState } from '@/store/store';
import { fetchAllFilms } from '../../store/slices/films/filmsSlice';
import FilmCard from '../FilmCard/FilmCard';
import Skeleton from '../base/Skeleton';

const MAX_ITEMS = 250;
const ITEMS_PER_PAGE = 6;

const FilmList: React.FC = () => {
  const films = useSelector((state: RootState) => state.films.films);
  const watchedIds = useSelector((state: RootState) => state.films.watchedIds);
  const favoriteIds = useSelector((state: RootState) => state.films.favoriteIds);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const showOnlyWatched = useSelector((state: RootState) => state.films.showOnlyWatched);
  const showOnlyFavorites = useSelector((state: RootState) => state.films.showOnlyFavorites);
  const showOnlyRated = useSelector((state: RootState) => state.films.showOnlyRated);
  const loading = useSelector((state: RootState) => state.films.loading);
  const filter = useSelector((state: RootState) => state.films.filter);
  const sortOption = useSelector((state: RootState) => state.films.sortOption);
  const minStars = useSelector((state: RootState) => state.films.minStars ?? 1);
  const dispatch = useDispatch<AppDispatch>();
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  let filteredFilms = films;
  if (showOnlyWatched) filteredFilms = filteredFilms.filter(f => watchedIds.includes(f.id));
  if (showOnlyFavorites) filteredFilms = filteredFilms.filter(f => favoriteIds.includes(f.id));
  if (showOnlyRated) {
    filteredFilms = filteredFilms.filter(f =>
      notes.some(n => n.filmId === f.id && n.rating >= minStars)
    );
  }
  filteredFilms = filteredFilms.filter((film) => {
    const titleMatch = film.title.toLowerCase().includes(filter.title.toLowerCase());
    const synopsisMatch = filter.includeSynopsis
      ? film.description.toLowerCase().includes(filter.title.toLowerCase())
      : false;
    return filter.title === '' || titleMatch || synopsisMatch;
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'duration-asc':
        return Number(a.running_time) - Number(b.running_time);
      case 'duration-desc':
        return Number(b.running_time) - Number(a.running_time);
      case 'rating-asc':
        return (Number(a.rt_score) || 0) - (Number(b.rt_score) || 0);
      case 'rating-desc':
        return (Number(b.rt_score) || 0) - (Number(a.rt_score) || 0);
      case 'rt_score-asc':
        return Number(a.rt_score) - Number(b.rt_score);
      case 'rt_score-desc':
        return Number(b.rt_score) - Number(a.rt_score);
      default:
        return 0;
    }
  });

  useEffect(() => {
    setLimit(ITEMS_PER_PAGE);
    setHasMore(true);
    dispatch(fetchAllFilms({ limit: ITEMS_PER_PAGE })).then((action: any) => {
      if (action.payload && action.payload.length < ITEMS_PER_PAGE) setHasMore(false);
    });
  }, [showOnlyWatched, showOnlyFavorites, showOnlyRated, filter, sortOption, minStars, dispatch]);

  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setLoadingMore(true);
        const newLimit = limit + ITEMS_PER_PAGE;
        dispatch(fetchAllFilms({ limit: newLimit })).then((action: any) => {
          setLimit(newLimit);
          if (action.payload && action.payload.length < newLimit) setHasMore(false);
          setLoadingMore(false);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limit, hasMore, loadingMore, dispatch]);

  if (loading && films.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height="200px" />
        ))}
      </div>
    );
  }

  if (sortedFilms.length === 0) {
    return <div className="text-center text-gray-500 mt-8">Nenhum filme encontrado.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedFilms.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            searchTerm={filter.includeSynopsis ? filter.title : ''}
            highlightSynopsis={filter.includeSynopsis}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6">
          {loadingMore ? (
            <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
          ) : (
            <span className="text-gray-400 text-sm">Role para carregar mais...</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilmList;