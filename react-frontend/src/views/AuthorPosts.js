import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import { getUserUploadPosts } from '../actions/post';
import { getUserIdToken, getUserDetails } from '../actions/authenticate';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography';
import { API_ROOT_URL } from '../config/endpoints-conf';
import MyAvatar from "../components/Avatar/Avatar";
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import ReactPlayer from 'react-player'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class AuthorPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorId: this.props.match.params.author_uid,
      posts: [],
      authorUser: null,
      selectedBlogType: 0
    }
    this.loadUploadPosts = this.loadUploadPosts.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  loadUploadPosts() {
    const params = {
      filter: this.state.selectedBlogType ? 0 : 1,
      uid: this.state.authorId
    }

    getUserUploadPosts(getUserIdToken)(params)
      .then(data => {
        this.setState({
          posts: data
        })
      }).catch(err => {
        console.log("err", err)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedBlogType !== this.state.selectedBlogType) {
      this.loadUploadPosts();
    }
  }

  handleTabChange(e,value) {
    this.setState({
      selectedBlogType: value
    })
  }

  componentDidMount() {
    getUserDetails(getUserIdToken)(this.props.match.params.author_uid)
    .then(data => {
      this.setState({
        authorUser: data
      })
    }).then(_ => {
      this.loadUploadPosts();
    }).catch(err => {
      console.log('err', err);
    })
  }

  render() {
    const { classes } = this.props;
    console.log("author", this.state.authorUser);
    return (
      <React.Fragment>
        <GridContainer spacing={3} direction="row">
            <GridItem xs={12} sm={12} md={12} lg={12}>
              {
                this.state.authorUser && (
                  <Paper className={classes.root}>
                    <GridContainer spacing={1} direction="row">
                      <GridItem xs={12} sm={1} md={1} lg={1}>
                        <MyAvatar author={this.state.authorUser.fullName}/>
                      </GridItem>
                      <GridItem xs={12} sm={11} md={11} lg={11}>
                          <Grid container spacing={3}>
                          <Grid item xs={12} sm={9} md={9} lg={9}>
                              <Typography variant="subtitle1" gutterBottom>
                              {this.state.authorUser.fullName}
                              </Typography>
                              <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
                              @{this.state.authorUser.username}
                              </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} md={3} lg={3}>
                              <Link href={"/chat/to/" + this.state.authorUser.id}>
                                <Typography variant="subtitle1" gutterBottom>
                                  Chat with {this.state.authorUser.fullName}
                                </Typography>  
                              </Link>
                          </Grid>
                          </Grid>
                      </GridItem>
                    </GridContainer>
                  </Paper>
                )
              }
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.selectedBlogType}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleTabChange}
                  centered
                >
                  <Tab label="Blogs" icon={<PostAddIcon />} component="a" />
                  <Tab label="Videos" icon={<YouTubeIcon />} component="a"/>
                </Tabs>
              </Paper>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{'margin': '10px auto'}}>
                <Typography variant="h6" gutterBottom style={{'textAlign': 'center'}}>
                  Author Uploads
                </Typography>
                {/* loop here */}
                {
                  this.state.posts.length > 0 && this.state.posts.map(
                    (post, index) => (
                    <Paper key={'post-' + index} style={{'margin': '25px auto'}}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={3} lg={3}>
                          { post.isBlog && (
                            <Link href={'/post/blog/' + post.id} >
                              <CardMedia
                                className={classes.media}
                                image={API_ROOT_URL + "/" + post.imageUrl}
                                title={post.title}
                                style={{'margin': '10px'}}
                              />
                            </Link>
                            )
                          }
                          { !post.isBlog && (
                            <Link href={'/post/video/' + post.id}>
                              <ReactPlayer key={post.id} 
                                width={'100%'} height={'100%'} 
                                url={API_ROOT_URL + "/" + post.imageUrl + '#t=0.5'}
                                playing={false}
                                style={{'margin': '10px'}}
                              />
                            </Link>
                            )
                          }
                        </Grid>
                        <Grid item xs={12} sm={8} md={9} lg={9}>
                          <CardContent>
                            <Typography gutterBottom variant="subtitle2" component="h2">
                              {post.title}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="h2">
                              @{post.user.username}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="h2">
                              {post.category.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {post.createdAt}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))
                }
              </Grid>
            </GridItem>
        </GridContainer>      
      </React.Fragment>
    )
  }

  // loadUploadPosts() {
  //   const params = {
  //     filter: this.state.selectedBlogType ? 0 : 1,
  //     uid: this.props.appUser.id
  //   }

  //   getUserUploadPosts(getUserIdToken)(params)
  //     .then(data => {
  //       this.setState({
  //         posts: data,
  //         loading: false
  //       })
  //     }).catch(err => {
  //       console.log("err", err)
  //     })
  // }

  // componentDidMount() {
  //   this.loadUploadPosts();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.selectedBlogType !== this.state.selectedBlogType) {
  //     this.loadUploadPosts();
  //   }
  // }

  // handleTabChange(e,value) {
  //   this.setState({
  //     selectedBlogType: value,
  //     loading: true
  //   })
  // }

  // handleDeletePost(id) {
  //   deletePost(getUserIdToken)(id)
  //     .then(data => {
  //       console.log('data', data);
  //       this.loadUploadPosts();
  //       toast.success('Successfully delete your post');
  //     }).catch(err => {
  //       console.log("err", err)
  //       toast.error('Unable to delete your post');
  //     })
  // }

  // render() {
  //   const { classes } = this.props;
  //   console.log('posts', this.state.posts);
  //   return (
  //       <React.Fragment>
  //         <GridContainer spacing={3} direction="row">
  //           <GridItem xs={12} sm={12} md={12} lg={12}>
  //             <Paper className={classes.root}>
  //               <Tabs
  //                 value={this.state.selectedBlogType}
  //                 indicatorColor="primary"
  //                 textColor="primary"
  //                 onChange={this.handleTabChange}
  //                 centered
  //               >
  //                 <Tab label="Blogs" icon={<PostAddIcon />} component="a" />
  //                 <Tab label="Videos" icon={<YouTubeIcon />} component="a"/>
  //               </Tabs>
  //             </Paper>
  //             <Grid item xs={12} sm={12} md={12} lg={12} style={{'margin': '10px auto'}}>
  //               <Typography variant="h6" gutterBottom style={{'textAlign': 'center'}}>
  //                 Your Uploads
  //               </Typography>
  //               {/* loop here */}
  //               {
  //                 this.state.posts.length > 0 && this.state.posts.map(
  //                   (post, index) => (
  //                   <Paper key={'post-' + index} style={{'margin': '25px auto'}}>
  //                     <Grid container spacing={3}>
  //                       <Grid item xs={12} sm={4} md={3} lg={3}>
  //                         { post.isBlog && (
  //                           <Link href={'/post/blog/' + post.id} >
  //                             <CardMedia
  //                               className={classes.media}
  //                               image={API_ROOT_URL + "/" + post.imageUrl}
  //                               title={post.title}
  //                               style={{'margin': '10px'}}
  //                             />
  //                           </Link>
  //                           )
  //                         }
  //                         { !post.isBlog && (
  //                           <Link href={'/post/video/' + post.id}>
  //                             <ReactPlayer key={post.id} 
  //                               width={'100%'} height={'100%'} 
  //                               url={API_ROOT_URL + "/" + post.imageUrl + '#t=0.5'}
  //                               playing={false}
  //                               style={{'margin': '10px'}}
  //                             />
  //                           </Link>
  //                           )
  //                         }
  //                       </Grid>
  //                       <Grid item xs={12} sm={8} md={9} lg={9}>
  //                         <CardContent>
  //                         <Button 
  //                           variant="contained" 
  //                           color="secondary" style={{'float': 'right'}}
  //                           onClick={() => this.handleDeletePost(post.id)}
  //                           >Delete
  //                         </Button>
  //                           <Typography gutterBottom variant="subtitle2" component="h2">
  //                             {post.title}
  //                           </Typography>
  //                           <Typography gutterBottom variant="subtitle2" component="h2">
  //                             @{post.user.username}
  //                           </Typography>
  //                           <Typography gutterBottom variant="subtitle2" component="h2">
  //                             {post.category.name}
  //                           </Typography>
  //                           <Typography variant="body2" color="textSecondary" component="p">
  //                             {post.createdAt}
  //                           </Typography>
  //                         </CardContent>
  //                       </Grid>
  //                     </Grid>
  //                   </Paper>
  //                 ))
  //               }
  //             </Grid>
  //           </GridItem>
  //         </GridContainer>
  //       </React.Fragment>
  //   )
  // }
}

