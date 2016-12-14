import React from 'react';
import {setActiveNavLink, getTopics} from '../server';
import { Router, Link } from 'react-router';
export default class Replies extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  componentDidMount() {
    getTopics(this.props.id, (topics) => {
      this.setState({topics: topics});
    });
  }

  render() {
    var topics;

    if(this.state.topics) {
      topics = this.state.topics.map((topic) => {
        return (
          <li className="list-group-item">{topic.name}</li>
        );
      });
    }
    return (
      <div className="">
        <h1>Topics List</h1>
        <ul className="list-group">
          {topics}
        </ul>
      </div>
    );
  }
}
