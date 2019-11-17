import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';

class Explore extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <p>Explore components</p>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Explore);
