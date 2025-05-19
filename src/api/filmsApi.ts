import axios from 'axios';
import { Film } from '../types';

const API_URL = process.env.REACT_APP_API_URL || '';

export const fetchFilms = async ({
  limit,
  
}: { limit: number }): Promise<Film[]> => {
  const { data } = await axios.get<Film[]>(API_URL, {
    params: { limit },
  });
  const detailedFilms = await Promise.all(
    data.map(async (film) => {
      const detail = await axios.get<Film>(film.url);
      return { ...film, ...detail.data };
    })
  );
  return detailedFilms;
};