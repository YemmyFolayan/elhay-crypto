import React from 'react';
import { connect } from 'react-redux';
// import  Fbodeposit  from "./deposit";
import Fbowithdrawal from './withdrawal';
import './styles.scss';
import Depositusdwallet from 'components/deposit/depositusdwallet';

const Fbotrans = props => {
  var __renderAction = () => {
    switch (props.action) {
      case 'deposit':
        // return <Fbodeposit  fullname={props.userdata.firstName + ' '+props.userdata.lastName} balance = {props.userdata.walletAmountInUSCents / 100}  phone={props.phone}  refetch ={props.refetch} id={props.id} closeModal={props.close}/>;
        return (
          <Depositusdwallet
            closeModal={props.closeModal}
            refetch={props.refetch}
            rate={props.rate}
            userdata={props.userdata}
            userType={props.userType}
          />
        );
      case 'withdraw':
        return (
          <Fbowithdrawal
            fullname={props.userdata.firstName + ' ' + props.userdata.lastName}
            balance={props.userdata.walletAmountInUSCents / 100}
            phone={props.phone}
            refetch={props.refetch}
            id={props.id}
            closeModal={props.close}
          />
        );
      default:
        return <></>;
    }
  };

  return <>{__renderAction()}</>;
};

const mapStateToProps = ({ wallets }) => {
  const { action } = wallets;
  return {
    action,
  };
};

export default connect(mapStateToProps)(Fbotrans);
