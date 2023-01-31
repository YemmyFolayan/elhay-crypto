import React, { useState, useEffect } from 'react';
import '../Admin.css';
import { Select as AntdSelect, Form, InputNumber } from 'antd';
import Loader from 'components/Loader';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconPending,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { objectValuesStringify } from 'helpers/utils';
import DividedPinInput from 'components/common/DividedPinInput';
import { useUserData } from 'helpers/hooks';
// import { Link } from '@reach/router';
import { Littlebalance } from '../../../components/bank/littlebalance/littlebalance';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Transreview } from 'components/common/transactionreview/review';
import { Platformbutton } from 'components/common/button/button';

// images
// import search from 'assets/sea.svg';
const Withdrawal = ({ close, user, refetch, openAddbank }) => {
  const { userData } = useUserData();
  const [showEnterPinForm, setShowEnterPinForm] = useState(false);
  const [transactionPin, setTransactionPin] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userBanks, setUserBanks] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState('NGN_KOBO');
  const [currBank, setCurr] = useState('');
  useEffect(() => {
    getBanks();
  }, []);

  const handlePayment = async values => {
    values.amount = values.amount * 100;
    // console.log(values);
    setFormData(values);
    setCurr(userBanks.filter(item => item.id === values.bankId)[0]);
    setShowEnterPinForm(true);
  };

  const getBanks = async () => {
    const url = 'user/banks';
    try {
      const res = await api.get(url);
      console.log(res.data);
      const data = res.data.data;
      setUserBanks(data);
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIconErr(
          objectValuesStringify(error.data.errors),
          'Bank Details',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIconErr(
          error.data.message,
          'Bank Details',
          'error',
        );
      }
      console.log({ ...error });
    }
  };

  const handleCompleteTransaction = async values => {
    console.log(formData);
    const url = 'withdraw';
    setLoading(true);
    try {
      const res = await api.post(url, {
        ...formData,
        ...values,
        transactionPin,
      });
      console.log({ ...res });
      const data = res.data;
      openNotificationWithIconPending(data.message, 'Withdrawal', 'warning');
      setLoading(false);
      setShowEnterPinForm(false);
      close();
      refetch();
      refetch();
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Recharge Card',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIconErr(error.data.message, 'Withdrawal', 'error');
        refetch();
        // refetch
        // alert('failded')
      }
      console.log({ ...error });
      setLoading(false);
    }
  };

  return (
    <div className="text-dark">
      {/* <Titlesubtitle
        title="Withdrawal"
        subtitle="Withdraw from your NetWebPay wallet."
      /> */}
      {!showEnterPinForm && (
        <Littlebalance
          title="Balance"
          currency={activeCurrency === 'USD_CENTS' ? '$' : '₦'}
          amount={
            activeCurrency === 'USD_CENTS'
              ? userData.walletAmountInUSCents / 100
              : userData.walletInNGNKobo / 100
          }
        />
      )}
      <div className="mt-4 withdrawal">
        <div className="w-100">
          {showEnterPinForm ? (
            <>
              <Transreview
                data={[
                  { title: 'Transaction Type', value: 'Withdrawal' },
                  {
                    title: 'Amount',
                    value: `₦${(formData.amount / 100).toLocaleString(
                      'en-US',
                    )}`,
                  },
                  { title: 'Fee', value: ` ₦ 100` },
                  { title: 'Recipient Name', value: currBank.accountName },
                  {
                    title: 'Recipient Account',
                    value: currBank.accountNumberDisplay,
                  },
                  { title: 'Recipient Bank', value: currBank.bankName },
                ]}
              />
              <div className="mt-4"></div>
              <Form onFinish={handleCompleteTransaction}>
                <p className="text-left">Enter Transaction Pin</p>
                <DividedPinInput onChange={setTransactionPin} />
                {loading ? (
                  <Loader />
                ) : (
                  <Backcontinue goBack={() => setShowEnterPinForm(false)}>
                    <Platformbutton name="Initiate Withdrawal" type="submit" />
                  </Backcontinue>
                )}
              </Form>
            </>
          ) : (
            <Form onFinish={handlePayment}>
              <Form.Item
                className="mb-4"
                name="currency"
                rules={[
                  {
                    required: true,
                    message: 'Please select preferred currency!',
                  },
                ]}
              >
                <AntdSelect
                  className="w-100 serv-select"
                  dropdownStyle={{
                    background: '#F9FAF9',
                    width: '100%',
                    zIndex: '9999999',
                    // padding: '10px',
                    // borderRadius: '20px',
                    // marginRight: '10px',
                    border: 'none',
                  }}
                  style={{
                    padding: '16px',
                    background: '#F9FAF9',
                    borderRadius: '10px',
                    color: '#9E9E9E',
                    border: 'none',
                    // borderColor:''
                  }}
                  value={activeCurrency}
                  onChange={val => setActiveCurrency(val)}
                  placeholder="Choose Currency"
                >
                  <AntdSelect.Option value="NGN_KOBO">Naira</AntdSelect.Option>
                  {/* <AntdSelect.Option value="USD_CENTS">
                    Dollar
                  </AntdSelect.Option> */}
                </AntdSelect>
              </Form.Item>
              <Form.Item
                className="mb-5"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Amount!',
                  },

                  {
                    type: 'number',
                    min: 200,
                    message: 'Amount must be atleast 200',
                  },
                ]}
              >
                <InputNumber
                  className="w-100"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  style={{
                    padding: '16px',
                    background: '#F9FAF9',
                    borderRadius: '10px',

                    // marginRight: '10px',
                    border: 'none',
                  }}
                  placeholder="Enter Amount"
                />
              </Form.Item>
              <div className="d-flex align-items-center mb-4">
                <Form.Item
                  className="mb-0 w-100"
                  name="bankId"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your bank!',
                    },
                  ]}
                >
                  <AntdSelect
                    className="w-100 serv-select"
                    dropdownStyle={{
                      background: '#F8FBF7',
                      width: '100%',
                      padding: '10px',
                      zIndex: '9999999',
                      // borderRadius: '20px',
                      // marginRight: '10px',
                      border: 'none',
                    }}
                    style={{
                      padding: '16px',
                      background: '#F8FBF7',
                      borderRadius: '10px',
                      color: '#777676',
                      border: 'none',
                    }}
                    placeholder="Choose bank for deposit"
                  >
                    {userBanks.map(bank => (
                      <AntdSelect.Option key={bank.id} value={bank.id}>
                        {bank.accountNumberDisplay}({bank.bankName}{' '}
                        {bank.accountName})
                      </AntdSelect.Option>
                    ))}
                  </AntdSelect>
                </Form.Item>
                <div
                  // to="/myprofile?tab=addbank"
                  style={{ width: '40px', height: '40px' }}
                  className="ml-2 default-btn py-2"
                  onClick={() => openAddbank()}
                >
                  +
                </div>
              </div>
              <button type="submit" className="w-100 default-btn py-2">
                Withdraw
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
