import React from "react";
import { withRouter } from "react-router-dom";

import {
  Wrap,
  Title,
  Poster,
  ReleaseDate,
  PosterWrap,
  Details
} from "./movie-styled-components";

const Movie = props => {
  const { original_title, release_date, poster_path, _id, history } = props;

  return (
    <Wrap column onClick={() => history.push(`/movies/${_id}`)}>
      <PosterWrap>
        <Poster src={`https://image.tmdb.org/t/p/original${poster_path}`} />
      </PosterWrap>
      <Details column>
        <Title>{original_title}</Title>
        <ReleaseDate>{release_date}</ReleaseDate>
      </Details>
    </Wrap>
  );
};

export default withRouter(Movie);
