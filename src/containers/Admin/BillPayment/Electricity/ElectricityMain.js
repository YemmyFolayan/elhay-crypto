import React, { useEffect, useState } from 'react';
import '../billPayment.scss';
import '../../Admin.css';
import './ElectPayment.scss';
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
import bulb from '../../../../assets/bulbb.svg';
import newerror from '../../../../assets/newerror.svg';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';

const ElectricityMain = props => {
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
        <ElectPayment
          onClick={closeModal}
          powerData={props.powerData}
          setPowerData={props.setPowerData}
          // refetch={props.refetch()}
        />
      </Modal>
      <SingleBiller
        title="Electricity"
        image={bulb}
        color="#FCF8ED"
        onClick={openModal}
      />
    </>
  );
};

export default ElectricityMain;

const ElectPayment = props => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [powerData, setPowerData] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [meterDetails, setMeterDetails] = useState([]);

  const [form, setForm] = useState({
    type: '',
    billingNumber: '',
    amount: '',
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
              `Electricity Bill`,
              `${res.data.data.message}, Please Input a valid Meter Number`,
              'error',
            )
          : setMeterDetails(res.data.data.data);
        console.log(meterDetails);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        setMessage(error.response.data.message);
        openNotificationWithIconErr(
          `Bills Payment`,
          `${error.response.data.message}`,
          'error',
        );
        setStep(4);
        console.log(error.response.data.message);
        console.log('err', error.message);
      });
  };

  const getPowerData = async () => {
    setIsLoading(true);
    await api
      .get(`/biller/categories`)
      .then(res => {
        setIsLoading(false);
        console.log('Parent Array: ', res.data.data.data);
        const nig = res.data.data.data.filter(item =>
          item.country.includes('NG'),
        );
        setPowerData(nig);
        console.log('Nigerian Array: ', nig);
      })
      .catch(error => {
        setIsLoading(false);
        setMessage(error.response.data.message);
        openNotificationWithIconErr(
          `Bills Payment`,
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
    getPowerData();
    // setStep(3);
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
    powerData.length > 0
      ? (
          powerData.filter(item => item.label_name.includes('Meter Number')) ??
          []
        ).map(item => ({
          value: item.biller_name,
          label: item.biller_name,
          itemCode: item.item_code,
          billCode: item.biller_code,
          labelName: item.label_name,
          // fee: item.fee === 0 ? 100 : item.fee,
          fee: item.fee,
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
      amountInKoboCent: form.amount * 100,
      currency: 'NGN_KOBO',
      recurrence: 'ONCE',
      chargesInKobo: form.type.fee * 100,
      type: form.type.label,
      billingNumber: form.billingNumber,
      transactionPin: form.transactionPin,
    };
    console.log(data);
    await api
      .post(`/biller/create`, data)
      .then(res => {
        setIsLoading(false);
        setMessage(res.data.message.toLowerCase());
        setToken(res.data.billStatus.data.extra);
        openNotificationWithIcon(
          `Electricity Bill`,
          `Electricity purchase ${res.data.message.toLowerCase()}`,
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
          `Electricity Bill`,
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
                title="Electricity •1 of 2"
                subtitle="Fill in the field below to pay for your electricity without hassles."
              />

              <Myform
                form={form}
                step={step}
                meterDetails={meterDetails}
                powerData={powerData}
                Options={Options}
                handleChange={handleChange}
                validate={validate}
                setInput={setInput}
                setStep={setStep}
                setForm={setForm}
                setMeterDetails={setMeterDetails}
                setPowerData={setPowerData}
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
            setMeterDetails={setMeterDetails}
            meterDetails={meterDetails}
            transactionpin={form.transactionPin}
            payBill={payBill}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      );

    case 3:
      return (
        <Success
          title="Success"
          subtitle={`Electricity purchase ${message}`}
          text={token === null ? '' : `Token : ${token}`}
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
          label="Meter Number"
          name="billingNumber"
          value={props.form.billingNumber}
          placeholder="Meter Number"
          onChange={props.setInput}
        />
        {props.meterDetails.name ? (
          <>
            <Inputfloat
              type="text"
              label="Name"
              name="name"
              value={props.meterDetails.name}
              disabled
            />

            <Inputfloat
              type="number"
              label="Fee"
              name="fee"
              value={props.meterDetails.fee}
              disabled
            />
            <Inputfloat
              type="number"
              label="Amount"
              name="amount"
              value={props.form.amount}
              placeholder="amount"
              onChange={props.setInput}
            />
            <button
              type="submit"
              className="default-btn w-100 py-3"
              disabled={
                props.form.type !== '' &&
                props.form.billingNumber !== '' &&
                props.form.amount !== ''
                  ? false
                  : true
              }
              onClick={() => props.setStep(1)}
            >
              Proceed to Enter your Pin
            </button>
          </>
        ) : (
          <></>
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
          <p>ELECTRICITY</p>
        </div>
        <div className="bits">
          <p>Disco</p>
          <p>{props.form.type.value}</p>
        </div>
        <div className="bits">
          <p>Meter Number</p>
          <p>{props.form.billingNumber}</p>
        </div>
        <div className="bits">
          <p>Amount</p>
          <p>{props.form.amount}</p>
        </div>
        <div className="bits">
          <p>Fee</p>
          <p>{props.meterDetails.fee}</p>
        </div>
        <div className="bits">
          <p>Total</p>
          <p>
            {parseInt(props.meterDetails.fee) + parseInt(props.form.amount)}
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
