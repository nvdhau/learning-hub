import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from '@material-ui/core/Button';
import { getAllPosts } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import { API_ROOT_URL } from '../config/endpoints-conf';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import ReactPlayer from 'react-player'
import CardContent from '@material-ui/core/CardContent';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postType: true,
      posts: [],
      isSearch: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.setState({
      postType: !this.state.postType
    })
  }

  handleSubmit(e) {
    const searchText = e.target.searchText.value;
    const postType = this.state.postType ? 'blog' : 'video';
    getAllPosts(getUserIdToken)({filter: postType, tag: '', search: searchText})
    .then(posts => {
      this.setState({
        posts: posts,
        loading: false
      })
    }).catch(err => {
      console.log(err);
    })

    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    console.log("blog", this.state.blogType);
    console.log("video", this.state.videoType);
    console.log('results', this.state.posts);
    return (
        <React.Fragment>
          <GridContainer spacing={3} direction="row">
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h6" gutterBottom style={{'textAlign': 'center'}}>
                Search page
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Container component="main" maxWidth="md">
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="searchText"
                          label="Search"
                          type="text"
                          id="searchText"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup align="center">
                        <RadioGroup 
                          aria-label="gender" 
                          name="gender1" 
                          value={this.state.postType ? 'blog': 'video'} 
                          style={{'flexDirection': 'row'}}
                          onChange={this.handleChange}
                          >
                          <FormControlLabel value="blog" control={<Radio />} label="Blog" />
                          <FormControlLabel value="video" control={<Radio />} label="Video"/>
                        </RadioGroup>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                          Search
                        </Button>
                    </Grid>
                  </Grid>
                </Container>
              </form>
              {/* Your results */}
              {
                this.state.posts.length > 0 ?
                (
                <Grid container spacing={3} style={{'margin': '10px auto'}}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h6" gutterBottom style={{'textAlign': 'center'}}>
                      Your Results
                    </Typography>
                    {
                      this.state.posts.map((post, index) => 
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
                      )
                    }
                  </Grid>
                </Grid> 
                ) : null
              }
            </GridItem>
          </GridContainer>      
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Explore);
