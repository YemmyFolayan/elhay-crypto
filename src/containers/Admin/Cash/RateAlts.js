import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showAuthLoader } from 'appRedux/actions/Common/';
import '../Admin.css';
// import { InputNumber, Select as AntdSelect } from 'antd';
import { fetchTransactions } from 'appRedux/actions/transactions';
import { getProfile } from 'appRedux/actions/auth';
import Loader from 'components/Loader';
// import TransactionTable from 'components/common/TransactionTable';
import { redirectTransfer } from 'routes/RedirectRoutes';
import Layout from 'components/common/DashboardLayout';
import { addCashToWallet } from './actions/index';
import VirtualCardModal from './VirtualCardModal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegionSelect from 'react-region-flag-select';
import Select from 'react-select';
import { Tooltip } from 'antd';
import * as Yup from 'yup';
import _ from 'lodash';
import Inputfloat from 'components/common/inputs/inputfloat';
import Ordercard from 'components/vesticards/selectcard';
import { Mytransactions } from 'components/bank/mytransactions';
import { Depositwallet, Providusaccount } from 'components/deposit/deposit';
import { Cards } from 'components/virtualcards/cards';
import api from 'appRedux/api';
import { openUpdateBox } from 'appRedux/actions/update';
import { Domore } from 'components/bank/domore/domore';
import './cash.scss';
import { Link } from '@reach/router';
import { useQuery } from 'react-query';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from '../../../appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Simplemodal } from '../../../components/common/simplifiedmodal';
import Fundcard from './carddetails/fundcard';
import {
  closeVirtual,
  openVirtual,
  closeAccWait,
  openWaitlist,
  closeWaitlist,
} from 'appRedux/actions/domore';
import { Accountwaitlist } from 'components/bank/accountwaitlist/accountwaitlist';
import { Depositusdwallet } from 'components/deposit/depositusdwallet';
// import { Newbalancecard } from 'components/bank/balancecard/balancecard';
import { Withaddbank } from 'components/bank/addbank/addbank';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Fileupload } from 'components/common/fileupload/fileupload';
import { saveAs } from 'file-saver';
import { Newfeature } from 'components/bank/newfeature/newfeature';
import Createstripe from 'components/vesticards/createstripe';

import { Comingsoon } from 'components/common/comingsoon/comingsoon';

import { walletAction, walletUsdAction } from 'appRedux/actions/wallets';
//import Financialtrans from 'components/bank/financialaccount/transactions';
import { Myfintransactions } from 'components/bank/financialaccount/financialtable';

// import { Comingsoon } from 'components/common/comingsoon/comingsoon';
import Ngnwithdrawal from 'components/bank/ngnwithdrawal/ngnwithdrawal';
import Fbotransactions from 'components/bank/fbo/fbotransactions';
import { Wallets } from 'components/bank/balancecard/wallets';

import {
  home,
  trades,
  rates,
  savings,
  profile,
  logout,
  talts,
  tbitcoin,
  tgift,
  logoblack,
  ChevDIco,
} from '../../../assets/assets';

const RateSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
});

const useFetchUser = () => {
  const { isLoading, data: userData, refetch } = useQuery(
    'userData',
    // {refetchOnWindowFocus: false,enabled: false},
    async () =>
      await api.get('/auth/logged-in-user').then(res => res.data.data),
  );

  return { isLoading, userData, refetch };
};

