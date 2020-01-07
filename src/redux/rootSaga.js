import { fork, all } from "redux-saga/effects";
import { map, unary } from "lodash/fp";

import moviesSaga from "./Movies/saga";
import movieDetailsSaga from "./MovieDetails/saga";

export default function*() {
  const _sagas = [moviesSaga, movieDetailsSaga];

  yield all(map(unary(fork), _sagas));
}
