import React from 'react';
import {getForumData, setActiveNavLink} from '../../server';
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
    return (
      <div>
        <div className="col-md-2"></div>
        <div className="col-md-7">
          <h1>AtomicGeoAssassins Forums</h1>
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
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
