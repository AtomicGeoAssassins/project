import React from 'react';
import {Link} from 'react-router';
export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  getInitialState(){
    return{searchTerm: ''};
  }

  render() {
    return (
      <form className="navbar-form" role="search">
        <div id="searchbar" className="input-group nav-searched-curved">
          <input type="text" className="form-control" onChange={this.searchUpdated} placeholder="Search" name="srch-term" id="srch-term">
          </input>
            <div className="input-group-btn">
              <Link to="/searchresults/" className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></Link>
            </div>
        </div>
      </form>
    )
  }

  searchUpdated(term){
    this.setState({searchTerm: term})
  }
}
