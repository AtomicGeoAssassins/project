import React from 'react';
import {getGameData} from '../server';
export default class Home extends React.Component {
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

  render() {
    var popularGames;
    var highestPricedGames;
    if(this.state.games) {
      popularGames = (
        this.state.games.map((game,i) => {
          return (
            <tr key={"line"+i}>
              <td>{<a href="graph.js"> game.title </a>}</td>
              <td>{game.beforePrice}</td>
              <td>{game.currentPrice}</td>
              <td>{game.futurePrice}</td>
            </tr>
          )
        })
      );

      highestPricedGames = (
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

    return (
    <div>
      <h2>Most Popular Games</h2>
      <table className="table table-hover">
        <thead className="baby-blue-header">
          <tr>
            <th>Game</th>
            <th>Yesterday's Price</th>
            <th>Today's Price</th>
            <th>Tomorrow's Price</th>
          </tr>
        </thead>
        <tbody>
        {popularGames}
        </tbody>
      </table>
      <h2>Highest Priced Games</h2>
      <table className="table table-hover">
        <thead className="baby-blue-header">
          <tr>
            <th>Game</th>
            <th>Yesterday's Price</th>
            <th>Today's Price</th>
            <th>Tomorrow's Price</th>
          </tr>
        </thead>
        <tbody>
        {highestPricedGames}
        </tbody>
      </table>
    </div>
    );
  }
}
