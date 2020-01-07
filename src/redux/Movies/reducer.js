import { FETCH_MOVIES, MOVIES_FETCHED, FETCH_MOVIES_FAIL } from "./types";

const INIT_STATE = {
  isLoaded: true,
  movies: [],
  gotError: false,
  errorMessage: "",
  page: 1
};

const moviesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        isLoaded: false,
        gotError: false,
        movies: action.page.p == 1 ? [] : state.movies,
        page: action.page.p
      };
    case MOVIES_FETCHED:
      return {
        ...state,
        movies: [...state.movies, ...action.movies],
        isLoaded: true
      };
    case FETCH_MOVIES_FAIL:
      return {
        ...state,
        isLoaded: true,
        gotError: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default moviesReducer;
