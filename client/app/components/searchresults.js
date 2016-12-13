import React from 'react';
import GamesTable from './gamesTable';
import {getPopularGameData, getPriceyGameData, setActiveNavLink, getUserData} from '../server';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("");
    this.state = {
      page: "searchresults"
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

    getUserData("4", (user) => {
      this.setState({"user": user });
    });
  }

  render() {
    return (
    <div>
      <h2>Featured Games</h2>
      <GamesTable games={this.state.popularGames} user={this.state.user} />
      <h2>Highest Priced Games</h2>
      <GamesTable games={this.state.priceyGames} user={this.state.user} />
    </div>
    );
  }
}
