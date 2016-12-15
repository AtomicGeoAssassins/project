import React from 'react';
import {setActiveNavLink, getForumBoards, postBoard} from '../server';
import { Router, Link } from 'react-router';
export default class Boards extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {};
  }

  clickBoard(e) {
    if(e) {
      this.props.router.push({ pathname: "/topics", board: boardId });
    }
  }

  newBoard(e) {
    e.preventDefault();
    var title = prompt("Board Name","");
    postBoard(title, (boards) => {
      this.setState({boards: boards});
    });
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
        //return (<li className="list-group-item" key={board._id}><a href="#" onClick={(e) => this.clickBoard(e) }>{board.title}</a></li>);
        return (<li className="list-group-item" key={board._id}><Link to={"/topics/"+board._id}>{board.title}</Link></li>);
      });
    }

    return (
      <div className="">
        <h1>Boards List</h1>
        <ul className="list-group">
          {boards}
        </ul>
        <a onClick={ (e) => this.newBoard(e)}>New Board</a>
      </div>
    );
  }
}
