import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import React, { useEffect, useState } from 'react';
import loan from 'assets/loan.svg';
import save from 'assets/save.svg';
import reward from 'assets/reward.svg';
import world from 'assets/world.svg';
// import comm from "assets/commu.svg"
import credit from 'assets/credithistory.svg';
import bank from 'assets/usbank.svg';
import payfees from 'assets/payfees.svg';
import card from 'assets/domorecard.svg';
import update from 'assets/update.svg';
import uploadk from 'assets/uploadk.svg';
import shuttlers from 'assets/shuttlers.svg';
import './domore.scss';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import {
  openReward,
  openLoan,
  openAccWait,
  handleFees,
  handleShuttlers,
} from 'appRedux/actions/domore';
import { opennReg } from 'appRedux/actions/auth';
import Flickity from 'react-flickity-component';
import 'flickity/dist/flickity.min.css';
import { globalGengCardStatus } from 'appRedux/actions/waitlist';
// import "flickity-as-nav-for";

export const Domore = props => {
  const [status, setStatus] = useState();

  const goToNova = () => {
    // window.open('https://hello.novacredit.com/cards?country=NGA');
    navigate('/credithistory');
  };

  var goTo = value => {
    navigate(`/${value}`);
  };

  const dispatch = useDispatch();
  var Reward = () => {
    dispatch(openReward());
  };

  var Loan = () => {
    dispatch(openLoan());
  };
  // eslint-disable-next-line
  var openWaitlist = () => {
    dispatch(openAccWait());
  };

  const data = [
    {
      name: 'shuttlers',
      title: 'NetWebPay X Shuttlers',
      subtitle: 'Get 50% OFF your first Shuttlers ride as a NetWebPay User.',
      image: shuttlers,
      link: 'Get Code Now',
      show:
        props.userData.shuttlersPromo === false ||
        props.userData.shuttlersPromo === 'false' ||
        props.userData.shuttlersPromo === null
          ? false
          : true,
      onClick: () => dispatch(handleShuttlers(true)),
    },
    {
      name: 'card',
      title: 'GlobalGeng Card',
      subtitle:
        'get the GlobalGeng card, so your financial transitions are easy. A Card that works everywhere.',
      image: card,
      link: 'Request Card',
      show: status && status.status,
      onClick: () => props.create('globalgeng'),
    },
    {
      name: 'Fees',
      title: 'Tuition & School fees',
      subtitle:
        "Let's help you process your international Tuition & School fees payment.",
      image: payfees,
      link: 'Learn More',
      onClick: () => dispatch(handleFees(true)),
    },
    {
      name: 'nova',
      title: 'Credit Card',
      subtitle:
        'Import your international foreign credit history and use it to apply  for credit cards, loans e.t.c in the U.S.',
      image: credit,
      show: props.userData.creditData,
      link: 'Import Credit History',
      onClick: goToNova,
    },
    {
      name: 'POF',
      title:
        props.loan === true || props.loan === null
          ? 'Migration Loan'
          : !props.loanA
          ? 'Migration Loan'
          : 'Pending Interest',
      subtitle:
        props.loan === true || props.loan === null
          ? 'Do You Need Loans To Cover For Your Immigration Costs ?'
          : !props.loanA
          ? 'Do You Need Loans To Cover For Your Immigration Costs ?'
          : 'You have a pending interest to pay, click the button below to pay',
      image: loan,
      link:
        props.loan === true || props.loan === null
          ? 'Learn More'
          : !props.loanA
          ? 'Learn More'
          : 'Pay Interest',
      onClick: Loan,
    },

    {
      name: 'account',
      title: 'US Account Waitlist',
      subtitle: 'Join the queue and join others to get a USA bank account.',

      image: bank,
      link: 'Join the Queue',
      onClick: openWaitlist,
    },
    {
      title: 'International Fees',
      subtitle:
        'Pay for international services (WES, SEVIS, IHS and lots more) without hassle',
      image: world,
      link: 'See All Services',
      onClick: () => goTo('merchants'),
    },
    {
      name: 'save',
      title: 'Savings',
      subtitle: 'Save with NetWebPay and earn up to 12% on savings T&C’s apply',
      image: save,
      link: 'Start Saving',
      onClick: () => goTo('savings'),
    },
    {
      name: 'reward',
      title: 'Rewards',
      // subtitle:"Get free N1500 when you refer 5 friends to join vesti.",
      subtitle:
        'Share your referral code or link and invite your friends to use vesti.',
      image: reward,
      link: 'Claim Reward',
      onClick: Reward,
    },
  ];
  const goToProfile = () => {
    props.userData.firstName === ' ' || props.userData.firstName === 'User'
      ? dispatch(opennReg(true))
      : navigate('/myprofile?tab=kyc');
  };
  var upload =
    props.userData.firstName === ' ' || props.userData.firstName === 'User'
      ? 'Update Your Profile'
      : 'Upload your Kyc';
  useEffect(() => {
    globalGengCardStatus(props.userData.id, setStatus);
  }, [props.userData.id]);

  return (
    <section className="domore">
      <Titlesubtitle
        title="Do more with NetWebPay."
        subtitle="Do more with your NetWebPay accounts."
      />
      <div className="domore__inner">
        <div className="domore__content">
          <Flickity
            className="carousel-nav"
            options={{
              asNavFor: '.carousel-main',
              contain: true,
              pageDots: false,
            }}
          >
            {props.userData.verifiedKyc === 'APPROVED' ||
            props.userData.verifiedKyc === true ? (
              <></>
            ) : (
              <Domorecard
                data={{
                  name: 'update',
                  title: upload,
                  subtitle:
                    'Update your profile to have access to virtual cards and other transactions.',
                  image: upload.includes('Update') ? update : uploadk,
                  link: 'Update Profile',
                  onClick: goToProfile,
                }}
                loan={props.loan}
              />
            )}
            {(data.filter(item => !item.show) ?? []).map((item, index) => (
              <Domorecard
                key={index}
                data={item}
                loan={props.loan}
                loanA={props.loanA}
              />
            ))}
          </Flickity>
        </div>
      </div>
    </section>
  );
};

const Domorecard = props => {
  return (
    <div
      className={`domorecard ${props.class && props.class} ${props.data.name ===
        'POF' &&
        (props.loan !== false ? ' ' : props.loanA ? ' --loan' : '')} ${props
        .data.name === 'update' && ' --update'}`}
      onClick={() => props.data.onClick()}
    >
      {/* {typeof props.loan} */}
      <div className="domorecard__left">
        <div className="domorecard__left__texts">
          <p>{props.data.title}</p>
          <p>{props.data.subtitle}</p>
        </div>
      </div>
      <div className="domorecard__right">
        <p className="domorecard__link">
          {props.data.link}
          <i className="fas fa-chevron-right"></i>
        </p>
        <img src={props.data.image} alt="do more" />
      </div>
    </div>
  );
};
