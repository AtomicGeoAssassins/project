import React from 'react';
function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}
export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };
    // ASSUMPTION: There is only one ErrorBanner component ever created.
    // (Otherwise, each will overwrite one another's global function...)
    // By assigning to 'window', this is a global function. Global functions
    // are not typically a good idea, but they can be useful for adding basic
    // error handling to an application
    window.AppError = (errorText) => {
      this.setState({
        active: true,
        error: errorText
      })
    };
  }
  render() {
    // Don't display the error banner unless 'this.state.active' is true.
    return (
      <div className={"alert alert-warning " + hideElement(!this.state.active)}
      role="alert">
      Application was unable to complete a recent
      request: {this.state.error}<br />
      Please <a onClick={() => window.location.reload()}>
      refresh the web page</a> and try again.
      </div>
    );
  }
}
