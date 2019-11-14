import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';

class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.match.params.tag)
    console.log(this.props.match.params.filter)
    return (
        <React.Fragment>
            <p>Tag components</p>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Tag);
