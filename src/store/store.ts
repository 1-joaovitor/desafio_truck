import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './slices/films/filmsSlice';
import notesReducer from './slices/notes/notesSlice';

const store = configureStore({
  reducer: {
    films: filmsReducer,
    notes: notesReducer,

  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;