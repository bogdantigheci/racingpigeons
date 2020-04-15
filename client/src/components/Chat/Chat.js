import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: [],
    };
  }

  componentDidMount() {
    const username = `${this.props.user.userData.name} ${this.props.user.userData.lastname}`;
    this.setState({ username });
    const pusher = new Pusher('09209d10f8713174ce28', {
      cluster: 'eu',
      useTLS: true,
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      };
      axios.post('http://localhost:3002/message', payload);
      this.setState({
        text: '',
      });
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div className="container">
        <h5 className="chat_page_title">{`Welcome ${this.state.username} `}</h5>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
         
        </section>
      </div>
    );
  }
}

export default Chat;
