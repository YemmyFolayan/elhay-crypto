import React, { useState } from 'react';
// import Singleinputlabelcol from "../inputs/singleinputlabelcol"
import { userSigninno } from 'containers/Auth/Login/actions';
import './signin.scss';
import { connect } from 'react-redux';
import { Titlesubtitle } from '../titlesubtitle/titlesubtitle';
import Inputfloat from '../inputs/inputfloat';

const Signin = props => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  var setInput = e => {
    // console.log(e.target.value)
    setInputs({ ...inputs, [e.target.name]: e.target.value }, [inputs]);
  };

  var signin = e => {
    e.preventDefault();
    var data = {
      username: inputs.email,
      password: inputs.password,
    };
    props.userSigninno(JSON.stringify(data, null, 2));

    setTimeout(() => {
      props.mycb && props.mycb();
    }, 500);
  };
  return (
    <div className="signin-container">
      <div className="signin-inner-container">
        <Titlesubtitle
          title="Log into your Elhay Crypto account"
          subtitle="Welcome back, continue from where you left off."
        />
        <form onSubmit={e => signin(e)}>
          <Inputfloat
            type="text"
            label="EMAIL"
            name="email"
            placeholder="Enter your registered Email address"
            value={inputs.email}
            disabled={false}
            onChange={setInput}
            row="yes"
          />
          <Inputfloat
            type="password"
            label="PASSWORD"
            name="password"
            value={inputs.password}
            placeholder="Enter your password"
            disabled={false}
            onChange={setInput}
            row="yes"
          />
          <div className="form-bottom">
            <button
              className="signin-account"
              disabled={
                inputs.email === '' || inputs.password === '' ? true : false
              }
            >
              Sign In
            </button>
            <p>
              Don't have an account ? <strong>Register Here </strong>
            </p>
           </div>
        </form>
      </div>
    </div>
  );
};

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
  userSigninno,
})(Signin);
