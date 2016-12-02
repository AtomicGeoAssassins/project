import React from 'react';
import {getPopularGameData, getPriceyGameData, setActiveNavLink, adjustPrice} from '../server';
import {Link} from 'react-router';
import GamesTable from './gamesTable';
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
    return (
    <div>
      <h2>Featured Games</h2>
      <GamesTable games={this.state.popularGames} />
      <h2>Highest Priced Games</h2>
      <GamesTable games={this.state.priceyGames} />
    </div>
    );
  }
}
