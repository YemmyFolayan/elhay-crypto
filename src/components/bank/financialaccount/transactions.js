import React from 'react';
import { connect } from 'react-redux';
import Deposit from './deposit';
import FinancialWithdrawal from './withdrawal';
import './styles.scss';

const Financialtrans = props => {
  var __renderAction = () => {
    switch (props.action) {
      case 'deposit':
        return (
          <Deposit
            balance={isNaN(props.foundersBalance) ? 0 : props.foundersBalance}
            usdbalance={props.userdata.walletAmountInUSCents / 100}
            phone={props.phone}
            sourceId={props.sourceId}
            refetch={props.refetch}
            id={props.id}
            closeModal={props.close}
          />
        );
      case 'withdraw':
        return (
          <FinancialWithdrawal
            balance={isNaN(props.foundersBalance) ? 0 : props.foundersBalance}
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

export default connect(mapStateToProps)(Financialtrans);
