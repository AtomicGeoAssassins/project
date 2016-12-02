import React from 'react';
export default class GamesTable extends React.Component {
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

  render() {
    var watchList;
    
    if(this.props.games) {
      watchList = (
        this.props.games.map((game,i) => {
          return (
            <tr key={game.appid}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
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
