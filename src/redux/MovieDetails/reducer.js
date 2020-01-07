import {
  FETCH_MOVIE_DETAILS,
  MOVIE_DETAILS_FETCHED,
  FETCH_MOVIE_DETAILS_FAIL
} from "./types";

const INIT_STATE = {
  isLoaded: true,
  movie: [],
  gotError: false,
  errorMessage: ""
};

const movieDetailsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS:
      return { ...state, isLoaded: false, gotError: false };
    case MOVIE_DETAILS_FETCHED:
      return { ...state, movie: action.movie, isLoaded: true };
    case FETCH_MOVIE_DETAILS_FAIL:
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

export default movieDetailsReducer;
