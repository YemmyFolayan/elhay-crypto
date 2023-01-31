import React, { useEffect, useState } from 'react';
import '../Admin.css';
import { navigate } from '@reach/router';
// import Loader from 'components/Loader';
import Layout from 'components/common/DashboardLayout';
// import { Form } from 'antd';
import api from 'appRedux/api';
import { getCurrency } from 'helpers/utils';
import MerchantPayment from './MerchantPayment';
// import Modal from 'components/common/Modal';
// import DividedPinInput from 'components/common/DividedPinInput';
import { useQuery } from 'react-query';
import './services.scss';
import { Paymentoption } from 'components/common/paymentoption/paymentoption';
import { useUserData } from 'helpers/hooks';
import { useDispatch, connect } from 'react-redux';
import { openUpdateBox } from 'appRedux/actions/update';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Simplemodal } from '../../../components/common/simplifiedmodal';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { vestirate } from 'components/common/vestirate/vestirate';
import { handleFees, openVirtual } from 'appRedux/actions/domore';
import { merchantPay, merchantPayViaCard } from 'appRedux/actions/merchants';
import { Empty } from 'components/common/empty/empty';

const Merchants = props => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [current, setCurrent] = useState('');
  const [customamount, setCustom] = useState('');
  const [passport, setPassport] = useState('');
  const [school, setSchool] = useState('');
  const [transactionPin, setTransactionPin] = useState('');
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const { userData } = useUserData();
  const { data: prices, isSuccess } = useQuery(
    'merchant-prices',
    async () => (await api.get('merchant-prices')).data,
  );
  const { search } = useLocation();
  const values = queryString.parse(search);
  var tab = values.merchant && values.merchant.toUpperCase();
  const dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };

  const handlePayment = (value, custom = false) => {
    setFormData({
      type: value,
      custom,
      description:
        feeDescriptions[value] === '' ? null : feeDescriptions[value],
    });

    console.log(JSON.stringify(formData));
    //  setShowModal(true);
    userData.verifiedKyc === 'APPROVED' ||
    userData.verifiedKyc === true ||
    JSON.parse(localStorage.getItem('userData')).hasVerifiedKyc === true
      ? setShowModal(true)
      : openUpdateModal();
  };

  const handleCompleteTransaction = async cb => {
    let formattedData = '';
    if (formData.type === 'applicationsFees') {
      var appamount = customamount * 100;
      formattedData = {
        type: formData.type,
        applicationAmount: appamount.toString(),
        fullNameOnPassport: passport,
        schoolName: school,
        CURRENCY: 'NGN_KOBO',
        transactionPin,
      };
    } else if (formData.type === 'TuitionAcceptanceFees') {
      var appamountt = customamount * 100;
      formattedData = {
        ...formData,
        amount: toWholeCurrency(appamountt.toString()),
        fullNameOnPassport: passport,
        schoolName: school,
        CURRENCY: 'NGN_KOBO',
        transactionPin,
      };
    } else {
      formattedData = { ...formData, transactionPin };
    }

    console.log(formattedData);
    const url = `${formattedData.type}/payment`;
    props.merchantPay(formattedData, url, cb);
  };
  const toWholeCurrency = num =>
    (num / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  const getPrice = name => {
    return (
      prices && {
        usd_ten_percent: toWholeCurrency(prices[`${name}_USDCENTS`] / 11),
        ngn: toWholeCurrency(prices[`${name}_NGNKOBO`]),
      }
    );
  };
  const feeDescriptions = {
    applicationsFees:
      'Want to apply for School? Pay your application fees easily',
    TuitionAcceptanceFees:
      'Migrating for School? Pay your Tuition Deposit or Full Tuition fees easily',
  };

  const merchantTypes = [
    {
      title: 'WES Standard Application',
      link: 'WES',
      price: 'WES',
      subtitle: 'Pay your WES Fee easily',
    },
    {
      title: 'SEVIS Standard Application',
      link: 'SEVIS',
      price: 'SEVIS',
      subtitle: 'Pay your SEVIS Fee easily',
    },
    {
      title: 'WES ECA Payments',
      link: 'WESECAController',
      price: 'WESECA',
      subtitle: 'Pay the WESECAController Fee easily',
    },

    {
      title: 'Education pathway',
      link: 'education-pathway',
      price: 'EDUCATIONPATHWAY',
      subtitle: 'Education Pathway for schooling',
    },

    {
      title: 'IHS UK Payments',
      link: 'UKStudentVisaPayments/IhsFee',
      price: 'IHSUK',
      subtitle:
        'Congratulations on your UK University Admission. Get started by paying your IHS fees.',
    },
    {
      title: 'UK Student Visa',
      link: 'UKStudentVisaPayments/ukStudentVisa',
      price: 'UKSTUDENTVISA',
      subtitle:
        'Congratulations on your UK University Admission. You can pay your UK Student Visa Application fees in Naira.',
    },
    {
      title: 'Priority Processing with TLS',
      link: 'UKStudentVisaPayments/priorityProcessing',
      price: 'PRIORITY',
      subtitle:
        'TLScontact works with governments from around the world to provide visa and consular services on their behalf to travellers and citizens.\n This priority fee will ensure your application is prioritized over 7 working days',
    },
    {
      title: 'US Visa Payments',
      link: 'USVisaPayments/USVISA_DS160',
      price: 'USVISADS160',
      subtitle: '',
    },
    {
      title: 'NMC UK Payments',
      link: 'USVisaPayments/NMCUK',
      price: 'NMCUK',
      subtitle: '',
    },
    {
      title: 'TEF',
      link: 'TEF',
      price: 'TEF',
      subtitle: 'You can pay for your TEF training fees here.',
    },
    {
      title: 'IELTS',
      link: 'IELTS',
      price: 'IELTS',
      subtitle: 'You can pay for your IETLS training fees here.',
    },
  ];

  const { data: d_list, isSuccess: serviceSuccess } = useQuery(
    'all-services',
    () =>
      api
        .get('/provider/fetchAllProviderServices')
        .then(res => res.data.data)
        .catch(err => err),
  );
  const data = d_list ?? [];

  useEffect(() => {
    setTimeout(() => {
      if (tab) {
        var check = merchantTypes.find(item => {
          return item.price === tab;
        });
        console.log(prices);
        if (check && prices) {
          setCurrent({
            usd_ten_percent: toWholeCurrency(prices[`${tab}_USDCENTS`] / 11),
            ngn: toWholeCurrency(prices[`${tab}_NGNKOBO`]),
          });
          handlePayment(tab);
        } else {
          console.log('');
        }
      }
    }, 500);
    // eslint-disable-next-line
  }, [prices, tab]);
  return (
    <>
      <Layout>
        <div>
          <Simplemodal onClick={() => setShowModal(false)} visible={showModal}>
            <Paymentoption
              handleCompleteTransaction={handleCompleteTransaction}
              viaCard={props.merchantPayViaCard}
              formData={formData}
              loading={loading}
              setTransactionPin={setTransactionPin}
              amount={current}
              setCurrent={setCurrent}
              current={current}
              school={school}
              fee={customamount}
              setCustom={setCustom}
              setSchool={setSchool}
              passport={passport}
              setPassport={setPassport}
              toWholeCurrency={toWholeCurrency}
              rate={prices && prices['MERCHANT_RATE'] / 100}
              closeModal={() => setShowModal(false)}
              loader={props.loading}
              message={props.message}
            />
          </Simplemodal>

          <div
            className=" isw-container"
            style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
          >
            <div className="flex_page_container pt-4" id="savings">
              {/* <h3 className="txt_2ch4 mt-3">Merchant payments</h3> */}
              <vestirate
                rate={prices && prices['MERCHANT_RATE'] / 100}
                card="true"
                title="PLATFORM RATE"
                // before ="725"
                // rate = {props.rate}
              />
              <div className="mb-4"></div>
              <Titlesubtitle
                title="Merchant payments"
                subtitle="See all merchants service available on vesti."
              />
              {isSuccess && (
                <div className="row mt-4 merchant-services mb-5">
                  <MerchantPayment
                    title="Can’t find a payment type here ?"
                    description="Create a virtual card to make any payment"
                    paymentHandler={() => {
                      navigate('/bank');
                      userData.verifiedKyc === 'APPROVED' ||
                      userData.verifiedKyc === true
                        ? dispatch(openVirtual('mono'))
                        : dispatch(openUpdateBox());
                    }}
                    custom
                    amount={0}
                    button="Create Virtual Card"
                    setCurrent={amount => {
                      console.log(amount);
                    }}
                  />
                  <MerchantPayment
                    title="Tuition & School fees payment"
                    description="Let's help you process your international Tuition & School fees payment."
                    paymentHandler={() => {
                      dispatch(handleFees(true));
                    }}
                    custom
                    amount={0}
                    button="Learn More"
                    setCurrent={amount => {
                      console.log(amount);
                    }}
                  />
                  {merchantTypes.map((item, index) => (
                    <MerchantPayment
                      amount={getPrice(item.price)}
                      title={item.title}
                      description={item.subtitle}
                      paymentHandler={() => handlePayment(item.link)}
                      setCurrent={setCurrent}
                    />
                  ))}

                  {/* <MerchantPayment
                    amount={toWholeCurrency(current)}
                    title="Custom Application Fees"
                    description="You can create and pay custom fees here"
                    paymentHandler={custom =>
                      handlePayment('applicationsFees', custom)
                    }
                    custom
                    setCurrent={setCurrent}
                  />
                  <MerchantPayment
                    amount={toWholeCurrency(current)}
                    title="Custom Tuition Fees"
                    description="You can create and pay custom fees here"
                    paymentHandler={custom =>
                      handlePayment('TuitionAcceptanceFees', custom)
                    }
                    custom
                    setCurrent={setCurrent}
                  /> */}
                </div>
              )}

              <Titlesubtitle
                title="Services by vesti providers"
                subtitle="See all services offered by different vesti providers."
              />
              <div className="services-grid">
                {serviceSuccess && data.length > 0 ? (
                  (data ?? []).map(
                    ({
                      id,
                      image,
                      amount,
                      service,
                      description,
                      currency,
                      username,
                      user,
                    }) => (
                      <ServiceCard
                        key={id}
                        {...{
                          id,
                          image,
                          amount,
                          service,
                          description,
                          currency,
                          username,
                          user,
                          handlePayment,
                          data,
                        }}
                      />
                    ),
                  )
                ) : (
                  <Empty
                    title="Services by vesti providers"
                    subtitle="Can't find any service at the moment, kindly check back."
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const ServiceCard = ({
  id,
  image,
  amount,
  service,
  description,
  currency,
  username,
  user,
  handlePayment,
  data,
}) => (
  <div
    // style={{ boxShadow: 'rgb(245 245 245) 0 0 2px 2px' }}
    // className="card border-1 for-hover"
    className="for-hover"
  >
    <div
      className="for-hover-body"
      // className="card-body for-hover-body"
    >
      <div
        className="for-hover-body-container"
        style={{ height: '120px' }}
        // className="rounded bg-dark mb-3 for-hover-body-container"
      >
        <img
          src={image}
          alt="service logo"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="px-2 for-hover-content">
        <p className="mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
          {service}
        </p>
        <p className="mb-3 long-text-description" style={{ fontWeight: 300 }}>
          {description}
        </p>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <span style={{ fontWeight: 600, fontSize: 18 }}>
              {getCurrency(currency)}
              {amount}
            </span>
          </div>
          <div>0 reviews</div>
        </div>
        <div>
          <span
            style={{ cursor: 'pointer' }}
            // onClick={() => handlePayment('service')}
            className="default-btn py-2"
            onClick={e => {
              e.preventDefault();
              navigate(`/service/${id}`, {
                state: {
                  image: image,
                  amount: amount,
                  description: description,
                  currency: currency,
                  service: service,
                  username: username,
                  user: user,
                  data: data,
                },
              });
            }}
          >
            Learn More
          </span>
        </div>
      </div>
    </div>
  </div>
);
const mapStateToProps = ({ auth, merchants }) => {
  const { authUser } = auth;
  const { message, loading } = merchants;
  return {
    authUser,
    message,
    loading,
  };
};

const mapDispatchToProps = {
  openUpdateBox,
  merchantPayViaCard,
  merchantPay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
