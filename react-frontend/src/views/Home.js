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
import { getAllPosts } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate'
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { API_ROOT_URL } from '../config/endpoints-conf';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentDidMount() {
    getAllPosts(getUserIdToken)()
      .then(posts => {
        this.setState({
          posts: posts,
          loading: false
        })
      }).catch(err => {
        console.log(err);
      })
  }
  
  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
              {/* Menu Drawer */}
              <Drawer></Drawer>
              {/* MAIN CONTENT */}
              <GridContainer>
                {/* main content */}
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer spacing={3} direction="row">
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <HeaderTab />
                      <GridContainer spacing={3} direction="row">
                        <GridItem xs={12} sm={12} md={3} lg={2}>
                          <SideBar title="Hello"/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9} lg={10}>
                            <GridContainer spacing={3} direction="row">
                              {
                                (this.state.loading ? Array.from(new Array(8)) : this.state.posts).map(
                                  (item, index) => (
                                    <GridItem key={index} xs={12} sm={4} md={4} lg={3}>
                                      <Card className={classes.card}>
                                        {
                                          item ? (
                                            <React.Fragment>
                                              <CardMedia
                                                className={classes.media}
                                                image={API_ROOT_URL + "/" + item.imageUrl}
                                                title={item.title}
                                              />
                                              <CardContent>
                                                <Typography gutterBottom variant="subtitle2" component="h2">
                                                  {item.title}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle2" component="h2">
                                                  @{item.user.username}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle2" component="h2">
                                                  {item.category.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                  {item.createdAt}
                                                </Typography>
                                              </CardContent>
                                            </React.Fragment>
                                          ) : (
                                          <React.Fragment>
                                            <LinearProgress color="secondary"></LinearProgress>
                                            <Skeleton />
                                            <Skeleton width="60%" variant="rect" height={118}/>
                                          </React.Fragment>
                                          )
                                        }
                                      </Card>
                                    </GridItem>
                                  )
                                )
                              }
                            {/* {(loading ? Array.from(new Array(8)) : this.state.posts).map((item, index) => (
                              <GridItem key={index} xs={12} sm={4} md={4} lg={3}>
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
                            ))} */}
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home);
