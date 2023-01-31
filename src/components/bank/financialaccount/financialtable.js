import React, { useEffect, useState } from 'react';
import '../mytransactions.scss';
import api from 'appRedux/api';
import deposit from 'assets/deposit_tr.svg';
import withdraw from 'assets/withdraw_tr.svg';
import { Empty } from 'components/common/empty/empty';
import Loader from 'components/Loader';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import Newpagination from "../pagination/newpagination";
export const Myfintransactions = props => {
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  var fetchTransactions = () => {
    var url = `stripe/ListallFinancialAccountTransactions/${props.id}`;
    api
      .get(url)
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [props.balance, page]);

  if (loading) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="My Transactions"
          subtitle="See all transactions you've carried out on NetWebPay."
        />
        <div className="mytransactions-center-container">
          <Loader />
        </div>
      </div>
    );
  } else if (data.transactions && data.transactions.length > 0) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="Founders Account Transactions"
          subtitle="See all transactions you've carried out on your Founders account."
        />

        <div className="mytransactions-inner-container">
          <div className="table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Type</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>Description</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {(data.transactions ?? [])
                  .filter(item => item.amount / 100 !== 0)
                  .map((item, index) => (
                    <Trow
                      key={index}
                      type={item.flow_type}
                      currency={item.currency}
                      description={item.description}
                      status={item.status}
                      amount={item.amount}
                    />
                  ))}
              </tbody>
            </table>
          </div>

          {/* <Newpagination
                            className="pagination-bar"
                            currentPage={page}
                            totalCount={data.paginationMeta.totalObjects}
                            pageSize={15}
                            onPageChange={page => setPage(page)}
                        /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mytransactions-container">
        <p className="mytransactions-container__title">My Transactions</p>
        <div className="mytransactions-center-container">
          <Empty
            title="No Transactions"
            subtitle="You are yet to carry out any transactions, when you do they'll appear here, click the buttons above to carry out transactions."
          />
        </div>
      </div>
    );
  }
};

const Trow = props => {
  // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', };
  // const newDate = new Date(props.date).toLocaleDateString("en-US", options);
  var type = props.type === 'received_credit' ? 'Deposit' : 'Withdrawal';
  // var tr_type = props.type.split('_')[0]
  return (
    <tr>
      <td>
        <img
          src={
            type.toLocaleUpperCase().includes('WITHDRAWAL') ||
            type.includes('DEBIT')
              ? withdraw
              : deposit
          }
          alt="tr_type"
        />
      </td>
      <td>{type}</td>
      <td>USD</td>
      <td
        className={`amount${
          type.includes('Withdrawal')
            ? '-red'
            : type.includes('Deposit')
            ? '-green'
            : '-red'
        }`}
      >
        {/* {type.includes('Withdrawal') ? '- ' : props.type.includes('Deposit')? '+ ': '- '} */}
        {(props.amount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td>{props.description}</td>
      {/* <td>
                <div className={`status ${props.status === "SUCCESS" ? ' success' : props.status === "PENDING" ? " pending" : " failed"}`}>
                    {props.status}
                </div>
            </td> */}
    </tr>
  );
};