export default withStyles(styles)(AuthorPosts);

// class YourUpload extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: [],
//       loading: true,
//       filter: {},
//       selectedTag: '',
//       tags: []
//     }
//     this.setFilter = this.setFilter.bind(this);
//   }

//   setFilter(blogType, tag) {
//     let filter = {};
//     switch(blogType) {
//       case 'blog':
//         filter = {key: 0, value: blogType, tag};
//         break;
//       case 'video':
//         filter = {key: 1, value: blogType, tag};
//         break;
//       default:
//         break; 
//     } 
//     this.setState({
//       filter: filter,
//       loading: true
//     })
//   }

//   componentDidMount() {
//       if (!this.props.match.params.filter) this.props.history.push('blog');
//       this.setFilter(this.props.match.params.filter, this.props.match.params.tag);
//       getAllPosts(getUserIdToken)({filter: this.props.match.params.filter, tag: this.props.match.params.tag})
//       .then(posts => {
//         getTags().then(data => {
//           this.setState({
//             tags: data,
//             posts: posts,
//             loading: false
//           })
//         }).catch(err => {

//         })
//       }).catch(err => {
//         console.log(err);
//       })
//   }

//   render() {
//     const { classes } = this.props;
//     const selectedTag = this.state.filter.tag || '';
//     return (
//         <React.Fragment>
//           { !this.state.loading ? (
//             <GridItem xs={12} sm={12} md={12}>
//             <GridContainer spacing={3} direction="row">
//                 <GridItem xs={12} sm={12} md={3} lg={2}>
//                     <SideBar tags={this.state.tags.length > 0 ? this.state.tags : []} filterType={this.state.filter.value}/>
//                 </GridItem>
//                 {
//                   this.state.loading ? (
//                     <GridItem xs={12} sm={12} md={9} lg={10}>
//                       <LinearProgress color="secondary"></LinearProgress>
//                       <p style={{'textAlign': 'center'}}>Loading ...</p>
//                       <GridContainer spacing={3} direction="row">
//                         { Array.from(new Array(8)).map(
//                             (item, index) => (
//                               <GridItem key={index} xs={12} sm={4} md={4} lg={3}>
//                                 <Skeleton />
//                                 <Skeleton width="60%" variant="rect" height={118}/>
//                               </GridItem>
//                             )
//                           )
//                         }
//                       </GridContainer>
//                     </GridItem>
//                   ) : (
//                     <GridItem xs={12} sm={12} md={9} lg={10}>
//                       <Paper className={classes.root}>
//                         <Tabs
//                           value={this.state.filter.key}
//                           indicatorColor="primary"
//                           textColor="primary"
//                           centered
//                         >
//                           <Tab label="Blogs" icon={<PostAddIcon />} component="a" href={'/blog' + '/' + selectedTag} />
//                           <Tab label="Videos" icon={<YouTubeIcon />} component="a" href={'/video' + '/' + selectedTag} />
//                         </Tabs>
//                       </Paper>
//                       <GridContainer spacing={3} direction="row">
//                         {
//                           this.state.posts.length > 0 && this.state.posts.map(
//                             (item, index) => (
//                               <GridItem key={index} xs={12} sm={4} md={4} lg={3}>
//                                 <Card className={classes.card}>
//                                   {
//                                     item ? (
//                                       <React.Fragment>
//                                         {
//                                           item.isBlog ? 
//                                           (
//                                             <Link href={'/post/' + this.state.filter.value + '/' + item.id}>
//                                             <CardMedia
//                                               className={classes.media}
//                                               image={API_ROOT_URL + "/" + item.imageUrl}
//                                               title={item.title}
//                                             />
//                                             </Link>
//                                           ) : (
//                                             <Link href={'/post/' + this.state.filter.value + '/' + item.id}>
//                                             <ReactPlayer key={item.id} 
//                                               width={'100%'} height={'50%'} 
//                                               url={API_ROOT_URL + "/" + item.imageUrl + '#t=0.5'}
//                                               playing={false}
//                                             />
//                                             </Link>
//                                           )
//                                         }
                                        
