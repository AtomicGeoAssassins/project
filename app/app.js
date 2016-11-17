import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Support from './components/support';
import Navbar from './components/navbar';
import Forum from './components/forum';
import Searchresults from './components/searchresults';
import About from './components/about';
<<<<<<< HEAD
import MyProfile from './components/myprofile';
=======
import Games from './components/games';
>>>>>>> a4142a3638956e0b6a6684c853dd9e851db634ff
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

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
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="support" component={Support}/>
      <Route path="forum" component={Forum}/>
      <Route path="home" component={Home} />
<<<<<<< HEAD
      <Route path="myProfile" component={MyProfile} />
=======
      <Route path="games" component={Games} />
>>>>>>> a4142a3638956e0b6a6684c853dd9e851db634ff
      <Route path="searchresults" component={Searchresults} />
    </Route>
  </Router>
),document.getElementById('main-content'));

//ReactDOM.render((
  //<Navbar />
//),document.getElementById('navbar'));

//ReactDOM.render((
  //<Searchbar />
//),document.getElementById('searchbar'));
