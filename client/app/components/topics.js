import React from 'react';
import {getForumBoards, setActiveNavLink} from '../server';
export class Boards extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
  }

  clickBoard(boardId) {
    this.context.router.push({ pathname: "/topics", board: boardId });
  }

  componentDidMount() {
    
  }

  render() {
    var boards;
    if(this.state.boards) {
      boards = this.state.boards.map((board) => {
        return (<ul onClick={clickBoard(board._id)}>{board.title}</ul> );
      });
    }

    return (
      <div className="">
        <h1>Boards List</h1>
        <ul>
          {boards}
        </ul>
      </div>
    );
  }
}
