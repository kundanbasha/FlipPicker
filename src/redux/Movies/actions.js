import { FETCH_MOVIES, MOVIES_FETCHED, FETCH_MOVIES_FAIL } from "./types";

export const fetchMovies = page => {
  return {
    type: FETCH_MOVIES,
    page
  };
};

export const moviesFetched = movies => {
  return {
    type: MOVIES_FETCHED,
    movies
  };
};

export const fetchMoviesFail = error => {
  return {
    type: FETCH_MOVIES_FAIL,
    error
  };
};
