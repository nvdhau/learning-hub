import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Upload from './views/Upload';
import SignUp from './views/SignUp';
import { doSignOut } from './actions/authenticate';
import 'react-toastify/dist/ReactToastify.min.css'

// use this route for protected pages
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    JSON.parse(localStorage.getItem("app_user"))
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/logout" exact render={(props) => doSignOut(props)} />
            <PrivateRoute path='/upload/:type' component={Upload} />
            <PrivateRoute path='/' exact component={Home} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;