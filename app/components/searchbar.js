import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  render() {
    return (
      <form className="navbar-form" role="search">
        <div id="searchbar" className="input-group nav-searched-curved">
          <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term">
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
            </div>
          </input>
        </div>
      </form>
    )
  }
}
