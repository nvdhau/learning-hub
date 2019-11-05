import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import SignUp from './views/SignUp';
import 'react-toastify/dist/ReactToastify.min.css'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;