import React from 'react';
import {getForumData, setActiveNavLink} from '../../../server';
import {Link} from 'react-router';

export default class Forum extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Forum");
    this.state = {
      contents: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getForumData((forum) => {
      this.setState({ "forum": forum });
    });
  }

  render() {
    var userInfo;
    if(this.state.forum) {
      userInfo = (
        this.state.forum.map((forum) => {
          return (
            <div className="fb-status-update panel panel-default">
              <div className="col-md-4">
                <div className="col-md-10">
                  <div>
                    <div className="forumPostTitleFormat">
                      {forum.postTitle}
                    </div>
                    <div className="forumNameFormat">
                      {forum.title}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 forumPostFormat">
                {forum.insideData}
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <ul className="list-inline">
                    <li>
                      <a href="#"><span className="glyphicon glyphicon-comment">
                      </span> Comment</a>
                    </li>
                    <li>
                      <a href="#"><span className="glyphicon glyphicon-share-alt">
                      </span> Share</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        )})
      )
    }
    return (
      <div>
        <div className="col-md-2"></div>
        <div className="col-md-7">
          <h1>AtomicGeoAssassins Forums</h1>
          <h2>Favorite Games</h2>
          <div className="fb-status-update panel panel-default">
            <div className="panel-body">
              Boards:
              <ul id="menu">
                <li><Link to="/general/">General Discussion</Link></li>
                <li><Link to="/favorite/">Favorite Games</Link></li>
                <li><Link to="/price/">Price Discussion</Link></li>
                <li><Link to="/offtopic/">Off Topic</Link></li>
                <li><Link to="/predictions/">Predictions</Link></li>
                <li><Link to="/forumsupport/">Support</Link></li>
                <li><Link to="/forum/">Go Back</Link></li>
              </ul>
            </div>
          </div>
          <div className="fb-status-update panel panel-default">
          <div className="panel-body">
            Title:
            <br />
            <input id="text" name="text_name" placeHolder="Enter Title..." className="fb-status-update forumPostingTitle"></input>
            <br />
            Content:
            <br />
            <input id="text" name="text_name" placeHolder="Enter Content..." className="fb-status-update forumPostingTextbox"></input>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <ul className="list-inline">
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-comment">
                      </span>
                      Post
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-share-alt">
                      </span> Share</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {userInfo}
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
