import React from 'react';
import { Component } from 'react';
import Drawer from "./components/Drawer";
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";

class Bootstrap extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Drawer></Drawer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer spacing={3} direction="row">
            {this.props.children}
          </GridContainer>
        </GridItem>
      </React.Fragment>
    )
  }
}

export default Bootstrap;