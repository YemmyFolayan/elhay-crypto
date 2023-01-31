import React, { Component } from 'react';
import './Auth.css';

class AuthContainer extends Component {
  render() {
    return (
      <div className="flex_page_container d-flex justify-content-center">
        {this.props.children}
      </div>
    );
  }
}

export default AuthContainer;
