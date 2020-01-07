import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
  createMasonryCellPositioner,
  Masonry
} from "react-virtualized";

import Movie from "./Movie";
import Header from "../../components/Header";
import { Wrap, MarginWrap } from "./movies-styled-components";

import { fetchMovies } from "../../redux/Movies/actions";

class Movies extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._columnCount = 0;
    this._renderInfiniteLoaderRef = null;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 190,
      fixedWidth: true
    });

    this.state = {
      columnWidth: 190,
      height: window.innerHeight - 76,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: false,
      hasMore: true
    };

    this._cellRenderer = this._cellRenderer.bind(this);
    this._onResize = this._onResize.bind(this);
    this._renderAutoSizer = this._renderAutoSizer.bind(this);
    this._renderMasonry = this._renderMasonry.bind(this);
    this._setMasonryRef = this._setMasonryRef.bind(this);
  }

  componentDidMount() {
    const { fetchMoviesAction } = this.props;
    fetchMoviesAction({ p: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMovieList = prevProps.movies;
    const updatedMovieList = this.props.movies;

    if (prevMovieList !== updatedMovieList) {
      const index = prevMovieList.length;
      this._calculateColumnCount();
      this._resetCellPositioner();
      this._masonry.recomputeCellPositions();
    }
  }

  _loadMoreCells = data => {
    const { stopIndex } = data;
    const { movies, fetchMoviesAction, page } = this.props;
    const lastHalf = page * 42 - 24;
    if (stopIndex > lastHalf && stopIndex <= movies.length) {
      fetchMoviesAction({ p: page + 1 });
    }
  };

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      overscanByPixels,
      windowScrollerEnabled
    } = this.state;

    let child;

    if (windowScrollerEnabled) {
      child = (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      );
    } else {
      child = this._renderAutoSizer({ height });
    }

    return (
      <Wrap column>
        <Header />
        <Wrap>
          <MarginWrap />
          {child}
        </Wrap>
      </Wrap>
    );
  }

  _calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _isRowLoaded = ({ index }) => {
    return !!this.props.movies[index];
  };

  _cellRenderer({ index, key, parent, style }) {
    const { columnWidth } = this.state;
    const { movies } = this.props;

    const movie = movies[index];

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          className={"Cell"}
          style={{
            ...style,
            width: columnWidth,
            height: 300
          }}
        >
          {movie ? (
            <React.Fragment>
              <Movie key={movie._id} index={index} {...movie} />
            </React.Fragment>
          ) : (
            <div
              style={{
                height: "300px",
                width: "100%"
              }}
            >
              loading.........
            </div>
          )}
        </div>
      </CellMeasurer>
    );
  }

  _initCellPositioner() {
    if (typeof this._cellPositioner === "undefined") {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  _onResize({ width }) {
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer({ height, scrollTop }) {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry({ width }) {
    const { movies } = this.props;
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={movies.length || 1000000}
        onCellsRendered={data => this._loadMoreCells(data)}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width - 24}
      />
    );
  }

  _resetList = () => {
    const ROW_HEIGHTS = [25, 50, 75, 100];

    const { list } = this.context;
    list.forEach(datum => {
      datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
    });

    this._cache.clearAll();
    this._resetCellPositioner();
    this._masonry.clearCellPositions();
  };

  _resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  _setMasonryRef(ref) {
    this._masonry = ref;
  }
}

const mapStatetoProps = ({ moviesReducer }) => {
  const { movies, isLoaded, page } = moviesReducer;

  return { movies, isLoaded, page };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchMoviesAction: bindActionCreators(fetchMovies, dispatch)
  };
}
export default connect(mapStatetoProps, mapDispatchToProps)(Movies);
