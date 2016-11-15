import React from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './components/searchbar.js'
//import Feed from './components/feed';
import Home from './components/home';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class HomePage extends React.Component {
  render() {
    return <Home /> ;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage} />
    </Route>
  </Router>
),document.getElementById('main-content'));

ReactDOM.render((
  <Searchbar />
),document.getElementById('searchbar'));
