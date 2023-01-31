import React, { useEffect } from 'react';
import './selectcard.scss';
import Card from '../../assets/card.svg';
import globalgeng from '../../assets/globalgeng.jpg';
import { useState } from 'react';
import { Success } from 'components/common/success/success';
import { fetchAllCardStates } from 'appRedux/actions/Common';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';
import Loader from 'components/Loader';
import { useRates, useUserData } from 'helpers/hooks';
import sorry from '../../assets/sorry.svg';
import vcard from 'assets/virtualcard.svg';
import vcards from 'assets/virtualcardstripe.svg';
import { Success as Prompt } from 'components/common/success/success';
import { navigate } from '@reach/router';
import errorsvg from '../../assets/error-2.svg';
import processing from '../../assets/processing.svg';
// import { Backcontinue } from "components/common/backcontinue/backcontinue"
// import { Vcardprompt } from "./vcardprompt"
import { Titlesubtitle } from '../common/titlesubtitle/titlesubtitle';
import Fundcard from 'containers/Admin/Cash/carddetails/fundcard';
import { useDispatch } from 'react-redux';
import { openUpdateBox } from 'appRedux/actions/update';
import { Createapto } from './createapto';
import Carousel, { CarouselItem } from 'components/common/carousel/carousel';
import Createstripe from './createstripe';
import Globalgeng from './globalgeng';
import { globalGengCardStatus } from 'appRedux/actions/waitlist';
import { connect } from 'react-redux';
import Createmono from './createmono';
import { Platformbutton } from 'components/common/button/button';
// import { Vcard } from "./virtualcard"
// import { Comingsoon } from "components/common/comingsoon/comingsoon"
// eslint-disable-next-line
const config = {
  cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSe41UWfClmmsLOKGWDtzfGtTVOUXa4o19Z5Jh1jRCOrlXfDsw/formResponse',
};

