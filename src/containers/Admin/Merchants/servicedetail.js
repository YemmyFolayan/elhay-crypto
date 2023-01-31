import { navigate } from '@reach/router';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
// import api from 'appRedux/api';
import Layout from 'components/common/DashboardLayout';
// import { errorMessage } from 'helpers/utils';
import { useLocation } from '@reach/router';
import React, { useState, useEffect } from 'react';
import '../Migration/migration.scss';
import './singleservice.scss';
import avi from '../../../assets/avi.png';
import Modal from 'components/common/Modal';
import api from 'appRedux/api';
import { getCurrency, objectValuesStringify } from 'helpers/utils';
import DividedPinInput from 'components/common/DividedPinInput';
import { Form } from 'antd';
import Loader from 'components/Loader';
const ServiceDetail = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [transactionPin, setTransactionPin] = useState('');
  // const [isSuccess, setSuccess] = useState(true)
  const [isError, setError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const { state } = useLocation();
  const {
    description = '',
    service = '',
    amount = '',
    image = '',
    currency = '',
    username = '',
    data,
    user = '',
  } = state || {};

  const handlePayment = (value, custom = false) => {
    setFormData({
      type: value,
      amount: amount,
      currency: getCurrency(currency),
      description: service,
    });
    setShowModal(true);
  };

  const handleCompleteTransaction = async () => {
    const formattedData = { ...formData, transactionPin };
    console.log(formattedData);
    const url = `${formattedData.type}/payment`;
    setLoading(true);

    try {
      const res = await api.post(url, formattedData);
      console.log({ ...res });
      const { data } = res;
      openNotificationWithIcon(data.message, 'Service Payment', 'success');
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      if (error?.data?.errors) {
        openNotificationWithIconErr(
          objectValuesStringify(error?.data?.errors),
          'Service Payment',
          'error',
        );
      } else {
        const err = error?.data?.message || error.message;
        openNotificationWithIconErr(err, 'Merchant Payment', 'error');
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (service === '') {
      setError(true);
      return;
    } else {
      var result = data.filter(service => {
        return service.id === id;
      });
      result ? setError(false) : setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="grid-container">
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="d-flex flex-column text-left px-3 ">
            <>
              <h4>Pay for {service}</h4>
              {formData.description && <p className="text-muted"></p>}
              <Form onFinish={handleCompleteTransaction}>
                <div className="w-100 flex-fill pt-4">
                  <p>
                    Enter Your Transaction PIN to pay{' '}
                    <strong
                      style={{
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        color: '#000000',
                      }}
                    >
                      {formData.currency}
                      {formData.amount}
                    </strong>{' '}
                  </p>
                  <DividedPinInput onChange={setTransactionPin} />
                  {formData.custom && <p className="mt-2">Enter an amount</p>}
                </div>
                {loading ? (
                  <Loader />
                ) : (
                  <div className="d-flex mt-5">
                    <button
                      type="submit"
                      className="default-btn w-100 py-3"
                      style={{
                        marginBottom: '10px',
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                )}
              </Form>
            </>
          </div>
        </Modal>

        <div className="container-fluid py-4">
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              navigate('/merchants');
            }}
            style={{
              fontWeight: 500,
              fontSize: '1.1rem',
              color: '#000000',
              cursor: 'pointer',
            }}
            className="mb-3 text-uppercase"
          >
            <span className="mr-2 d-inline-flex align-items-center">
              <svg
                style={{ transform: 'rotate(180deg)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.219 10.7797C5.28867 10.8495 5.37143 10.9049 5.46255 10.9427C5.55367 10.9805 5.65135 11 5.75 11C5.84865 11 5.94633 10.9805 6.03745 10.9427C6.12857 10.9049 6.21133 10.8495 6.281 10.7797L10.781 6.27966C10.8508 6.20999 10.9063 6.12723 10.9441 6.03611C10.9819 5.94499 11.0013 5.84731 11.0013 5.74866C11.0013 5.65001 10.9819 5.55233 10.9441 5.46121C10.9063 5.37009 10.8508 5.28733 10.781 5.21766L6.281 0.717661C6.14017 0.576831 5.94916 0.497714 5.75 0.497714C5.55083 0.497714 5.35983 0.576831 5.219 0.717661C5.07817 0.858491 4.99905 1.0495 4.99905 1.24866C4.99905 1.44782 5.07817 1.63883 5.219 1.77966L9.1895 5.74866L5.219 9.71766C5.14915 9.78733 5.09374 9.87009 5.05593 9.96121C5.01812 10.0523 4.99866 10.15 4.99866 10.2487C4.99866 10.3473 5.01812 10.445 5.05593 10.5361C5.09374 10.6272 5.14915 10.71 5.219 10.7797Z"
                  fill="#000000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 5.74854C0 5.94745 0.0458074 6.13821 0.127345 6.27887C0.208883 6.41952 0.319471 6.49854 0.434783 6.49854L9.56522 6.49854C9.68053 6.49854 9.79112 6.41952 9.87265 6.27887C9.95419 6.13821 10 5.94745 10 5.74854C10 5.54962 9.95419 5.35886 9.87265 5.2182C9.79112 5.07755 9.68053 4.99854 9.56522 4.99854L0.434783 4.99854C0.319471 4.99854 0.208883 5.07755 0.127345 5.2182C0.0458074 5.35886 0 5.54962 0 5.74854Z"
                  fill="#000000"
                />
              </svg>
            </span>
            <span>Services</span>
          </a>
          <div className="section-heading text-center">
            {isError ? (
              'Service Does Not Exist'
            ) : (
              <ServiceDetailComponent
                username={username}
                description={description}
                amount={amount}
                image={image}
                service={service}
                user={user}
                currency={currency}
                avi={avi}
                handlePayment={handlePayment}
                getCurrency={getCurrency}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;

const ServiceDetailComponent = props => {
  return (
    <div className="service-detail mt-5">
      <div className="service-detail-container">
        {/* <div
            style={{
              fontWeight: 500,
              fontSize: '1rem',
              color: '#000000',
            }}
            className="mb-4 text-uppercase"
          >
            Service
          </div> */}
        <div
          style={{
            //   fontWeight: 500,
            //   fontSize: '30px',
            //   color: '#000080',
            maxWidth: 'fit-content',
          }}
          className="service-detail-title mb-3"
        >
          {props.service}
        </div>

        <div className="service-provider-detail mb-3">
          <img
            src={props.image}
            alt={props.service}
            style={{
              height: '300px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '24px',
            }}
          />

          <div className="mb-2">
            <img
              // style={{ height: '24px', width: '24px', borderRadius: '50vw' }}
              src={!props.profilePicture ? props.avi : props.profilePicture}
              alt="profile"
            />
            <p>
              Provided by {props.user.firstName} {props.user.lastName}
            </p>
          </div>
        </div>

        <div
          className="service-provider-description"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
        <div className="service-provider-btn py-2">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => props.handlePayment(props.service)}
          >
            Pay {getCurrency(props.currency)} {props.amount} Now
          </span>
        </div>
      </div>
    </div>
  );
};
