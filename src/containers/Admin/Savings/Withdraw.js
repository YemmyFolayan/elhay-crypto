import React, { useState } from 'react';
import '../Admin.css';
import { Input, Select as AntdSelect, Form, InputNumber } from 'antd';
import Loader from 'components/Loader';
import api from 'appRedux/api';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { objectValuesStringify } from 'helpers/utils';

const Withdraw = ({ close, user }) => {
  const [showEnterPinForm, setShowEnterPinForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const userBanks = [];
  const [activeCurrency, setActiveCurrency] = useState('USD_CENTS');

  const handlePayment = async values => {
    values.amount = values.amount * 100;
    setFormData(values);
    setShowEnterPinForm(true);
  };

  const handleCompleteTransaction = async values => {
    const url = 'withdraw';
    setLoading(true);
    try {
      const res = await api.post(url, { ...formData, ...values });
      const data = res.data;
      openNotificationWithIcon(data.message, 'Withdrawal', 'success');
      setLoading(false);
      setShowEnterPinForm(false);
      close();
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Withdrawal',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIcon(error.data.message, 'Withdrawal', 'error');
      }
      console.log({ ...error });
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h4 className="pb-5 text-light">Withdraw Savings</h4>

      <div className=" mt-4">
        <div className="w-100">
          {showEnterPinForm ? (
            <Form onFinish={handleCompleteTransaction}>
              <p className="text-center">Enter Transaction Pin</p>
              <Form.Item
                className="mb-4 w-50 mx-auto"
                name="transactionPin"
                rules={[
                  {
                    required: true,
                    message: 'Please input your transaction pin!',
                  },
                ]}
              >
                <Input
                  className=""
                  type="number"
                  style={{
                    padding: '20px',
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    textAlign: 'center',
                    letterSpacing: '16px',
                    border: 'none',
                  }}
                  // placeholder="Transaction Pin"
                />
              </Form.Item>
              {loading ? (
                <Loader />
              ) : (
                <div className="d-flex flex-wrap justify-content-around mt-5">
                  <button
                    type="submit"
                    style={{
                      background: '#000000',
                      color: '#ffffff',
                      marginBottom: '10px',
                    }}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    style={{
                      marginBottom: '10px',
                    }}
                    onClick={() => setShowEnterPinForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </Form>
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
                    background: '#F8FBF7',
                    width: '90%',
                    padding: '10px',
                    // borderRadius: '20px',
                    // marginRight: '10px',
                    border: 'none',
                  }}
                  style={{
                    padding: '16px',
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    color: '#777676',
                    border: 'none',
                  }}
                  value={activeCurrency}
                  onChange={val => setActiveCurrency(val)}
                  placeholder="Choose Currency"
                >
                  <AntdSelect.Option value="NGN_KOBO">Naira</AntdSelect.Option>
                  <AntdSelect.Option value="USD_CENTS">
                    Dollar
                  </AntdSelect.Option>
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
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    // marginRight: '10px',
                    border: 'none',
                  }}
                  placeholder="Enter Amount"
                />
              </Form.Item>
              <Form.Item className="mb-4" name="quotation">
                <Input
                  className=""
                  style={{
                    padding: '20px',
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    // marginRight: '10px',
                    border: 'none',
                  }}
                  placeholder="Quotation"
                />
              </Form.Item>

              <Form.Item
                className="mb-4"
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
                    width: '90%',
                    padding: '10px',
                    // borderRadius: '20px',
                    // marginRight: '10px',
                    border: 'none',
                  }}
                  style={{
                    padding: '16px',
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    color: '#777676',
                    border: 'none',
                  }}
                  placeholder="Choose bank for deposit"
                >
                  {userBanks.map(bank => (
                    <AntdSelect.Option value={bank.id}>
                      {bank.accountNumberDisplay}({bank.bankName})
                    </AntdSelect.Option>
                  ))}
                </AntdSelect>
              </Form.Item>
              <button type="submit" className=" w-100">
                Withdraw
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
