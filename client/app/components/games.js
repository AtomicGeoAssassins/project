import React from 'react';
import {getPopularGameData} from '../server';
import {setActiveNavLink} from '../server';
export default class Games extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Games");
    this.state = {
      contents: []
    };
  }
  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getPopularGameData((games) => {
      this.setState({ "games": games });
    });
  }
  render(){
    var Games;

    var adjustPrice = (price) => {
      if(price == null || price == 0) return "Free!";
      price = price.toString();
      return "$" + price.slice(0,price.length-2) + "." + price.slice(price.length-2,price.length);
    }

    if(this.state.games) {
      Games = (
        this.state.games.map((game,i) => {
          return (
            <tr key={"line"+i}>
              <td>{game.name}</td>
              <td>{adjustPrice(game.original_price)}</td>
              <td>{adjustPrice(game.final_price)}</td>
              <td>{adjustPrice(game.future_price)}</td>
            </tr>
          )
        })
      );
    }
    return(
      <div>
        <div>
          <h2>List of Games</h2>
          <table className="table table-hover">
            <thead className="baby-blue-header">
              <tr>
                <th>Game</th>
                <th>Tomorrow's Price</th>
                <th>Yesterday's Price</th>
                <th>Last Month's Price</th>
              </tr>
            </thead>
            <tbody>
              {Games}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
