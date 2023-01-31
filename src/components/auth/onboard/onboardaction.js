import React, { useState } from 'react';
import mpay from 'assets/merpayment.svg';
import vpath from 'assets/vpathway.svg';
import vcards from 'assets/vecards.svg';
// import usacc from "assets/usaccount.svg"
import './onboardaction.scss';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import {
  openAccWait,
  openVirtual,
  openWaitlist,
} from 'appRedux/actions/domore';
import { openUpdateBox } from 'appRedux/actions/update';
import useAnalyticsEventTracker from 'components/common/ganalytics/gaanalytics';

export const Onboardthree = props => {
  const [active, setActive] = useState();
  var dispatch = useDispatch();

  // var Loan = ()=> {
  //     dispatch(openLoan())
  // }
  // eslint-disable-next-line
  var openWaitlis = () => {
    // alert('asdasdasdasdasda')
    navigate('/bank');
    dispatch(openAccWait());
  };

  // eslint-disable-next-line
  var openVcard = () => {
    navigate('/bank');
    props.from ? dispatch(openUpdateBox) : dispatch(openVirtual());
  };
  var goTo = value => {
    navigate(`/${value}`);
  };

  const data = [
    {
      title: "Founder's Card",
      subtitle:
        ' Get a Visa card that works for you as a founder / Business owners that works everywhere on the internet',
      image: vcards,
      onclick: () => dispatch(openWaitlist()),
      // button:'Whitelist For Card'
      button: 'Learn More',
    },
    {
      title: 'Global Geng Card',

      subtitle:
        'A physical Naira card that works everywhere, this card is only available for reservation at the moment.',

      image: vcards,
      onclick: () => dispatch(openVirtual('globalgeng')),
      button: 'Learn More',
    },
    {
      title: 'Merchant Payment',
      subtitle:
        'Pay for fees like WES and SEVIS,  Hundreds of trusted Immigration service providers, all in one place.',
      image: mpay,
      onclick: () => goTo('merchants'),
      button: 'See All Merchants',
    },
    {
      title: 'NetWebPay pathway',
      subtitle:
        'Get tailored help to migrate to country of your choice, with the NetWebPay pathways, comes with a 30day free subscription.',
      image: vpath,
      onclick: () => goTo('pathways'),
      button: 'See All Pathways',
    },

    // {
    //     title:'Get USA Bank Account',
    //     subtitle:"Get your personal foreign bank account, send and receive funds and more in your personal account.",
    //     image:usacc,
    //     onclick:openWaitlis,
    //     button:'Join The Queue'
    // }
  ];

  const gaEventTracker = useAnalyticsEventTracker('Onboarding');

  var clickAction = e => {
    e.preventDefault();
    props.closeModal();
    // props.link ? navigate(props.link) : props.onclick()
    gaEventTracker(data[active].title, data[active].subtitle);
    data[active].onclick();
  };

  var dummy = e => {
    e.preventDefault();
    alert('Please Select an Option');
  };
  return (
    <section className="onboardthree">
      {/* <button></button> */}
      <div className="onboardthree__content">
        {data.map((item, index) => (
          <Useraction
            id={index}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            button={item.button}
            setActive={setActive}
            active={active}
          />
        ))}
      </div>
      <button
        className="onboardthree__button"
        onClick={e => (active >= 0 ? clickAction(e) : dummy(e))}
        disabled={active ? false : false}
      >
        {' '}
        {active >= 0 ? data[active].button : 'Select an option'}
      </button>

      {/* {active && <button className="" onClick ={() => clickAction()}>
                {data[active].button}
            </button>} */}
    </section>
  );
};

const Useraction = props => {
  return (
    <div
      key={props.id}
      className={`useraction ${props.active === props.id ? ' --active' : ''}`}
      onClick={e => {
        e.preventDefault();
        props.setActive(props.id);
      }}
    >
      <img src={props.image} alt={props.title} />
      <div className="useraction__details">
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
      </div>
      {/* <button className="useraction__top__button" >
                {props.button} 
                <i class="fas fa-arrow-right-long"></i>
            </button> */}
    </div>
  );
};
