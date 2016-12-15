import React from 'react';
import GamesTable from './gamesTable';
import {getPopularGameData, getPriceyGameData, setActiveNavLink, getUserData, postSearchGameData} from '../server';

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

    getUserData("4", (user) => {
      this.setState({"user": user });
    });
  }

  render() {
    return (
    <div>
      <h2>Featured Games</h2>
      <GamesTable games={this.state.priceyGames} user={this.state.user} />
    </div>
    );
  }
}
