import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import configureStore from "./redux/configureStore";
import MovieDetails from "./containers/MovieDetails";
import NoPage from "./components/NoPage";
import Movies from "./containers/Movies";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={"/"} component={Movies} exact={true} />
          <Route path={"/movies"} component={Movies} exact={true} />
          <Route path={"/movies/:id"} component={MovieDetails} />
          <Route path={"*"} component={NoPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
