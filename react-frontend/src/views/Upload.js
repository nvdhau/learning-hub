import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from "../components/Drawer";
import styles from '../assets/jss/views/upload';
import { getCurrentUserAuth, doSignOut } from '../actions/authenticate';
import GridContainer from "../components/Grid/GridContainer";
import MySelect from "../components/Form/Select";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactMarkdown from 'react-markdown';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import BlogPost from '../components/Post/BlogPost';
import VideoPost from '../components/Post/VideoPost';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.formType = this.props.match.params.type == 'blog' ? true : false;
  }

//   author: tutorialRequest.author,
//         category_id: tutorialRequest.category_id,
//         title: tutorialRequest.title,
//         description: tutorialRequest.description,
//         tags: tutorialRequest.tags

//   renderBlogForm () {
//         const input = '# This is a header\n\nAnd this is a paragraph'
//         return (
//             <React.Fragment>
//                 <Grid container spacing={2}>
//                     {/* <Grid item xs={12}>
//                         <ReactMarkdown source={input} />
//                     </Grid> */}

//                     <Grid item xs={12} md={12}>
//                         <SimpleMDE onChange={this.handleChange} />
//                     </Grid>    

//                     <Grid item xs={12}>
//                         <MySelect 
//                             id="category_id"
//                             name="category_id"
//                             label="Category" 
//                             required
//                             data={[
//                                 {key: 1, value: 'Cat 1'},
//                                 {key: 2, value: 'Cat 2'},
//                                 {key: 3, value: 'Cat 3'}
//                             ]}/>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             variant="outlined"
//                             required
//                             fullWidth
//                             name="title"
//                             label="Title"
//                             type="text"
//                             id="title"
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             variant="outlined"
//                             required
//                             fullWidth
//                             name="tags"
//                             label="Tags Ex: #tag #tag"
//                             type="text"
//                             id="tags"
//                         />
//                     </Grid> 
//                     <Grid item xs={12}>
//                     </Grid>
//                 </Grid>
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                 >
//                     Save
//                 </Button>
//             </React.Fragment>
//       )
//   }


  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
              {/* Menu Drawer */}
              <Drawer></Drawer>
              {/* MAIN CONTENT */}
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <CloudUploadIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ marginBottom: '10px'}}>
                        Upload your {this.props.match.params.type}
                    </Typography>
                    {/* <form className={classes.form} noValidate onSubmit={this.handleSubmit}> */}
                    <Grid container spacing={2}>
                        { this.formType ?
                            <BlogPost />
                            : <VideoPost />
                        }
                    </Grid>
                    
                    {/* </form> */}
                </div>
            </Container> 
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(Upload);
