import { RootState } from "@/store/store";


export const selectNotes = (state: RootState) => state.notes.notes;

export const selectNoteByFilmId = (filmId: string) => (state: RootState) => 
  state.notes.notes.find(note => note.filmId === filmId); 

export const selectNotesWithRating = (state: RootState) => 
  state.notes.notes.filter(note => note.rating > 0); 

export const selectNotesCount = (state: RootState) => state.notes.notes.length;