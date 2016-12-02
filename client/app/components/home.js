import React from 'react';
import {getPopularGameData, getPriceyGameData, setActiveNavLink} from '../server';
import {Link} from 'react-router';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Home");
    this.state = {
      page: "home"
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getPopularGameData((games) => {
      this.setState({ "popularGames": games });
    });

    getPriceyGameData((games) => {
      this.setState({ "priceyGames": games });
    });
  }

  render() {
    var popularGames;
    var highestPricedGames;

    var adjustPrice = (price) => {
      if(price == null) return;
      price = price.toString();
      return price.slice(0,price.length-2) + "." + price.slice(price.length-2,price.length);
    }

    if(this.state.popularGames) {
      popularGames = (
        this.state.popularGames.map((game,i) => {
          return (
            <tr key={"line"+i}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
            </tr>
          )
        })
      );
    }
    
    if(this.state.priceyGames) {
      highestPricedGames = (
        this.state.priceyGames.map((game,i) => {
          return (
            <tr key={"line"+i}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
            </tr>
          )
        })
      );
    }

    return (
    <div>
      <h2>Featured Games</h2>
      <table className="table table-hover">
        <thead className="baby-blue-header">
          <tr>
            <th>Game</th>
            <th>Original Price</th>
            <th>Today's Price</th>
            <th>Estimated Tomorrow's Price</th>
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
            <th>Original Price</th>
            <th>Today's Price</th>
            <th>Estimated Tomorrow's Price</th>
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
