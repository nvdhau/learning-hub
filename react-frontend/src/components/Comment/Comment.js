import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/views/generalStyle';
import GridItem from "../../components/Grid/GridItem";
import MyAvatar from "../../components/Avatar/Avatar";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getPostComments, createPostComment, createPostReplyComment } from '../../actions/post';
import { getUserIdToken } from '../../actions/authenticate';
import InputAdornment from '@material-ui/core/InputAdornment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
        displayCommentButtons: false,
        comments: [],
        // replyTarget: {commentId: ''},
        replyTarget: {},
        nestedReplyTarget: {},
        replyBody: '',
        nestedReplyBody: ''
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
    this.toggleReplies = this.toggleReplies.bind(this);
    this.renderRepliesList = this.renderRepliesList.bind(this);
    this.renderNestedReplyBox = this.renderNestedReplyBox.bind(this);
    this.setNestedReplyTarget = this.setNestedReplyTarget.bind(this);
    this.handleNestedReplySubmit = this.handleNestedReplySubmit.bind(this);
    this.handleNestedReplyTextChange = this.handleNestedReplyTextChange.bind(this);
    this.loadComments = this.loadComments.bind(this);
  }

  loadComments() {
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

  componentDidMount() {
    // api to get comments of this post
    this.loadComments();
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
        this.loadComments();
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
  handleNestedReplyTextChange(e) {
    console.log("nested reply", e.target.value);
    this.setState({
      nestedReplyBody: e.target.value
    })
  }

  setReplyTarget(Comment) {
    this.setState({
      replyTarget: Comment
    })
  }

  setNestedReplyTarget(Comment) {
    this.setState({
      nestedReplyTarget: Comment,
      nestedReplyBody: ''
    })
  }

  handleReplySubmit(e) {
    // TODO: reply in side nested commment should have receiverId and ReceiverFullName
    const jsonData = {
      content: e.target.commentText.value,
      authorId: this.props.appUser.id,
      authorFullName: this.props.appUser.fullName,
      receiverId: null,
      receiveFullName: null
    }

    createPostReplyComment(getUserIdToken)(this.state.replyTarget.id, jsonData)
      .then(data => {
        console.log('data', data)
        this.setState({
          commentText: '',
          replyTarget: {}
        })
      }).then(_ => {
        this.loadComments();
      }).catch(err => {
        console.log('err', err)
      })

    e.preventDefault();
  }

  handleNestedReplySubmit(e) {
    console.log('taguser', e.target.tagReplyUser.value);
    console.log('receiverId', e.target.receiverId.value);
    console.log('receiverFullName', e.target.receiverFullName.value);
    const tagUser = e.target.tagReplyUser.value;
    const mainCommentId = e.target.mainCommentId.value;

    const jsonData = {
      content: e.target.commentText.value,
      authorId: this.props.appUser.id,
      authorFullName: this.props.appUser.fullName,
      receiverId: tagUser ?  e.target.receiverId.value: null,
      receiveFullName: tagUser ?  e.target.receiverFullName.value: null,
    }

    console.log('data', jsonData);

    createPostReplyComment(getUserIdToken)(mainCommentId, jsonData)
      .then(data => {
        console.log('data', data)
        this.setState({
          nestedReplyTarget: {},
          nestedReplyBody: ''
        })
      }).then(_ => {
        this.loadComments();
      }).catch(err => {
        console.log('err', err)
      })

    e.preventDefault();
  }

  toggleReplies() {
    // should toggle replies mesages

  }

  renderRepliesList(replies) {
    const repliesData = replies.data;
    return (
      <React.Fragment>
        {
          repliesData.map((rep, index) => 
            <Grid key={'replie-' + index} container spacing={1} direction="row" style={{'paddingBottom': '15px'}}>
              <Grid item xs={12} sm={1} md={1} lg={1}>
                <MyAvatar author={rep.authorFullName} sizeAvatar="xsAvatar"/>
              </Grid>
              <Grid item xs={12} sm={11} md={11} lg={11}>
                <Typography gutterBottom variant="subtitle2" component="h2">
                    {/* @{rep.authorFullName.replace(/\s+/g, '').toLowerCase()} */}
                    {rep.authorFullName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <span style={{'fontStyle': 'italic', 'color': 'blue'}}>{rep.receiveFullName ? '@' + rep.receiveFullName : ''}</span>
                  {" " + rep.content}
                </Typography>
                <Grid container spacing={3} direction="row">
                  { 
                      this.state.nestedReplyTarget.createdAt === rep.createdAt ?
                      (
                        <React.Fragment>{this.renderNestedReplyBox(rep, replies.commentId)}</React.Fragment>
                      ) : null
                  }
                  <Grid item xs={12} sm={12} md={12} lg={12} style={{'padding': '5px'}}>
                    {
                      this.state.nestedReplyTarget.createdAt !== rep.createdAt && (
                        <Button
                          variant="text"
                          color="default"
                          size="small"
                          style={{'margin': '5px auto', 'color': '#cccccc'}}
                          onClick={() => this.setNestedReplyTarget(rep)}
                        >
                          Reply
                        </Button>
                      )
                    }  
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </React.Fragment>
    )
  }

  renderNestedReplyBox(Comment, commentId) {
    const { classes } = this.props;
    const needTagReplyUser = Comment.authorFullName === this.props.appUser.fullName ? '' : '@' + Comment.authorFullName.replace(/\s+/g, '').toLowerCase();
    return (
      <Grid container spacing={1} direction="row" style={{'margin': '10px auto'}}>
        <Grid item xs={12} sm={1} md={1} lg={1}>
            <MyAvatar author={this.props.author} sizeAvatar={"smallAvatar"}/>
        </Grid>
        <Grid item xs={12} sm={11} md={11} lg={11}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleNestedReplySubmit}>
                <TextField
                    id="standard-multiline-flexible-maincommentid"
                    value={commentId}
                    name='mainCommentId'
                    type="hidden"
                    />
                <TextField
                    id="standard-multiline-flexible-needTargetUser"
                    value={needTagReplyUser}
                    name='tagReplyUser'
                    type="hidden"
                    />
                <TextField
                    id="standard-multiline-flexible-receiverId"
                    value={Comment.authorId}
                    name='receiverId'
                    type="hidden"
                    />
                <TextField
                    id="standard-multiline-flexible-receiverFullName"
                    value={Comment.authorFullName}
                    name='receiverFullName'
                    type="hidden"
                    />
                <TextField
                    id="standard-multiline-flexible"
                    label="Leave your comment here"
                    multiline
                    fullWidth
                    InputProps={{
                    startAdornment: <InputAdornment position="start">{needTagReplyUser}</InputAdornment>,
                    }}
                    value={this.state.nestedReplyBody}
                    name='commentText'
                    onChange={this.handleNestedReplyTextChange}
                    className={classes.textField}
                    />
                  <React.Fragment>
                    <Button
                      type="submit"
                      variant="contained"
                      color="default"
                      size="small"
                      style={{'float': 'right', 'marginTop': '5px', 'marginLeft': '5px', 'marginRight': '5px'}}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="text"
                      color="default"
                      size="small"
                      style={{'float': 'right', 'marginTop': '5px'}}
                      onClick={() => this.setState({
                        nestedReplyTarget: {},
                        nestedReplyBody: ''
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
              <Grid key={'comment-' + Comment.id} container spacing={1} direction="row" style={{'margin': '0px 4px'}}>
                <Grid item xs={12} sm={1} md={1} lg={1}>
                    <MyAvatar author={Comment.comment.authorFullName} sizeAvatar="smallAvatar"/>
                </Grid>
                <Grid item xs={12} sm={11} md={11} lg={11}>
                  <Typography gutterBottom variant="subtitle2" component="h2">
                    {/* @{Comment.comment.authorFullName.replace(/\s+/g, '').toLowerCase()} */}
                    {Comment.comment.authorFullName}
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
                      {
                        Comment.replies.data.length > 0 ? (
                        <Button
                          variant="text"
                          color="primary"
                          size="small"
                          style={{'margin': '5px -3px', 'fontSize': '11px', 'fontWeight': 'bold'}}
                          onClick={this.toggleReplies}
                        >
                          {/* display number of replies, if replies is empty hide this button */}
                          ({Comment.replies.data.length}) replies
                        </Button>
                        ) : null
                      }

                      {
                        this.state.replyTarget.id !== Comment.id && (
                          <Button
                            variant="text"
                            color="default"
                            size="small"
                            style={{'marginTop': '0px', 'color': '#cccccc'}}
                            onClick={() => this.setReplyTarget(Comment)}
                          >
                            Reply
                          </Button>
                        )
                      }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      
                    </Grid>
                    {/* display nested comments */}
                    {
                      Comment.replies.data.length > 0 && ( 
                        <React.Fragment>{this.renderRepliesList(Comment.replies)}</React.Fragment>
                      )
                    }
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
        <Grid container spacing={1} direction="row" style={{'margin': '0px auto'}}>
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
