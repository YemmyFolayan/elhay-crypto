import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import Layout from 'components/common/DashboardLayout';
import { Stepback } from 'components/common/stepback/stepback';
import './singlewallet.scss';
import { Empty } from 'components/common/empty/empty';
import api from 'appRedux/api';
import { Modal } from 'antd';
import Loader from 'components/Loader';
import { Walletcard } from 'components/wallets/walletcard';
import vin from 'assets/vdeposit.svg';
import vout from 'assets/vout.svg';
import { Issuesila } from 'components/sila/issuesila';
import { Redeemsila } from 'components/sila/redeemsila';
import { Transfersila } from 'components/sila/transfersila';
import { useUserData, useSilaData } from 'helpers/hooks';
import { Pagination } from 'components/bank/pagination';

export const Singlewallet = props => {
  // const {state} = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [transactions, setTrans] = useState({});
  const [issue, setIssue] = useState(false);
  const [redeem, setRedeem] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [refresh, setRefresh] = useState('');

  var { userData } = useUserData();
  var { userSila } = useSilaData();

  var goBack = () => {
    navigate('/bank');
  };

  var getSilaWallet = () => {
    api.get('sila/get_single_wallet').then(response => {
      setData(response.data.data[1]);
      console.log(response.data.data[1].wallet);
      setLoading(false);
    });
  };

  var getSilaAccount = () => {
    api.get('sila/get_accounts').then(response => {
      // setData(response.data.data[1])
      console.log('hiiii');
      console.log(response.data.data[1]);
    });
  };
  var getSilaTransactions = () => {
    api.get(`sila/sila_transactions?page=${page}`).then(response => {
      setTrans(response.data.data[1]);
      console.log(response.data.data[1].transactions);
      // setLoading(false)
    });
  };

  var walletData = {
    amount: userSila ? userSila.sila_balance / 100 : '***',
    id: 2,
    currency: '$',
    name: 'Dollar',
    display: 'yes',
  };

  var closeModal = value => {
    value === 'redeem'
      ? setRedeem(false)
      : value === 'transfer'
      ? setTransfer(false)
      : setIssue(false);
    setRefresh('refresh');
  };

  useEffect(() => {
    getSilaTransactions();
    getSilaWallet();
    getSilaAccount();
    // eslint-disable-next-line
  }, [refresh, page]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Layout>
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          visible={issue}
          onCancel={() => closeModal('issue')}
          destroyOnClose
          footer=""
          // className="new-modal"
          centered={true}
          okButtonProps={{ style: { display: 'none' } }}
          maskStyle={{
            background: 'rgba(103, 169, 72, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Issuesila
            close={closeModal}
            name={userData.silaAccountName}
            setRefresh={setRefresh}
          />
        </Modal>
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          visible={redeem}
          onCancel={() => closeModal('redeem')}
          destroyOnClose
          footer=""
          // className="new-modal"
          centered={true}
          okButtonProps={{ style: { display: 'none' } }}
          maskStyle={{
            background: 'rgba(103, 169, 72, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Redeemsila
            close={closeModal}
            name={userData.silaAccountName}
            setRefresh={setRefresh}
          />
        </Modal>
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          visible={transfer}
          onCancel={() => closeModal('transfer')}
          destroyOnClose
          footer=""
          // className="new-modal"
          centered={true}
          okButtonProps={{ style: { display: 'none' } }}
          maskStyle={{
            background: 'rgba(103, 169, 72, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Transfersila close={closeModal} setRefresh={setRefresh} />
        </Modal>
        <section className="mywallet">
          <Stepback onClick={goBack} />
          <div className="mywallet__inner">
            <div className="mywallet__inner__left">
              <Title title="Dollar Wallet" />
              <Walletcard data={walletData} />
              <div className="mywallet__inner__left__btns">
                <Btn name="Deposit" onClick={() => setIssue(true)} />
                <Btn name="Transfer" onClick={() => setTransfer(true)} />
                <Btn name="Withdraw" onClick={() => setRedeem(true)} />
              </div>
              <Walletdetails data={data} />
            </div>
            <div className="mywallet__inner__right">
              <div className="mywallet__inner__right__title">
                <Title title="Transactions" />
              </div>

              <div className="mywallet__inner__right__transactions">
                {transactions.transactions ? (
                  transactions.transactions.length < 1 ? (
                    <Empty
                      title="No Transactions"
                      subtitle="You are yet to carry out any transactions, when you do they'll appear heer, click the buttons above to carry out transactions."
                    />
                  ) : (
                    (transactions.transactions ?? []).map((item, index) => (
                      <>
                        <Singletransaction
                          data={item}
                          key={index}
                          userData={userData}
                        />
                        <hr />
                      </>
                    ))
                  )
                ) : (
                  <div className="mywallet__inner__right__transactions">
                    <Loader />
                  </div>
                )}
              </div>
              <div className="mywallet__inner__right__pagination">
                {transactions.transactions && (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={
                      transactions.pagination
                        ? transactions.pagination.total_pages
                        : []
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};

const Walletdetails = props => {
  var data = [
    {
      name: 'Nickname',
      value: props.data.wallet.nickname,
    },
    {
      name: 'Blockchain Address',
      value: props.data.wallet.blockchain_address,
    },
    {
      name: 'Blockchain Network',
      value: props.data.wallet.blockchain_network,
    },
  ];
  return (
    <div className="walletdetail">
      <Title title="Wallet Details" />
      <div className="walletdetail__bottom">
        {data.map((item, index) => (
          <div key={index} className="walletdetail__bottom__single">
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Title = props => {
  return <p className="title">{props.title}</p>;
};

const Btn = props => {
  var action = e => {
    e.preventDefault();
    props.onClick();
  };
  return (
    <a
      href="/"
      className="mywallet__inner__left__btns__btn"
      onClick={e => action(e)}
    >
      {/* <img src={Deposit} alt={props.name}/> */}
      {props.name}
    </a>
  );
};
const Singletransaction = props => {
  const type = props.data.transaction_type;
  const sign =
    type.includes('issue') ||
    props.data.destination_handle === props.userData.silaHandle
      ? '+'
      : '-';
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const newDate = new Date(
    props.data.submitted || props.data.created,
  ).toLocaleDateString('en-US', options);

  return (
    <div className="singletransaction" key={props.key}>
      <span className="singletransaction__left">
        <img
          src={
            type.includes('issue')
              ? vin
              : props.data.destination_handle === props.userData.silaHandle
              ? vin
              : vout
          }
          alt="transaction svg"
        />

        {type === 'issue' || type === 'redeem' ? (
          <p>
            {type === 'issue'
              ? 'You Deposited'
              : type === 'redeem'
              ? 'You Withdrew'
              : ''}{' '}
            a sum of <strong>${props.data.sila_amount / 100} </strong> •{' '}
            <strong> {newDate} </strong> •{' '}
            <strong
              className={`${props.data.status === 'pending' && 'pending'}`}
            >
              {props.data.status}
            </strong>{' '}
          </p>
        ) : props.data.destination_handle === props.userData.silaHandle ? (
          <p>
            {' '}
            <strong>{props.data.user_handle}</strong> sent you the sum of{' '}
            <strong>${props.data.sila_amount / 100} </strong> on •{' '}
            <strong> {newDate} </strong>•{' '}
            <strong
              className={`${props.data.status === 'pending' && 'pending'}`}
            >
              {props.data.status}
            </strong>{' '}
          </p>
        ) : (
          <p>
            You transferred the sum of{' '}
            <strong>${props.data.sila_amount / 100} </strong> to{' '}
            <strong>{props.data.destination_handle}</strong> on •{' '}
            <strong> {newDate} </strong>•{' '}
            <strong
              className={`${props.data.status === 'pending' && 'pending'}`}
            >
              {props.data.status}
            </strong>{' '}
          </p>
        )}
      </span>

      {props.data.status === 'pending' ? (
        <p className={`singletransaction__amount --pending`}>
          {sign}${props.data.sila_amount / 100}
        </p>
      ) : (
        <p
          className={`singletransaction__amount ${
            sign === '+' ||
            props.data.destination_handle === props.userData.silaHandle
              ? ' --credit'
              : ' --debit'
          } `}
        >
          {sign}${props.data.sila_amount / 100}
        </p>
      )}
    </div>
  );
};
