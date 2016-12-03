import React from 'react';
import {adjustPrice} from '../server';

export default class GamesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      watchList: "",
      games: props.games
    };
  }

  render() {
    var watchList;
    var renderActions = function (appid) {
      if(this.props.user.watchList.indexOf(appid) == -1) { //is not watching game
        //render link to watch it
        return ();
      } else {
        //render link to unwatch it
        return (<a href="#" onClick={}>Unwatch</a>);
      }
    };


    if(this.props.games) {
      watchList = (
        this.props.games.map((game,i) => {
          return (
            <tr key={game.appid}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
              <td>{renderActions(game.appid)}</td>
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
