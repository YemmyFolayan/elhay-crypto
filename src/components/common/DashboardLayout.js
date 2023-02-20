import React, { useEffect } from 'react';
import classes from 'classnames';
import SideBar from 'components/common/SideBar';
import Header from 'components/common/Header';
import { useSelector, useDispatch } from 'react-redux';
import { collapseMenu } from 'appRedux/actions/menu';
import sorrysvg from 'assets/sorrysvg.svg';
import kycsvg from 'assets/kycsvg.svg';
import { connect } from 'react-redux';
import '../../index.css';
import { closeUpdateBox, closeUpgradeBox } from 'appRedux/actions/update';
import {
  closeReward,
  closeLoan,
  closeAction,
  closeBvn,
  handleFees,
  handleShuttlers,
} from 'appRedux/actions/domore';
import { closeShare } from 'appRedux/actions/Alertbox';
import { navigate } from '@reach/router';
import { Membership } from 'components/membership/membership';
import { useUserData } from 'helpers/hooks';
import { Referal } from 'components/referal/referal';
import { Simplemodal } from './simplifiedmodal';
import { Comingsoon } from './comingsoon/comingsoon';
import api from 'appRedux/api';
import {
  editStripeAccountModal,
  handleAnnouncement,
  openEventInvite,
  openNotificationWithIconErr,
  openReminder,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Onboardthree } from 'components/auth/onboard/onboardaction';
import { Titlesubtitle } from './titlesubtitle/titlesubtitle';
// import { Bvnverification } from 'components/bank/identitypass/bvnidentity';
import vcardprompt from 'assets/vcardprompt.svg';
// import Modal from 'components/common/Modal';
// import { Proofoffund } from 'components/bank/proofoffund/proofoffund';
import { Newprompt } from './prompt/prompt';
import { Feespayment } from 'components/bank/feespayment/feespayment';
import { closePause } from 'appRedux/actions/transactions';
import { StripeAccountinfo } from 'components/bank/stripe/stripedetails';
import { useIdleTimer } from 'react-idle-timer';
import { Platformbutton } from './button/button';
import eventig from 'assets/igevent.png';
import shutt from 'assets/shuttlersimg.png';
import { vestireward } from './vestireward/vestireward';
// import { redirectLogin } from 'routes/RedirectRoutes';
// import { clearSession } from 'appRedux/store/cookies';
import { userSignOut } from 'appRedux/actions/auth';
import Shuttlersprompt from 'components/bank/domore/domoreprompts';
import ErrorBoundary from './errorboundary';

