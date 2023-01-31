import React, { useEffect } from 'react';
import '../components.css';
import { connect } from 'react-redux';
import { userSignOut } from '../../appRedux/actions/auth';

function Section({ data, index }) {
  useEffect(() => {});

  return (
    <div className={index % 2 === 0 ? '' : 'offwhite_bg'}>
      <div
        className={
          index % 2 === 0
            ? 'd-flex flex-column flex-md-row my-5 py-5 container justify-content-between '
            : 'd-flex flex-column flex-md-row-reverse my-5 py-5 container justify-content-between'
        }
      >
        <div className="d-flex align-items-center content_field_home">
          <div className="d-flex flex-column">
            <p className="main_txt_1">{data.title}</p>
            <p className="main_txt_2 w-75">{data.desc}</p>
            <div className=" d-flex">
              {data.cta_one && (
                <a href="https://play.google.com/store/apps/details?id=com.vesti.app">
                  <div className="pic_btn android_btn mb-4 mr-2" />
                </a>
              )}
              {data.cta_two && (
                <a href="https://apps.apple.com/us/app/vesti-cashapp/id1564444402">
                  <div className="pic_btn ios_btn" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className=" my-sm-5">
          <img src={data.img} className="img-responsive w-100" alt={data.img} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth, common }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  const { display, message, loading } = common;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    display,
    message,
    loading,
  };
};

export default connect(mapStateToProps, {
  userSignOut,
})(Section);
