import React from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './components/searchbar.js'
import Home from './components/home';
import Support from './components/support';
import Navbar from './components/navbar';
import About from './components/about';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class HomePage extends React.Component {
  render() {
    return <Home />;
  }
}

class AboutPage extends React.Component {
  render() {
    return <About /> ;
  }
}

class SupportPage extends React.Component {
  render() {
    return <Support />;
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
    <Route path="/" component={HomePage}>
      <IndexRoute component={HomePage} />
    </Route>
<<<<<<< HEAD
    <Route path="support" component={SupportPage}/>
=======
    <Route path="about" component={About} />
>>>>>>> 52d3e29b9145c6114ea499c9eae29d0ed7a60bea
  </Router>
),document.getElementById('main-content'));

ReactDOM.render((
  <Navbar />
),document.getElementById('navbar'));

//ReactDOM.render((
  //<Searchbar />
//),document.getElementById('searchbar'));
