import React from 'react';
import {adjustPrice,watchGame,unwatchGame} from '../server';

export default class GamesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      watchList: ""
    };
  }

  render() {
    var watchList;
    var renderActions = (appid,user) => {
      if(!user) return; //will rerender latter
      if(user.watchList.indexOf(appid) == -1) { //is not watching game
        //render link to watch it
        return (<a href="#" onClick={ () => { watchGame(user.id,appid,() => { this.setState(this.state); });}}>Watch Game</a>);
      } else {
        //render link to unwatch it
        return (<a href="#" onClick={ () => { unwatchGame(user.id,appid,() => { this.setState(this.state); }); }}>Unwatch Game</a>);
      }
    };

    if(this.props.games) {
      watchList = (
        this.props.games.map((game,i) => {
          return (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
              <td>{renderActions(game.id,this.props.user)}</td>
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
              <th>Tomorrow Price</th>
              <th>Yesterdays Price</th>
              <th>Last Months Price</th>
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
