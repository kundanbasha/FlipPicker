import { combineReducers } from "redux";

import moviesReducer from "./Movies/reducer";
import movieDetailsReducer from "./MovieDetails/reducer";

const rootReducer = combineReducers({
  moviesReducer,
  movieDetailsReducer
});

export default rootReducer;
