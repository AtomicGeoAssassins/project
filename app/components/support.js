import React from 'react';
import {Link} from 'react-router';
import {setActiveNavLink} from '../server';
export default class Support extends React.Component {
  constructor(props) {
    super(props);
    setActiveNavLink("Support");
    this.state = {
      contents: []
    };
  }
  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <h2>Support</h2>
        <div className="padding">
          <label htmlFor="titletext">Title:</label>
          <input className="form-control" type="text" rows="1" id="titletext" placeholder="Enter a title"/>
        </div>
        <div className="padding">
          <label htmlFor="desctext">Description:</label>
          <textarea className="form-control" type="text" rows="6" id="desctext" placeholder="Describe your problem in detail"></textarea>
        </div>
        <div className="right-align padding">
          <button to="/home" className="btn btn-default" type="button" onClick={() => {
              var title = document.getElementById("titletext").value;
              var description = document.getElementById("desctext").value;
              document.getElementById("titletext").value = "";
              document.getElementById("desctext").value = "";
              document.getElementById("result").innerHTML = "Submitted";
              window.open("mailto:" + "starvestment@gmail.com" + "?subject" + title + "?body" + description);
          }}>Submit</button>
        </div>
        <label type="text" id="result"></label>
        <br/>
        <br/>
        <div>
          <Link to="/home" >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}
