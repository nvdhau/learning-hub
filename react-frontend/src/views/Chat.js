import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../assets/jss/views/generalStyle';
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Container from '@material-ui/core/Container';
import 'react-chat-elements/dist/main.css';
import {
  // MessageBox,
  // ChatItem,
  ChatList,
  // SystemMessage,
  MessageList,
  Input,
  Button as ChatButton,
  // Avatar,
  // Navbar,
  // SideBar,
  // Dropdown,
  // Popup,
} from 'react-chat-elements';
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:5000/');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      messageList: [
        {
          position: 'right',
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
          date: new Date(),
        },
        {
          position: 'left',
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
          date: new Date(),
        },
      ],
    };
  }

  componentDidMount() {
    socket.emit('init', this.props.appUser.id, () => {});
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GridContainer spacing={1} direction="row">
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Container component="main" maxWidth="md" style={{'height': '100%'}}>
              <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={this.state.messageList} />
              <div style={{'margin': '10px auto'}}></div>
              <Input
                    placeholder="Mesajınızı buraya yazınız."
                    defaultValue=""
                    ref='input'
                    multiline={true}
                    // buttonsFloat='left'
                    style={{'backgroundColor': '#cccccc'}}
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            this.refs.input.clear();
                            this.addMessage();
                            e.preventDefault();
                            return false;
                        }
                    }}
                    rightButtons={
                        <ChatButton
                            text='Send'
                            // onClick={this.addMessage.bind(this)} 
                            />
                    } />
            </Container>
          </GridItem>
        </GridContainer>
        
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Chat);