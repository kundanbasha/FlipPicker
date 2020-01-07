import { call, put, takeLatest } from "redux-saga/effects";

import request from "../request";
import { movieDetailsFetched, fetchMovieDetailsFail } from "./actions";
import { FETCH_MOVIE_DETAILS } from "./types";
import movieArray from "./movie";

function* fetchMovieDetails(action) {
  try {
    const response = yield call(request, "GET", `/${action.id}`);
    if (response.status === 200) {
      const movie = response.data[0];
      yield put(movieDetailsFetched(movie));
    }
  } catch (error) {
    yield put(fetchMovieDetailsFail("Something went wrong"));
  }
}

export default function*() {
  yield takeLatest(FETCH_MOVIE_DETAILS, fetchMovieDetails);
}
