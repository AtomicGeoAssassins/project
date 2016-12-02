import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Support from './components/support';
import Navbar from './components/navbar';
import Forum from './components/forum/forum';
import Searchresults from './components/searchresults';

import Favorite from './components/forum/forumTopics/favorite';
import General from './components/forum/forumTopics/general';
import OffTopic from './components/forum/forumTopics/offtopic';
import Predictions from './components/forum/forumTopics/predictions';
import Price from './components/forum/forumTopics/price';
import ForumSupport from './components/forum/forumTopics/support';

import About from './components/about';
import MyProfile from './components/myprofile';
import Games from './components/games';
import ErrorBanner from './components/errorbanner'
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
          <div className="row">
            <div className="col-md-12">
              <ErrorBanner />
            </div>
          </div>
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
      <Route path="myProfile" component={MyProfile} />
      <Route path="games" component={Games} />
      <Route path="searchresults" component={Searchresults} />

      <Route path="favorite" component={Favorite} />
      <Route path="general" component={General} />
      <Route path="offtopic" component={OffTopic} />
      <Route path="predictions" component={Predictions} />
      <Route path="price" component={Price} />
      <Route path="forumsupport" component={ForumSupport} />

    </Route>
  </Router>
),document.getElementById('main-content'));

//ReactDOM.render((
  //<Navbar />
//),document.getElementById('navbar'));

//ReactDOM.render((
  //<Searchbar />
//),document.getElementById('searchbar'));
