import React, { useEffect, useState } from 'react';
import './mytransactions.scss';
import api from 'appRedux/api';
import { Empty } from 'components/common/empty/empty';
import Loader from 'components/Loader';
// import { Pagination } from "./pagination";
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import Newpagination from './pagination/newpagination';
import { transColor, transImg, transSign } from 'helpers/utils';

console.log("transactions page");


const rawDatas = {
  message: 'Successfully retrieved transactions',
  data: [
    {
      id: '5d2251e5-b016-4bba-96bc-55e1190c22ee',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
      amount: '0',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:47:56.893Z',
      updatedAt: '2023-02-18T22:47:56.893Z',
    },
    {
      id: '18a79488-9d51-463c-9ed1-88c92a51aa78',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
      amount: '221',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:47:56.888Z',
      updatedAt: '2023-02-18T22:47:56.888Z',
    },
    {
      id: '9d3b7231-0654-4fa3-8291-9d212123aded',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
      amount: '7630',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'PENDING',
      receiverId: null,
      createdAt: '2023-02-18T22:47:56.883Z',
      updatedAt: '2023-02-18T22:47:56.883Z',
    },
    {
      id: '946f009c-7c34-4ec7-9ae2-f628eefd5657',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
      amount: '0',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:39:41.964Z',
      updatedAt: '2023-02-18T22:39:41.964Z',
    },
    {
      id: '2061f3cd-c19d-466a-8908-74481fcf68fa',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
      amount: '221',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:39:41.959Z',
      updatedAt: '2023-02-18T22:39:41.959Z',
    },
    {
      id: 'eb36ad54-9c8f-44ef-8324-49535b99f085',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
      amount: '7630',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'PENDING',
      receiverId: null,
      createdAt: '2023-02-18T22:39:41.954Z',
      updatedAt: '2023-02-18T22:39:41.954Z',
    },
    {
      id: '076e67a0-ae86-4917-bfc0-3a6a167718f2',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
      amount: '0',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:35:22.083Z',
      updatedAt: '2023-02-18T22:35:22.083Z',
    },
    {
      id: '1c338683-1929-4485-a688-ca5d5e4c1db0',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
      amount: '221',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:35:22.072Z',
      updatedAt: '2023-02-18T22:35:22.072Z',
    },
    {
      id: 'dd4bf3c4-53d7-469c-a715-13bfdfb33a69',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
      amount: '7630',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'PENDING',
      receiverId: null,
      createdAt: '2023-02-18T22:35:22.051Z',
      updatedAt: '2023-02-18T22:35:22.051Z',
    },
    {
      id: '758605c7-2fb9-4059-b68c-175b71296609',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
      amount: '0',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:22:16.240Z',
      updatedAt: '2023-02-18T22:22:16.240Z',
    },
    {
      id: '37780cd9-988c-4fbe-b28a-cbce71c672d3',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
      amount: '221',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'SUCCESS',
      receiverId: null,
      createdAt: '2023-02-18T22:22:16.234Z',
      updatedAt: '2023-02-18T22:22:16.234Z',
    },
    {
      id: '88492250-9b51-4b2d-8a22-9e36a5cd2b7c',
      type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
      amount: '7630',
      userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
      currency: 'USD_CENTS',
      status: 'PENDING',
      receiverId: null,
      createdAt: '2023-02-18T22:22:16.228Z',
      updatedAt: '2023-02-18T22:22:16.228Z',
    },
  ]
};

console.log("transactions page");

console.log("transaction Data", rawDatas.data);

export const Mytransactions = props => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  var fetchTransactions = () => {
    // api.get(`/transactions?page=${page}&page_limit=15`).then(response => {
      //const rawData = response.data;

      const rawData = {
        message: 'Successfully retrieved transactions',
        data: [
          {
            id: '5d2251e5-b016-4bba-96bc-55e1190c22ee',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
            amount: '0',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:47:56.893Z',
            updatedAt: '2023-02-18T22:47:56.893Z',
          },
          {
            id: '18a79488-9d51-463c-9ed1-88c92a51aa78',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
            amount: '221',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:47:56.888Z',
            updatedAt: '2023-02-18T22:47:56.888Z',
          },
          {
            id: '9d3b7231-0654-4fa3-8291-9d212123aded',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
            amount: '7630',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'PENDING',
            receiverId: null,
            createdAt: '2023-02-18T22:47:56.883Z',
            updatedAt: '2023-02-18T22:47:56.883Z',
          },
          {
            id: '946f009c-7c34-4ec7-9ae2-f628eefd5657',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
            amount: '0',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:39:41.964Z',
            updatedAt: '2023-02-18T22:39:41.964Z',
          },
          {
            id: '2061f3cd-c19d-466a-8908-74481fcf68fa',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
            amount: '221',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:39:41.959Z',
            updatedAt: '2023-02-18T22:39:41.959Z',
          },
          {
            id: 'eb36ad54-9c8f-44ef-8324-49535b99f085',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
            amount: '7630',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'PENDING',
            receiverId: null,
            createdAt: '2023-02-18T22:39:41.954Z',
            updatedAt: '2023-02-18T22:39:41.954Z',
          },
          {
            id: '076e67a0-ae86-4917-bfc0-3a6a167718f2',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
            amount: '0',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:35:22.083Z',
            updatedAt: '2023-02-18T22:35:22.083Z',
          },
          {
            id: '1c338683-1929-4485-a688-ca5d5e4c1db0',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
            amount: '221',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:35:22.072Z',
            updatedAt: '2023-02-18T22:35:22.072Z',
          },
          {
            id: 'dd4bf3c4-53d7-469c-a715-13bfdfb33a69',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
            amount: '7630',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'PENDING',
            receiverId: null,
            createdAt: '2023-02-18T22:35:22.051Z',
            updatedAt: '2023-02-18T22:35:22.051Z',
          },
          {
            id: '758605c7-2fb9-4059-b68c-175b71296609',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD',
            amount: '0',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:22:16.240Z',
            updatedAt: '2023-02-18T22:22:16.240Z',
          },
          {
            id: '37780cd9-988c-4fbe-b28a-cbce71c672d3',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES',
            amount: '221',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'SUCCESS',
            receiverId: null,
            createdAt: '2023-02-18T22:22:16.234Z',
            updatedAt: '2023-02-18T22:22:16.234Z',
          },
          {
            id: '88492250-9b51-4b2d-8a22-9e36a5cd2b7c',
            type: 'DEPOSIT_TO_FINANCIAL_ACCOUNT_STP',
            amount: '7630',
            userId: '6a1a8c22-0a1e-4f37-9bd9-a0963f48d79d',
            currency: 'USD_CENTS',
            status: 'PENDING',
            receiverId: null,
            createdAt: '2023-02-18T22:22:16.228Z',
            updatedAt: '2023-02-18T22:22:16.228Z',
          },
        ]
      };

      console.log("transactions page");

      setData(rawData.data);
      console.log("transaction Data", rawData.data);
      setLoading(false);
    //});
  };

  var fetchTransactions = useEffect(() => {
    //fetchTransactions();
    // eslint-disable-next-line
  }, [props.balance, page]);

  if (loading) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="Open Trades"
          subtitle="See all transactions you've carried out."
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
          title="Open Trades"
          subtitle="See all transactions you've carried out."
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
        <p className="mytransactions-container__title">Open Trades</p>
        <div className="mytransactions-center-container">
          <Empty
            title="No Transaction Found"
            subtitle="You do not have any transaction"
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
