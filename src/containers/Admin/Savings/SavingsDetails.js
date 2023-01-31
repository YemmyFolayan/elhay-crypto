import React, { useState, useEffect } from 'react';
import './index.css';
import { Modal } from 'antd';
import Layout from 'components/common/DashboardLayout';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import {
  objectValuesStringify,
  formatAmount,
  getCurrency,
} from 'helpers/utils';
import { Progress } from 'antd';
import Withdraw from './Withdraw';
import TopUp from './TopUp';
import moment from 'moment';
import { useUserData } from 'helpers/hooks';
import Back from 'components/common/back/back';
import Loader from 'components/Loader';
import { navigate } from '@reach/router';
import './newsavings.scss';

const Savings = props => {
  const { userData } = useUserData();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const setLoading = () => {};
  const [fetchLoading, setFetchLoading] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);

  const [savings, setSavings] = useState(null);

  useEffect(() => {
    const getSavings = async () => {
      setFetchLoading(true);
      const url = '/savings';
      try {
        const res = await api.get(url);
        const data = res.data?.data;
        const re = data.find(x => x.id === props.savingsId);
        setSavings(re);
      } catch (error) {
        if (error?.data?.errors) {
          openNotificationWithIcon(
            objectValuesStringify(error?.data?.errors),
            'Savings',
            'error',
          );
        } else {
          const msg = error?.data?.message || error.message;
          openNotificationWithIcon(msg, 'Savings', 'error');
        }
      }
      setFetchLoading(false);
    };
    getSavings();
  }, [props.savingsId]);

  const handleShowTopUp = () => {
    setShowTopUp(true);
    showModal();
  };

  const getPercentage = () => {
    const remainder =
      (savings?.amountToBeSaved - savings?.amountSaved) /
      savings?.amountToBeSaved;
    const dt = remainder * 100;
    return (100 - dt).toFixed(2);
  };

  const getNumberOfDays = () => {
    const start = moment(savings?.startDate, 'YYYY-MM-DD');
    const end = moment(savings?.endDate, 'YYYY-MM-DD');
    const daysDiff = moment.duration(end.diff(start)).asDays();
    const numberofDays = savings?.amountToBeSaved / daysDiff;
    return (numberofDays * savings?.frequencyInDays) / 100;
  };

  const handleShowWithdrawal = () => {
    setShowWithdrawal(true);

    showModal();
  };

  const endSavings = () => {
    api
      .post('/savings/endSavings', { savingsId: props.savingsId })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Savings Withdrawal',
          'success',
        );
        setTimeout(() => {
          navigate('/savings');
        }, 500);
      })
      .catch(err => {
        openNotificationWithIconErr(err.data.message, 'Savings', 'error');
      });
  };
  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setShowWithdrawal(false);
    setShowTopUp(false);
  };

  const handlePayment = async values => {
    setFormData(values);
    setModalVisible(true);
  };
  const handleCompleteTransaction = async values => {
    const url =
      formData.paymentMethod === 'wallet' ? 'recharge-card' : 'recharge-card';
    setLoading(true);
    try {
      const res = await api.post(url, { ...formData, ...values });
      const data = res.data;
      openNotificationWithIcon(data.message, 'Recharge Card', 'success');
      setLoading(false);
      setModalVisible(false);
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Recharge Card',
          'error',
        );
      } else {
        openNotificationWithIcon(error.data.message, 'Recharge Card', 'error');
      }
      setLoading(false);
    }
  };

  console.log(
    'Unused Methods',
    handleShowWithdrawal,
    handlePayment,
    handleCompleteTransaction,
    handleShowTopUp,
  );
  if (fetchLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  return (
    <Layout>
      <div
        className=" isw-container saving--container"
        style={{
          height: '85vh',
          width: '100%',
          overflow: 'scroll',
          paddingLeft: '50px',
        }}
      >
        <Back page="Savings" link="savings" />
        <div
          className="flex_page_container pt-4"
          id="savings"
          style={{ paddingLeft: '0' }}
        >
          <h3 className="txt_2ch4">Savings</h3>
          <div className="savings-box">
            <p className="pb-0 mb-0 title">Total Savings</p>
            <h2>{`${getCurrency(savings?.currency)}${savings?.amountSaved &&
              formatAmount(savings?.amountSaved / 100)}`}</h2>
            <div>
              <div className="d-flex align-items-end justify-content-between">
                <p className="pb-0 mb-0">{`${getPercentage()}% achieved`}</p>
                <div className="text-right">
                  <p className="pb-0 mb-0">Target Amount</p>
                  <h4>{`${getCurrency(
                    savings?.currency,
                  )}${savings?.amountToBeSaved &&
                    formatAmount(savings?.amountToBeSaved / 100)}`}</h4>
                </div>
              </div>
              <Progress
                className="savings-progress"
                strokeColor="#fff"
                // percent={100}
                percent={getPercentage()}
                showInfo={false}
                status="active"
              />

              <button
                className="withdraw__savings"
                onClick={() => endSavings()}
              >
                Withdraw Savings
              </button>
            </div>
          </div>

          {/* <div className="savings-btn my-4 mb-5 d-flex flex-wrap justify-content-between align-items-center">
            <button className="btn" onClick={handleShowTopUp}>
              Top Up
            </button>
            <button className="btn" onClick={handleShowWithdrawal}>
              Withdraw
            </button>
            <button className="btn">View History</button>
          </div> */}

          <div className="savings-btn my-5 d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <p className="mb-0 pb-0">SAVING PREFERENCE</p>
              <h4 className="txt_2ch4">{`${getCurrency(
                savings?.currency,
              )}${getNumberOfDays()} / ${savings?.frequencyInDays}Days`}</h4>
            </div>
            {/* <Link to="/savings/asd/update" className="btn">
              Edit Saving Preference
            </Link> */}
          </div>

          <div className="font-weight-normal">
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>PLAN TYPE</p>
              <p>Save as you earn</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>NEXT SAVING DATE</p>
              <p>{moment(savings?.nextPaymentDate).format('LL')}</p>
            </div>
            <div
              className="
              border-bottom
              mb-3
              d-flex
              flex-wrap
              justify-content-between
              align-items-center"
            >
              <p>START DATE</p>
              <p>{moment(savings?.startDate).format('LL')}</p>
            </div>
            <div className="border-bottom mb-3 d-flex flex-wrap justify-content-between align-items-center">
              <p>WITHDRAWAL DATE</p>
              <p>{moment(savings?.endDate).format('LL')}</p>
            </div>
            {/* <div
              className="
              mb-3
              d-flex
              flex-wrap
              justify-content-between
              align-items-center"
            >
              <p>AUTOMATION STATUS</p>
              <p>Disabled</p>
            </div> */}
          </div>
          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={modalVisible}
            onCancel={closeModal}
            destroyOnClose
            footer=""
            className="rounded-modal"
            centered={true}
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {showWithdrawal && <Withdraw close={closeModal} user={userData} />}
            {showTopUp && <TopUp close={closeModal} user={userData} />}
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Savings;
