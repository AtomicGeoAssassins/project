import React from 'react';
// import {Link} from 'react-router';
// export default class Searchbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contents: []
//     };
//   }
//
//   render() {
//     return (
//       <form className="navbar-form" role="search">
//         <div id="searchbar" className="input-group nav-searched-curved">
//           <input type="text" ref="textField" className="form-control" placeholder="Search" name="srch-term" id="srch-term">
//           </input>
//           <div className="input-group-btn">
//             <Link to="searchresults" className="btn btn-default" type="submit">
//               <i className="glyphicon glyphicon-search"></i>
//             </Link>
//           </div>
//         </div>
//       </form>
//     )
//   }
//   onSearch(searchText) {
//     // If searchText is 'sandals', navigates to #/search/q?=sandals
//     this.context.router.push({ pathname: "/searchresults", query: { q: searchText } });
//   }
// }

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: props.searchTerm };
  }

  handleSearchButtonClick(e) {
    e.preventDefault();
    this.search();
  }

  search() {
    var trimmedTerm = this.state.searchTerm.trim();
    if (trimmedTerm !== "") {
      // Navigate to /search?q=[trimmedTerm]
      this.context.router.push({ pathname: "/search", query: { q: trimmedTerm } });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchTerm !== null) {
      // Keep searchTerm in-sync with component changes.
      this.setState({
        searchTerm: newProps.searchTerm
      });
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      this.search();
    }
  }

  render() {
    // HTML forms are special: Hitting 'enter' in an input box in a form
    // submits the form to the server with a POST command and refreshes
    // the page as a default action. The onSubmit handler below prevents that
    // from happening.
    return (
      <form onSubmit={(evt) => evt.preventDefault()} className="navbar-form navbar-left" role="search">
        <div className="input-group">
          <input type="text" className="form-control fb-search" placeholder="Search Facebook" value={this.state.searchTerm} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}  />
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={(e) => this.handleSearchButtonClick(e)}>
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

// Tell React-Router that SearchBar needs to use the router dynamically.
SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
