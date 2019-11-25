import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import { getPostDetail, unfollowUser, followUser } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate'
import LinearProgress from '@material-ui/core/LinearProgress';
import BlogPostDetail from "../components/Post/BlogPostDetail";
import VideoPostDetail from "../components/Post/VideoPostDetail";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      loading: '',
      isFollow: false,
    }

    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {
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
      }).then(_ => {
        const followingUsers = JSON.parse(this.props.appUser.following);
        console.log("following Users", followingUsers);
        const found = followingUsers.find(e => e.id === this.state.post.user.id);
        this.setState({
          isFollow: found ? true : false
        })
      }).catch(err => {
        console.log(err);
      })
  }

  handleFollow (followType) {
    if (!followType) {
      followUser(getUserIdToken)(this.props.appUser.id, this.state.post.user.id)
      .then(data => {
        console.log("data", data);
        this.setState({
          following: this.state.following,
          isFollow: true
        })
      }).catch(err => {
        console.log("err", err);
      })
    } else {
      unfollowUser(getUserIdToken)(this.props.appUser.id, this.state.post.user.id)
      .then(data => {
        console.log("data", data);
        this.setState({
          following: this.state.following,
          isFollow: false
        })
      }).catch(err => {
        console.log("err", err);
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <GridItem xs={12} sm={12} md={12}>
          {
            this.state.loading && this.state.post === null ? (
              <React.Fragment>
                <LinearProgress color="secondary" /> 
              </React.Fragment> ) : (
                [
                  this.state.post && this.state.post.isBlog === true ?
                  (
                    <BlogPostDetail 
                      key={'blogpost'}
                      appUser={this.props.appUser}
                      post={this.state.post}
                      onFollowToggle={this.handleFollow}
                      isFollow={this.state.isFollow}
                    />
                  ) : null, 
                  this.state.post && this.state.post.isBlog === false ?
                  (
                    <VideoPostDetail
                      key={'videopost'}
                      post={this.state.post} 
                      appUser={this.props.appUser}
                      onFollowToggle={this.handleFollow}
                      isFollow={this.state.isFollow}
                    />
                  ) : null
                ]
              )
          }
        </GridItem>
      </React.Fragment>
    )
    // return (
    //     <React.Fragment>
    //       <GridItem xs={12} sm={12} md={12}>
    //         { 
    //           this.state.loading ? (
    //             <React.Fragment>
    //               <LinearProgress color="secondary" /> 
    //             </React.Fragment>
    //           ) : (
    //             <GridContainer spacing={3} direction="row">
    //               <GridItem xs={12} sm={12} md={9} lg={9}>
    //                 {
    //                   this.state.post ? (
    //                     <GridContainer spacing={3} direction="row">
    //                       <GridItem xs={12} sm={12} md={12} lg={12}>
    //                         <div>
    //                         <Player fluid={true} width={'100%'} height={400} 
    //                           playsInline 
    //                           >
    //                               <source
    //                                 src={API_ROOT_URL + "/" + this.state.post.imageUrl}
    //                                 type={'video/mp4' || 'application/x-mpegURL'}
    //                               />
    //                               <BigPlayButton position="center" />
    //                         </Player>
    //                         </div>
    //                       </GridItem>
    //                       <GridItem xs={12} sm={12} md={12} lg={12}>
    //                         <Paper className={classes.postDetail}>
    //                           <Typography variant="h6" component="h2">
    //                             {this.state.post.title}
    //                           </Typography>
    //                           <Typography variant="subtitle1" gutterBottom>
    //                             {this.state.post.category.name}
    //                           </Typography>
    //                           <ChipsArray tags={this.state.post.tags}/>
    //                           <Divider style={{'margin': '5px auto'}}/>
    //                           <GridContainer spacing={1} direction="row">
    //                             <GridItem xs={12} sm={1} md={1} lg={1}>
    //                               <MyAvatar author={this.state.post.user.fullName}/>
    //                             </GridItem>
    //                             <GridItem xs={12} sm={11} md={11} lg={11}>
    //                               <Grid container spacing={3}>
    //                                 <Grid item xs={12} sm={10} md={10} lg={10}>
    //                                   <Typography variant="subtitle1" gutterBottom>
    //                                     {this.state.post.user.fullName}
    //                                   </Typography>
    //                                   <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
    //                                     @{this.state.post.user.username}
    //                                   </Typography>
    //                                 </Grid>
    //                                 <Grid item xs={12} sm={2} md={2} lg={2}>
    //                                   <Button variant="contained" color="secondary" className={classes.btnFollow}>
    //                                     Subscribe
    //                                   </Button>
    //                                 </Grid>
    //                               </Grid>
    //                             </GridItem>
    //                           </GridContainer>
    //                           <Divider style={{'margin': '5px auto'}}/>
    //                           <Typography variant="subtitle1" gutterBottom>
    //                             Comments
    //                           </Typography>
    //                           <Comment author={this.props.appUser.fullName}/>
    //                         </Paper>
    //                       </GridItem>
    //                     </GridContainer>
    //                   ) : null
    //                 }
    //               </GridItem>
    //               <GridItem xs={12} sm={12} md={3} lg={3}>
    //                   <p>Related posts</p>
    //               </GridItem>
    //             </GridContainer>
    //           )
    //         }
    //       </GridItem>
    //     </React.Fragment>
    // )
  }
}



export default withStyles(styles)(Post);
