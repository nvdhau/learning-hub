import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { getUserIdToken } from '../actions/authenticate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import { followUser, unfollowUser, getFavorites } from '../actions/post';
import { API_ROOT_URL } from '../config/endpoints-conf';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      selectedBlogType: 0,
      selectedFollowType: 0,
      following: [],
      followers: [],
      favorites: {}
    }
    this.displayShortName = this.displayShortName.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTabFavoriteChange = this.handleTabFavoriteChange.bind(this);
  }

  componentDidMount() {
    const newFollowingUsers = JSON.parse(this.props.appUser.following).map(value => {
      return {...value, following: true}
    })
    
    this.setState({
      following: newFollowingUsers,
      followers: JSON.parse(this.props.appUser.followers)
    })
    
    getFavorites(getUserIdToken)(this.props.appUser.id)
      .then(data => {
        console.log('data favorites', data)
        const blogs = data.filter(value => {
          return value.isBlog === true
        })

        const videos = data.filter(value => {
          return value.isBlog !== true
        })
        this.setState({
          favorites: {blogs, videos}
        })
      }).catch(err => {
        console.log('err', err)
      })

  }

  handleTabChange(e, value) {
    this.setState({
      selectedFollowType: value
    })

    console.log(this.props.appUser);
  }

  handleTabFavoriteChange(e, value) {
    this.setState({
      selectedBlogType: value
    })
  }

  handleSubscription(user, index) {
    const followType = user.following ? 'unfollow' : 'follow';
    const newUser = {...user, following: !user.following};
    this.state.following.splice(index, 1, newUser);

    if (followType === 'unfollow') {
      unfollowUser(getUserIdToken)(this.props.appUser.id, user.id)
      .then(data => {
        console.log("data", data);
        this.setState({
          following: this.state.following
        })
      }).catch(err => {
        console.log("err", err);
      })
    } else {
      followUser(getUserIdToken)(this.props.appUser.id, user.id)
      .then(data => {
        console.log("data", data);
        this.setState({
          following: this.state.following
        })
      }).catch(err => {
        console.log("err", err);
      })
    }
  }

  displayShortName(userName) {
    const avatarShortName = userName.split(" ").reduce((acc, value) => {
      return acc + value.charAt(0);
    }, "");
    return avatarShortName;
  }
  
  render() {
    const { classes } = this.props;
    console.log("favorites", this.state.favorites);
    if (this.state.favorites.blogs) {
      const test = this.state.favorites.blogs.map(value => {
        console.log(value);
      })
    }
    
    return (
        <React.Fragment>
          <GridContainer spacing={3} direction="row">
            <ToastContainer />
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{'margin': '10px auto'}}>
                <Typography variant="h6" gutterBottom>
                  Your Subscriptions
                </Typography>
                <Paper className={classes.root}>
                  <Tabs
                    value={this.state.selectedFollowType}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                  >
                    <Tab label="Following" component="a" />
                    <Tab label="Follower" component="a"/>
                  </Tabs>
                </Paper>
                <Grid container spacing={3} style={{'margin': '10px auto'}}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={3}>
                      { this.state.selectedFollowType === 0 &&
                        this.state.following.map((user, index) => 
                          <Grid key={"folowinguser-" + index} item xs={12} sm={2} md={3} lg={4} style={{'position': 'relative'}}>
                            <Card className={classes.card} style={{'textAlign': 'center'}}>
                              <CardContent>
                                <Avatar className={classes.avatarSubcribe}>{this.displayShortName(user.fullName)}</Avatar>
                                <Typography gutterBottom variant="subtitle2" component="h2">
                                  {user.fullName}
                                </Typography>
                                <Button 
                                  onClick={() => this.handleSubscription(user, index)}
                                  variant="contained" color="default"
                                >
                                  {user.following ? 'Following' : 'Follow'}
                                </Button>
                              </CardContent>                
                            </Card>
                          </Grid>
                        )
                      }
                      { this.state.selectedFollowType === 1 &&
                        this.state.followers.map((user, index) => 
                          <Grid key={"folowinguser-" + index} item xs={12} sm={2} md={3} lg={4} style={{'position': 'relative'}}>
                            <Card className={classes.card} style={{'textAlign': 'center'}}>
                              <CardContent>
                                <Avatar className={classes.avatarSubcribe}>{this.displayShortName(user.fullName)}</Avatar>
                                <Typography gutterBottom variant="subtitle2" component="h2">
                                  {user.fullName}
                                </Typography>
                              </CardContent>                
                            </Card>
                          </Grid>
                        )
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} style={{'margin': '10px auto'}}>
                <Typography variant="h6" gutterBottom>
                  Your Favorites
                </Typography>
                <Paper className={classes.root}>
                  <Tabs
                    value={this.state.selectedBlogType}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabFavoriteChange}
                  >
                    <Tab label="Blog" component="a" />
                    <Tab label="Video" component="a"/>
                  </Tabs>
                </Paper>
                <Grid container spacing={3} style={{'margin': '10px auto'}}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Grid container spacing={3}>
                        {
                          this.state.favorites.blogs && this.state.selectedBlogType === 0 &&
                          this.state.favorites.blogs.map((item, index) => 
                            <Grid key={index} item xs={12} sm={3} md={3} lg={3}>
                              <Card className={classes.card}>
                                <Paper className={classes.root} key={index}>
                                  <Link href={'/post/blog/' + item.id}>
                                    <CardMedia
                                      className={classes.media}
                                      image={API_ROOT_URL + "/" + item.imageUrl}
                                      title={item.title}
                                    />
                                  </Link>
                                </Paper>
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
                              </Card>
                            </Grid>
                          )
                        }

                        {
                          this.state.favorites.videos && this.state.selectedBlogType === 1 &&
                          this.state.favorites.videos.map((item, index) => 
                            <Grid key={index} item xs={12} sm={3} md={3} lg={3}>
                              <Card className={classes.card}>
                                <Paper className={classes.root} key={index}>
                                  <Link href={'/post/video/' + item.id}>
                                    <CardMedia
                                      className={classes.media}
                                      image={API_ROOT_URL + "/" + item.imageUrl}
                                      title={item.title}
                                    />
                                  </Link>
                                </Paper>
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
                              </Card>
                            </Grid>
                          )
                        }
                        
                      </Grid>
                  </Grid>
                </Grid>    
              </Grid>
            </GridItem>
          </GridContainer>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Subscription);