const RateAlts = props => {
  const path = window.location.pathname;
  const [state, setState] = useState({
    modal: false,
    withdrawalModal: false,
    addbank: 'withdrawal',
    virtualCardModal: false,
    currency: 'USD_CENTS',
    numInput: '',
  });
  const [currency, setCurrency] = useState(true);
  // eslint-disable-next-line
  const toggleCurrency = () => setCurrency(!currency);
  const [rate, setRate] = useState();
  const [account, setAccount] = useState(false);
  const [fundmodal, setFundmodal] = useState({
    value: false,
    id: '',
    name: '',
    currency,
  });
  const [usdmodal, setUsdmodal] = useState(false);
  const [upload, setUpload] = useState(false);
  const [bankform, setBankform] = useState({
    document: '',
    name: '',
    btn: '',
  });
  // eslint-disable-next-line
  const [activeAccount, setActiveAccount] = useState(0);
  const [load, setLoading] = useState(true);
  const [carddata, setCdata] = useState({});

  const modifyState = value => setState({ ...state, ...value });

  var accountRequest = () => {
    api
      .post('/user/request_account_number', { email: userData.email })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Account request successful',
          'success',
        );
      })
      .catch(err => {
        openNotificationWithIconErr(
          err.data.message,
          'Account request failed',
          'error',
        );
      });
  };
  const dispatch = useDispatch();

  var openUpdateModal = () => {
    dispatch(openUpdateBox());
  };

  const { userDatas, refetch } = useFetchUser();

  const userData = {
    id: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79f',
    firstName: 'Yemi',
    lastName: 'Folayan',
    email: 'foyemc@gmail.com',
    username: 'folayanyemi',
    emailVerified: true,
    wasReferred: null,
    blacklisted: false,
    superAdmin: false,
    FactorAuth: true,
    FactorAuthCode: '826576',
    providusAccountNumber: '9989238879',
    adminType: 'SUPERADMIN_INTEGRATOR',
    userType: 'PROVIDER',
    planType: 'PLATINUM_USER',
    dob: '1998-05-16',
    location: 'USA',
    nextOfKin: 'yemi',
    profilePictureURL: null,
    country: 'NIGERIA',
    rewardCode: '172693VESTI',
    juiceUserId: '6e8fbd24-789f-4be5-b6ce-1dad382c6cda',
    phoneNumber: '+2348103817187',
    gender: 'male',
    referalCode: 'Y-iih5S9mm',
    totalReffered: '0',
    ReferalLink: 'https://app.wevesti.com/register?referalCode=Y-iih5S9m',
    walletAmountInUSCents: '68',
    walletInNGNKobo: '85414',
    ngnWithdrawalLimit: '50000000',
    ngnDailyLimit: '3000000000',
    usdWithdrawalLimit: '100000',
    usdDailyWithdrawalLimit: '200000',
    ngnTransaferLimit: '500000000',
    usdTransaferLimit: '100000',
    ngnDailyTransferLimit: '3000000000',
    usdDailyTransferLimit: '250000',
    isNewApp: 'true',
    deviceType: 'website',
    achbankName: null,
    achAccountName: null,
    achAccountNumber: null,
    achRoutingNumber: null,
    achWithdrawalAmount: null,
    achTransactionId: null,
    countryofChoice: '[ { "usa","London","canada" }]',
    cardBalance: '97',
    hasVirtualCard: 'true',
    kycLevel: 'Level3',
    passedKyc: true,
    kycDocumentStatus: 'APPROVED',
    silaAccountName: null,
    silaNickName: null,
    silaHandle: null,
    silaKycStatus: null,
    silaWallet: null,
    silaWalletAddress: null,
    silaWalletKey: null,
    silaDocumentVerified: null,
    silaDocumentId: null,
    isLoanApplicant: true,
    apto_cardholder_id: null,
    apto_card_application_id: null,
    creditData: null,
    level1Kyc: null,
    apto_cardholder_token: null,
    virtualCardWaitlistStatus: null,
    isLoanInterestPaid: null,
    loanInterestPaid: null,
    verificationId: null,
    verificationType: 'BVN',
    verificationNumber: 'U2FsdGVkX1/frZA80XoTqDS/PJx308eeLBRriS9icHg=',
    loanAmount: null,
    isLoanFormUploaded: null,
    accountDeleted: null,
    stripeVirtualAccountNumber: '9670003031',
    stripeVirtualAccountRoutingNumber: '084106768',
    stripeVirtualBankName: 'Evolve Bank and Trust',
    stripeVirtualSwiftCode: '084106768',
    monoAccountId: null,
    monoCardHolderId: '6347f983102bb597ab6d0d0d',
    foundersFinancialBalance: '17521',
    stripeAccountStatus: 'VERIFIED',
    stripeAccountId: 'acct_1LXYfQQkcsIbX10W',
    integratorJWTAuthentication:
      'live_sk$2a$08$hKK9SO7vHwlm00oqwjQHr.S9QjQSAeoHcoWouE.miFLbvSzgxrMcG',
    sandboxIntegratorJWTAuthentication:
      'sandbox_sk$2a$08$Z083le6grscAcKBv3t0GBupvcnsQ.V1efvpm0bkcrxVjlFnTZkvWW',
    integratorMode: 'SANDBOX',
    webhookUrl: null,
    isExternalIntegrator: true,
    stripeSourceId: null,
    stripeVerificationToken: null,
    stripeFinancialAccountId: 'fa_1LXrAcQkcsIbX10Wqq3g78L4',
    createdAt: '2021-05-01T18:41:04.932Z',
    updatedAt: '2023-02-17T08:57:19.955Z',
    isAdmin: false,
    hasTransactionPin: true,
    hasVerifiedKyc: true,
    registrationToken:
      'cxmh8z8hRbCb1dtNaU4yJD:APA91bFFWGcGMxPtoC8SC7Ate4vfADxpMW7EQpbuS7mADIwAbJhshnWjYGPBN0k0R6mZVUj17u1K9TNAGDM23vc-IHYFcss55rMbpDhpVvNOq5GuwoGH4KOY5KplJzorqv55O60gksDT',
  };
  // const { balance, foundersRefetch } = useFounders(
  //   userData.id,
  //   userData.stripeAccountStatus,
  // );

  // eslint-disable-next-line
  // const { data: userCards, isSuccess: cardsFetched } = useQuery(
  //   'Fetch user cards',
  //   async () => {
  //     const data =
  //       userData.hasVirtualCard === 'true' ||
  //       userData.hasVirtualCard === true ||
  //       userData.hasVirtualCard === 'true' ||
  //       userData.hasVirtualCard === true
  //         ? (await api.get(`/juice/retrieveCard`)).data.data.cardDetails
  //         : console.log('No card!!');
  //     setCdata(
  //       data
  //         .sort(
  //           (a, b) =>
  //             new Date(b.createdAt.split(' ')[0]) -
  //             new Date(a.createdAt.split(' ')[0]),
  //         )
  //         .filter(item => item.providerName !== 'Juice'),
  //     );
  //     return data;
  //   },
  // );

  // var getCards = () => {
  //   setLoading(true);
  //   api
  //     .get('/juice/retrieveCard')
  //     .then(response => {
  //       setCdata(
  //         response.data.data.cardDetails
  //           .sort(
  //             (a, b) =>
  //               new Date(b.createdAt.split(' ')[0]) -
  //               new Date(a.createdAt.split(' ')[0]),
  //           )
  //           .filter(item => item.providerName !== 'Juice'),
  //       );
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 100);
  //       // refetch()
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    //  userData.juiceUserId || userData.monoCardHolderId || userData.apto_cardholder_id ? getCards() : setLoading(false)
    // getCards();
    // props.getUser();
    props.fetchTransactions();
    // userData.silaAccountName && getSilaWallet()
    // eslint-disable-next-line
  }, [userData.hasVirtualCard, userData.monoCardHolderId]);

  const toggle = () => {
    modifyState({ modal: !state.modal });
  };
  const closeUsdmodal = () => {
    setUsdmodal(false);
  };
  const onInputChange = value => {
    console.log('changed', value);
    modifyState({ numInput: value });
  };

  const handleCurrencyChange = value => {
    modifyState({ currency: value.value });
  };
  var handleModal = () => {
    setState({ ...state, modal: false, currency: 'USD_CENTS', numInput: '' });
  };
  const handleAddWallet = () => {
    const { numInput, currency } = state;
    console.log('num', numInput);
    props.addCashToWallet(numInput, currency, handleModal, refetch);
    props.showAuthLoader();
    props.getProfile();
    // refetch()
    // setTimeout(()=> {
    //   setState({...state, modal:false, currency:'USD_CENTS', numInput:''})
    // }, 4000)
  };

  // eslint-disable-next-line
  var usdwithdrawal = (values, cb, setButton, setErr, type) => {
    var url =
      type === 'No, An International account'
        ? 'juice/initiateBICWirePayout'
        : type === 'No, I Have Swift Code'
        ? 'juice/initiateSWIFTWirePayout'
        : 'juice/initiateWirePayout';
    type === 'No, An International account' && delete values.routing_number;
    type === 'No, An International account' && delete values.swift_code;
    type === 'No, I Have Swift Code' && delete values.routing_number;
    type === 'No, I Have Swift Code' && delete values.bic_code;
    type === 'Yes, A USA account' && delete values.swift_code;
    type === 'Yes, A USA account' && delete values.bic_code;
    // : delete values.swift_code
    setButton('Initiating...');
    api
      .post(url, values)
      .then(res => {
        openNotificationWithIcon(
          'USD Withdrawal Initiated',
          res.data.message,
          'success',
        );
        setTimeout(() => {
          cb(5);
        }, 500);
        setButton('');
        refetch();
      })
      .catch(err => {
        openNotificationWithIconErr(
          'USD Withdrawal failed',
          errorMessage(err),
          'error',
        );
        // setErr(err.data.message)
        setErr(errorMessage(err));
        setButton('');
        cb(6);
      });
  };
  // eslint-disable-next-line
  const showWithdrawalModal = () => {
    modifyState({ withdrawalModal: true, addbank: 'withdrawal' });
  };
  const closeWithopenAddbank = () => {
    modifyState({ addbank: 'addbank' });
  };
  const openAddbankcloseAddbank = () => {
    modifyState({ addbank: 'withdrawal' });
  };
  const closeWithdrawalModal = () => {
    modifyState({ withdrawalModal: false, addbank: 'withdrawal' });
  };

  var handleDoc = e => {
    var value = e.currentTarget.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(e.currentTarget.files[0]);
    reader.onload = function() {
      setBankform({ ...bankform, document: reader.result, name: value });
    };
    // setBankform({...bankform, name:e.target.files[0]})
  };

  var uploadDocument = () => {
    setBankform({ ...bankform, btn: 'uploading...' });
    var formdata = new FormData();
    formdata.append('file', bankform.name);
    var image = formdata.get('file');
    console.log(image);
    // console.log(bankform.name)
    api
      .post('pof/upload/account-form', formdata)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Bank Form', 'success');
        //  setBankform({...bankform, btn:''})
        refetch();
        setBankform({ ...bankform, document: '', name: '', btn: '' });
        setUpload(false);
      })
      .catch(err => {
        console.log(err.data);
        openNotificationWithIconErr(err.data.message, 'Bank Form', 'error');
        refetch();
        setBankform({ ...bankform, btn: '' });
      });
  };
  // const goToProfile = () => {
  //   navigate('/myprofile?tab=kyc')
  // }

  const saveFile = () => {
    saveAs(
      'https://res.cloudinary.com/wevesti/raw/upload/v1651401205/lur8vpchxo6wphqwvvsl',
      'bankformvesti.pdf',
    );
  };
  const { modal, withdrawalModal, virtualCardModal, addbank } = state;

  // eslint-disable-next-line
  const { loading, transactionsData } = props;
  // const { userData } = useUserData();
  // var myData = localStorage.getItem('userData')
  var dt = {
    cardColor: '',
    billingAddress: '',
    postalCode: '',
    country: '',
    cardPin: '',
  };
  useEffect(() => {
    api
      .get('/merchant-prices')
      .then(res => {
        setRate(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  var handleLocation = data => {
    this.setState({ location: data });
  };

  var handleCitizenship = data => {
    this.setState({ citizen: data });
  };

  return (
    <>
      <Simplemodal
        onClick={() =>
          modifyState({ modal: false, currency: 'USD_CENTS', numInput: '' })
        }
        visible={modal}
      >
        <div className="d-flex flex-column text-left  justify-content-center">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <h4 className="mb-5">Add Cash To {state.currency === "USD_CENTS" ? "Dollar" :'Naira'} your NetWebPay Wallet</h4> */}
              {currency ? (
                <Depositwallet
                  handleCurrencyChange={handleCurrencyChange}
                  onAmountChange={onInputChange}
                  amount={state.numInput}
                  currency={state.currency}
                  onClick={handleAddWallet}
                  cb={handleModal}
                  userData={userData}
                  request={accountRequest}
                  // noNgn={true}
                />
              ) : (
                <Depositusdwallet
                  closeModal={handleModal}
                  refetch={refetch}
                  rate={rate}
                  userdata={userData}
                  userType={
                    userData.location === 'US' ||
                    userData.location === 'united states' ||
                    userData.location === 'usa' ||
                    userData.location === 'USA' ||
                    userData.country === 'USA'
                      ? 'us'
                      : ''
                  }
                />
              )}
            </>
          )}
        </div>
      </Simplemodal>

      {/* Withdrawal Modal */}
      <Simplemodal
        onClick={() => closeWithdrawalModal()}
        visible={withdrawalModal}
      >
        {/* {addbank ==='withdrawal' ? <Withdrawal close={closeWithdrawalModal} user={userData} refetch={refetch} openAddbank={closeWithopenAddbank} />: <Withaddbank closeModal={openAddbankcloseAddbank}/> }
         */}

        {addbank === 'withdrawal' ? (
          <Ngnwithdrawal
            close={closeWithdrawalModal}
            balance={userData.walletInNGNKobo}
            user={userData}
            refetch={refetch}
            openAddbank={closeWithopenAddbank}
            closeModal={() => closeWithdrawalModal()}
          />
        ) : (
          <Withaddbank
            closeModal={openAddbankcloseAddbank}
            back={() => {
              openAddbankcloseAddbank();
              showWithdrawalModal();
            }}
          />
        )}
      </Simplemodal>

      {/* Virtual Card Modal */}
      {virtualCardModal && (
        <VirtualCardModal
          isOpen={virtualCardModal}
          onClose={() => {
            modifyState({ virtualCardModal: false });
          }}
        />
      )}
      {/* Virtual Card Modal */}
      {/* info ="Our Virtual Card service is under maintenance please check back later (please email support if you have questions) help@elhay.com" */}
      {/* info ="Our USD Wire service is under maintenance please check back later (please email support if you have questions) help@elhay.com" */}
      <Layout>
        {/* providus account detials */}
        <Simplemodal onClick={() => setAccount(!account)} visible={account}>
          <Providusaccount
            userData={userData}
            myData={localStorage.getItem('userData')}
          />
        </Simplemodal>
        {/* 
        <Simplemodal
          onClick={() => {
            // foundersRefetch();
            dispatch(walletAction({ open: false }));
          }}
          visible={props.open}
        >
          <Financialtrans
            foundersBalance={balance / 100}
            phone={userData.phoneNumber}
            sourceId={userData.stripeSourceId}
            refetch={foundersRefetch}
            id={userData.id}
            userdata={userData}
            close={() => {
              foundersRefetch();
              dispatch(walletAction({ open: false }));
            }}
          />
        </Simplemodal> */}

        <Simplemodal
          onClick={() => {
            refetch();
            dispatch(walletUsdAction({ usdOpen: false }));
          }}
          visible={props.usdOpen}
        >
          <Fbotransactions
            phone={userData.phoneNumber}
            refetch={refetch}
            id={userData.id}
            userdata={userData}
            close={() => {
              refetch();
              dispatch(walletUsdAction({ usdOpen: false }));
            }}
            closeModal={handleModal}
            rate={rate}
            userType={
              userData.location === 'US' ||
              userData.location === 'united states' ||
              userData.location === 'usa' ||
              userData.location === 'USA' ||
              userData.country === 'USA'
                ? 'us'
                : ''
            }
          />
        </Simplemodal>

        {/* usd modal withdrawal */}
        <Simplemodal onClick={() => closeUsdmodal()} visible={usdmodal}>
          <Comingsoon
            title="Under Maintenance"
            subtitle={`
              We are sorry to inform you that our USD Wire service will be on hold for the next 
              few weeks. However, be rest assured that your funds are intact and safe. 
              We would provide you updates where necessary as the situation evolves.
              `}
            button="Close"
            onClick={() => closeUsdmodal()}
          />

          {/* <Usdwithdrawal
              balance= {userData.walletAmountInUSCents / 100}
              onSubmit = {usdwithdrawal}
              closeModal ={closeUsdmodal}
              userId = {userData.id}
            /> */}
        </Simplemodal>
        <Simplemodal
          onClick={() =>
            dispatch(props.openWait ? closeWaitlist() : closeAccWait())
          }
          visible={props.openWait ? props.openWait : props.openAccWait}
        >
          {props.openWait ? (
            <Createstripe
              approved={userData.virtualCardWaitlistStatus}
              openWait={props.openWait}
              closeModal={() => dispatch(closeWaitlist())}
              data={dt}
            />
          ) : (
            <Accountwaitlist closeModal={() => dispatch(closeAccWait())} />
          )}
        </Simplemodal>

        {/* <Simplemodal
          // onClick={()=>setCardmodal(false)}
          visible={props.openVirtual}
          onClick={() => dispatch(closeVirtual())}
        >
          <Ordercard
            refetch={refetch}
            cb={getCards}
            // type = { userData ? (userData.country === "USA" && userData.phoneNumber.includes('+1') ) || (userData.country === "United States" && userData.phoneNumber.includes('+1') ) || userData.location === "USA" ? 'Apto': '' :''}
            // type = { userData ? userData.country === "USA"  || userData.location === "USA" || userData.firstName === "Abimbola"  || userData.lastName === "Amusan" ? 'Apto': '' :''}
            openWait={props.openWait}
            // approved = { userData ?( (userData.country === "USA" && userData.phoneNumber.includes('+1') ) || (userData.country === "United States" && userData.phoneNumber.includes('+1') ) || userData.location === "USA" || userData.location === "united states" || userData.phoneNumber.includes('+1')) ? true: false :''}
            approved={userData.virtualCardWaitlistStatus}
            // approved="APPROVED"
            monoCardHolderId={userData.monoCardHolderId}
            country={userData.country}
            userData={userData}
            rate={rate}
            closeModal={() => dispatch(closeVirtual())}
          />
        </Simplemodal>

        <Simplemodal
          onClick={() =>
            setFundmodal({ ...fundmodal, value: false, id: '', name: '' })
          }
          visible={fundmodal.value}
        >
          <Fundcard
            cardId={fundmodal.id}
            name={fundmodal.name}
            cb={getCards}
            rate={rate}
            balance={userData.nairaAmount}
            currency={fundmodal.currency}
            closeModal={() =>
              setFundmodal({
                ...fundmodal,
                value: false,
                id: '',
                name: '',
                currency: '',
              })
            }
          />
        </Simplemodal> */}

        <Simplemodal onClick={() => setUpload(false)} visible={upload}>
          <div className="uploadbankform">
            <Titlesubtitle
              title="Upload Bank form"
              subtitle="Upload the bank form that you filled."
            />
            <p className="bank_form" onClick={() => saveFile()}>
              Missed the bank form ? <strong>Download form again</strong>
            </p>
            <Fileupload
              info="PDF size limit of"
              title="Upload Bank Form"
              id={1}
              value={bankform.document}
              name={bankform.name}
              setValue={handleDoc}
              remove={() => {
                setBankform({ ...bankform, document: '', name: '', btn: '' });
              }}
              loading={bankform.btn}
              click={uploadDocument}
            />
          </div>
        </Simplemodal>

        <div className="">
          <div
            className=" isw-container"
            style={{ height: 'fit-content', width: '100%' }}
          >
            <div className=" flex_page_container d-flex justify-content-center ">
              <div className="px-3 w-100 main_transaction_box">
                {/* main start */}
                <div className="row bank-cont">
         
                    <div className="section-heading">Rate Calculator</div>

                    <div className="d-flex gba_sidebar_container">
                      <NavLink to="/rates">
                        <div className="gba_sidebar">GiftCard</div>
                      </NavLink>

                      <NavLink to="/ratebitcoin">
                        <div
                          className={`gba_sidebar ${
                            path.startsWith('/ratebitcoin')
                              ? 'active_gba_sidebar'
                              : ''
                          }`}
                        >
                          Bitcoins
                        </div>
                      </NavLink>

                      <NavLink to="/ratealts">
                        <div
                          className={`gba_sidebar ${
                            path.startsWith('/ratealts')
                              ? 'active_gba_sidebar'
                              : ''
                          }`}
                        >
                          Alts
                        </div>
                      </NavLink>
                    </div>
              
                    <div className="col-10 col-lg-5 col-md-10 pt-3"> 
                    {loading ? (
                      <Loader />
                    ) : (
                      <Formik
                        enableReinitialize
                        initialValues={{
                          amount: '',
                          cardbrand: '',
                          cardnumber: '',
                          cardtype: '',
                          cardcountry: '',
                        }}
                        validationSchema={RateSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          setSubmitting(true);

                          const { countryData } = values.location;
                          const data = {
                            ...values,
                          };
                          this.props.giftCardRate(data);
                          setSubmitting(false);
                        }}
                      >
                        {props => (
                          <>
                            <div className="ErrorMessageFormik">
                              {!_.isEmpty(props.errors)
                                ? `Errors: ${Object.values(props.errors).join(
                                    ', ',
                                  )}`
                                : ''}
                            </div>
                            <Form>
                              <div className="justify-content-between rate_giftcard_container">
                                <div className="w-100 bottom_border">
                                  <Field
                                    className="w-100"
                                    component={() => (
                                      <Select
                                        className="form_element_rate form_select_1 w-100"
                                        name="atltype"
                                        placeholder="Select Alts*"
                                        //defaultValue={gender}
                                        onChange={e =>
                                          this.setState({ gender: e })
                                        }
                                        options={[
                                          {
                                            label: 'BRC20',
                                            value: 'BRC21',
                                          },
                                          { label: 'BRC20', value: 'BRC20' },

                                          { label: 'BRC21', value: 'BRC21' },
                                        ]}
                                      />
                                    )}
                                  />
                                  <ErrorMessage
                                    name="atltype"
                                    component="div"
                                    className="text-red-500 text-xs"
                                  />
                                </div>

                                <div className="w-100 bottom_border">
                                  <Field
                                    className="w-100"
                                    component={() => (
                                      <Select
                                        className="form_element_rate form_select_1 w-100"
                                        name="wallettype"
                                        placeholder="Select Wallet Type*"
                                        //defaultValue={gender}
                                        onChange={e =>
                                          this.setState({ gender: e })
                                        }
                                        options={[
                                          {
                                            label: 'BRC20',
                                            value: 'BRC21',
                                          },
                                          { label: 'BRC20', value: 'BRC20' },

                                          { label: 'BRC21', value: 'BRC21' },
                                        ]}
                                      />
                                    )}
                                  />
                                  <ErrorMessage
                                    name="wallettype"
                                    component="div"
                                    className="text-red-500 text-xs"
                                  />
                                </div>

                                <div className="w-100 bottom_border">
                                  <Field
                                    label="amount"
                                    className="form_element_rate form_select_1 w-100"
                                    type="text"
                                    placeholder="Enter Amount in USD*"
                                    name="amount"
                                  />

                                  <ErrorMessage
                                    name="amount"
                                    component="div"
                                    className="text-red-500 text-xs"
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="btn w-100 mb-4 mt-4 primary_btn"
                                disabled={
                                  !props.dirty ||
                                  !_.isEmpty(props.errors) ||
                                  props.isSubmitting
                                }
                              >
                                Check Rates
                              </button>

                              <div className="rate_bitcoin_word"> Amount you will receive </div>

                              <div className="rate_bitcoin_total"> $850.00 </div>
                            </Form>
                          </>
                        )}
                      </Formik>
                    )}
                  </div>

                  {/* {!userData.stripeVirtualAccountNumber && (
                  <Newfeature
                    // status="APPROVED"
                    stripeStatus={userData.stripeAccountStatus}
                    // stripeStatus="UNVERIFIED"
                    status={userData.virtualCardWaitlistStatus}
                    waitlist={
                      userData.verifiedKyc === 'APPROVED' ||
                      userData.verifiedKyc === true
                        ? () => dispatch(openWaitlist())
                        : openUpdateModal
                    }
                  />
                )}
                <Domore
                  loan={userData.isLoanInterestPaid}
                  loanA={userData.isLoanApplicant}
                  // approved="APPROVED"
                  userData={userData}
                  refetch={refetch}
                  create={
                    userData.verifiedKyc === 'APPROVED' ||
                    userData.verifiedKyc === true
                      ? value => dispatch(openVirtual(value))
                      : openUpdateModal
                  }
                  waitlistCard={
                    userData.verifiedKyc === 'APPROVED' ||
                    userData.verifiedKyc === true
                      ? () => dispatch(openWaitlist())
                      : openUpdateModal
                  }
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? 'active' : '',
    })}
  />
);

const mapStateToProps = ({ auth, common, transactions, domore, wallets }) => {
  const { authUser } = auth;
  const transactionsData = transactions;
  const { loading } = common;
  const { openVirtual, openAccWait, openWait } = domore;
  const { action, open, usdOpen } = wallets;
  return {
    authUser,
    loading,
    transactionsData,
    openVirtual,
    openAccWait,
    openWait,
    action,
    open,
    usdOpen,
  };
};

const mapDispatchToProps = {
  addCashToWallet,
  showAuthLoader,
  getProfile,
  fetchTransactions,
  openUpdateBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(RateAlts);
