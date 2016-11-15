import React from 'react';
import {Link} from 'react-router';
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">StarVestments</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
            <li><a href="Forum.html">Forum</a></li>
            <li><a href="games.html">Games</a></li>
            <li><Link to="/about/">About</Link></li>
            <li><a href="support.html">Support</a></li>
          </ul>
          <div id='searchbar' className="col-sm-3">
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Theo Proulx <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="myprofile.html">Profile</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Sign Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
