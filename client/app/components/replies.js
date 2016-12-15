import React from 'react';
import {setActiveNavLink, getReplies, postReply} from '../server';
import { Router, Link } from 'react-router';
export default class Replies extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  componentDidMount() {
    if(this.props.params.id) {
      getReplies(this.props.params.id, (replies) => {
        this.setState({replies: replies});
      });
    }
  }

  reply(e) {
    e.preventDefault();
    var reply = prompt("Reply to this topic:","");
    postReply(reply, this.props.params.id, (replies) => {
      this.setState({replies: replies});
    });
  }

  render() {
    var replies;

    if(this.state.replies) {
      replies = this.state.replies.map((reply) => {
        return (
          <li className="list-group-item" key={reply._id}>{reply.content}</li>
        );
      });
    }
    return (
      <div className="">
        <h1>Replies</h1>
        <ul className="list-group">
          {replies}
        </ul>
        <a href="#" onClick={ (e) => this.reply(e) }>New Reply</a>
      </div>
    );
  }
}
