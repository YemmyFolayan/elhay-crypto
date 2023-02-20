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
import { useFounders } from 'helpers/hooks';
import Ordercard from 'components/vesticards/selectcard';
import { Mytransactions } from 'components/bank/mytransactions';
import { Depositwallet, Providusaccount } from 'components/deposit/deposit';
import { Cards } from 'components/virtualcards/cards';
import api from 'appRedux/api';
import { openUpdateBox } from 'appRedux/actions/update';
import { Domore } from 'components/bank/domore/domore';
import './cash.scss';
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
import Financialtrans from 'components/bank/financialaccount/transactions';
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
  pathway,
  provider,
  chistory,
 
  logoblack,
} from '../../../assets/assets';



const useFetchUser = () => {
  const { isLoading, data: userData, refetch } = useQuery(
    'userData',
    // {refetchOnWindowFocus: false,enabled: false},
    async () =>
      await api.get('/auth/logged-in-user').then(res => res.data.data),
  );

  return { isLoading, userData, refetch };
};

const Cash = props => {
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
    id: 'faaf0170-ff07-40db-8108-4199a7cc9313',
    firstName: 'Vesti',
    lastName: 'Test ',
    email: 'test@wevesti.com',
    username: 'VestiTest',
    emailVerified: true,
    wasReferred: null,
    shuttlersPromo: true,
    blacklisted: false,
    superAdmin: false,
    FactorAuth: false,
    FactorAuthCode: '234541',
    providusAccountNumber: '9977696809',
    adminType: null,
    userType: 'vesti_user',
    planType: null,
    dob: null,
    location: 'NGA',
    nextOfKin: null,
    profilePictureURL: null,
    country: 'USA',
    rewardCode: '865146VESTI',
    juiceUserId: null,
    phoneNumber: '+14697347949',
    gender: null,
    freeze: null,
    totalRefferralBonus: 0,
    referalCode: '6hanJJker',
    totalReffered: '0',
    ReferalLink: 'https://app.wevesti.com/register?referalCode=6hanJJker',
    walletAmountInUSCents: '147200',
    walletInNGNKobo: '10025346',
    ngnWithdrawalLimit: '50000000',
    ngnDailyLimit: '300000000',
    usdWithdrawalLimit: '100000',
    usdDailyWithdrawalLimit: '200000',
    ngnTransaferLimit: '500000000',
    usdTransaferLimit: '100000',
    ngnDailyTransferLimit: '3000000000',
    approvedBy: null,
    usdDailyTransferLimit: '250000',
    isNewApp: 'true',
    deviceType: 'website',
    achbankName: null,
    achAccountName: null,
    achAccountNumber: null,
    achRoutingNumber: null,
    achWithdrawalAmount: null,
    achTransactionId: null,
    countryofChoice: 'United States,Canada,United Kingdom',
    cardBalance: null,
    hasVirtualCard: 'true',
    termsAndCondition: null,
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
    silaDocumentVerified: false,
    silaDocumentId: 'false',
    isLoanApplicant: true,
    apto_cardholder_id: null,
    apto_card_application_id: null,
    creditData: 'updated',
    level1Kyc: null,
    apto_cardholder_token: null,
    virtualCardWaitlistStatus: 'APPROVED',
    isLoanInterestPaid: true,
    loanInterestPaid: '4',
    verificationId: null,
    verificationType: null,
    verificationNumber: null,
    loanAmount: null,
    isLoanFormUploaded: null,
    accountDeleted: null,
    stripeVirtualAccountNumber: '9670004484',
    stripeVirtualAccountRoutingNumber: '084106768',
    stripeVirtualBankName: 'Evolve Bank and Trust',
    stripeVirtualSwiftCode: '084106768',
    monoAccountId: null,
    monoCardHolderId: null,
    foundersFinancialBalance: '102525',
    stripeAccountStatus: 'VERIFIED',
    stripeAccountId: 'acct_1MboWZQUOjNJo9MD',
    integratorJWTAuthentication: null,
    sandboxIntegratorJWTAuthentication: null,
    integratorMode: 'SANDBOX',
    webhookUrl: null,
    isExternalIntegrator: null,
    stripeSourceId: null,
    stripeVerificationToken: 'vs_1McWHGHyH0mfw5s2DkMyGp4X',
    stripeFinancialAccountId: 'fa_1LY55fQiXPfq34wivWgPj9Ig',
    createdAt: '2022-06-14T12:45:39.511Z',
    updatedAt: '2023-02-18T20:31:04.632Z',
    isAdmin: false,
    hasTransactionPin: true,
    hasVerifiedKyc: true,
   
  };
  const { balance, foundersRefetch } = useFounders(
    userData.id,
    userData.stripeAccountStatus,
  );

  // eslint-disable-next-line
  const { data: userCards, isSuccess: cardsFetched } = useQuery(
    'Fetch user cards',
    async () => {
      const data =
        userData.hasVirtualCard === 'true' ||
        userData.hasVirtualCard === true ||
        userData.hasVirtualCard === 'true' ||
        userData.hasVirtualCard === true
          ? (await api.get(`/juice/retrieveCard`)).data.data.cardDetails
          : console.log('No card!!');
      setCdata(
        data
          .sort(
            (a, b) =>
              new Date(b.createdAt.split(' ')[0]) -
              new Date(a.createdAt.split(' ')[0]),
          )
          .filter(item => item.providerName !== 'Juice'),
      );
      return data;
    },
  );

  var getCards = () => {
    setLoading(true);
    api
      .get('/juice/retrieveCard')
      .then(response => {
        setCdata(
          response.data.data.cardDetails
            .sort(
              (a, b) =>
                new Date(b.createdAt.split(' ')[0]) -
                new Date(a.createdAt.split(' ')[0]),
            )
            .filter(item => item.providerName !== 'Juice'),
        );
        setTimeout(() => {
          setLoading(false);
        }, 100);
        // refetch()
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    //  userData.juiceUserId || userData.monoCardHolderId || userData.apto_cardholder_id ? getCards() : setLoading(false)
    getCards();
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

    // eslint-disable-next-line
  }, []);

  // useEffect(()=> {
  //   foundersRefetch()
  //   // eslint-disable-next-line
  // },[userData.id, !isPreviousFoundersData])

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

        <Simplemodal
          onClick={() => {
            foundersRefetch();
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
        </Simplemodal>

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

        <Simplemodal
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
        </Simplemodal>

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

         
              <div className=" px-3 w-100">
                {/* main start */}
                <div className="row bank-cont">
                  <div className="col-10 col-lg-5 col-md-10 pt-3">
                    <div className="section-heading">My Dashboard</div>
                    {/* <Newbalancecard
                      title ={`Your ${currency ? 'NGN':'USD'} vesti balance`}
                      onClick={toggle}
                      reveal={state.modal}
                      nairaAmount={userData.walletInNGNKobo / 100}
                      dollarAmount={userData.walletAmountInUSCents / 100}
                      accountNumber = {userData.providusAccountNumber}
                      currency={ currency}
                      toggleCurrency={toggleCurrency}
                      request = {accountRequest}
                      foundersBalance={balance/100}
                      // toggle() redirectTransfer() showWithdrawalModal()
                      deposit={() => userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ? currency ? toggle() :  dispatch(walletUsdAction({usdOpen:true,action:'deposit'})) :openUpdateModal()}
                      send={() => userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ? redirectTransfer() :openUpdateModal()}
                      withdraw ={() => userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ? currency? showWithdrawalModal() : setUsdmodal(true) : openUpdateModal()}
                      setUpload={setUpload}
                      loanAmount={userData.loanAmount / 100}
                      loanAmountPaid={userData.loanInterestPaid / 100}
                      loanForm= {userData.isLoanFormUploaded}
                      rate={rate}
                      userdata={userData}
                      convert = {()=> setFundmodal({...fundmodal, currency:'NGN', value:true})}
                      stripeVirtualAccountNumber ={userData.stripeVirtualAccountNumber}
                      active={activeAccount}
                      setActive ={setActiveAccount}
                    /> */}
                    <Wallets
                      nairaAmount={userData.walletInNGNKobo / 100}
                      dollarAmount={userData.walletAmountInUSCents / 100}
                      accountNumber={userData.providusAccountNumber}
                      request={accountRequest}
                      foundersBalance={balance / 100}
                      depositUsd={() =>
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? dispatch(
                              walletUsdAction({
                                usdOpen: true,
                                action: 'deposit',
                              }),
                            )
                          : openUpdateModal()
                      }
                      withdrawUsd={() =>
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? setUsdmodal(true)
                          : openUpdateModal()
                      }
                      // sendUsd={() => userData.verifiedKyc === "APPROVED" || userData.verifiedKyc === true ? dispatch(walletUsdAction({usdOpen:true,action:'withdraw'})) :openUpdateModal()}
                      deposit={() =>
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? toggle()
                          : openUpdateModal()
                      }
                      send={() =>
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? redirectTransfer()
                          : openUpdateModal()
                      }
                      withdraw={() =>
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? currency
                            ? showWithdrawalModal()
                            : setUsdmodal(true)
                          : openUpdateModal()
                      }
                      userdata={userData}
                      stripeVirtualAccountNumber={
                        userData.stripeVirtualAccountNumber
                      }
                      nairaAccount={() => setAccount(true)}
                      active={activeAccount}
                      setActive={setActiveAccount}
                    />
                  </div>
                  <div className="col-10 col-lg-7 col-md-10 pt-3">
                    <div className="section-heading ">My NetWebPay Card(s)</div>
                    <Cards
                      loading={load}
                      cdata={carddata ?? []}
                      userData={userData}
                      create={
                        userData.verifiedKyc === 'APPROVED' ||
                        userData.verifiedKyc === true
                          ? () => dispatch(openVirtual(''))
                          : openUpdateModal
                      }
                      // create ={ setCardmodal}
                      setFundmodal={setFundmodal}
                      fundmodal={fundmodal}
                      rate={rate}
                    />
                  </div>
                </div>

                {!userData.stripeVirtualAccountNumber && (
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
                />
                {activeAccount === 0 && userData.stripeVirtualAccountNumber ? (
                  <Myfintransactions id={userData.id} />
                ) : (
                  <Mytransactions balance={userData.walletInNGNKobo} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Cash);
