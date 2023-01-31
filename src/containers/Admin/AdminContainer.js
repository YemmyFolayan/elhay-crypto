import React, { Component, Fragment } from 'react';
import SideBar from '../../components/common/SideBar';
import Header from '../../components/common/Header';

class AdminContainer extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <SideBar />
        <div className="">
          <div className="row">
            <div className="col-md-12" style={{ height: '65px' }}></div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div
              className="col-sm-12 col-md-10 isw-container "
              style={{ height: '91vh', width: '100%', overflow: 'scroll' }}
            >
              <div className=" flex_page_container d-flex align-items-center justify-content-center">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AdminContainer;
