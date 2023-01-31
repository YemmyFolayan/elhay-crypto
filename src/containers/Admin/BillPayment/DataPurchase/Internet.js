import React, { useEffect, useState } from 'react';
import '../billPayment.scss';
import '../../Admin.css';
import '../Electricity/ElectPayment.scss';
import { Success } from 'components/common/success/success';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { Singleselect } from 'components/common/inputs/singleselect';
import Loader from 'components/Loader';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form, Modal } from 'antd';
import api from 'appRedux/api';
import SingleBiller from '../SingleBiller';
import newerror from '../../../../assets/newerror.svg';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import internet from '../../../../assets/internet.svg';

const Internet = props => {
  const [modal, showModal] = useState(false);

  var openModal = () => {
    showModal(true);
  };
  var closeModal = () => {
    showModal(false);
  };

  return (
    <>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        onCancel={closeModal}
        destroyOnClose
        footer=""
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <InternetPayment
          onClick={closeModal}
          internetData={props.internetData}
          setInternetData={props.setInternetData}
        />
      </Modal>
      <SingleBiller
        title="Data Bundle"
        image={internet}
        color="#F7FBFE"
        onClick={openModal}
      />
    </>
  );
};

export default Internet;

const InternetPayment = props => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [internetData, setInternetData] = useState([]);
  const [message, setMessage] = useState('');
  const [internetDetails, setInternetDetails] = useState([]);

  const [form, setForm] = useState({
    type: '',
    amount: '',
    billingNumber: '',
    transactionPin: '',
  });

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const validate = async type => {
    const data = {
      billCode: type.billCode,
      itemCode: type.itemCode,
      billingNumber: form.billingNumber,
    };
    console.log(data);
    setIsLoading(true);
    await api
      .post(`/biller/validate`, data)
      .then(res => {
        setIsLoading(false);
        console.log(res);
        console.log(res.data.data.message);
        res.data.data.status === 'error'
          ? openNotificationWithIconErr(
              `Internet Bill Payment`,
              `${res.data.data.message}, Please Input a valid Phone Number`,
              'error',
            )
          : setInternetDetails(res.data.data.data);
        console.log(internetDetails);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        setMessage(error.response.data.message);
        openNotificationWithIconErr(
          `Internet Bill Payment`,
          `${error.response.data.message}`,
          'error',
        );
        setStep(4);
        console.log(error.response.data.message);
        console.log('err', error.message);
      });
  };

  const getInternetData = async () => {
    setIsLoading(true);
    await api
      .get(`/biller/categories`)
      .then(res => {
        setIsLoading(false);
        console.log('all Data ', res.data.data.data);
        const nig = res.data.data.data.filter(item =>
          item.country.includes('NG'),
        );
        setInternetData(nig);
        console.log('9ja Data ', nig);
      })
      .catch(error => {
        setIsLoading(false);
        setMessage(error.response.data.message);
        openNotificationWithIconErr(
          `Internet Bills Payment`,
          `${error.response.data.message}`,
          'error',
        );
        setStep(4);
        console.log(error.response.data.message);
        console.log('err', error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    getInternetData();
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (form.billingNumber.length === 11 && isMounted) {
      validate(form.type);
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.billingNumber.length, form.type]);

  var Options =
    internetData.length > 0
      ? (
          internetData.filter(
            item =>
              item.biller_code.includes('BIL108') ||
              item.biller_code.includes('BIL109') ||
              item.biller_code.includes('BIL110') ||
              item.biller_code.includes('BIL124') ||
              item.biller_code.includes('BIL129') ||
              (item.biller_code.includes('BIL111') &&
                item.amount !== 0 &&
                item.is_airtime === false),
          ) ?? []
        ).map(item => ({
          value: item.amount,
          label: item.name,
          type: item.biller_name,
          itemCode: item.item_code,
          billCode: item.biller_code,
          labelName: item.label_name,
          fee: item.fee,
          // fee: item.fee === 0 ? 100 : item.fee,
        }))
      : [];
  console.log(Options);

  var handleChange = value => {
    console.log(value);
    setForm({ ...form, type: value });
  };

  const payBill = async () => {
    setIsLoading(true);
    const data = {
      country: 'NG',
      amountInKoboCent: form.type.value * 100,
      currency: 'NGN_KOBO',
      recurrence: 'ONCE',
      chargesInKobo: form.type.fee * 100,
      type: form.type.type,
      transactionPin: form.transactionPin,
      billingNumber: form.billingNumber,
    };
    console.log(data);
    await api
      .post(`/biller/create`, data)
      .then(res => {
        setIsLoading(false);
        setMessage(res.data.message.toLowerCase());
        openNotificationWithIcon(
          `Data Bundle Payment`,
          `Data bundle purchase ${res.data.message.toLowerCase()}`,
          'success',
        );
        setStep(3);
        console.log(res);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        setMessage(error.data.message);
        openNotificationWithIconErr(
          `Data Bundle Payment`,
          `${error.data.message}`,
          'error',
        );
        setStep(4);
        console.log(error.data.message);
      });
  };

  switch (step) {
    case 0:
      return (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="elect-payment-cont">
              <Titlesubtitle
                title="Data Bundle •1 of 2"
                subtitle="Fill in the fields below to get your data bundle without hassles."
              />

              <Myform
                form={form}
                step={step}
                internetDetails={internetDetails}
                internetData={internetData}
                Options={Options}
                handleChange={handleChange}
                validate={validate}
                setForm={setForm}
                setStep={setStep}
                setInput={setInput}
                setInternetData={setInternetData}
                setInternetDetails={setInternetDetails}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          )}
        </>
      );
    case 1:
      return (
        <div className="elect-payment-cont">
          <Titlesubtitle
            title=" Transaction Pin •2 of 3 "
            subtitle="Review your Transaction and enter your pin to complete"
          />
          <Finalize
            form={form}
            setStep={setStep}
            step={step}
            setForm={setForm}
            transactionpin={form.transactionPin}
            payBill={payBill}
            internetDetails={internetDetails}
            setInternetDetails={setInternetDetails}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      );

    case 3:
      return (
        <Success
          title="Payment Received"
          subtitle={`Data bundle purchase ${message}`}
          button="Close!"
          onClick={props.onClick}
        />
      );
    case 4:
      return (
        <Success
          image={newerror}
          title="Error"
          subtitle={message}
          button="Close!"
          onClick={props.onClick}
        />
      );
    default:
      return <p>Error</p>;
  }
};

