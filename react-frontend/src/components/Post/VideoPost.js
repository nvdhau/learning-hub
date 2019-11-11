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

class VideoPost extends Component {
  constructor(props) {
    super(props);
    this.handerDrop = this.handerDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
  }

  handerDrop (file) {
    
    if (file.length > 0) {
      console.log(file);
      // upload video and return progress, if the upload done, redirect to post form info
    }
  }

  handleDropRejected () {
    toast.error("Error! Cannnot upload this type of file.");
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <Grid item xs={12} md={12}>
              <Paper>
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
            </Grid>
            
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(VideoPost);