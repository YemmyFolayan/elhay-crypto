import React, { useEffect, useState } from 'react';
import './mytransactions.scss';
import api from 'appRedux/api';
import { Empty } from 'components/common/empty/empty';
import Loader from 'components/Loader';
// import { Pagination } from "./pagination";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import Newpagination from './pagination/newpagination';
import { transColor, transImg, transSign } from 'helpers/utils';
export const Mytransactions = props => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  var fetchTransactions = () => {
    api.get(`/transactions?page=${page}&page_limit=15`).then(response => {
      setData(response.data);
      console.log(response.data);
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
  } else if (data.data.length > 0) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="My Transactions"
          subtitle="See all transactions you've carried out on NetWebPay."
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
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(
                  data.data.filter(item => !item.status.includes('PENDING')) ??
                  []
                ).map((item, index) => (
                  <Trow
                    key={index}
                    type={item.type}
                    currency={item.currency}
                    date={item.createdAt}
                    status={item.status}
                    amount={item.amount}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* <Pagination
                            totalPages={data.paginationMeta.totalPages}
                            page={page}
                            setPage={setPage}
                        /> */}

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

  var tr_type = props.type.split('_')[0];

  return (
    <tr>
      <td>
        <img src={transImg(tr_type)} alt="tr_type" />
      </td>
      <td>
        {tr_type === 'USD'
          ? props.type === 'DEPOSIT_TO_WALLET_STP'
            ? 'USD Deposit STP'
            : props.type.split('_').join(' ')
          : props.type.split('_').join(' ')}
      </td>
      <td>{props.currency.split('_')[0]}</td>
      <td
        className={`amount${transColor(
          props.type.split('_').join(' ') === 'TRANSFER RECEIVED'
            ? 'TRF-'
            : tr_type,
        )}`}
      >
        {transSign(
          props.type.split('_').join(' ') === 'TRANSFER RECEIVED'
            ? 'TRF-'
            : tr_type,
        )}

        {(props.amount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
      <td>{newDate}</td>
      <td>
        <div
          className={`status ${
            props.status === 'SUCCESS'
              ? ' success'
              : props.status === 'PENDING'
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
