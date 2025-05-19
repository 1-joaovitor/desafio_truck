import { addNote, editNote, removeNote } from '../../store/slices/notes/notesSlice';
import { Note } from '@/types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BaseModal from '../base/BaseModal';
import BaseButton from '../base/BaseButton';
import { X, Save, Trash2 } from 'lucide-react';
import StarRating from '../StarRating/StarRating';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  filmId: string;
  existingNote?: Note;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, filmId, existingNote }) => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState(existingNote ? existingNote.text : '');
  const [rating, setRating] = useState(existingNote ? existingNote.rating : 1);

  React.useEffect(() => {
    setNoteText(existingNote ? existingNote.text : '');
    setRating(existingNote ? existingNote.rating : 1);
  }, [existingNote, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingNote) {
      dispatch(editNote({ filmId, text: noteText, rating }));
    } else {
      dispatch(addNote({ filmId, text: noteText, rating }));
    }
    onClose();
  };

  const handleRemove = () => {
    dispatch(removeNote(filmId));
    onClose();
  };

  return (
    <BaseModal open={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {existingNote ? 'Editar Avaliação' : 'Adicionar Avaliação'}
          </h2>
          <BaseButton 
            onClick={onClose} 
            variant="ghost" 
            size="sm"
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"
            aria-label="Fechar"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </BaseButton>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="note-text" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Comentário
            </label>
            <textarea
              id="note-text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Escreva seu comentário sobre o filme..."
              required
              className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                        text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                        focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                        focus:border-transparent outline-none resize-none transition"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Avaliação:
            </label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-end">
            {existingNote && (
              <BaseButton
                type="button"
                variant="danger"
                onClick={handleRemove}
                className="flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Remover
              </BaseButton>
            )}
            
            <BaseButton 
              type="submit" 
              variant="primary"
              className="flex items-center"
            >
              <Save size={16} className="mr-1" />
              {existingNote ? 'Atualizar' : 'Adicionar'}
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default NoteModal;