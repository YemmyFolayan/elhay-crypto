import React, { useEffect } from 'react';
import { Success } from 'components/common/success/success';
import { navigate } from '@reach/router';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import errorsvg from 'assets/error-2.svg';
import { connect } from 'react-redux';
import { stripeTreasury } from 'appRedux/actions/transactions';
// import { useParams } from "@reach/router";
import '../Admin.css';

export const Mainsuccess = props => {
  const { search } = useLocation();
  const values = queryString.parse(search);
  var status = values.status;
  // var id = values.userId
  var id = values.transactionId;
  var message = values.message;
  // const { id } = useParams();

  useEffect(() => {
    (id === null || id === '') && navigate('/error');
  });
  return (
    <section className="mainsuccess">
      <div className="mainsuccess__box">
        {status === 'success' ? (
          <Success
            type="new"
            title="Successful"
            subtitle={
              message
                ? message
                : 'You successfully completed the process, you can click this button to return to your dashboard.'
            }
            button="Return to dashboard"
            onClick={() => {
              props.stripeTreasury(id, () => navigate('/bank'));
            }}
          />
        ) : status === 'failure' ? (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={
              message
                ? message
                : 'You successfully completed the process, you can click this button to return to your dashboard.'
            }
            button="Return to dashboard"
            onClick={() => {
              navigate('/bank');
            }}
          />
        ) : (
          <Success
            type="new"
            title="Successful"
            subtitle={
              message
                ? message
                : 'You successfully completed the process, you can click this button to return to your dashboard.'
            }
            button="Return to dashboard"
            onClick={() => {
              // alert(id)
              props.stripeTreasury(id, () => navigate('/bank'));
            }}
          />
        )}
      </div>
    </section>
  );
};

const mapStateToProps = ({ transactions }) => {
  const { message, loading } = transactions;

  return {
    message,
    loading,
  };
};
const mapDispatchToProps = {
  stripeTreasury,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mainsuccess);
