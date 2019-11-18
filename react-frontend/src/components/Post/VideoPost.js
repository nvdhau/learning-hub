import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from '../../assets/jss/views/upload';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { toast } from 'react-toastify';
import { uploadPostVideo } from '../../actions/post';
import { API_UPLOAD_POST_VIDEO } from '../../config/endpoints-conf';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { timingSafeEqual } from 'crypto';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from '@material-ui/core/Button';
import { API_ROOT_URL } from '../../config/endpoints-conf';
import Container from '@material-ui/core/Container';
import MySelect from "../../components/Form/Select";
import TextField from '@material-ui/core/TextField';
import { createVideoPost } from '../../actions/post';
import { getUserIdToken } from '../../actions/authenticate';

// import { Player } from 'video-react';
import { Player, BigPlayButton } from 'video-react'

class VideoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      loading: false,
      toogleDropzone: false,
      fileUrl: ''
    }
    this.handerDrop = this.handerDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
    this.toggleDropDrone = this.toggleDropDrone.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log("didupdate", this.props.resetForm)
    if (prevProps.resetForm !== this.props.resetForm) {
      this.setState({
        toogleDropzone: false
      })
    }
  }

  handerDrop (file) {
    
    if (file.length > 0) {
      let data = new FormData()
      data.append('video', file[0])
      const config = {
        onUploadProgress: progressEvent => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.setState({
            progress: percentCompleted
          })
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': "nothingwedontcare"
        }
      }

      this.setState({
        loading: true
      })
      axios.post(API_UPLOAD_POST_VIDEO, data, config)
          .then(res => {
              console.log("res", res);
              this.setState({
                toogleDropzone: true,
                file: res.data.file,
                fileUrl: res.data.url,
                loading: false
              })
          }).catch(err => {
              console.log("res", err);
          })
    }
  }

  handleDropRejected () {
    toast.error("Error! Cannnot upload this type of file.");
  }

  toggleDropDrone () {
    this.setState({
      toogleDropzone: !this.state.toogleDropzone
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12} md={12}>
          {
            this.state.loading ? 
            (<LinearProgress variant="buffer" value={this.state.progress} valueBuffer={this.state.progress + 1} color="secondary" style={{'height': 60, 'marginBottom': '20px'}}/>)
            : [
              (
                this.state.toogleDropzone 
                ? (
                    <form key={'formuploadvideo'} className={classes.form} noValidate onSubmit={this.props.submitHandler}>
                      <GridContainer spacing={3} direction="row" style={{'border': '3px dashed #cccccc'}}>
                        <GridItem xs={12} sm={6} md={4} lg={4}>
                          <Player fluid={false} width={'100%'} height={255} 
                          playsInline 
                          >
                              <source
                                src={API_ROOT_URL + "/" + this.state.fileUrl}
                                type={'video/mp4' || 'application/x-mpegURL'}
                              />
                              <BigPlayButton position="center" />
                            </Player>
                           <TextField
                               value={this.state.fileUrl}
                               variant="outlined"
                               fullWidth
                               name="videourl"
                               type="hidden"
                               id="videourl"
                           />          
                         </GridItem>
                         <GridItem xs={12} sm={6} md={8} lg={8}>
                           <Container component="main" maxWidth="md">
                             <Grid container spacing={1}>
                               <Grid item xs={12}>
                                 <MySelect 
                                 id="category_id"
                                 name="category_id"
                                 label="Category" 
                                 required
                                 data={this.props.categories}/>
                               </Grid>
                               <Grid item xs={12}>
                                 <TextField
                                     variant="outlined"
                                     required
                                     fullWidth
                                     name="title"
                                     label="Title"
                                     type="text"
                                     id="title"
                                 />
                               </Grid>
                               <Grid item xs={12}>
                                 <TextField
                                     variant="outlined"
                                     required
                                     fullWidth
                                     name="tags"
                                     label="Tags Ex: #tag #tag"
                                     type="text"
                                     id="tags"
                                 />
                               </Grid>
                               <Grid item xs={12}>
                               </Grid>
                               <Grid item xs={12}>
                                 <Button
                                     type="submit"
                                     fullWidth
                                     variant="contained"
                                     color="secondary"
                                     style={{'marginBottom': '10px'}}
                                 >
                                   Save Post
                                 </Button>  
                                 <Button
                                     fullWidth
                                     variant="contained"
                                     color="default"
                                     onClick={this.toggleDropDrone}
                                 >
                                   Cancel this post
                                 </Button>  
                               </Grid>
                             </Grid>
                           </Container>    
                         </GridItem>
                     </GridContainer>
                  </form>
                )
                : (
                  <Paper key={'dropzone'}>
                    <div>
                      <Dropzone 
                        onDrop={this.handerDrop}
                        onDropRejected={this.handleDropRejected}
                        multiple={false}
                        accept="video/mp4, video/avi, video/x-matroska, video/quicktime, video/webm"
                      >
                        {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()} className={classes.uploadWrapper}>
                        <input {...getInputProps()} className={classes.dropzone}/>
                        <p style={{'fontSize': '30px', 'paddingTop': '130px'}}>Drag/drop your video file here, or click to select file</p>
                        <DragHandleIcon fontSize={'large'}/>
                        </div>
                        </section>
                        )}
                      </Dropzone>    
                    </div>
                  </Paper>
                )
              )
            ]
          }
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(VideoPost);