//                                         <CardContent>
//                                           <Typography gutterBottom variant="subtitle2" component="h2">
//                                             {item.title}
//                                           </Typography>
//                                           <Typography gutterBottom variant="subtitle2" component="h2">
//                                             @{item.user.username}
//                                           </Typography>
//                                           <Typography gutterBottom variant="subtitle2" component="h2">
//                                             {item.category.name}
//                                           </Typography>
//                                           <Typography variant="body2" color="textSecondary" component="p">
//                                             {item.createdAt}
//                                           </Typography>
//                                         </CardContent>
//                                       </React.Fragment>
//                                     ) : null
//                                   }
//                                 </Card>
//                               </GridItem>
//                             )
//                           )
//                         }

//                         {
//                           this.state.posts && this.state.posts.length <= 0 && (
//                             <React.Fragment>
//                               <GridItem xs={12} sm={12} md={12} lg={12}>
//                                 <Typography gutterBottom variant="subtitle2" component="h2" style={{'textAlign': 'center'}}>
//                                   There is no records for this type of blog
//                                 </Typography>
//                               </GridItem>
//                             </React.Fragment>
//                           )
//                         }
//                       </GridContainer>
//                     </GridItem>
//                   )
//                 }
//                 </GridContainer>
//             </GridItem>
//             ) : null
//           }
          
//         </React.Fragment>
//     )
//   }
// }

// export default withStyles(styles)(YourUpload);
