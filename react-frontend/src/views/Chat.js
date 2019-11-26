import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { getUserIdToken, getUserDetails } from '../actions/authenticate';
import 'react-chat-elements/dist/main.css';
import MyAvatar from "../components/Avatar/Avatar";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  ChatList,
  MessageList,
  Input,
  Button as ChatButton,
} from 'react-chat-elements';
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:5000/');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      authorUser: '',
      messageChat: '',
      messageList: [],
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    getUserDetails(getUserIdToken)(this.props.match.params.author_uid)
    .then(data => {
      this.setState({
        authorUser: data
      })
    }).then(_ => {
      this.loadUploadPosts();
    }).catch(err => {
      console.log('err', err);
    })

    socket.emit('init', this.props.appUser.id, () => {});
    socket.on('receiveMsg', (e) => {
      console.log("mes", e.content);
      console.log("type", e.type);
      console.log("userid", e.userUid);
      const newMessage = {
        position: this.props.appUser.id === e.userUid ? 'right' : 'left',
        type: e.type === 0 ? 'text' : '',
        text: e.content,
        date: new Date()
      }
      this.setState({
        messageList: [...this.state.messageList, newMessage]
      })
    })
  }

  handleOnChange(e) {
    this.setState({messageChat: e.target.value})
  }

  addMessage(e) {
    console.log(this.state.messageChat);
    const message = this.state.messageChat;
    socket.emit('sendMsg', 
      this.props.appUser.id, 
      this.props.match.params.author_uid, message);

    const newMessage = {
        position: 'right',
        type: 'text',
        text: message,
        date: new Date()
      }
    this.setState({
      messageList: [...this.state.messageList, newMessage]
    })
    this.refs.input.clear();
  }
  render() {
    const { classes } = this.props;
    console.log("mesage", this.state.messageList);
    return (
      <React.Fragment>
        <GridContainer spacing={1} direction="row">
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Container component="main" maxWidth="md" style={{'height': '100%'}}>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <GridContainer spacing={1} direction="row">
                  <GridItem xs={12} sm={1} md={1} lg={1}>
                      <MyAvatar author={this.state.authorUser && this.state.authorUser.fullName}/>
                  </GridItem>
                  <GridItem xs={12} sm={11} md={11} lg={11}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={10} md={10} lg={10}>
                        <Typography variant="subtitle1" gutterBottom>
                        {this.state.authorUser.fullName}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
                        @{this.state.authorUser.username}
                      </Typography>
                      </Grid>
                    </Grid>  
                  </GridItem>
                </GridContainer>
              </GridItem>
              <Paper className={classes.root} style={{'backgroundColor': '#cccccc'}}>
                <MessageList
                  className='message-list'
                  lockable={true}
                  toBottomHeight={'100%'}
                  dataSource={this.state.messageList} />
                  <div style={{'margin': '10px auto'}}></div>
                <Input
                      placeholder="Place your message"
                      defaultValue={this.state.messageChat}
                      ref='input'
                      value={this.state.messageChat}
                      multiline={true}
                      onChange={this.handleOnChange}
                      rightButtons={
                          <ChatButton
                              text='Send'
                              onClick={this.addMessage} 
                              />
                      } />
              </Paper>
              
            </Container>
          </GridItem>
        </GridContainer>
        
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Chat);