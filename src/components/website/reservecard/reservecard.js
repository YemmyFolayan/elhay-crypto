import React from 'react';
import './reservecard.scss';
import { connect } from 'react-redux';
import { useUserData } from 'helpers/hooks';
import Signin from 'components/common/signinprompt/signin';
import Ordercard from 'components/vesticards/selectcard';
import { navigate } from '@reach/router';
const Reservecard = props => {
  let userdata = useUserData();
  console.log(userdata);

  if (!userdata.userData.isAxiosError || props.authUser !== null) {
    return (
      <Ordercard
        type={
          userdata
            ? userdata.country === 'USA' || userdata.location === 'USA'
              ? 'Apto'
              : ''
            : ''
        }
        country={userdata.country}
        cb={() => navigate('/bank')}
      />
    );
  } else {
    return (
      <Signin
      // myfunction={setLogged}
      />
    );
  }
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(Reservecard);
