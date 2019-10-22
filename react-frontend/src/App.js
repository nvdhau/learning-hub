import React from 'react';
import { Component } from 'react';
import HeaderNavigation from './components/HeaderNavigation';
import MenuBar from './components/MenuBar';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderNavigation />
        <MenuBar />
        <Home />
      </React.Fragment>
    )
  }
}

export default App;
