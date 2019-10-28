import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;
