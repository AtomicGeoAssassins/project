import React from 'react';
import {adjustPrice,watchGame,unwatchGame,getUserData} from '../server';

export default class GamesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      user: this.props.user, //in case we wanted to fetch from a different user
      watchList: ""
    };
  }

  componentDidMount() {
    if(!this.props.user) //dont redefine
      getUserData("4", (user) => {
        this.setState({"user": user });
      });
  }

  refresh() {
    //get latest
    getUserData("4", (user) => {
      this.setState({"user": user });
    });
  }

  render() {
    var watchList;
    var renderActions = (appid,user) => {
      if(!user) return; //will rerender latter
      appid = parseInt(appid);
      if(user.watchList.indexOf(appid) == -1) { //is not watching game
        //render link to watch it
        return (<a href="#" onClick={ () => { watchGame(user.id,appid,() => { this.refresh();})}}>Watch Game</a>);
      } else {
        //render link to unwatch it
        return (<a href="#" onClick={ () => { unwatchGame(user.id,appid,() => { this.refresh();})}}>Unwatch Game</a>);
      }
    };

    if(this.props.games) {
      watchList = (
        this.props.games.map((game,i) => {
          if(typeof(game) != "object"){
            return;
          }
          return (
            <tr key={parseInt(game.id)}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
              <td>{renderActions(game.id,this.state.user)}</td>
            </tr>
          )
        })
      );
    }

    return (
      <div className="">
        <table className="table table-hover">
          <thead className="baby-blue-header">
            <tr>
              <th>Game</th>
              <th>Original Price</th>
              <th>Today's Price</th>
              <th>Next Months Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchList}
          </tbody>
        </table>
      </div>
    );
  }
}
