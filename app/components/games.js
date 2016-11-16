import React from 'react';
import {getGameData} from '../server';
export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }
  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getGameData((games) => {
      this.setState({ "games": games });
    });
  }
  render(){
    var Games;
    if(this.state.games) {
      Games = (
        this.state.games.map((game,i) => {
          return (
            <tr key={"line"+i}>
              <td>{game.title}</td>
              <td>{game.beforePrice}</td>
              <td>{game.currentPrice}</td>
              <td>{game.futurePrice}</td>
            </tr>
          )
        })
      );
    }
    return(
      <div>
        <div>
          <h2>List of Games</h2>
          <table className="table table-hover">
            <thead className="baby-blue-header">
              <tr>
                <th>Game</th>
                <th>Tomorrow's Price</th>
                <th>Yesterday's Price</th>
                <th>Last Month's Price</th>
              </tr>
            </thead>
            <tbody>
              {Games}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
