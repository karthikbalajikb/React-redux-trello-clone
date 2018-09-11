import React, { Component } from 'react';

import styles from './App.scss';
import ListContainer from './container/List';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <ListContainer />
      </div>
    );
  }
}

export default App;
