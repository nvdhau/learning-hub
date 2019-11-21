import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/views/generalStyle';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import MyAvatar from "../../components/Avatar/Avatar";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
        displayCommentButtons: false
    }
    this.renderCommentBox = this.renderCommentBox.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.toggleCommentButtons = this.toggleCommentButtons.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  handleOnFocus() {
    this.setState({
      displayCommentButtons: true
    })
  }

  toggleCommentButtons() {
    this.setState({
      displayCommentButtons: false
    })
  }

  handleCommentSubmit(e) {
    console.log(e.target.commentText.value);
    this.setState({
      displayCommentButtons: false
    })
    e.preventDefault();
  }

  renderCommentBox() {
    const { classes } = this.props;
    return (
        <Grid container spacing={1} direction="row">
            <Grid item xs={12} sm={1} md={1} lg={1}>
                <MyAvatar author={this.props.author}/>
            </Grid>
            <Grid item xs={12} sm={11} md={11} lg={11}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleCommentSubmit}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Leave your comment here"
                        multiline
                        fullWidth
                        name='commentText'
                        onFocus={this.handleOnFocus}
                        // onChange={handleChange}
                        className={classes.textField}
                        />
                    {
                      this.state.displayCommentButtons && (
                        <React.Fragment>
                          <Button
                            type="submit"
                            variant="contained"
                            color="default"
                            style={{'float': 'right', 'marginTop': '5px', 'marginLeft': '5px'}}
                          >
                            Submit
                          </Button>
                          <Button
                            variant="text"
                            color="default"
                            style={{'float': 'right', 'marginTop': '5px'}}
                            onClick={this.toggleCommentButtons}
                          >
                            Cancel
                          </Button>
                        </React.Fragment>
                      )
                    }  
                </form>
            </Grid>
        </Grid>
    )
  }

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
          <GridItem xs={12} sm={12} md={12}>
            {this.renderCommentBox()}
          </GridItem>
        </React.Fragment>
    )
  }
}



export default withStyles(styles)(Comment);
