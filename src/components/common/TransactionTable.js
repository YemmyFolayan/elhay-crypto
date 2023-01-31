import React from 'react';
import { Table } from 'antd';

const TransactionTable = ({ dataSource }) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 160,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },
    {
      title: 'Recipient',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 100,
      render: receiver =>
        receiver ? receiver.firstName + ' ' + receiver.lastName : '',
    },
    {
      title: 'Currency',
      dataIndex: 'exchangeRate',
      key: 'exchangeRate',
      width: 100,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 200,
    },
  ];

  return (
    <div className="mt-5 admin_table_card  w-100 flex-column d-flex mt-4 py-3 mb-4">
      <div className="d-flex admin_underline_headtxt">
        <h3 className="admin_header_txt_2 flex-grow-1 mt-2">
          Recent Transactions
        </h3>
      </div>
      <div className="d-flex py-4">
        <div className="search_form_container flex-grow-1">
          <input
            type="search"
            name="search_admin"
            className="admin_search_control"
            placeholder="Search"
          />
          <span />
        </div>
        <div className="report_cont">
          <button className="primary_btn px-5">Report</button>
          {/* <div> */}
        </div>
      </div>
      <div style={{ maxWidth: '100vw' }}>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: 400 }} />
      </div>
    </div>
  );
};

export default TransactionTable;
