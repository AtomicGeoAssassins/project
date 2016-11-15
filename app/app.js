import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Support from './components/support';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class HomePage extends React.Component {
  render() {
    return <Home /> ;
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
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="support" component={SupportPage}/>
  </Router>
),document.getElementById('main-content'));
