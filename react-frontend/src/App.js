import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Upload from './views/Upload';
import Tag from './views/Tag';
import SignUp from './views/SignUp';
import Bootstrap from './Bootstrap';
import { doSignOut } from './actions/authenticate';
import 'react-toastify/dist/ReactToastify.min.css'

// use this route for protected pages
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest} 
    render={props => {
      if (JSON.parse(localStorage.getItem("app_user"))) {
        var test_if_home = /^blog$|^video$|^subscription$/.test(props.location.pathname.slice(1));
        if (test_if_home)
          return <Home {...props} />
        else
          return props.location.pathname.slice(1) ? <Component {...props} /> : <Redirect to="/blog"/>
      } else {
        return <Redirect to={{pathname: '/login', state: { from: props.location }}} />
      }
    }}
  />
)

class App extends Component {

  render () {
    return (
      <React.Fragment>
          <BrowserRouter>
            <Switch>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={SignUp}/>
              <Route path="/logout" exact render={(props) => doSignOut(props)} />
              <Bootstrap>
                <Switch>
                  <PrivateRoute path='/upload/:type' exact component={Upload} />
                  <PrivateRoute path='/:tag/:filter' component={Tag} />
                  <PrivateRoute path='/:filter?' component={Home} />
                </Switch>
              </Bootstrap>
            </Switch>
          </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App;