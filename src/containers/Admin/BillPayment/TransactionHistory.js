import React, { useEffect, useState } from 'react';
import '../../../components/bank/mytransactions.scss';
import api from 'appRedux/api';
import { Empty } from 'components/common/empty/empty';
import Loader from 'components/Loader';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import Newpagination from '../../../components/bank/pagination/newpagination';
export const TransactionHistory = props => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);

  var fetchTransactions = () => {
    api.get(`biller/user-history?page=${page}&page_limit=15`).then(response => {
      setData(response.data);
      const filteredData =
        response.data.data.filter(item => item.trxStatus.includes('pending')) ??
        [];
      setPendingTransactions(filteredData);
      console.log(response.data);
      setLoading(false);
    });
  };

  var fetchTransactionStatus = () => {
    console.log('Pending Trxns', pendingTransactions);
    const data = pendingTransactions?.map(item =>
      api.get(`/biller/status?trxRef=${item.trxRef}`),
    );
    console.log(data);
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [props.balance, page]);

  useEffect(() => {
    fetchTransactionStatus();
    // eslint-disable-next-line
  }, [pendingTransactions]);

  if (loading) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="My Transaction History"
          subtitle="See all bills payment transactions you've carried out on NetWebPay."
        />
        <div className="mytransactions-center-container">
          <Loader />
        </div>
      </div>
    );
  } else if (data.data.length > 0) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="My Transaction History"
          subtitle="See all bills payment transactions you've carried out on NetWebPay."
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
                  <th>Charges</th>
                  <th>Date & Time</th>
                  <th>Billing Number</th>
                  <th>Token</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <Trow
                    key={index}
                    type={item.billerType}
                    currency={item.currency}
                    date={item.createdAt}
                    status={item.trxStatus}
                    amount={item.amount}
                    charges={item.charges}
                    token={item.paymentToken}
                    billingNumber={item.billingNumber}
                    reference={item.providerRef}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Newpagination
            className="pagination-bar"
            currentPage={page}
            totalCount={data.paginationMeta.totalObjects}
            pageSize={15}
            onPageChange={page => setPage(page)}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mytransactions-container">
        <p className="mytransactions-container__title">
          My Transaction History
        </p>
        <div className="mytransactions-center-container">
          <Empty
            title="No Transactions"
            subtitle="You are yet to carry out any transactions, when you do they'll appear here."
          />
        </div>
      </div>
    );
  }
};

const Trow = props => {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const newDate = new Date(props.date).toLocaleDateString('en-US', options);

  // var tr_type = props.type.split('_')[0];
  return (
    <tr>
      <td>
        {/* <img
          src={
            props.type.includes('DEBIT')
              ? withdraw
              : tr_type === 'AIRTIME'
              ? airtime
              : tr_type === 'SAVING'
              ? save
              : tr_type === 'TRANSFER'
              ? transfer
              : deposit
          }
          alt="tr_type"
        /> */}
      </td>
      <td>{props.type.split('_')[0]}</td>
      <td>{props.currency.split('_')[0]}</td>
      <td
        className={`amount${
          props.type.includes('SENT')
            ? '-red'
            : props.type.includes('RECEIVED')
            ? '-green'
            : props.type.includes('deposit')
            ? props.status === 'pending'
              ? '-yellow'
              : '-green'
            : '-red'
        }`}
      >
        {(props.amount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td>
        {(props.charges / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td>{newDate}</td>
      <td>{props.billingNumber}</td>
      <td>{props.token}</td>
      <td>
        <div
          className={`status ${
            props.status === 'success'
              ? ' success'
              : props.status === 'pending'
              ? ' pending'
              : ' failed'
          }`}
        >
          {props.status}
        </div>
      </td>
    </tr>
  );
};
