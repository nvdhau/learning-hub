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
import Typography from '@material-ui/core/Typography';
import { getPostComments, createPostComment, createPostReplyComment } from '../../actions/post';
import { getUserIdToken } from '../../actions/authenticate';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
        displayCommentButtons: false,
        comments: [],
        replyTarget: {commentId: ''},
        replyBody: ''
    }
    this.renderCommentBox = this.renderCommentBox.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.toggleCommentButtons = this.toggleCommentButtons.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
    this.renderCommentList = this.renderCommentList.bind(this);
    this.renderReplyBox = this.renderReplyBox.bind(this);
    this.setReplyTarget = this.setReplyTarget.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.handleReplyTextChange = this.handleReplyTextChange.bind(this);
  }

  componentDidMount() {
    // api to get comments of this post
    getPostComments(getUserIdToken)(this.props.post.id)
      .then(data => {
        console.log("comments", data);
        this.setState({
          comments: data
        })
      }).catch(err => {
        console.log("err", err);
      })
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
    const jsonData = {
      content: e.target.commentText.value,
      authorId: this.props.appUser.id,
      authorFullName: this.props.appUser.fullName
    }

    createPostComment(getUserIdToken)(this.props.post.id, jsonData)
      .then(data => {
        console.log("data", data);
        this.setState({
          commentText: '',
          displayCommentButtons: false
        })
      }).then(_ => {
        getPostComments(getUserIdToken)(this.props.post.id)
        .then(data => {
          console.log("comments", data);
          this.setState({
            comments: data
          })
        }).catch(err => {
          console.log("err", err);
        })
      }).catch(err => {
        console.log("err", err);
      })

    
    e.preventDefault();
  }

  handleCommentTextChange(e) {
    // console.log(e.target.value);
    this.setState({
      commentText: e.target.value
    })
  }

  handleReplyTextChange(e) {
    this.setState({
      replyBody: e.target.value
    })
  }
  setReplyTarget(Comment) {
    this.setState({
      replyTarget: Comment
    })
  }

  handleReplySubmit(e) {
    // TODO: reply in side nested commment should have receiverId and ReceiverFullName
    const jsonData = {
      content: e.target.commentText.value,
      authorId: this.state.replyTarget.comment.authorId,
      authorFullName: this.state.replyTarget.comment.authorFullName,
      receiverId: null,
      receiveFullName: null
    }
    
    createPostReplyComment(getUserIdToken)(this.state.replyTarget.id, jsonData)
      .then(data => {
        console.log('data', data)
      }).catch(err => {
        console.log('err', err)
      })

    e.preventDefault();
  }

  renderReplyBox(Comment) {
    const { classes } = this.props;
    console.log("Comment reply", Comment);
    return (
      <Grid container spacing={1} direction="row" style={{'margin': '10px auto'}}>
        <Grid item xs={12} sm={1} md={1} lg={1}>
            <MyAvatar author={this.props.author} sizeAvatar={"smallAvatar"}/>
        </Grid>
        <Grid item xs={12} sm={11} md={11} lg={11}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleReplySubmit}>
                <TextField
                    id="standard-multiline-flexible"
                    label="Leave your comment here"
                    multiline
                    fullWidth
                    value={this.state.replyBody}
                    name='commentText'
                    onChange={this.handleReplyTextChange}
                    className={classes.textField}
                    />
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
                      onClick={() => this.setState({
                        replyTarget: {}
                      })}
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
            </form>
        </Grid>
      </Grid>
    )
  }

  renderCommentList() {
    return (
        <React.Fragment>
          {
            this.state.comments.map(
              (Comment) => 
              <Grid key={'comment-' + Comment.id} container spacing={1} direction="row">
                <Grid item xs={12} sm={1} md={1} lg={1}>
                    <MyAvatar author={Comment.comment.authorFullName}/>
                </Grid>
                <Grid item xs={12} sm={11} md={11} lg={11}>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    @{Comment.comment.authorFullName.replace(/\s+/g, '').toLowerCase()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {Comment.comment.content}
                  </Typography>
                  <Grid container spacing={3} direction="row">
                    {/* TODO: load reply box when user click on reply of a specific comment */}
                    {/* { this.renderReplyBox(Comment) } */}
                    { 
                      this.state.replyTarget.id === Comment.id ?
                      (
                        <React.Fragment>{this.renderReplyBox(Comment)}</React.Fragment>
                      ) : null
                    }
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        style={{'margin': '5px -3px', 'fontSize': '11px', 'fontWeight': 'bold'}}
                      >
                        {/* display number of replies, if replies is empty hide this button */}
                        View replies
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                    {
                      this.state.replyTarget.commentId !== Comment.id ?
                      (
                        <Button
                          variant="text"
                          color="default"
                          size="small"
                          style={{'float': 'right', 'marginTop': '5px'}}
                          onClick={() => this.setReplyTarget(Comment)}
                        >
                          Reply
                        </Button>
                      ) : null
                    } 
                    </Grid>
                  </Grid>
                  
                  {/* TODO: should have delete comment if author is the same with author's comment*/}
                </Grid>
              </Grid> 
            )
          }
        </React.Fragment>
    )
  }

  renderCommentBox(isComment = true) {
    const { classes } = this.props;
    return (
        <Grid container spacing={1} direction="row" style={{'margin': '10px auto'}}>
            <Grid item xs={12} sm={1} md={1} lg={1}>
                <MyAvatar author={this.props.author} sizeAvatar={isComment ? "avatar" : "smallAvatar"}/>
            </Grid>
            <Grid item xs={12} sm={11} md={11} lg={11}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleCommentSubmit}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Leave your comment here"
                        multiline
                        fullWidth
                        value={this.state.commentText}
                        name='commentText'
                        onFocus={this.handleOnFocus}
                        onChange={this.handleCommentTextChange}
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
          <GridItem xs={12} sm={12} md={12}>
            {this.renderCommentList()}
          </GridItem>
        </React.Fragment>
    )
  }
}



export default withStyles(styles)(Comment);
