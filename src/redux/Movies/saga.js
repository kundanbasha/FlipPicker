import { put, call, takeLatest } from "redux-saga/effects";

import request from "../request";
import { FETCH_MOVIES } from "./types";
import { moviesFetched, fetchMoviesFail } from "./actions";

function* fetchMoviesSaga(action) {
  try {
    const response = yield call(request, "GET", "", action.page);
    if (response.status === 200) {
      yield put(moviesFetched(response.data));
    } else
      yield fetchMoviesFail({ code: 500, message: "Something went wrong" });
  } catch (error) {
    yield fetchMoviesFail({ code: 500, message: "Something went wrong" });
  }
}

export default function*() {
  yield takeLatest(FETCH_MOVIES, fetchMoviesSaga);
}
