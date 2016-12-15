import React from 'react';
import {getUserData, adjustPrice} from '../server';
import {getGameData, getGameById, setActiveNavLink} from '../server';
import GamesTable from './gamesTable';
import {Link} from 'react-router';
export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    setActiveNavLink("");
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
    var user = this.state.user ? this.state.user : {}

    return (
      <div className="">
        <div className="">
          <div className="col-md-3">
            <Link>
              <button className="btn" type="button" onClick={() => {
                user.bio = document.getElementById("biotext").value;
                user.eMail = document.getElementById("emailText").value;
                user.steamAccount = document.getElementById("steamText").value;
                }}>Save Changes</button>
            </Link>
            <h2>{user.userName}</h2>
            <img src="img/temporary_profile.png" width="5%" />
            <h3>Bio:</h3>
            <textarea id="biotext">{user.bio}</textarea>
            <h3>Email:</h3>
            <textarea id="emailText">{user.eMail}</textarea>
            <h3>Steam Account:</h3>
            <textarea id="steamText">{user.steamAccount}</textarea>
            <h3>Company:</h3>
            <p>{user.companyName}</p>
          </div>
          <div className="col-md-9">
            <h2>Watch List</h2>
            <GamesTable games={this.state.games} user={Object.keys(user).length == 0 ? undefined : user} />
          </div>
        </div>
      </div>
    );
  }
}
