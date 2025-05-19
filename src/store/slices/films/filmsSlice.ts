import { fetchFilms } from '../../../api/filmsApi';
import { Film } from '@/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';


interface FilterState {
  title: string;
  includeSynopsis: boolean;
  
}

interface FilmsState {
  films: Film[];
  watchedIds: string[];
  favoriteIds: string[];
  filter: FilterState;
  sortOption: string;
  loading: boolean;
  error: string | null;
  loadingMore: boolean;
  showOnlyWatched: boolean;
  showOnlyFavorites: boolean;
  showOnlyRated: boolean;
  minStars: number; 
  fetchAllFilms: boolean;
}

const loadFromStorage = (key: string, fallback: any) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const initialState: FilmsState = {
  films: [],
  watchedIds: loadFromStorage('watchedIds', []),
  favoriteIds: loadFromStorage('favoriteIds', []),
  filter: {
    title: '',
    includeSynopsis: false,
  },
  sortOption: 'title-asc',
  loading: false,
  error: null,
  showOnlyWatched: false,
  showOnlyFavorites: false,
  showOnlyRated: false,
  minStars: 1, 
  loadingMore: false,
  fetchAllFilms: false,
};


export const fetchAllFilms = createAsyncThunk(
  'films/fetchFilms',
  async ({ limit }: { limit: number;  }) => {
    return await fetchFilms({ limit });
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterState>) {
      state.filter = action.payload;
    },
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
    toggleWatched(state, action: PayloadAction<string>) {
      const id = action.payload;
      const film = state.films.find(f => f.id === id);
      
      if (!film) return;
      
      if (state.watchedIds.includes(id)) {
        state.watchedIds = state.watchedIds.filter(watchedId => watchedId !== id);
      } else {
        state.watchedIds.push(id);
        // Registra nova atividade de watched
        const activity = {
          type: 'watched',
          filmId: id,
          filmTitle: film.title,
          timestamp: Date.now()
        };
        // Dispatch não pode ser chamado dentro de um reducer
        // Vamos resolver isso com um middleware ou thunk
      }
      localStorage.setItem('watchedIds', JSON.stringify(state.watchedIds));
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter(favoriteId => favoriteId !== id);
      } else {
        state.favoriteIds.push(id);
      }
      localStorage.setItem('favoriteIds', JSON.stringify(state.favoriteIds));
    },
    setShowOnlyWatched(state, action) {
      state.showOnlyWatched = action.payload;
    },
    setShowOnlyFavorites(state, action) {
      state.showOnlyFavorites = action.payload;
    },
    setShowOnlyRated(state, action) {
      state.showOnlyRated = action.payload;
    },
    setMinStars(state, action: PayloadAction<number>) {
      state.minStars = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        if (state.loadingMore) {
          state.films = [...state.films, ...action.payload];
        } else {
          state.films = action.payload;
        }
        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchAllFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar filmes';
      });
  }
});

export const {
  setFilter, setSortOption, toggleWatched, toggleFavorite,
  setShowOnlyWatched, setShowOnlyFavorites, setShowOnlyRated, setMinStars
} = filmsSlice.actions;
export default filmsSlice.reducer;