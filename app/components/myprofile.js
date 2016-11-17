import React from 'react';
import {getUserData} from '../server';
import {getGameData} from '../server';
import {Link} from 'react-router';
export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      users: "",
      watchList: ""
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh()
  {
    getUserData("1", (users) => {
      this.setState({ "users": users });
    });
    getGameData((games) => {
      this.setState({ "games": games });
    });
  }

  render() {
    var Users;
    var watchList;

    if(this.state.users) {
      Users = (
        this.state.users.map((user,i) => {
          return (
            <tr key={"line"+i}>
              <td>{this.state.users.userName}</td>
              <td>{this.state.users.bio}</td>
              <td>{this.state.users.eMail}</td>
              <td>{this.state.users.steamAccount}</td>
              <td>{this.state.users.companyName}</td>
            </tr>
          )
        })
      );
    }

    if(this.state.games) {
      watchList = (
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

    return
    (
    <div class="main-content">
      <div class="col-md-8  col-md-offset-2">
        <div class="col-md-3">
          <button class="btn" type="button">Edit Profile</button>
          //<h2>{Users.userName}</h2>
          <img src="img/temporary_profile.png" width="5%" />
          <h3>Bio:</h3>
          //<p>{Users.bio}</p>
          <h3>Email:</h3>
          //<p>{Users.eMail}</p>
          <h3>Steam Account:</h3>
          //<p>{Users.steamAccount}</p>
          <h3>Company:</h3>
          //<p>{Users.companyName}</p>
        </div>
        <div class="col-md-9">
          <h2>Watch List</h2>
            <table class="table table-hover">
            <thead class="baby-blue-header">
              <tr>
                <th>Game</th>
                <th>Tomorrow Price</th>
                <th>Yesterdays Price</th>
                <th>Last Months Price</th>
              </tr>
            </thead>
            <tbody>
              {watchList}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
}
