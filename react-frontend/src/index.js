import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Upload from './views/Upload';
import SignUp from './views/SignUp';
import Post from './views/Post';
import YourUpload from './views/YourUpload';
import Subscription from './views/Subscription';
import Bootstrap from './Bootstrap';
import { doSignOut } from './actions/authenticate';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config();

// use this route for protected pages
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
      {...rest} 
      render={props => {
        if (JSON.parse(localStorage.getItem("app_user"))) {
          var test_if_home = /^blog\/$|^video\/$|^subscription\/$/.test(props.location.pathname.slice(1));
          return (
            <Bootstrap>
                {test_if_home ? (<Home {...props}/>) 
                : (props.location.pathname.slice(1) ? <Component {...props} /> 
                : <Redirect to="/blog/"/>)}
            </Bootstrap>
          )
        } else {
          return <Redirect to={{pathname: '/login', state: { from: props.location }}} />
        }
      }}
    />
  )

ReactDOM.render((
    <Provider store={reducers}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/logout" exact render={(props) => doSignOut(props)} />
                <PrivateRoute path='/uploads/' exact component={YourUpload} />
                <PrivateRoute path='/subscriptions/' exact component={Subscription} />
                <PrivateRoute path='/post/:filter/:postid' exact component={Post} />
                <PrivateRoute path='/upload/:type' exact component={Upload} />
                <PrivateRoute path='/:filter?/:tag?' component={Home}/>
            </Switch>
          </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.unregister();
