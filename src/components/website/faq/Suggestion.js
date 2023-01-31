import React from 'react';
import { connect } from 'react-redux';
import { useUserData } from 'helpers/hooks';
import Signin from 'components/common/signinprompt/signin';
// import { Ordercard } from "components/Vesticards/selectcard";
import SuggestionForm from './SuggestionForm';

const Suggestion = props => {
  let userdata = useUserData();
  console.log(userdata);
  if (!userdata.userData.isAxiosError || props.authUser !== null) {
    return <SuggestionForm />;
  } else {
    return <Signin />;
  }
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

export default connect(mapStateToProps)(Suggestion);
