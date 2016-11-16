import React from 'react';
import {Link} from 'react-router';
export default class Support extends React.Component {
  constructor(props) {
    super(props);
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
          <Link to="/home" className="btn btn-default" type="button" onClick={() => {
              document.getElementById("titletext").value = "";
              document.getElementById("desctext").value = "";
              document.getElementById("result").innerHTML = "Submitted";
              // here is where we would send an email if this was a real website //
          }}>Submit</Link>
        </div>
        <label type="text" id="result"></label>
      </div>
    );
  }
}
