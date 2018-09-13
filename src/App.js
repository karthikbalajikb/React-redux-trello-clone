import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import ListContainer from "./container/List";
import QuickEditor from "./container/QuickEditor";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <main>
        <div className={styles.app}>
          <ListContainer />
        </div>
        <QuickEditor />
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
