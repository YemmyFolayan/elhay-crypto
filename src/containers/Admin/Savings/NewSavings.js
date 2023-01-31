import React, { useState } from 'react';
import '../Admin.css';
import './newsavings.scss';
import { Input, Select as AntdSelect, Form } from 'antd';
// import { Input, Select as AntdSelect, Form, InputNumber} from 'antd';
import Loader from 'components/Loader';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { objectValuesStringify } from 'helpers/utils';

const NewSavings = ({ close, user }) => {
  const [showEnterPinForm, setShowEnterPinForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState('USD_CENTS');

  console.log(user, activeCurrency);
  const handlePayment = async values => {
    console.log(values);
    // values.amountToBeSaved = +values.amountToBeSaved * 100;
    values.amountToBeSaved = +values.amountToBeSaved * 100;
    console.log(values);
    setFormData(values);
    setShowEnterPinForm(true);
  };

  console.log(user, activeCurrency);

  const handleCreateSavingsPlan = async values => {
    const url = 'savings';
    console.log(values);
    setLoading(true);
    try {
      const res = await api.post(url, { ...formData, ...values });
      console.log({ ...res });
      const data = res.data;
      openNotificationWithIcon(data?.message, 'Savings', 'success');

      close();
    } catch (error) {
      if (error?.data?.errors) {
        openNotificationWithIconErr(
          objectValuesStringify(error?.data?.errors),
          'Savings',
          'error',
        );
      } else {
        console.log('err', error?.data?.message);
        openNotificationWithIconErr(
          error?.data?.message || error?.message,
          'Savings',
          'error',
        );
      }
      console.log({ ...error });
    }
    setLoading(false);
  };

  return (
    <div className="create-savings-box">
      <h4 className="savings-title">Create Savings</h4>

      <div className=" mt-4">
        <div className="w-100">
          {showEnterPinForm ? (
            <Form onFinish={handleCreateSavingsPlan}>
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
                    // marginRight: '10px',
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
                      marginBottom: '10px',
                      height: '50px',
                    }}
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    style={{
                      background: '#000000',
                      color: '#ffffff',
                      marginBottom: '10px',
                      height: '50px',
                    }}
                    onClick={() => setShowEnterPinForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </Form>
          ) : (
            <Form
              onFinish={handlePayment}
              className="create-savings-form w-100"
            >
              <Form.Item
                className=""
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Savings name!',
                  },
                ]}
              >
                <Input
                  className="w-100 mb-0 create-savings-name"
                  type="text"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Enter Name Of Savings"
                />
              </Form.Item>

              <Form.Item
                className="selector-cover"
                name="currency"
                rules={[
                  {
                    required: true,
                    message: 'Please select preferred currency!',
                  },
                ]}
              >
                <AntdSelect
                  className="w-100 serv-select create-savings-currency"
                  dropdownStyle={{
                    background: '#F8FBF7',
                    width: '100%',
                    // padding: '10px',
                    border: 'none',
                  }}
                  // style={{
                  //   padding: '10px',
                  //   height: '50px',
                  //   background: '#F9F8F9',
                  //   borderRadius: '5px',
                  //   borderColor:"#EAEAEA",
                  //   color: '#777676',
                  //   border: 'none',
                  // }}
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
                className=""
                name="amountToBeSaved"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Amount!',
                  },

                  // {
                  //   type: 'number',
                  //   min: 200 / 100,
                  //   message: `Amount must be atleast ${200 / 100}`,
                  // },
                ]}
              >
                <Input
                  className="w-100 create-savings-amount"
                  type="number"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  // style={{
                  //   padding: '16px',
                  //   background: '#F8FBF7',
                  //   borderRadius: '20px',
                  //   border: 'none',
                  // }}
                  placeholder="Enter Amount"
                />
              </Form.Item>

              <Form.Item
                className=""
                name="frequencyInDays"
                rules={[
                  {
                    required: true,
                    message: 'Please input your frequency in days!',
                  },
                ]}
              >
                <Input
                  type="number"
                  className="create-savings-date"
                  // style={{
                  //   padding: '20px',
                  //   background: '#F8FBF7',
                  //   borderRadius: '20px',
                  //   // marginRight: '10px',
                  //   border: 'none',
                  // }}
                  placeholder="Frequency in days"
                />
              </Form.Item>

              <Form.Item
                className=""
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: 'Please input your end date!',
                  },
                  {
                    type: 'date',
                    message: 'Minimum must be atleast tomorrow',
                  },
                ]}
              >
                <Input
                  type="date"
                  className="create-savings-days"
                  // style={{
                  //   padding: '20px',
                  //   background: '#F8FBF7',
                  //   borderRadius: '20px',
                  //   // marginRight: '10px',
                  //   border: 'none',
                  // }}
                  placeholder="End Date"
                />
              </Form.Item>

              <button
                type="submit"
                className="w-100 new-savings-btn"
                disabled={loading}
              >
                Create
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSavings;
