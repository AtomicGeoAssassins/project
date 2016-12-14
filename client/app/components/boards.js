import React from 'react';
import {setActiveNavLink, getForumBoards} from '../server';
import { Router, Link } from 'react-router';
export default class Boards extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  clickBoard(boardId) {
    if(boardId) {
      this.context.router.push({ pathname: "/topics", board: boardId });
    }
  }

  componentDidMount() {
    getForumBoards((boards) => {
      this.setState({boards: boards});
    });
  }

  render() {
    var boards;
    if(this.state.boards) {
      boards = this.state.boards.map((board) => {
        return (<li className="list-group-item" key={board._id}><Link>{board.title}</Link></li>);
      });
    }

    return (
      <div className="">
        <h1>Boards List</h1>
        <ul className="list-group">
          {boards}
        </ul>
      </div>
    );
  }
}
