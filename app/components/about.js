import React from 'react';
export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }
  render() {
    return (
      <div>
      <center>
        <h1>-Our Mission-</h1>
        <p>To predict future game prices</p>
        <h2>About</h2>
        <div style="width:600px;height:200px;border:1px solid #000;">At StarVestments, our goal for our members is to accurately predict an up and coming game that is readily available on steam.  We want to ensure that all gamers can have access to their favorite games as fast as possible, and as cheap as possible.  Our algorithm to compute future prices involves the total amount of players online for that certain game, added to the number of online members with the game in his or her wishlist, and divide that sum by its current cost.  We believe that our web application can potentially change the landscape of the gaming community by bringing the best value in steam's market.</div>
        <h2>Location</h2>
        <img src="img/location.png" width="30%" />
      </center>
    </div>
    );
  }
}
