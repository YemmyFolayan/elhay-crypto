import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showAuthLoader } from 'appRedux/actions/Common/';
import { getProfile } from 'appRedux/actions/auth';
import { parse } from 'query-string';
import '../Admin.css';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { Input } from 'antd';
// import { Avatar, Input, Image, Select as AntdSelect } from 'antd';
// import { ArrowLeftOutlined } from '@ant-design/icons';
import { transferCash } from './actions/index';
// import { redirectDashboard } from 'routes/RedirectRoutes';
import {
  fetchProfiles,
  fetchSingleProfile,
} from '../../../appRedux/actions/profile';
// import TransferSuccess from '../../../assets/transfer_success.svg';
import api from 'appRedux/api';
// images
// import girl from '../../../assets/profpicsm.svg';
import dummyAvatar from '../../../assets/dummy-avatar.png';
import Layout from 'components/common/DashboardLayout';
// import { Modal } from 'antd';
// import DividedPinInput from 'components/common/DividedPinInput';
// import Modal from 'components/common/Modal';
// import Loader from 'components/Loader';
import { Singleuser } from 'components/transfer/singleuser';
// import BalanceCard from './BalanceCard';
// import {  Transferbalance } from 'components/bank/balancecard/balancecard';
import Back from 'components/common/back/back';
import Transfercash from 'components/transfer/transfercash';
// import { Titlesubtitle } from '../../../components/common/titlesubtitle/titlesubtitle';
import Newpagination from 'components/bank/pagination/newpagination';
import { Empty } from 'components/common/empty/empty';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Wallets } from 'components/bank/balancecard/wallets';

class Transfer extends Component {
  state = {
    modal: false,
    page: 1,
    showPage: false,
    currency: 'NGN_KOBO',
    transactionPin: '',
    transactionPinModal: false,
    submitting: false,
    amount: 0,
    searchQuery: '',
    users: [],
    currentUser: {},
    userData: {},
    toggle: true,
    recipient: false,
    recent: {},
    active: 0,
  };

  startSubmit = () => {
    this.setState({ submitting: true });
  };
  stopSubmit = () => {
    this.setState({ submitting: false });
  };

  setActive = value => {
    this.setState({ active: value });
  };

  fetchUserData = () => {
    api.get('/auth/logged-in-user').then(res => {
      this.setState({ userData: res.data.data });
    });
  };

  recentTransfers = () => {
    api.get('/wallet/recentTransfers').then(res => {
      this.setState({ recent: res.data.data });
    });
  };