const Ordercard = props => {
  const [type, setType] = useState();
  const { userData } = useUserData();
  const { pricesData } = useRates();
  const [status, setStatus] = useState();
  const myData = localStorage.getItem('userData');
  const [step, setStep] = useState(0);
  const [cardtype, setCard] = useState(0);
  // eslint-disable-next-line
  const [form, setForm] = useState({
    name: {
      id: 543567245,
      value: JSON.parse(myData).firstName + ' ' + JSON.parse(myData).lastName,
    },
    email: { id: 1060129860, value: JSON.parse(myData).email },
    dob: { id: 1881948096, value: JSON.parse(myData).dob },
    phone: { id: 620036527, value: JSON.parse(myData).phoneNumber },
    providusAccountNumber: {
      id: 169395109,
      value: JSON.parse(myData).providusAccountNumber,
    },
    address: { id: 1803411834, value: '' },
  });

  // eslint-disable-next-line
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  var date = new Date();
  // eslint-disable-next-line
  const [vdata, setData] = useState({
    userId: JSON.parse(myData).id,
    cardName: '',
    cardColor: '',
    cardBrands: 'Mastercard',
    kyc_id_number: '',
    kyc_id_type: '',
    phone_number: JSON.parse(myData).phoneNumber,
    dob: userData.dob || date.toString(),
    state: '',
    city: '',
    billingAddress: '',
    postalCode: '',
    cardPin: '',
    country: '',
  });
  const [sdata, setSData] = useState({
    userId: JSON.parse(myData).id,
    cardColor: '',
    cardBrands: 'Visa',
    billingAddress: '',
    postalCode: '',
    country: '',
    cardPin: '',
  });
  const [apto, setApto] = useState({
    otp: '',
    phoneNumber: JSON.parse(myData).phoneNumber,
    dob: userData.dob || date.toString(),
    cardName: '',
    cardColor: 'Black',
    cardBrands: 'Mastercard',
    state: '',
    city: '',
    billingAddress: '',
    postalCode: '',
    country: 'USA',
    dob_entity_id: '',
    phone_entity_id: '',
    cardPin: '',
  });
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const nextStep = value => {
    setStep(value);
  };

  const moveToVirtual = () => {
    setStep(2);
  };

  var dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };

  // const prevStep = () => {
  //     setStep(1)
  // }

  var setPin = value => {
    cardtype === 2
      ? setApto({ ...apto, cardPin: value })
      : setSData({ ...sdata, cardPin: value });
  };

  var __renderStatus = () => {
    switch (status && status.status) {
      case 'PROCESSING':
        return (
          <p className="globalgeng__status">
            Your GlobalGeng Card is{' '}
            <strong style={{ color: '#000000' }}> being processed,</strong> you
            will be informed when it is ready for delivery or pickup
          </p>
        );
      case 'DISAPPROVED':
        return (
          <p className="globalgeng__status --failed">
            Your GlobalGeng Card application{' '}
            <strong style={{ color: '#C43138' }}> was disapproved </strong>,
            click the button to try again`;
          </p>
        );
      case 'READY-FOR-DELIVERY':
        return (
          <p className="globalgeng__status">
            {' '}
            Your GlobalGeng card is ready to be picked up, pick up locations is:
            <strong style={{ color: '#e89f0c' }}>
              30 Furo Ezimora Street, Lekki Phase 1
            </strong>
          </p>
        );
      case 'DELIVERED':
        return (
          <div className="globalgeng__status">
            <p className="globalgeng__status">
              Your GlobalGeng card has been delivered.
            </p>
            {status.tempResetPin ? (
              <p>
                Your temporary PIN is <strong> {status.tempResetPin} </strong>{' '}
              </p>
            ) : (
              <></>
            )}
          </div>
        );
      case 'PENDING':
        return (
          <p className="globalgeng__status --pending">
            Your GlobalGeng Card is{' '}
            <strong style={{ color: '#000000' }}> being processed,</strong> you
            will be informed when it is ready for delivery or pickup
          </p>
        );
      default:
        return (
          <p>
            For your easy <strong> financial Naira </strong> transactions. A
            physical Naira card that works everywhere, this card is only
            available for reservation at the moment.
          </p>
        );
    }
  };

  const data = [
    {
      image: globalgeng,
      title: 'vesti GlobalGeng Card (Mastercard)',
      // subtitle : __renderStatus(),
      button: 'Request For Card',
    },
    {
      image: vcard,
      title: 'vesti Virtual Dollar Card (VISA)',
      subtitle:
        'Need the comfort of a high profile virtual card, and the lifestyle that comes with it? Then this is your card.',
      // button :props.approved === true ? 'Continue' : 'Join Queue'
      button: 'Continue',
    },
    {
      image: Card,
      title: 'vesti Black Dollar Card (Mastercard)',
      subtitle:
        'Need the comfort of a high profile pyhsical card, and the lifestyle that comes with it? Then this is your card (available only in the US for now).',
      button: 'Continue ',
    },
  ];
  var datang = [
    {
      image: globalgeng,
      title: 'vesti GlobalGeng Card (Mastercard)',
      // subtitle : __renderStatus(),
      button: 'Request For Card',
    },
    {
      image: vcard,
      title: 'vesti Virtual Dollar Card (VISA)',
      subtitle:
        'Need the comfort of a high profile virtual card, and the lifestyle that comes with it? Then this is your card.',
      // button : props.approved === true ? 'Continue' : 'Join Queue'
      button: 'Continue',
    },
    // {
    //     image : Card,
    //     title: 'vesti Black Dollar Card (Mastercard)',
    //     subtitle : 'Need the comfort of a high profile pyhsical card, and the lifestyle that comes with it? Then this is your card.',
    //     button : 'Continue '
    // },
  ];

  const physical = [
    {
      image: globalgeng,
      title: 'vesti GlobalGeng Card (Mastercard)',
      // subtitle : __renderStatus(),
      button: 'Request For Card',
    },
  ];
  const virtual = [
    {
      image: vcard,
      title: 'vesti Virtual Dollar Card (VISA)',
      subtitle:
        'Need the comfort of a high profile virtual card, and the lifestyle that comes with it? Then this is your card.',
      button: 'Continue',
    },

    {
      image: vcards,
      title: 'Founders Card (VISA)',
      subtitle:
        'Need the comfort of a high profile virtual card, and the lifestyle that comes with it? Then this is your card.',
      button: props.approved === 'APPROVED' ? 'Continue' : 'Join Queue',
    },
  ];
  const goToprofile = () => {
    navigate('/myprofile?tab=kyc');
  };

  useEffect(() => {
    globalGengCardStatus(JSON.parse(myData).id, setStatus);
    props.fetchAllCardStates({ country: 'united states' });

    props.cardType === 'globalgeng'
      ? setStep(5)
      : props.cardType === 'mono'
      ? setStep(2)
      : setStep(0);

    // eslint-disable-next-line
  }, []);
  if (props.allLoading) {
    return <Loader />;
  } else {
    switch (step) {
      case 0:
        return (
          <Cardtype
            userdata={userData}
            cardType={props.cardType}
            closeModal={() => props.closeModal(false)}
            type={type}
            setType={setType}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <>
            <Titlesubtitle
              steps="Step 1"
              title={`Select a card `}
              subtitle="Select the type of card you want from our 
                        variety of options."
            />
            <Selectcard
              __renderStatus={__renderStatus}
              status={status}
              approved={props.approved}
              nextStep={nextStep}
              data={data}
              datang={datang}
              cardtype={cardtype}
              setCard={setCard}
              userData={userData}
              openUpdateModal={openUpdateModal}
              type={props.type}
              physical={physical}
              virtual={virtual}
              card={type}
            />
          </>
        );

      case 2:
        return (
          <Createmono
            id={props.monoCardHolderId || userData.monoCardHolderId}
            userdata={userData}
            balance={userData.walletInNGNKobo / 100}
            closeModal={() => props.closeModal(false)}
            refetch={props.refetch}
            rate={pricesData.MONO_CARD_RATE / 100}
          />
        );
      case 3:
        return (
          <>
            {/* {props.country} */}
            {cardtype === 2 ? (
              <Createapto
                data={apto}
                setData={setApto}
                setStep={setStep}
                states={props.states}
                // create ={virtualCard}
                userdata={userData}
              />
            ) : (
              <Createstripe
                data={sdata}
                openWait={props.openWait}
                approved={props.approved}
                setData={setSData}
                setStep={setStep}
                // type = {cardtype === 1 ? '' :''}
                states={props.states}
                closeModal={() => props.closeModal(false)}
              />
            )}
            {/* <Vcard
                        data={vdata}
                        openWait={props.openWait}
                        approved={props.approved}
                        setData={setData}
                        setStep={setStep}
                        // type = {cardtype === 1 ? '' :''}
                        states={states}
                        closeModal={()=>props.closeModal(false)}
                    /> */}
          </>
        );
      case 4:
        return (
          <Prompt
            image={sorry}
            title="Sorry :("
            subtitle="Sorry :(, you will have to update your profile details either (Upload KYC, firstName, lastName or phone number), only users with full profile details can reserve cards."
            button="Go to myprofile"
            onClick={goToprofile}
          />
        );
      case 5:
        return (
          <Globalgeng
            closeModal={() => props.closeModal(false)}
            lagRate={(pricesData.WITHIN_LAGOS_PRICE / 100).toLocaleString(
              'en-us',
            )}
            outRate={(pricesData.OUTSIDE_LAGOS_PRICE / 100).toLocaleString(
              'en-us',
            )}
          />
        );
      case 6:
        return (
          <>
            <Titlesubtitle
              steps={`${cardtype === 1 ? 'Step 5 of 5' : 'Step 4 of 4'}`}
              title={
                cardtype === 1
                  ? 'Set your Black dollar card PIN'
                  : 'Set virtual card PIN'
              }
              subtitle={
                cardtype === 1
                  ? 'Set Your PIN to finalize creation of your black dollar card.'
                  : 'Set Your PIN to finalize creation of your virtual card.'
              }
            />
            {/* virtualCard ={virtualCard}  */}
            <Finalize
              setStep={setStep}
              pin={cardtype === 1 ? apto.cardPin : vdata.cardPin}
              setPin={setPin}
              loading={loading}
              cardtype={cardtype}
            />
          </>
        );
      case 7:
        return (
          <Success
            image={!message.includes('Successfully') ? processing : false}
            title={
              data[cardtype].title.includes('dollar')
                ? cardtype === 1
                  ? 'Black dollar Card Created Successfully'
                  : `Visa Virtual Card ${
                      data[cardtype].button === 'Continue'
                        ? 'Creation'
                        : 'reserved'
                    }`
                : 'Card Reservation Successful'
            }
            subtitle={
              data[cardtype].title.includes('dollar')
                ? message.includes('Successfully')
                  ? cardtype === 1
                    ? 'Your Black dollar card has been created successfully, vesti waved off a $7 creation fee'
                    : 'Your Virtual card is being processed, this might take roughly 15mins before it appears on your dashboard because, we have to verify the details you provided while creating the card.'
                  : message
                : cardtype === 1
                ? 'Successfully created virtual Card'
                : `Perfect! You Have reserved your ${datang[cardtype].title} physical card Which WIll be available to collect shortly. We Will Notify Soon About Card Activation Via Mail.`
            }
            button="Okay, Thank You!"
            onClick={() => props.closeModal(false)}
          />
        );
      case 8:
        return (
          <Success
            image={errorsvg}
            title={`Virtual Card Creation.`}
            subtitle={message}
            onClick={moveToVirtual}
            button="Try Again"
            type="error"
          />
        );
      case 9:
        return (
          <Fundcard
          // cardId={cardId}
          />
        );

      default:
        return <>Not Found</>;
    }
  }
};

const Cardtype = props => {
  var handleType = value => {
    // var value = e.target.value
    props.setType(value);
  };
  var data = [
    {
      title: 'Physical Card',
      value: 'PHSYICAL-CARD',
      subtitle:
        'Checkout our list of physical cards and select the one that works for you.',
    },
    {
      title: 'Virtual Card',
      value: 'VIRTUAL-CARD',
      subtitle:
        'Checkout our list of Virtual cards and select the one that works for you.',
    },
    {
      title: 'Founders Card',
      value: 'FOUNDERS-CARD',
      subtitle:
        'Get a Visa card that works for you as a Founder/Business owners that works everywhere on the internet.',
    },
  ];
  var dispatch = useDispatch();

  var openUpdate = () => {
    props.closeModal();
    dispatch(openUpdateBox());
  };
  return (
    <div className="globalgeng__column">
      <Titlesubtitle
        title="Type of Card"
        subtitle="What type of card do you want to create"
      />

      <div className="globalgeng__type">
        {data.map((item, index) => (
          <div
            className={`cardtype ${props.type === item.value && ' --active'} `}
            key={index}
            onClick={() => handleType(item.value)}
          >
            <div className="cardtype__inner">
              {/* <img src={props.img} alt=""/> */}
              <div className="cardtype__right">
                <p>{item.title}</p>
                <p>{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Platformbutton
        type="normal"
        name={
          props.type
            ? `Continue to ${
                data.filter(item => item.value === props.type)[0].title
              }`
            : 'Continue'
        }
        disabled={!props.type ? true : false}
        click={() => {
          props.userdata.kycLevel === 'Level0'
            ? openUpdate()
            : props.setStep(props.type === 'FOUNDERS-CARD' ? 3 : 1);
        }}
      />
    </div>
  );
};
const Selectcard = props => {
  // var mainData = props.type.length > 1 ? props.approved === true ? props.data : props.datang : props.datang

  // var mainData = props.type.length > 1 ? props.data : props.datang
  var mainData = props.card === 'VIRTUAL-CARD' ? props.virtual : props.physical;
  return (
    <div className="selectcard-container">
      <Carousel active={props.cardtype} setActive={props.setCard}>
        {mainData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="selectcard-inner">
              <div className="selectcard-inner center">
                <img src={item.image} alt="Card SVG" />
                <div className="center-controls">
                  {mainData.map((item, index) => (
                    <div
                      key={index}
                      className={`control ${
                        props.cardtype === index ? ' active' : ''
                      }`}
                      onClick={() => props.setCard(index)}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="selectcard-inner description">
                <p>{item.title}</p>
                {!item.title.includes('GlobalGeng') && <p>{item.subtitle}</p>}
                {item.title.includes('GlobalGeng') && props.__renderStatus()}
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
      {// (props.userData.firstName !== null && props.userData.lastName !== null && props.userData.phoneNumber !== null && props.userData.phoneNumber !== "FALSE"  && props.userData.phoneNumber !== false && (props.userData.verifiedKyc === "APPROVED" || props.userData.verifiedKyc === true)) ? <button className="selectcard-button" onClick={ () => props.cardtype === 0 || props.cardtype === 1 ?  props.nextStep(2) : props.nextStep(5) }>{mainData[props.cardtype].button} <i className="fas fa-arrow-right"></i></button>
      props.userData.verifiedKyc === 'APPROVED' ||
      props.userData.verifiedKyc === true ? (
        mainData[props.cardtype].title.includes('GlobalGeng') ? (
          props.status ? (
            props.status === 'DISAPPROVED' ? (
              <button
                className="selectcard-container__button"
                onClick={() => props.nextStep(5)}
              >
                {mainData[props.cardtype].button}{' '}
                <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              ''
            )
          ) : (
            <button
              className="selectcard-container__button"
              onClick={() => props.nextStep(5)}
            >
              {mainData[props.cardtype].button}{' '}
              <i className="fas fa-arrow-right"></i>
            </button>
          )
        ) : (
          <button
            className="selectcard-container__button"
            // check if it's a virtual card then check if it's a stripe card then check if user has been approved to create a stripe card
            // onClick={ () => mainData[props.cardtype].title.includes('Dollar') ?
            //     mainData[props.cardtype].title.includes('VISA') ?  props.approved === true ? props.nextStep(3) :props.nextStep(3) :props.nextStep(2)
            //     : props.nextStep(5) }
            onClick={() =>
              mainData[props.cardtype].title.includes('Virtual')
                ? props.nextStep(2)
                : props.nextStep(3)
            }
          >
            {mainData[props.cardtype].button}
            <i className="fas fa-arrow-right"></i>
          </button>
        )
      ) : (
        <button
          className="selectcard-container__button"
          onClick={() => props.nextStep(4)}
        >
          {mainData[props.cardtype].button}{' '}
          <i className="fas fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

const Finalize = props => {
  return (
    <Form onFinish={props.virtualCard} style={{ width: '100%' }}>
      <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
        <p>Choose your 5 digit PIN for this card</p>
        <DividedPinInput onChange={props.setPin} len={5} />
      </div>
      {props.loading ? (
        <Loader />
      ) : (
        <div className="btn-container">
          <div
            type="submit"
            className="btn-left"
            onClick={() => {
              props.setStep(2);
            }}
          >
            Back
          </div>
          <button type="submit" className="btn-right">
            {props.cardtype === 1
              ? 'Finalize Card Creation'
              : 'Finalize Visa Virtual Card Creation'}
          </button>
        </div>
      )}
    </Form>
  );
};

const mapStateToProps = ({ common, domore }) => {
  const { countries, states, fetchLoading, allLoading } = common;
  const { cardType } = domore;
  return {
    fetchLoading,
    allLoading,
    countries,
    states,
    cardType,
  };
};
const mapDispatchToProps = {
  fetchAllCardStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordercard);
