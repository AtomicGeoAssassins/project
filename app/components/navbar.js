import React from 'react';
import {Link} from 'react-router';
import Searchbar from './searchbar.js'
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  updateActiveLink(index) {
    $("#mainNavLinks li.active").removeClass("active"); //first things first remove active from old class
    if(index === 0)
      $("#mainNavLinks li:nth-child(1)").addClass("active"); //add active class to home in this case
    else
      $("#mainNavLinks li:nth-child(" + index +")").addClass("active"); //add active class to the caller
  }

  render() {
    return (
    <div>
      <nav className="navbar navbar-default" id="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link id="homeLinkMain" className="navbar-brand" to="/home/" onClick={this.updateActiveLink.bind(this,0)}>StarVestments</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" id="mainNavLinks">
              <li className=""><Link to="/" onClick={this.updateActiveLink.bind(this,1)}>Home</Link></li>
              <li><Link to="/games" onClick={this.updateActiveLink.bind(this,2)}>Games</Link></li>
              <li><Link to="/about/" onClick={this.updateActiveLink.bind(this,3)}>About</Link></li>
              <li><Link to="/support/" onClick={this.updateActiveLink.bind(this,4)}>Support</Link></li>
            </ul>
            <div id='searchbar' className="col-sm-3">
              <Searchbar />
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Theo Proulx <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><Link to="/myprofile/">Profile</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Sign Out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
  }
}
