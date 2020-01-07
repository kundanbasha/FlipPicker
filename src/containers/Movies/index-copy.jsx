import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  WindowScroller
} from "react-virtualized";

import Movie from "./Movie";
import { Wrap } from "./movies-styled-components";

import { fetchMovies } from "../../redux/Movies/actions";

class Movies extends React.Component {
  _renderCache = new CellMeasurerCache({ defaultHeight: 85, fixedWidth: true });
  _mostRecentWidth = 0;
  _resizeAllFlag = false;
  _renderInfiniteLoaderRef;
  _renderListRef;

  state = {
    hasMore: true
  };

  componentDidMount() {
    const { fetchMoviesAction } = this.props;
    fetchMoviesAction({ p: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMovieList = prevProps.movies;
    const updatedMovieList = this.props.movies;

    if (this._resizeAllFlag) this._reSizeAllRender();

    if (prevMovieList !== updatedMovieList) {
      const index = prevMovieList.length;
      this._reSizeRowRender(index);
    }
  }

  _infiniteRowCount = () => {
    const { isLoaded, movies } = this.props;

    return isLoaded && this.state.hasMore ? movies.length + 1 : movies.length;
  };

  _listRowCount = () => {
    const { movies } = this.props;

    return this.state.hasMore ? movies.length + 1 : movies.length;
  };

  _loadMoreRows = !this.props.isLoaded
    ? () => Promise.resolve()
    : () =>
        Promise.resolve().then(() => {
          const { fetchMoviesAction, page } = this.props;
          fetchMoviesAction({ p: page + 1 });

          this.setState({
            hasMore: this.props.movies.length < 300 ? true : false
          });
        });

  _isRowLoaded = ({ index }) => {
    return !!this.props.movies[index];
  };

  _renderRow = ({ index, key, parent, style }) => {
    const movie = this.props.movies[index];

    return (
      <CellMeasurer
        cache={this._renderCache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div style={style} className="row">
            {this._isRowLoaded({ index }) ? (
              <Movie
                key={movie._id}
                measure={measure}
                index={index}
                {...movie}
              />
            ) : (
              <div>loading</div>
            )}
          </div>
        )}
      </CellMeasurer>
    );
  };

  render() {
    const { movies, isLoaded } = this.props;

    return (
      <Wrap className="infWrapper">
        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          ref={el => (this._renderInfiniteLoaderRef = el)}
          rowCount={this._infiniteRowCount()}
          threshold={0}
          minimumBatchSize={1}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop, onChildScroll }) => (
                <AutoSizer disableHeight={true} onResize={this._onResize}>
                  {({ width }) => (
                    <List
                      autoHeight={true}
                      deferredMeasurementCache={this._renderCache}
                      height={height}
                      isScrolling={isScrolling}
                      onRowsRendered={onRowsRendered}
                      onScroll={onChildScroll}
                      overscanRowCount={5}
                      ref={el => {
                        this._renderListRef = el;
                        registerChild(el);
                      }}
                      rowHeight={this._renderCache.rowHeight}
                      rowRenderer={this._renderRow}
                      rowCount={this._listRowCount()}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </Wrap>
    );
  }

  _onResize = ({ width }) => {
    if (this._mostRecentWidth && this._mostRecentWidth !== width) {
      this._resizeAllFlag = true;
      process.nextTick(this._reSizeAllRender);
    }

    this._mostRecentWidth = width;
  };

  _reSizeAllRender = () => {
    this._resizeAllFlag = false;
    this._renderCache.clearAll();
    if (this._renderListRef) {
      this._renderListRef.recomputeRowHeights();
    }
  };

  _reSizeRowRender = index => {
    this._renderCache.clear(index, 0);
    if (this._renderListRef) this._renderListRef.recomputeRowHeights(index);
  };
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
