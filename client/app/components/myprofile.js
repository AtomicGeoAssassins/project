import React from 'react';
import {getUserData, adjustPrice} from '../server';
import {getGameData, getGameById} from '../server';
import GamesTable from './gamesTable';
import {Link} from 'react-router';
export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      watchList: ""
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh()
  {
    getUserData("4", (user) => {
      var games = user.watchList.join(",");
      getGameById(games, (games) => { //returns a json containing the games
        this.setState({"games": games});
      });
      this.setState({"user": user });
    });
  }

  render() {

    return (
      <div className="">
        <div className="">
          <div className="col-md-3">
            <button className="btn" type="button">Edit Profile</button>
            <h2>{this.state.user.userName}</h2>
            <img src="img/temporary_profile.png" width="5%" />
            <h3>Bio:</h3>
            <p>{this.state.user.bio}</p>
            <h3>Email:</h3>
            <p>{this.state.user.eMail}</p>
            <h3>Steam Account:</h3>
            <p>{this.state.user.steamAccount}</p>
            <h3>Company:</h3>
            <p>{this.state.user.companyName}</p>
          </div>
          <div className="col-md-9">
            <h2>Watch List</h2>
            <GamesTable games={this.state.games} user={this.state.user} />
          </div>
        </div>
      </div>
    );
  }
}
