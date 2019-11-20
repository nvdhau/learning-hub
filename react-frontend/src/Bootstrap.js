import React from 'react';
import { Component } from 'react';
import Drawer from "./components/Drawer";
import { getUserIdToken, getUserDetails } from './actions/authenticate'
import LinearProgress from '@material-ui/core/LinearProgress';

class Bootstrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appUser: null,
      loading: true,
    }
  }

  componentDidMount() {
    const userObject = JSON.parse(localStorage.getItem("app_user"));
    getUserDetails(getUserIdToken)(userObject.uid)
      .then(data => {
        this.setState({
          appUser: data,
          loading: false
        })
      }).catch(err => {
        console.log('err', err);
      })
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        appUser: this.state.appUser ? this.state.appUser : null,
        appLoading: this.state.loading
      });
    });
    return (
      <React.Fragment>
        {
          this.state.loading ? (
            <React.Fragment>
              <LinearProgress color="secondary"></LinearProgress>
              <p style={{'textAlign': 'center'}}>Loading ...</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Drawer></Drawer>
              {children}
            </React.Fragment>
          )
        }
      </React.Fragment>
    )
  }
}

export default Bootstrap;