import React from 'react';
import {setActiveNavLink, getTopics} from '../server';
import { Router, Link } from 'react-router';
export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  componentDidMount() {
    if(this.props.params.id) {
      getTopics(this.props.params.id, (topics) => {
        this.setState({topics: topics});
      });
    }
  }

  render() {
    var topics;

    if(this.state.topics) {
      topics = this.state.topics.map((topic) => {
        return (
          <li className="list-group-item" key={topic._id}><Link to={"/replies/"+topic._id}>{topic.title}</Link></li>
        );
      });
    }
    return (
      <div className="">
        <h1>Topics List</h1>
        <ul className="list-group">
          {topics}
        </ul>
        <a>New Topic</a>
      </div>
    );
  }
}
