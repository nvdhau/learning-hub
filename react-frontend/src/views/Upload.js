import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from "../components/Drawer";
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
import { createPost } from '../actions/post';
import { getUserIdToken } from '../actions/authenticate';
import { toast } from 'react-toastify';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.formType = this.props.match.params.type == 'blog' ? true : false;
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.state = {
      categories: [],
      loading: false,
      mdeValue: '',
      resetForm: false
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
  }

  handleEditorChange = value => {
    this.setState({ mdeValue: value });
  };

  handleBlogSubmit(e) {
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

  render() {
    const { classes } = this.props;
    return (
        
        <React.Fragment>
              {/* Menu Drawer */}
              <Drawer></Drawer>
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
                        { this.formType ?
                            <BlogPost 
                              categories={this.state.categories}
                              submitHandler={this.handleBlogSubmit}
                              editorChangeHandler={this.handleEditorChange}
                              editorText={this.state.mdeValue}
                              resetForm={this.state.resetForm}
                              />
                            : <VideoPost />
                        }
                      </Grid>
                      
                    </Grid>
                </div>
            </Container> 
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.auth_processing,
  }
}

// const mapDispatchtoProps = dispatch => {
//   return {
//       getCategories: () => dispatch(getCategories())
//   }
// }

export default connect(null)((withStyles(styles)(Upload)));
