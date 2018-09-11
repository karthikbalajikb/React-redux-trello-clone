import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./configureStore";
import App from "./App";
import { fetchAllLists } from "./actions";

const store = configureStore();

store.dispatch(fetchAllLists());

const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
