import React from 'react';
import {getGameData} from '../server';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

 /* refresh() {
    getGameData((games) => {
      this.setState(games);
    });
  }
*/

  render() {

    /*
    popularGames = (
      { 
        games.map(game => {
          return (
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
          )
        });
      }
    );*/

    return (
    <div>
      <h2>Most Popular Games</h2>
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
          <tr>
            <td>Codename Keystone Racing&trade;</td>
            <td>$4.99</td>
            <td>$8.99</td>
            <td>$20.99</td>
          </tr>
          <tr>
            <td>Dog Duty 4&trade;</td>
            <td>$4.99</td>
            <td>$8.99</td>
            <td>$20.99</td>
          </tr>
          <tr>
            <td>Deer Counter Attack: The Prelude&trade;</td>
            <td>$49.99</td>
            <td>$49.99</td>
            <td>$49.99</td>
          </tr>
        </tbody>
      </table>
      <h2>Highest Priced Games</h2>
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
          <tr>
            <td>Action Packed Smash Smasher&trade;</td>
            <td>$110.99</td>
            <td>$99.99</td>
            <td>$20.99</td>
          </tr>
          <tr>
            <td>Block MAADDDNESS 2k16&trade;</td>
            <td>$699.99</td>
            <td>$34.99</td>
            <td>$1.99</td>
          </tr>
          <tr>
            <td>Big Bob's Deer Huntin' 4&trade;</td>
            <td>$299.99</td>
            <td>$107.42</td>
            <td>$20.99</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }
}
