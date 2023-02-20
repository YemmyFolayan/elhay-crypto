import React, { useEffect, useState } from 'react';
import '../Admin.css';
import Layout from 'components/common/DashboardLayout';
import { openNotificationWithIconErr } from 'appRedux/actions/Common';
import { removeCommaAmount } from 'helpers/utils';
import { useAmount, useUserData } from 'helpers/hooks';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openUpdateBox } from 'appRedux/actions/update';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { buyAirtime, getRechargeOperators } from 'appRedux/actions/domore';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Platformbutton } from 'components/common/button/button';
import { Simplemodal } from 'components/common/simplifiedmodal';
import mtn from 'assets/mtn.svg';
import glo from 'assets/glo.svg';
import airtel from 'assets/airtel.svg';
import eti from 'assets/9mb.svg';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import '../styles.scss';
import { Transreview } from 'components/common/transactionreview/review';

const Airtime = props => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [ops, setOps] = useState();
  const { amount, handleAmount } = useAmount(0);
  const [phone, setPhone] = useState();
  const [operator, setOperator] = useState(null);
  const [step, setStep] = useState(0);
  const [pin, setPin] = useState();
  const { userData } = useUserData();

  // const handlePayment = async values => {
  //   console.log(values);
  //   values.amount = values.amount * 100;
  //   // values.amount = values.amount;
  //   setFormData(values);
  //   setShowModal(true);
  // };

  const handlePayment = () => {
    var values = {
      amount: removeCommaAmount(amount) * 100,
      phone: phone,
      operatorId: ops[operator].id,
    };
    setFormData(values);
    setShowModal(true);
  };

  var dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };
  var callBack = value => {
    setLoading(false);
    setStep(value);
  };
  const handleCompleteTransaction = () => {
    setLoading(true);
    try {
      var number = formData.phone;
      var intNum = number.substring(1);
      var phoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g); //eslint-disable-line
      var prefix = '+234';
      var phoneNumber = prefix.concat(intNum.toString());

      if (phoneRegex.test(number) && phoneNumber.length === 14) {
        props.buyAirtime(
          {
            phoneNumber: phoneNumber,
            amount: removeCommaAmount(amount) * 100,
            currency: 'NGN_KOBO',
            transactionPin: pin,
            operatorId: formData.operatorId,
          },
          callBack,
        );
        // console.log({ phoneNumber: phoneNumber, amount:amount,currency:'NGN_KOBO', transactionPin:pin, operatorId:formData.operatorId })
      } else {
        openNotificationWithIconErr(
          'Error, Phone Number Entered Is not In Valid Format',
          'Phone Number',
          'error',
        );
        setLoading(false);
        setStep(2);
      }
    } catch (error) {
      openNotificationWithIconErr(
        'error occured while trying to buy airtime, try again.',
        'Airtime',
        'error',
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    props.getRechargeOperators(value => {
      var images = [glo, airtel, eti, mtn];
      var newArr = value.map((item, index) => ({
        img: images[index],
        id: item.id,
        name: item.name,
      }));
      console.log(newArr);
      setOps(newArr);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Layout info="If you ported sim/phone number from one provider to another (Example MTN to GLO) with same phone number you won’t be able to recharge">
      <section className="airtime">
        <div
          className="airtime__inner isw-container"
          style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
        >
          <Simplemodal onClick={() => setShowModal(false)} visible={showModal}>
            {operator !== null ? (
              <BuyAirtime
                setPin={setPin}
                message={props.message}
                pin={pin}
                data={{
                  amount: amount,
                  name: ops[operator].name,
                  phone: phone,
                }}
                finish={handleCompleteTransaction}
                step={step}
                closeModal={() => setShowModal(false)}
              />
            ) : (
              <></>
            )}
          </Simplemodal>

          <div className="airtime__content flex_page_container pt-4 px-5">
            <Titlesubtitle
              title="Buy Airtime"
              subtitle="Easily top up your phone with our airtime top-up service."
            />

            <div className="airtime__operators">
              <p>Select network operator</p>
              <span className="airtime__opbox">
                {(ops ?? []).map((item, index) => (
                  <img
                    className={`${operator === index && ' --active'}`}
                    key={index}
                    src={item.img}
                    alt="operator"
                    onClick={() => {
                      // console.log(ops[index])
                      setOperator(index);
                    }}
                  />
                ))}
              </span>
            </div>
            {operator !== null ? (
              <>
                <div className="airtime__inputs">
                  <Inputfloat
                    type="number"
                    label="PHONE NUMBER"
                    name="phone"
                    placeholder="Enter Phone Number To Recharge"
                    value={phone}
                    disabled={false}
                    onChange={e => setPhone(e.target.value)}
                  />
                  <div className="mb-4"></div>
                  <Amountinputcurrency
                    type="text"
                    currency="₦"
                    name="amount"
                    label={`Enter amount in ₦`}
                    value={
                      amount === 'NaN' ? 0 : amount.toLocaleString('en-US')
                    }
                    disabled={false}
                    placeholder={`Enter amount in ₦`}
                    onChange={handleAmount}
                    pattern="[0-9,.]*"
                  />
                </div>

                <div className="airtime__btns">
                  {userData.verifiedKyc === 'APPROVED' ||
                  userData.verifiedKyc === true ? (
                    <Platformbutton
                      name="Buy Airtime"
                      type="normal"
                      disabled={
                        (amount || phone) && removeCommaAmount(amount) > 199
                          ? false
                          : true
                      }
                      click={() => handlePayment()}
                    />
                  ) : (
                    <Platformbutton
                      name="Buy Airtime"
                      type="normal"
                      click={() => openUpdateModal()}
                    />
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const BuyAirtime = props => {
  var __renderStep = () => {
    switch (props.step) {
      case 0:
        return (
          <>
            {/* <Smallbox>
            <p>
                You are about to recharge your  <strong> {props.data.name}  {props.data.phone}</strong> 
                with a sum of <strong> ₦{props.data.amount.toLocaleString('en-US')} </strong> from your NetWebPay NAIRA WALLET BALANCE 
                includes a transaction charge of 3% 
                <strong> of ₦{Math.ceil(parseFloat( (props.data.amount * 0.03))).toLocaleString('en-US')} </strong>
            </p>
        </Smallbox> */}
            <Transreview
              data={[
                { title: 'Transaction Type', value: 'Airtime' },
                {
                  title: 'Amount',
                  value: `₦${props.data.amount.toLocaleString('en-US')}`,
                },
                { title: 'Network Operator', value: props.data.name },
                { title: 'Mobile Number', value: props.data.phone },
                {
                  title: 'Fee (3%)',
                  value: ` ₦${Math.ceil(
                    parseFloat(props.data.amount * 0.03),
                  ).toLocaleString('en-US')}`,
                },
              ]}
            />
            <Comptransaction
              setPin={props.setPin}
              pin={props.pin}
              loading={props.loading}
              goBack={() => props.back()}
              btn={`Initiate Transaction`}
              onFinish={() => alert('')}
              len={4}
              lower={true}
            >
              <Backcontinue goBack={() => props.closeModal()}>
                <Platformbutton
                  name="Initiate Transaction"
                  type="normal"
                  click={() => props.finish()}
                />
              </Backcontinue>
            </Comptransaction>
          </>
        );
      // );
      case 1:
        return (
          <Success
            title="Airtime"
            subtitle={props.message}
            onClick={() => props.closeModal()}
          />
        );
      case 2:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Airtime"
            subtitle={props.message}
            button="Try Again"
            onClick={() => props.setStep(0)}
          />
        );
      default:
        return <></>;
    }
  };

  return __renderStep();
};

const mapStateToProps = ({ auth, domore }) => {
  const { authUser } = auth;
  const { message } = domore;
  return {
    authUser,
    message,
  };
};

const mapDispatchToProps = {
  openUpdateBox,
  getRechargeOperators,
  buyAirtime,
};

export default connect(mapStateToProps, mapDispatchToProps)(Airtime);
