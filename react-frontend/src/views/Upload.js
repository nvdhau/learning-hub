import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/upload';
import { getCategories } from '../actions/categories';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "easymde/dist/easymde.min.css";
import BlogPost from '../components/Post/BlogPost';
import VideoPost from '../components/Post/VideoPost';
import { ToastContainer } from 'react-toastify';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createPost, createVideoPost } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate';
import { toast } from 'react-toastify';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.formType = this.props.match.params.type === 'blog' ? true : false;
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.state = {
      categories: [],
      loading: false,
      mdeValue: '',
      resetForm: false,
      formType: ''
    }
  }

  componentDidMount() {
    // call api to get categories
    getCategories()
      .then(data => {
        this.setState({
          categories: data
        })
      });

    this.setState({
      formType: this.props.match.params.type
    })  
  }

  handleEditorChange = value => {
    this.setState({ mdeValue: value });
  };

  handleBlogSubmit = (e) => {
    console.log("Blog submit called");
    let formData = new FormData();
    formData.append('categoryId', e.target.category_id.value);
    formData.append('title', e.target.title.value);
    formData.append('description', this.state.mdeValue);
    formData.append('tags', e.target.tags.value);
    formData.append('isBlog', 1);
    formData.append('image', e.target.image.files[0]);
    this.setState({
      loading: true
    })
    createPost(getUserIdToken)(formData)
      .then(res => {
        console.log('res', res);
        this.setState({
          loading: false,
          resetForm: true,
          mdeValue: ''
        })
        toast.success('Post is created successfully');
      }).catch(err => {
        console.log('err', err);
        toast.error('Unable to create your post');
      })
    e.preventDefault();
  }

  handleVideoSubmit = (e) => {
    const formData = {
      'categoryId': e.target.category_id.value,
      'title': e.target.title.value,
      'description': '',
      'tags': e.target.tags.value,
      'isBlog': 0,
      'videourl': e.target.videourl.value
    };
    createVideoPost(getUserIdToken)(formData)
      .then(res => {
        console.log('res', res);
        this.setState({
          resetForm: true
        })
        toast.success('Post is created successfully');
      }).catch(err => {
        console.log('err', err);
        toast.error('Unable to create your post');
      })

    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
              {/* MAIN CONTENT */}
              { this.state.loading && <LinearProgress color="secondary" /> }
              <Container component="main" maxWidth="lg">
                <ToastContainer />
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <CloudUploadIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ marginBottom: '10px'}}>
                        Upload your {this.props.match.params.type}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        { this.state.formType === 'blog' ?
                            <BlogPost 
                              categories={this.state.categories}
                              submitHandler={this.handleBlogSubmit}
                              editorChangeHandler={this.handleEditorChange}
                              editorText={this.state.mdeValue}
                              resetForm={this.state.resetForm}
                              />
                            : <VideoPost 
                                categories={this.state.categories}
                                submitHandler={this.handleVideoSubmit}
                                resetForm={this.state.resetForm}
                              />
                        }
                      </Grid>
                    </Grid>
                </div>
            </Container> 
        </React.Fragment>
    )
  }
}

export default connect(null)((withStyles(styles)(Upload)));
