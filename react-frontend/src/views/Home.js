import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import SideBar from "../components/SideBar/SideBar";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import styles from '../assets/jss/views/generalStyle';
import { getAllPosts } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate'
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { API_ROOT_URL } from '../config/endpoints-conf';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PostAddIcon from '@material-ui/icons/PostAdd';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      filter: {}
    }
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(value) {
    let filter = {};
    switch(value) {
      case 'blog':
        filter = {key: 0, value: value};
        break;
      case 'video':
        filter = {key: 1, value: value};
        break;
      case 'subscription':
        filter = {key: 2, value: value};
        break;
    } 
    this.setState({
      filter: filter,
      loading: true
    })
  }

  componentDidMount() {
      if (!this.props.match.params.filter) this.props.history.push('blog');
      this.setFilter(this.props.match.params.filter);
      getAllPosts(getUserIdToken)(this.props.match.params.filter)
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
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer spacing={3} direction="row">
              <GridItem xs={12} sm={12} md={3} lg={2}>
                  <SideBar selectedFilter={this.state.filter}/>
              </GridItem>
              {
                this.state.loading ? (
                  <GridItem xs={12} sm={12} md={9} lg={10}>
                    <LinearProgress color="secondary"></LinearProgress>
                    <p style={{'textAlign': 'center'}}>Loading ...</p>
                    <GridContainer spacing={3} direction="row">
                      { Array.from(new Array(8)).map(
                          (item, index) => (
                            <GridItem key={index} xs={12} sm={4} md={4} lg={3}>
                              <Skeleton />
                              <Skeleton width="60%" variant="rect" height={118}/>
                            </GridItem>
                          )
                        )
                      }
                    </GridContainer>
                  </GridItem>
                ) : (
                  <GridItem xs={12} sm={12} md={9} lg={10}>
                    <Paper className={classes.root}>
                      <Tabs
                        value={this.state.filter.key}
                        // onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                      >
                        <Tab label="Blogs" icon={<PostAddIcon />} component="a" href="/blog" />
                        <Tab label="Videos" icon={<YouTubeIcon />} component="a" href="/video" />
                      </Tabs>
                    </Paper>
                    <GridContainer spacing={3} direction="row">
                      {
                        this.state.posts.length > 0 && this.state.posts.map(
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
                                  ) : null
                                }
                              </Card>
                            </GridItem>
                          )
                        )
                      }
                    </GridContainer>
                  </GridItem>
                )
              }
              </GridContainer>
          </GridItem>
        </React.Fragment>
    )
  }
}



export default withStyles(styles)(Home);
