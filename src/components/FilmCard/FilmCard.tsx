import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '@/store/store';
import { Film, Note } from '@/types';
import { toggleFavorite, toggleWatched } from '../../store/slices/films/filmsSlice';
import { ButtonGroup, FilmImage, Info, Synopsis, Title } from './FilmCard.styles';
import BaseButton from '../base/BaseButton';
import BaseCard from '../base/BaseCard';
import { Eye, Star, Heart } from 'lucide-react';
import NoteModal from '../NoteModal/NoteModal';
import highlightText from '../../utils/highlightText';

interface FilmCardProps {
  film: Film;
  searchTerm?: string;
  highlightSynopsis?: boolean;
}

const FilmCard: React.FC<FilmCardProps> = ({
  film,
  searchTerm = '',
  highlightSynopsis = false,
}) => {
  const dispatch = useDispatch();
  const watched = useSelector((state: RootState) => state.films.watchedIds.includes(film.id));
  const favorite = useSelector((state: RootState) => state.films.favoriteIds.includes(film.id));
  const note = useSelector((state: RootState) =>
    state.notes.notes.find(n => n.filmId === film.id) as Note | undefined
  );
  const [expanded, setExpanded] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const handleWatchedToggle = () => {
    dispatch(toggleWatched(film.id));
    toast[watched ? 'info' : 'success'](
      watched ? 'Filme desmarcado como assistido!' : 'Filme marcado como assistido!'
    );
  };

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(film.id));
    toast[favorite ? 'info' : 'success'](
      favorite ? 'Filme removido dos favoritos!' : 'Filme adicionado aos favoritos!'
    );
  };

  return (
    <BaseCard className="relative group transition-all duration-200 flex flex-col h-full dark:bg-gray-800 dark:border-gray-700">
      
      <div className="absolute top-2 left-2 flex gap-1 z-10">
        {watched && (
          <span title="Assistido" className="bg-white dark:bg-gray-700 rounded-full p-1 shadow">
            <Eye size={18} className="text-green-500" />
          </span>
        )}
        {favorite && (
          <span title="Favorito" className="bg-white dark:bg-gray-700 rounded-full p-1 shadow">
            <Heart size={18} className="text-red-500 fill-red-500" />
          </span>
        )}
        {note && note.rating > 0 && (
          <span
            title={`Nota: ${note.rating}`}
            className="relative bg-white dark:bg-gray-700 rounded-full px-2 py-1 flex items-center shadow"
            style={{ minWidth: 28, minHeight: 28, justifyContent: 'center' }}
          >
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-800 dark:text-white pointer-events-none">
              {note.rating}
            </span>
          </span>
        )}
      </div>

      <div className="relative">
        {film.movie_banner && (
          <FilmImage src={film.movie_banner} alt={film.title} className="rounded-t-lg" />
        )}
       
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition pointer-events-none">
          <span className="text-white text-xl font-bold">{film.title}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col h-full">
        <Title className="text-gray-900 dark:text-white">{film.title}</Title>
        <Info className="text-gray-700 dark:text-gray-300">Ano: {film.release_date}</Info>
        <Info className="text-gray-700 dark:text-gray-300">Duração: {film.running_time} minutos</Info>
        <Info className="text-gray-700 dark:text-gray-300">Diretor: {film.director}</Info>
        <Info className="text-gray-700 dark:text-gray-300">Produtor: {film.producer}</Info>
        <Info className="text-gray-700 dark:text-gray-300">Nota: {film.rt_score}</Info>
        <div className="flex-1">
          <Synopsis
            expanded={expanded}
            title={expanded ? '' : film.description}
            onClick={() => setExpanded((e) => !e)}
            className="text-gray-700 dark:text-gray-300"
          >
            <b>Sinopse:</b>{' '}
            {highlightSynopsis && searchTerm
              ? highlightText(film.description, searchTerm)
              : film.description}
            {!expanded && (
              <span className="text-indigo-600 dark:text-indigo-400 ml-1 font-medium">
                ...ver mais
              </span>
            )}
          </Synopsis>
        </div>
        <ButtonGroup className="mt-auto pt-2">
          <BaseButton
            onClick={handleWatchedToggle}
            variant={watched ? "success" : "ghost"}
            size="sm"
            title='Assistido'
            aria-label={watched ? "Desmarcar Assistido" : "Marcar como Assistido"}
            className={!watched ? "dark:bg-gray-700 dark:text-white" : ""}
          >
            <Eye size={18} />
          </BaseButton>
          <BaseButton
            onClick={handleFavoriteToggle}
            variant={favorite ? "danger" : "ghost"}
            size="sm"
            title='Favoritar'
            aria-label={favorite ? "Remover Favorito" : "Marcar como Favorito"}
            className={!favorite ? "dark:bg-gray-700 dark:text-white" : ""}
          >
            <Heart size={18} className={favorite ? "fill-red-500 text-red-500" : ""} />
          </BaseButton>
          <BaseButton
            onClick={() => setNoteModalOpen(true)}
            variant={note ? "primary" : "ghost"}
            size="sm"
            title='Nota'
            aria-label={note ? "Editar Nota" : "Adicionar Nota"}
            className={!note ? "dark:bg-gray-700 dark:text-white" : ""}
          >
            <Star size={18} className={note ? "fill-yellow-400 text-yellow-400" : ""} />
          </BaseButton>
        </ButtonGroup>
        <NoteModal
          isOpen={noteModalOpen}
          onClose={() => setNoteModalOpen(false)}
          filmId={film.id}
          existingNote={note}
        />
      </div>
    </BaseCard>
  );
};

export default FilmCard;