  toggleCurr = () => {
    // alert('SADASD')
    this.setState({ ...this.state, toggle: !this.state.toggle });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      recipient: !this.state.recipient,
      amount: 0,
    });
    this.fetchUserData();
  };

  componentDidMount() {
    const searchParams = parse(this.props.location.search);
    let count = 0;
    if (!_.isEmpty(searchParams && count)) {
      openNotificationWithIcon(searchParams.message);
      count += 1;
    }
    this.fetchUserData();
    this.recentTransfers();
    this.props.getProfile();
  }

  goToTransferPage = () => {
    this.setState({ page: 2 });
  };

  goPagination = value => {
    this.setState({ ...this.state, page: value });
    const { searchQuery } = this.state;
    this.props.fetchProfiles(searchQuery, value);
  };

  goToMainPage = () => {
    this.setState({ page: 1 });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onAmountChange = value => {
    this.setState({ amount: value });
  };

  addUser = user => {
    this.setState({ currentUser: user, searchQuery: '' });
  };
  handleCurrencyChange = value => {
    this.setState({ currency: value.value });
  };

  setTransactionpin = value => {
    this.setState({ transactionPin: value });
  };

  searchProfile = val => {
    const { searchQuery, page } = this.state;
    this.props.fetchProfiles(searchQuery, page);
  };
  handleinputs = (amount, currency, transactionPin) => {
    this.setState({
      ...this.state,
      amount: amount,
      currency: currency,
      transactionPin,
    });
  };
  handleTransferCash = () => {
    // const { amount, currentUser, currency, transactionPin } = this.state;
    const { amount, currentUser, currency, transactionPin } = this.state;
    this.startSubmit();
    this.props.transferCash({
      amount,
      userId: currentUser.id,
      currency,
      transactionPin,
      stopSubmit: () => this.stopSubmit(),
    });
    this.props.getProfile();
    // this.setState({ amount: 0 });
  };

  render() {
    // const history = useHistory();
    // eslint-disable-next-line
    const { modal, amount } = this.state;
    // eslint-disable-next-line
    const { loading, profiles } = this.props;

    const mainPage = (
      <div className="flex_page_container d-flex justify-content-start">
        <div className="p-2 w-100 column justify-content-start">
          {/* <div className="text-left mb-5 p-0">
            <button
              className="p-0"
              style={{ minWidth: '0px', background: 'none' }}
              onClick={() => redirectDashboard()}
            >
              <ArrowLeftOutlined style={{ fontSize: '20px' }} />
            </button>
          </div> */}
          <Back page="Bank" link="bank" />
          <div className="tr_account_box w-100">
            <div className="row bank-cont w-100 mb-5 pb-5">
              <div className="col-12 col-lg-10 col-md-10 pt-3 mb-4">
                <Wallets
                  transfer="yes"
                  userdata={this.state.userData}
                  stripeVirtualAccountNumber={
                    this.state.userData.stripeVirtualAccountNumber
                  }
                  nairaAmount={this.state.userData.walletInNGNKobo / 100}
                  dollarAmount={this.state.userData.walletAmountInUSCents / 100}
                  active={this.state.active}
                  setActive={this.setActive}
                />
              </div>
            </div>
            {/* <Newbalancecard
             title ={`Your ${this.state.toggle ? 'NGN':'USD'} vesti balance`}
              transfer ="yes"
              onClick={this.toggle}
              currency={this.state.toggle}
              toggleCurrency={this.toggleCurr}
              nairaAmount={this.state.userData.walletInNGNKobo / 100}
              dollarAmount={this.state.userData.walletAmountInUSCents / 100}
            /> */}
          </div>
          {/* <Monoconnect/> */}
          <h2 className="txt_2ch4 mb-3" style={{ color: '#000' }}>
            Send Cash
          </h2>
          <Input
            placeholder="Search for user"
            size="large"
            className="tr_search"
            value={this.state.searchQuery}
            onChange={e => this.setState({ searchQuery: e.target.value })}
            onKeyUp={this.searchProfile}
          />
          {profiles.data && profiles.data.length > 0 ? (
            <div className="px-3 col justify-content-start align-items-center">
              <div
                className=" p-1 row flex-wrap justify-content-start align-items-center"
                style={{ gap: '20px' }}
              >
                {profiles.data
                  .filter(user => !user.firstName.includes('User'))
                  .map(user => (
                    <Singleuser
                      key={user.id}
                      firstname={
                        user.firstName && user.firstName.split(' ').length > 1
                          ? user.firstName.split(' ')[0]
                          : user.firstName
                      }
                      lastname={
                        user.lastName && user.lastName.split(' ').length > 1
                          ? user.lastName.split(' ')[1]
                          : user.lastName
                      }
                      image={
                        user.profilePictureURL
                          ? user.profilePictureURL
                          : dummyAvatar
                      }
                      onClick={() => {
                        this.addUser(user);
                        // this.goToTransferPage();
                        this.setState({ ...this.state, recipient: true });
                        this.addUser(user);
                      }}
                    />
                  ))}
              </div>
              <Newpagination
                className="pagination-bar"
                currentPage={this.state.page}
                totalCount={profiles.paginationMeta.totalObjects}
                pageSize={15}
                onPageChange={page => this.goPagination(page)}
              />
            </div>
          ) : (
            <></>
          )}

          <p className="tr_sub">Recent Users you sent cash to</p>
          <div
            className="p-3 row flex-wrap justify-content-start align-items-center"
            style={{ gap: '20px' }}
          >
            {this.state.recent.length > 0 ? (
              this.state.recent
                .filter(
                  user =>
                    user.receiver.firstName !== this.state.userData.firstName,
                )
                .reduce((unique, o) => {
                  if (
                    !unique.some(
                      obj =>
                        obj.receiver.firstName === o.receiver.firstName &&
                        obj.receiver.lastName === o.receiver.lastName,
                    )
                  ) {
                    unique.push(o);
                  }
                  return unique;
                }, [])
                .map(user => (
                  <Singleuser
                    key={user.receiver.id}
                    firstname={user.receiver.firstName}
                    lastname={user.receiver.lastName}
                    image={
                      user.profilePictureURL
                        ? user.profilePictureURL
                        : dummyAvatar
                    }
                    onClick={() => {
                      this.addUser(user.receiver);
                      // this.goToTransferPage();
                      this.setState({ ...this.state, recipient: true });
                      this.addUser(user.receiver);
                    }}
                  />
                ))
            ) : (
              <Empty
                title="Recent Users"
                subtitle="You are yet to send money to any vesti user, when you do, they will all appear here."
              />
            )}
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Layout>
          <div className="tr_modal_box">
            {/* <div className="side_box_cont isw-container" /> */}
            <Simplemodal
              onClick={this.closeModal}
              visible={this.state.recipient}
            >
              <Transfercash
                currentUser={this.state.currentUser}
                image={
                  this.state.currentUser.profilePictureURL
                    ? this.state.currentUser.profilePictureURL
                    : dummyAvatar
                }
                handleCurrencyChange={this.handleCurrencyChange}
                currency={this.state.currency}
                amount={this.state.amount}
                onAmountChange={this.onAmountChange}
                handleTransferCash={this.handleTransferCash}
                setTransactionpin={this.setTransactionpin}
                closeModal={this.closeModal}
                firstName={this.state.currentUser.firstName}
                lastName={this.state.currentUser.lastName}
              />
            </Simplemodal>
            <div
              className=" isw-container"
              style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
            >
              {/* {this.state.page === 1 && mainPage} */}
              {mainPage}
              {/* {this.state.recipient && recipientPage} */}
              {/* {this.state.page === 2 && transferPage}
              {modal && successPage} */}
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = ({ auth, profile }) => {
  const { authUser } = auth;
  const { profiles } = profile;
  return {
    authUser,
    profiles,
  };
};
const mapDispatchToProps = {
  transferCash,
  showAuthLoader,
  getProfile,
  fetchProfiles,
  fetchSingleProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
