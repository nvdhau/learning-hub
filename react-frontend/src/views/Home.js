import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from "../components/Drawer";
import SideBar from "../components/SideBar/SideBar";
import HeaderTab from "../components/Header/HeaderTab";
import GridItem from "../components/Grid/GridItem";

import GridContainer from "../components/Grid/GridContainer";
import styles from '../assets/jss/views/generalStyle';
import { getCurrentUserAuth, doSignOut } from '../actions/authenticate';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const data = [
  {
    src:
      'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396 k views',
    createdAt: 'a week ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/ycHr1G0Gffg/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAS6ZJ5RYa2R3Ksp9d8cLzY_8DMOA',
    title: 'Top Latino Songs 2019 - Luis Fonsi, Ozuna, Nicky Jam…',
    channel: 'Dj Yanky Plus',
    views: '2.1 M views',
    createdAt: '4 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130 M views',
    createdAt: '10 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396 k views',
    createdAt: 'a week ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/ycHr1G0Gffg/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAS6ZJ5RYa2R3Ksp9d8cLzY_8DMOA',
    title: 'Top Latino Songs 2019 - Luis Fonsi, Ozuna, Nicky Jam…',
    channel: 'Dj Yanky Plus',
    views: '2.1 M views',
    createdAt: '4 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130 M views',
    createdAt: '10 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/ycHr1G0Gffg/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAS6ZJ5RYa2R3Ksp9d8cLzY_8DMOA',
    title: 'Top Latino Songs 2019 - Luis Fonsi, Ozuna, Nicky Jam…',
    channel: 'Dj Yanky Plus',
    views: '2.1 M views',
    createdAt: '4 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130 M views',
    createdAt: '10 months ago',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { classes } = this.props;
    const { loading = false } = this.props;
    
    return (
        <React.Fragment>
              {/* Menu Drawer */}
              <Drawer></Drawer>
              {/* MAIN CONTENT */}
              <GridContainer nowrap>
                {/* Sidebar */}
                <GridItem xs={12} sm={12} md={2}>
                  <SideBar title="Hello"/>
                </GridItem>
                {/* main content */}
                <GridItem xs={12} sm={12} md={10}>
                  <GridContainer spacing={3} direction="row">
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <HeaderTab />
                    </GridItem>
                  </GridContainer>
                  
                  <GridContainer spacing={3} direction="row">
                    {(loading ? Array.from(new Array(8)) : data).map((item, index) => (
                      <GridItem xs={12} sm={4} md={4} lg={3}>
                        <Card className={classes.card}>
                            {item ? (
                              <React.Fragment>
                                <CardMedia
                                  className={classes.media}
                                  image={item.src}
                                  title={item.title}
                                />
                              <CardContent>
                                <Typography gutterBottom variant="subtitle2" component="h2">
                                  {item.title}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2" component="h2">
                                  {item.channel}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {`${item.views} • ${item.createdAt}`}
                                </Typography>
                              </CardContent>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <LinearProgress color="secondary"></LinearProgress>
                                <Skeleton />
                                <Skeleton width="60%" variant="rect" height={118}/>
                              </React.Fragment>
                            )}
                        </Card>
                      </GridItem>
                    ))}
                  </GridContainer>
                </GridItem>
              </GridContainer>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home);
