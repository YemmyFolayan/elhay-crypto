import React, { useState, useEffect } from 'react';
import Layout from 'components/common/DashboardLayout';
import './credithistory.scss';
import api from 'appRedux/api';
import { openNotificationWithIconErr } from 'appRedux/actions/Common';
import { Importcredit } from 'components/credithistory/importcredit';
import { Creditreport } from 'components/credithistory/creditreport';
import Loader from 'components/Loader';
import { useUserData } from 'helpers/hooks';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Payforreport } from 'components/credithistory/payforcredith';
import { chargeUserCreditReport } from 'appRedux/actions/transactions';
import { connect, useDispatch } from 'react-redux';
import { openUpdateBox } from 'appRedux/actions/update';

const Credithistory = props => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [state, setState] = useState();
  const setWalletOption = e => {
    setState(e.target.value);
    // localStorage.setItem('walletToCharge', e.target.value);
  };
  const dispatch = useDispatch();
  const { userData } = useUserData();
  var getScore = () => {
    api
      .get(
        `nova/credit_score/${JSON.parse(localStorage.getItem('userData')).id}`,
      )
      .then(res => {
        // res.data.data ===  null && userData.creditData === null ?  console.log() : console.log()

        // console.log(res.data.data.creditData.scores[0])
        setData(res.data.data);
        __renderAction(res.data.data.status);
        // res.data.data.status ==='SUCCESS' && res.data.data.creditData ? setShow(true) : setShow(false)
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(err => {
        // __renderAction(err.data.message)
        setLoading(false);
      });
  };

  var moveTo = (step, message) => {
    setMessage(message);
    // setStep(step)
    setTimeout(() => {
      setStep(step);
    }, 500);
  };
  var __renderAction = value => {
    switch (value) {
      case 'NOT_FOUND':
        return moveTo(
          2,
          ' We were unable to find any reports for you, this may mean your line of credits were closed more than 5 years ago, or you do not have any line of credit. You have not been charged. Please check back again in the future. In the mean time check other card products from vesti.',
        );
      case 'Error':
        return moveTo(
          2,
          'We were unable to find any reports for you, this may mean your line of credits were closed more than 5 years ago, or you do not have any line of credit. You have not been charged. Please check back again in the future. In the mean time check other card products from vesti.',
        );
      case 'NOT_AUTHENTICATED':
        return moveTo(2, 'Unable to authenticate the applicant');
      case 'PENDING':
        return moveTo(
          3,
          'The credit report request is received and a result will be available in your dashboard, refresh the page after 30-45seconds.',
        );
      case 'SUCCESS':
        // return moveTo(1,'The credit report request was successful')
        return setShow(true);
      case 'UNKNOWN_STATUS':
        return moveTo(
          2,
          'We were unable to find any reports for you, this may mean your line of credits were closed more than 5 years ago, or you do not have any line of credit. You have not been charged. Please check back again in the future. In the mean time check other card products from vesti.',
        );
      default:
        return moveTo(
          2,
          'We were unable to find any reports for you, this may mean your line of credits were closed more than 5 years ago, or you do not have any line of credit. You have not been charged. Please check back again in the future. In the mean time check other card products from vesti.',
        );
    }
  };
  // reportData && reportData.status ? __renderAction(reportData.status):console.log()
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.onload = window.Nova.register({
      env: 'production',
      // publicId:  '402b2b037d72273403b4e6f1c503d3b754576c353f5fa63fd3cef86d223516bd',
      // productId: '095cc690-eb32-11ec-bbaa-a5ce700edca3',
      publicId: process.env.REACT_APP_NOVA_PUBID,
      productId: process.env.REACT_APP_NOVA_PRID,

      // userArgs: 'YOUR_APPLICANT_ID',
      userArgs: JSON.parse(localStorage.getItem('userData')).id,
      hideButton: true,
      onSuccess: function(publicToken, status) {
        // props.chargeUserCreditReport({userArgs:JSON.parse(localStorage.getItem('userData')).id, currency:localStorage.getItem('walletToCharge')});

        setTimeout(() => {
          // localStorage.removeItem("walletToCharge");
          getScore();
        }, 1000);

        __renderAction(status);
      },
      onError: function() {
        setMessage('An error occured');
        openNotificationWithIconErr('An error occured', '', 'error');
      },
      onExit: function() {
        // refetch();
        getScore();
      },
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // userData.creditData === null && alert('no value')
    getScore();
    // props.chargeUserCreditReport({userArgs:JSON.parse(localStorage.getItem('userData')).id, currency:'state'})
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Simplemodal visible={modal} onClick={() => setModal(false)}>
        <Payforreport
          state={state}
          setState={setState}
          setWalletOption={setWalletOption}
          click={window.Nova.fire}
          kobo={userData.walletInNGNKobo / 100}
          usd={userData.walletAmountInUSCents / 100}
          closeModal={() => setModal(false)}
        />
      </Simplemodal>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="credithistory">
          {show === false ? (
            <Importcredit
              title={step === 0 ? 'Import Credit History' : 'Credit history'}
              subtitle={
                step === 0
                  ? 'New to the U.S.? vesti has partnered with Nova Credit, so now your credit in Nigeria can travel with you. Start the application for a NetWebPaycard by importing your foreign credit history'
                  : 'Update on your Credit history report'
              }
              step={step}
              setStep={setStep}
              message={message}
              click={() => {
                // userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ? window.Nova.fire(): dispatch(openUpdateBox())
                userData.verifiedKyc === 'APPROVED' ||
                userData.verifiedKyc === true
                  ? // setModal(true)
                    // ((userData.walletInNGNKobo / 100) < 28000 ) || ((userData.walletAmountInUSCents / 100) < 40)?
                    userData.walletAmountInUSCents / 100 < 40
                    ? openNotificationWithIconErr(
                        ' Please fund your wallet to carry this action',
                        'Credit Report',
                      )
                    : setModal(true)
                  : dispatch(openUpdateBox());
              }}
              setShow={setShow}
            />
          ) : (
            <Creditreport data={data} click={setModal} />
          )}
        </section>
      )}
    </Layout>
  );
};
const mapStateToProps = ({ transactions }) => {
  const transactionsData = transactions;

  return {
    transactionsData,
  };
};
const mapDispatchToProps = {
  chargeUserCreditReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(Credithistory);
