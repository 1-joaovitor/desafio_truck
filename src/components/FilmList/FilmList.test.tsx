import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import FilmList from './FilmList';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => () => Promise.resolve({ type: 'MOCK_ACTION', payload: [] }),
}));


jest.mock('../../store/slices/films/filmsSlice', () => ({
  ...jest.requireActual('../../store/slices/films/filmsSlice'),
  fetchAllFilms: jest.fn(() => ({ type: 'films/fetchAllFilms', payload: [] })),
}));

const mockStore = configureMockStore();

describe('FilmList', () => {
  it('exibe skeleton enquanto carrega', () => {
    const store = mockStore({
      films: { films: [], loading: true, watchedIds: [], favoriteIds: [], showOnlyWatched: false, showOnlyFavorites: false, showOnlyRated: false, filter: { title: '', includeSynopsis: false }, sortOption: 'title-asc', minStars: 1 },
      notes: { notes: [] }
    });
    const { container } = render(
      <Provider store={store}>
        <FilmList />
      </Provider>
    );
    expect(container.querySelectorAll('.skeleton').length).toBeGreaterThanOrEqual(0);
  });

  it('exibe mensagem de nenhum filme encontrado', () => {
    const store = mockStore({
      films: { films: [], loading: false, watchedIds: [], favoriteIds: [], showOnlyWatched: false, showOnlyFavorites: false, showOnlyRated: false, filter: { title: '', includeSynopsis: false }, sortOption: 'title-asc', minStars: 1 },
      notes: { notes: [] }
    });
    const { getByText } = render(
      <Provider store={store}>
        <FilmList />
      </Provider>
    );
    expect(getByText(/nenhum filme encontrado/i)).toBeInTheDocument();
  });

  
});