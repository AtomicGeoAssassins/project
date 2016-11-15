import React from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './components/searchbar.js'
import Home from './components/home';
import Navbar from './components/navbar';
import About from './components/about';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class AboutPage extends React.Component {
  render() {
    return <About /> ;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="main-content container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="home" component={Home} />
    </Route>
  </Router>
),document.getElementById('main-content'));

//ReactDOM.render((
  //<Navbar />
//),document.getElementById('navbar'));

//ReactDOM.render((
  //<Searchbar />
//),document.getElementById('searchbar'));

