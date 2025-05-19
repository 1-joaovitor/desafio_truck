import { RootState } from "@/store/store";
import { Film } from "@/types";


export const selectAllFilms = (state: RootState): Film[] => state.films.films;

export const selectFilmById = (state: RootState, filmId: string) =>
  state.films.films.find(film => film.id === filmId);

export const selectWatchedFilms = (state: RootState): Film[] =>
  state.films.films.filter((film: Film) => state.films.watchedIds.includes(film.id));

export const selectFavoriteFilms = (state: RootState): Film[] =>
  state.films.films.filter((film: Film) => state.films.favoriteIds.includes(film.id));

export const selectFilmsWithNotes = (state: RootState) =>
  state.films.films.filter(film => film.notes && film.notes.length > 0);

export const selectFilmsByTitle = (state: RootState, title: string) =>
  state.films.films.filter(film => film.title.toLowerCase().includes(title.toLowerCase()));

export const selectFilmsBySynopsis = (state: RootState, synopsis: string) =>
  state.films.films.filter(film => film.description.toLowerCase().includes(synopsis.toLowerCase()));

export const selectSortedFilms = (state: RootState, sortBy: string, order: 'asc' | 'desc') => {
  const films = [...state.films.films];
  const sortedFilms = films.sort((a, b) => {
    if (sortBy === 'title') {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === 'duration') {
      return order === 'asc' ? Number(a.running_time) - Number(b.running_time) : Number(b.running_time) - Number(a.running_time);
    } else if (sortBy === 'personalRating') {
      return order === 'asc' ? (a.personalRating || 0) - (b.personalRating || 0) : (b.personalRating || 0) - (a.personalRating || 0);
    } else if (sortBy === 'rt_score') {
      return order === 'asc' ? parseInt(a.rt_score) - parseInt(b.rt_score) : parseInt(b.rt_score) - parseInt(a.rt_score);
    }
    return 0;
  });
  return sortedFilms;
};