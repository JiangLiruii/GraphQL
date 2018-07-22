import {
  handleActions,
} from 'redux-action';

const FETCH_MOVIE = 'movie/FETCH_MOVIE';
const FETCH_MOVIES = 'movie/FETCH_MOVIES';

export const fetchMoviesActionCreator = response => ({
  type: FETCH_MOVIES,
  movies: response.data.data.movies,
});
export const fetchMovieActionCreator = response => ({
  type: FETCH_MOVIE,
  movie: response.data.data.movie,
});
export default handleActions({
  // action type
  [FETCH_MOVIES]: (state, action) => ({
    ...state,
    all: action.movies,
  }),
  [FETCH_MOVIE]: (state, action) => ({
    ...state,
    current: action.movie,
  }),
}, {
  // initial state
  movies: [],
  movie: {},
});
