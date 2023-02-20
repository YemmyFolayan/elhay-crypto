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
        //const rawData = response.data;

        const rawData =
      [
        {
            "id": "d4c2ed59-21a4-48b9-b3e7-0b1ba5986a7a",
            "type": "BILL_PAYMENT",
            "amount": "290000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "FAILURE",
            "receiverId": null,
            "createdAt": "2023-02-19T18:21:19.248Z",
            "updatedAt": "2023-02-19T18:21:19.248Z"
        },
        {
            "id": "55006b88-5d4c-40c3-a722-ecff2ed1fe4f",
            "type": "BILL_PAYMENT",
            "amount": "290000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "FAILURE",
            "receiverId": null,
            "createdAt": "2023-02-19T18:16:51.325Z",
            "updatedAt": "2023-02-19T18:16:51.325Z"
        },
        {
            "id": "18b9ea18-2455-4afd-a3d2-ce962eb664fb",
            "type": "BILL_PAYMENT",
            "amount": "900000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T17:47:52.706Z",
            "updatedAt": "2023-02-19T17:47:52.706Z"
        },
        {
            "id": "0dd88d17-b279-4353-a99e-ef4aee93b1f7",
            "type": "BILL_PAYMENT",
            "amount": "900000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T17:45:45.804Z",
            "updatedAt": "2023-02-19T17:45:45.804Z"
        },
        {
            "id": "abb91782-f1b3-4dd1-9b65-2c5038ffe3f9",
            "type": "BILL_PAYMENT",
            "amount": "10000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T16:18:13.356Z",
            "updatedAt": "2023-02-19T16:18:13.356Z"
        },
        {
            "id": "498bc675-c204-4dad-9654-fcd4ee14ff88",
            "type": "DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD",
            "amount": "0",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "USD_CENTS",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T14:35:22.091Z",
            "updatedAt": "2023-02-19T14:35:22.091Z"
        },
        {
            "id": "5b279ec9-e925-40df-bce7-b8b30ae5b436",
            "type": "DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES",
            "amount": "14",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "USD_CENTS",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T14:35:22.088Z",
            "updatedAt": "2023-02-19T14:35:22.088Z"
        },
        {
            "id": "d8613786-3f60-4f54-b228-6f6b3b70b600",
            "type": "DEPOSIT_TO_FINANCIAL_ACCOUNT_STP",
            "amount": "500",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "USD_CENTS",
            "status": "PENDING",
            "receiverId": null,
            "createdAt": "2023-02-19T14:35:22.083Z",
            "updatedAt": "2023-02-19T14:35:22.083Z"
        },
        {
            "id": "4b8db1f3-5cb7-4ec2-89ba-e021bb4e7d54",
            "type": "BILL_PAYMENT_REVERSAL",
            "amount": "100000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T14:13:09.197Z",
            "updatedAt": "2023-02-19T14:13:09.197Z"
        },
        {
            "id": "f22c797a-55fb-4e70-9388-09e3da54ea63",
            "type": "BILL_PAYMENT_REVERSAL",
            "amount": "10000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T14:13:09.173Z",
            "updatedAt": "2023-02-19T14:13:09.173Z"
        },
        {
            "id": "aafcdbb5-7b8f-4f2b-831a-dfeb164a4c1e",
            "type": "BILL_PAYMENT",
            "amount": "10000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "FAILURE",
            "receiverId": null,
            "createdAt": "2023-02-19T14:06:21.883Z",
            "updatedAt": "2023-02-19T14:13:09.167Z"
        },
        {
            "id": "4ad26056-6782-480d-8a71-dcece352ce7a",
            "type": "BILL_PAYMENT",
            "amount": "100000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "FAILURE",
            "receiverId": null,
            "createdAt": "2023-02-19T13:56:24.452Z",
            "updatedAt": "2023-02-19T14:13:09.191Z"
        },
        {
            "id": "db209bb8-b2e2-45bd-89aa-524100d0ce40",
            "type": "BILL_PAYMENT",
            "amount": "100000",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "NGN_KOBO",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T13:54:44.615Z",
            "updatedAt": "2023-02-19T13:54:44.615Z"
        },
        {
            "id": "de217da8-b706-4644-8238-4c1a3b4d80b7",
            "type": "DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_USD",
            "amount": "0",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "USD_CENTS",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T13:52:28.000Z",
            "updatedAt": "2023-02-19T13:52:28.000Z"
        },
        {
            "id": "51210e46-31bb-48ac-84c2-840577fb04d9",
            "type": "DEPOSIT_TO_FINANCIAL_ACCOUNT_STP_CHARGES",
            "amount": "14",
            "userId": "faaf0170-ff07-40db-8108-4199a7cc9313",
            "currency": "USD_CENTS",
            "status": "SUCCESS",
            "receiverId": null,
            "createdAt": "2023-02-19T13:52:27.995Z",
            "updatedAt": "2023-02-19T13:52:27.995Z"
        }
    ];

      setData(rawData);
      console.log(response.data);
      setLoading(false);
    });
  };


  var fetchTransactions = 
  
   

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [props.balance, page]);

  if (loading) {
    return (
      <div className="mytransactions-container">
        <Titlesubtitle
          title="Open Trades"
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
          title="Open Trades"
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
