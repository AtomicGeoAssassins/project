import React from 'react';
export default class Home extends React.Component {
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
        <div className="padding">s
          <label for="titletext">Title:</label>
          <input className="form-control" type="text" rows="1" id="titletext" style="width:50%" placeholder="Enter a title">
        </div>
        <div className="padding">
          <label for="desctext">Description:</label>
          <textarea className="form-control" type="text" rows="6" id="desctext" style="width:100%" placeholder="Describe your problem in detail"></textarea>
        </div>
        <div className="right-align padding">
          <button className="btn btn-default">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
