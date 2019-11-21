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

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commentText: ''
    }
    this.renderCommentBox = this.renderCommentBox.bind(this);
  }

  componentDidMount() {
    // // get post details
    // this.setState({
    //   loading: true
    // })
    // getPostDetail(getUserIdToken)(this.props.match.params.postid)
    //   .then(post => {
    //     console.log('post', post);
    //     this.setState({
    //       post: post,
    //       loading: false
    //     })
    //   }).catch(err => {
    //     console.log(err);
    //   })
  }

  renderCommentBox() {
    const { classes } = this.props;
    return (
        <Grid container spacing={1} direction="row">
            <Grid item xs={12} sm={1} md={1} lg={1}>
                <MyAvatar author={this.props.author}/>
            </Grid>
            <Grid item xs={12} sm={11} md={11} lg={11}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="standard-multiline-flexible"
                        label="Leave your comment here"
                        multiline
                        value={this.state.commentText}
                        fullWidth
                        // onChange={handleChange}
                        className={classes.textField}
                        />
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