function Layout(props) {
  const dispatch = useDispatch();
  const { menuState } = useSelector(state => state.menu);
  const { userData } = useUserData();
  useEffect(() => {
    dispatch(collapseMenu());
  }, [dispatch]);

  const onIdle = () => {
    // clearSession();
    dispatch(userSignOut());
  };

  // eslint-disable-next-line
  const idleTimer = useIdleTimer({
    onIdle,
    timeout: 15 * 60 * 1000,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
    ],
  });

  var goToProfile = () => {
    navigate('/myprofile?tab=kyc');
    dispatch(closeUpdateBox());
  };

  const shareNum = (postId, shares) => {
    var numShares = parseInt(shares);
    api
      .post('/editPost', {
        postId: postId,
        hasLiked: 'true',
        shares: numShares + 1,
      })
      .then(res => {})
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          'Error sharing a Post',
          'error',
        );
      });
  };

  const closeOnbprompt = () => {
    var data = localStorage.getItem('userData');
    data = data ? JSON.parse(data) : [];
    // setRefresh('refresh')

    data['takeaction'] = 'closed';

    localStorage.setItem('userData', JSON.stringify(data));
    // (userData.firstName && userData.firstName !== 'vesti' && userData.kycLevel === 'Level0') && dispatch(openReminder(true))
    dispatch(closeAction());
    // dispatch(openEventInvite(true))
    // setTimeout(()=> {
    //   // (userData.country === "NIGERIA" || userData.location === "NIGERIA" || userData.location === 'NG') &&  dispatch(openBvn())
    //   dispatch(openBvn())
    // }, 1000)
  };

  const openMail = () => {
    window.location.href = `mailto:miragtionloans@wevesti.com`;
  };

  const openLink = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeoP9U6LWal0ZSYP_dlmsmyvHjQyN24gzoNMk1nHk2geyYJ1A/viewform',
    );
  };

  return (
    <ErrorBoundary>
      <div className={classes('layout', { toggled: menuState })}>
        <Simplemodal
          onClick={() => dispatch(editStripeAccountModal(false))}
          visible={props.stripeaccount}
        >
          <StripeAccountinfo userdata={userData} />
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(handleFees())}
          visible={props.openFees}
        >
          <Feespayment close={() => dispatch(handleFees())} />
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closeUpgradeBox())}
          visible={props.openUpgrade}
        >
          <Membership />
        </Simplemodal>

        {/* event */}
        <Simplemodal
          onClick={() => dispatch(openEventInvite(false))}
          visible={props.event}
        >
          <Newprompt img={eventig}>
            <div className="eventbox">
              <Titlesubtitle
                title="Need clarity on our products & services?🤔"
                subtitle="We have prepared a super insightful session with our amazing Product Manager to come onboard and provide answers to all your pressing questions. "
              />
              <p className="information">
                Join us on <strong>Friday, 28th of October</strong> as she
                shares answers and helpful tips to help you have a seamless use
                of our app
              </p>
              <div className="mb-4"></div>
              <Referal
                title=""
                link={`https://www.instagram.com/
                  vestiofficialupcoming_
                  event_id=1803
                  94287283884061234567890`}
              />
            </div>
          </Newprompt>
        </Simplemodal>
        {/* new announcement */}
        <Simplemodal
          onClick={() => dispatch(handleAnnouncement(false))}
          visible={props.announcement}
        >
          <Newprompt img={shutt}>
            <div className="eventbox">
              <Titlesubtitle
                title="NetWebPay X Shuttlers"
                subtitle="Get  50% off  your first Shuttlers ride on vesti,
                click the button below to apply discount. "
              />
              <div className="mb-4"></div>
              <Platformbutton
                type="normal"
                name="Continue"
                click={() => {
                  dispatch(handleAnnouncement(false));
                  setTimeout(() => {
                    dispatch(handleShuttlers(true));
                  }, 100);
                }}
              />
            </div>
          </Newprompt>
        </Simplemodal>
        {/* kyc reminder */}

        <Simplemodal
          onClick={() => dispatch(openReminder(false))}
          visible={props.reminder}
        >
          <Newprompt img={kycsvg}>
            <div className="reminder">
              <Titlesubtitle
                title="KYC Verification Reminder"
                subtitle={`hello ${(userData.firstName ?? 'vesti ')
                  .charAt(0)
                  .toUpperCase() +
                  (userData.firstName ?? 'vesti ').slice(
                    1,
                  )}, You are yet to be verified as a NetWebPay user. Our regulators require that you upload an identity document,
                click the button below to go start the verification process.`}
              />

              <div className="mb-4"></div>
              <Platformbutton
                name="Start Verification"
                type="normal"
                click={() => {
                  dispatch(openReminder(false));
                  goToProfile();
                }}
              />
            </div>
          </Newprompt>
        </Simplemodal>

        <Simplemodal
          onClick={() => dispatch(closeUpdateBox())}
          visible={props.openBox}
        >
          <Newprompt img={sorrysvg}>
            <Titlesubtitle
              title="KYC Verification"
              subtitle="You are yet to be verified."
            />
            <p className="information">
              Sorry :(,this is not available for users who are yet to upload kyc
              document, Regulators require that you upload an identity document
            </p>
            <div className="mb-4"></div>
            <Platformbutton
              name="Upload KYC"
              type="normal"
              click={() => goToProfile()}
            />
          </Newprompt>
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closeShare())}
          visible={props.sharePost.value}
        >
          <Referal
            title="Copy Post Link"
            link={'app.wevesti.com/sharedpost/' + props.sharePost.id}
            id={props.sharePost.id}
            shares={userData.shares}
            shareNum={shareNum}
          />
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closePause())}
          visible={props.updateOntrans}
        >
          <Comingsoon
            title="Under Maintenance"
            subtitle={props.updateOntransMessage}
            button="Close"
            onClick={() => dispatch(closePause())}
          />
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closeReward())}
          visible={props.openReward}
        >
          <vestireward>
            <Titlesubtitle
              title="Introducing Referral Reward"
              subtitle="Share your referral code and get upto  ₦500 when whoever you refer signs up and transact via their respective wallets."
            />
          </vestireward>
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closeLoan())}
          visible={props.openLoan}
        >
          <Comingsoon
            title="vesti Migration Loan (coming soon)"
            subtitle="need proof of  funds for visa application, school application etc? Click on the request POF via mail below to get started"
            onClick={openMail}
            button="Request POF Via Email"
          >
            <p
              style={{ color: '#000000', cursor: 'pointer', marginTop: '10px' }}
              onClick={() => openLink()}
            >
              {' '}
              Take A Survey{' '}
            </p>
          </Comingsoon>
          {/* <Proofoffund  refetch ={refetch} loanPaid = {userData.isLoanInterestPaid} closePof={()=>dispatch(closeLoan())} userData={userData} /> */}
        </Simplemodal>

        <Simplemodal
          onClick={() => {
            closeOnbprompt();
            setTimeout(() => {
              dispatch(handleAnnouncement(true));
            }, 100);
          }}
          visible={
            localStorage.getItem('userData') &&
            JSON.parse(localStorage.getItem('userData')).takeaction
              ? JSON.parse(localStorage.getItem('userData')).takeaction ===
                'closed'
                ? false
                : props.openAction
              : props.openAction
          }
          // visible={true}
        >
          <>
            <Titlesubtitle
              title={`What would you like to do ${
                localStorage.getItem('userData')
                  ? JSON.parse(localStorage.getItem('userData')).firstName
                  : ''
              } ?`}
              subtitle="Select what you want to do on vesti."
            />
            <Onboardthree
              closeModal={() => {
                closeOnbprompt();
                setTimeout(() => {
                  dispatch(handleAnnouncement(true));
                }, 100);
              }}
            />
          </>
        </Simplemodal>
        <Simplemodal
          onClick={() => dispatch(closeBvn())}
          visible={props.openBvn}
        >
          {/* <Bvnverification/> */}
          <Newprompt img={vcardprompt}>
            <Titlesubtitle
              title="vesti Virtual cards"
              subtitle="Update on our virtual card offerings."
            />
            <p className="information">
              Our Virtual Card service is under maintenance please check back
              later (please email support if you have questions){' '}
              <strong> help@elhay.com </strong>
            </p>
            <button
              className="prompt__btn"
              onClick={() => dispatch(closeBvn())}
            >
              Close
            </button>
          </Newprompt>
        </Simplemodal>

        {/* vesti Shuttlers */}
        <Simplemodal
          onClick={() => dispatch(handleShuttlers(false))}
          visible={props.openShuttlers}
        >
          <Shuttlersprompt />
        </Simplemodal>

        <SideBar />
        <Header
          info={props.info}
          link={props.link}
          info2={props.info2}
          link2={props.link2}
        />
        <div className="content my-test">{props.children}</div>
      </div>
    </ErrorBoundary>
  );
}

const mapStateToProps = ({
  kycupdate,
  domore,
  alertbox,
  transactions,
  common,
}) => {
  const { openBox, openUpgrade } = kycupdate;
  const {
    openReward,
    openLoan,
    openAction,
    openBvn,
    openFees,
    openShuttlers,
  } = domore;
  const { sharePost } = alertbox;
  const { updateOntrans, updateOntransMessage } = transactions;
  const { stripeaccount, event, reminder, announcement } = common;

  return {
    openBox,
    openUpgrade,
    openReward,
    openLoan,
    sharePost,
    openAction,
    openBvn,
    openFees,
    openShuttlers,
    updateOntrans,
    updateOntransMessage,
    stripeaccount,
    event,
    reminder,
    announcement,
  };
};

export default connect(mapStateToProps, {
  closeUpdateBox,
  userSignOut,
})(Layout);

// export default Layout;
