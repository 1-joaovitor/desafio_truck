import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  filmId: string;
  text: string;
  rating: number; 
}

interface NotesState {
  notes: Note[];
}

const loadFromStorage = (key: string, fallback: any) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const initialState: NotesState = {
  notes: loadFromStorage('notes', []),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.filmId === action.payload.filmId);
      if (index !== -1) {
        state.notes[index] = action.payload;
        localStorage.setItem('notes', JSON.stringify(state.notes));
      }
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.filmId !== action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
  },
});

export const { addNote, editNote, removeNote } = notesSlice.actions;

export default notesSlice.reducer;