import React from 'react';
import {getGameData} from '../server';
import {Link} from 'react-router';
export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getGameData((games) => {
      this.setState({ "games": games });
    });
  }

  render() {
    var popularGames;
    var highestPricedGames;
    if(this.state.games) {
      popularGames = (
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

      highestPricedGames = (
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

<div class="main-content">
  <div class="col-md-8  col-md-offset-2">
    <div class="col-md-3">
      <button class="btn" type="button">Edit Profile</button>
      <h2>Theo Proulx</h2>
      <img src="img/temporary_profile.png" width="50%" />
      <h3>Bio:</h3>
      <p>My name is Theo and I love to buy and sell games. This website lets me know what games to buy keys for on Steam so I can sell them on G2A and make the best possible profit. I love StarVestments!</p>
      <h3>Email:</h3>
      <p>thisisnotmyrealemail@gmail.com</p>
      <h3>Steam Account:</h3>
      <p>TheoSteamAccount88</p>
      <h3>Company:</h3>
      <p>AtomicGeoAssassins</p>
    </div>
    <div class="col-md-9">
      <h2>Watch List</h2>
      <table class="table table-hover">
        <thead class="baby-blue-header">
          <tr>
            <th>Game</th>
            <th>Tomorrow's Price</th>
            <th>Yesterday's Price</th>
            <th>Last Month's Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dorito Chase 321&trade;</td>
            <td>$3.99</td>
            <td>$2.99</td>
            <td>$10.99</td>
          </tr>
          <tr>
            <td>Dog Duty 4&trade;</td>
            <td>$4.99</td>
            <td>$8.99</td>
            <td>$20.99</td>
          </tr>
          <tr>
            <td>Hermit Simulator&trade;</td>
            <td>$39.99</td>
            <td>$49.99</td>
            <td>$59.99</td>
          </tr>
          <tr>
            <td>CoD Blops 7&trade;</td>
            <td>$59.99</td>
            <td>$59.99</td>
            <td>$59.99</td>
          </tr>
          <tr>
            <td>Rocket League&trade;</td>
            <td>$19.99</td>
            <td>$19.99</td>
            <td>$19.99</td>
          </tr>
          <tr>
            <td>Blocks for Tots&trade;</td>
            <td>$12.99</td>
            <td>$14.99</td>
            <td>$16.99</td>
          </tr>
          <tr>
            <td>Cat Mario&trade;</td>
            <td>$6.66</td>
            <td>$6.66</td>
            <td>$6.66</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