const Myform = props => {
  return (
    <>
      <form className="elect-payment">
        <Singleselect
          placeholder="Select a biller"
          value={props.form.type}
          options={props.Options}
          onChange={e => props.handleChange(e)}
        />
        <Inputfloat
          type="number"
          label="Amount"
          name="amount"
          value={props.form.type.value || ''}
          placeholder="Amount"
          disabled
        />
        <Inputfloat
          type="text"
          label="Phone Number"
          name="billingNumber"
          value={props.form.billingNumber}
          onChange={props.setInput}
          disabled={props.form.type === ''}
        />

        {props.internetDetails.response_code === '00' && (
          <button
            type="submit"
            className="default-btn w-100 py-3"
            disabled={
              props.form.type !== '' && props.form.billingNumber !== ''
                ? false
                : true
            }
            onClick={() => props.setStep(1)}
          >
            Proceed to Enter your Pin
          </button>
        )}
      </form>
    </>
  );
};

const Finalize = props => {
  const transactionPin = value => {
    props.setForm({ ...props.form, transactionPin: value });
  };

  return (
    <Form onFinish={props.payBill} style={{ width: '100%' }}>
      <div className="transaction-summary">
        <div className="bits">
          <p>Transaction Type</p>
          <p>Internet</p>
        </div>
        <div className="bits">
          <p>Plan</p>
          <p>{props.form.type.label}</p>
        </div>
        <div className="bits">
          <p>Phone Number</p>
          <p>{props.form.billingNumber}</p>
        </div>
        <div className="bits">
          <p>Amount</p>
          <p>{props.form.type.value}</p>
        </div>
        <div className="bits">
          <p>Fee</p>
          <p>{props.form.type.fee}</p>
        </div>
        <div className="bits">
          <p>Total</p>
          <p>
            {parseInt(props.form.type.fee) + parseInt(props.form.type.value)}
          </p>
        </div>
      </div>
      <div className="pin-body" style={{ width: '100%' }}>
        <p>Enter Your Transaction Pin</p>
        <DividedPinInput onChange={transactionPin} />
      </div>
      {props.isLoading ? (
        <Loader />
      ) : (
        <div className="button-container">
          <button
            type="submit"
            className="btn-left"
            onClick={() => {
              props.setStep(0);
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-right"
            disabled={props.form.transactionPin.length !== 4}
          >
            Pay
          </button>
        </div>
      )}
    </Form>
  );
};
