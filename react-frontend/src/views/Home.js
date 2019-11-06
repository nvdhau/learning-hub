import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from "../components/Navbar";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import styles from '../assets/jss/views/generalStyle';
import { getCurrentUserAuth, doSignOut } from '../actions/authenticate';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
          { 
            this.props.loading ?
            (
              <div>
                <LinearProgress color="secondary" />
                <p>Loading....</p>
              </div>
            ) : (
              <React.Fragment>
              <AppBar></AppBar>
              <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                  Sidebar contains Categories
                </GridItem>
                <GridItem xs={12} sm={6} md={8}>
                  Main Content
                </GridItem>
              </GridContainer> 
              </React.Fragment>
            )
          }
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home);
