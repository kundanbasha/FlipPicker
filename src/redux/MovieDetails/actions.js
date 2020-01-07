import {
  FETCH_MOVIE_DETAILS,
  MOVIE_DETAILS_FETCHED,
  FETCH_MOVIE_DETAILS_FAIL
} from "./types";

export const fetchMovieDetails = id => {
  return {
    type: FETCH_MOVIE_DETAILS,
    id
  };
};

export const movieDetailsFetched = movie => {
  return {
    type: MOVIE_DETAILS_FETCHED,
    movie
  };
};

export const fetchMovieDetailsFail = error => {
  return {
    type: FETCH_MOVIE_DETAILS_FAIL,
    error
  };
};
