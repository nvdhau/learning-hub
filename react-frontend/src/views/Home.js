import React from 'react';
import { Component } from 'react';
import { getCurrentUserAuth } from '../actions/authenticate';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getCurrentUserAuth()
        .then(user => {
            if (user) {
                console.log("USER SIGNED IN, SO REDIRECT TO HOME PAGE");
                this.props.history.push('/');
            } else {
                console.log("USER SIGNED OUT");
                this.props.history.push('/login');
            }
        })
  }

  render() {
    return (
        <React.Fragment>
            <p>Hello Home page</p>       
        </React.Fragment>
    )
  }
}

export default Home;
