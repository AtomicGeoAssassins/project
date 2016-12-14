import React from 'react';
import {getForumBoards, setActiveNavLink} from '../server';
export class Boards extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <p> hi </p> 
    );
  }
}
