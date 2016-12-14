import React from 'react';
import {setActiveNavLink, getForumBoards} from '../server';
export default class Boards extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  clickBoard(boardId) {
    this.context.router.push({ pathname: "/topics", board: boardId });
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
