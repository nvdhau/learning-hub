import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/views/upload';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MySelect from "../../components/Form/Select";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showInfoForm: false
    }
    this.toggleInfoForm = this.toggleInfoForm.bind(this);
  }

  componentDidMount() {
    console.log("didmount", this.props.resetForm)
  }

  componentDidUpdate(prevProps) {
    console.log("didupdate", this.props.resetForm)
    if (prevProps.resetForm !== this.props.resetForm) {
      this.setState({
        showInfoForm: false
      })
    }
  }

  toggleInfoForm () {
    this.setState({
      showInfoForm: !this.state.showInfoForm
    })
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <form className={classes.form} noValidate onSubmit={this.props.submitHandler}>
                {
                  !this.state.showInfoForm ? (
                    <React.Fragment>
                      <SimpleMDE 
                        id="editorPostDescription"
                        name="postDecription"
                        onChange={this.props.editorChangeHandler} 
                        value={this.props.editorText}
                      />
                      <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={this.toggleInfoForm}
                      >
                      Finish editing
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Container component="main" maxWidth="sm">
                      <Grid container spacing={2}>
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
                          <TextField
                              variant="outlined"
                              fullWidth
                              name="image"
                              type="file"
                              id="image"
                          />
                          <Typography variant="caption" display="block" gutterBottom>
                            *** Please select an thumbnail image for you blog.
                          </Typography>
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
                              onClick={this.toggleInfoForm}
                          >
                          Back to editor
                          </Button>  
                        </Grid> 
                      </Grid>  
                      </Container>
                    </React.Fragment>
                  )
                }
            </form>
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(BlogPost);
