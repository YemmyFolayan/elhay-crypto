import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    const { spinner } = this.props;
    return (
      <div>
        {spinner === true ? (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="spinnercont">
            <div className="spinner">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
            <p>Loading, please wait.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Loader;
