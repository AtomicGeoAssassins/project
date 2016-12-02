import React from 'react';
import {getUserData} from '../server';
import {getGameData} from '../server';
import {Link} from 'react-router';
export default class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      user: "",
      watchList: ""
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh()
  {
    getUserData("4", (user) => {
      this.setState({"user": user });
    });
    getGameData((games) => {
      this.setState({ "games": games });
    });
  }

  render() {
    var watchList;
    
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
              <table className="table table-hover">
              <thead className="baby-blue-header">
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
