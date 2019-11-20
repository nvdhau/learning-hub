import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import ChipsArray from "../components/Chip/Chip";
import MyAvatar from "../components/Avatar/Avatar";
import Comment from "../components/Comment/Comment";
import { Player, BigPlayButton } from 'video-react';
import { API_ROOT_URL } from '../config/endpoints-conf';
import { getPostDetail } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      loading: ''
    }
  }

  componentDidMount() {
    // get post details
    this.setState({
      loading: true
    })
    getPostDetail(getUserIdToken)(this.props.match.params.postid)
      .then(post => {
        console.log('post', post);
        this.setState({
          post: post,
          loading: false
        })
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    const { classes } = this.props;
    console.log('user', this.props.appUser);
    return (
        <React.Fragment>
          <GridItem xs={12} sm={12} md={12}>
            { 
              this.state.loading ? (
                <React.Fragment>
                  <LinearProgress color="secondary" /> 
                </React.Fragment>
              ) : (
                <GridContainer spacing={3} direction="row">
                  <GridItem xs={12} sm={12} md={9} lg={9}>
                    {
                      this.state.post ? (
                        <GridContainer spacing={3} direction="row">
                          <GridItem xs={12} sm={12} md={12} lg={12}>
                            <div>
                            <Player fluid={true} width={'100%'} height={400} 
                              playsInline 
                              >
                                  <source
                                    src={API_ROOT_URL + "/" + this.state.post.imageUrl}
                                    type={'video/mp4' || 'application/x-mpegURL'}
                                  />
                                  <BigPlayButton position="center" />
                            </Player>
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12} lg={12}>
                            <Paper className={classes.postDetail}>
                              <Typography variant="h6" component="h2">
                                {this.state.post.title}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom>
                                {this.state.post.category.name}
                              </Typography>
                              <ChipsArray tags={this.state.post.tags}/>
                              <Divider style={{'margin': '5px auto'}}/>
                              <GridContainer spacing={1} direction="row">
                                <GridItem xs={12} sm={1} md={1} lg={1}>
                                  <MyAvatar author={this.state.post.user.fullName}/>
                                </GridItem>
                                <GridItem xs={12} sm={11} md={11} lg={11}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={10} md={10} lg={10}>
                                      <Typography variant="subtitle1" gutterBottom>
                                        {this.state.post.user.fullName}
                                      </Typography>
                                      <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
                                        @{this.state.post.user.username}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} lg={2}>
                                      <Button variant="contained" color="secondary" className={classes.btnFollow}>
                                        Subscribe
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </GridItem>
                              </GridContainer>
                              <Divider style={{'margin': '5px auto'}}/>
                              <Typography variant="subtitle1" gutterBottom>
                                Comments
                              </Typography>
                              <Comment author={this.props.appUser.fullName}/>
                            </Paper>
                          </GridItem>
                        </GridContainer>
                      ) : null
                    }
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                      <p>Related posts</p>
                  </GridItem>
                </GridContainer>
              )
            }
          </GridItem>
        </React.Fragment>
    )
  }
}



export default withStyles(styles)(Post);
