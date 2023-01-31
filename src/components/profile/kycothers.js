import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStep } from 'helpers/hooks';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/newerror.svg';
import pending from 'assets/pendingreview.svg';
import doc from 'assets/kycothers.svg';
import './Kyc.scss';
import api from 'appRedux/api';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { fetchUserKycStatus } from 'appRedux/actions/Common';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
const stripePromise = loadStripe(
  'pk_live_51LAeheHyH0mfw5s2RLpmmI03SP6hhu2aiDRBOwMHGji06PcEYEWx062vdabvuqaAsYZzajFcAdDoDLv3zpnahEkT007kY09NQG',
);
const Kycothers = props => {
  const { step, setStep } = useStep(0);
  // const [status, setStatus] = useState()

  var __renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <div className="kycothers__initiate">
            <Titlesubtitle
              title="KYC Verification"
              subtitle="To avoid disruption of service, please kindly go ahead and Click the button to start your KYC Verification process."
            />
            <div className="kycothers__content">
              <img src={doc} alt="document" />
              <span>
                <p>Verify Account</p>
                <p>Click the button below to verify </p>
              </span>
              <VerifyButton
                stripePromise={stripePromise}
                error={() => setStep(2)}
                success={() => setStep(3)}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <Success
            type="success"
            subtitle="Your KYC Document has been approved successfully."
          />
        );
      case 2:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={
              'Your kyc doc failed our verification process, click button below to try again.'
            }
            button="Try Again"
            onClick={() => setStep(0)}
          />
        );
      case 3:
        return (
          <Success
            image={pending}
            title="Pending"
            subtitle={`Thanks for submitting your identity document, your document is being reviewed. We are processing your verification. 
                    check back in 1-3mins, to know your status.
                `}
          />
        );

      default:
        return <></>;
    }
  };
  var handleStatus = value => {
    switch (props.userdata.verifiedKyc) {
      case 'PENDING':
        return setStep(3);
      case 'APPROVED':
        return setStep(1);
      case 'DISAPPROVED':
        return setStep(2);
      case 'REQUIRES_INPUT':
        return setStep(2);
      default:
        return setStep(0);
    }
  };
  useEffect(() => {
    props.userdata.stripeVerificationToken &&
      props.userdata.verifiedKyc !== 'APPROVED' &&
      props.fetchUserKycStatus(handleStatus);
    props.userdata.verifiedKyc === 'APPROVED' && setStep(1);

    // eslint-disable-next-line
  }, []);

  return (
    <section className="kycothers">
      {props.kycStatus === false ? (
        <>
          {step !== 0 && (
            <Titlesubtitle
              title="KYC Verification"
              subtitle="Your KYC Verification status is give below."
            />
          )}
          {__renderSteps()}{' '}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

class VerifyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ stripe: await this.props.stripePromise });
  }

  async handleClick(event) {
    event.preventDefault();

    const { stripe } = this.state;

    if (!stripe) {
      // Stripe.js has not loaded yet. Make sure to disable
      // the button until Stripe.js has loaded.
      return;
    }

    // Call your backend to create the VerificationSession.
    const response = await api.get('/identity/access_token');
    const session = await response.data.data;
    // Show the verification modal.
    const { error } = await stripe.verifyIdentity(session.client_secret);

    if (error) {
      //   console.log('[error]', error);
      this.props.error();
    } else {
      console.log('Verification submitted!');
      this.props.success();
    }
  }
  render() {
    const { stripe } = this.state;
    return (
      <button
        className="kycothers__button"
        role="link"
        disabled={!stripe}
        onClick={this.handleClick}
      >
        Verify
      </button>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { kycStatus } = common;
  return {
    kycStatus,
  };
};

const mapDispatchToProps = {
  fetchUserKycStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kycothers);
