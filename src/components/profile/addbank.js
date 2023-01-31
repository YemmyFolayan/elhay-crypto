import React, { useState, useEffect } from 'react';
import api from 'appRedux/api';
// import Singleinputlabel from "components/common/inputs/singleinputlabel";
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { Singleselect } from 'components/common/inputs/singleselect';
import { errorMessage } from 'helpers/utils';
import Loader from 'components/Loader';
import './addbank.scss';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Platformbutton } from 'components/common/button/button';

export const Addbank = props => {
  const [selected, setSelected] = useState({});
  const [allBanks, setAllBanks] = useState([]);
  const [myBanks, setMyBanks] = useState([]);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState('');
  const [verify, setVerify] = useState('Verify Bank');
  const [btn, setButton] = useState('Add Bank Details');
  var setInput = e => {
    console.log(e.target.value);
    setAccount(e.target.value);
  };

  var Options = (allBanks ?? []).map((item, index) => ({
    value: item.code,
    label: item.name,
  }));

  // var handleChange =(value) => {
  //     console.log(value)
  //     var code =Options.filter((item) => item.label === value.label);
  //     setSelected(code.value)
  // }

  var handleChange = value => {
    console.log(value);
    // var code =Options.filter((item) => item.label === value.label);
    setSelected(value);
  };

  const handleAddBankDetails = e => {
    e.preventDefault();
    setButton('Adding Bank ...');
    api
      .post('/user/banks', {
        bankCode: selected.value,
        currency: 'NGN_KOBO',
        accountNumber: account,
        accountName: details.account_name,
      })
      .then(data => {
        openNotificationWithIcon(data.data.message, 'Bank Addition', 'success');
        setButton('Add Bank Details');
        getMyBanks();
        setAccount('');
        setDetails('');
        props.cb && props.cb(1);
      })

      .catch(error => {
        setButton('Add Bank Details');
        openNotificationWithIconErr(errorMessage(error), 'Error', 'error');
        props.cb && props.cb(2);
      });
  };
  const verifyBank = e => {
    e.preventDefault();
    setVerify('Verifying...');
    api
      .get(
        `/user/verify_bank?accountNumber=${account}&bankCode=${selected.value}`,
      )
      .then(res => {
        setTimeout(() => {
          setDetails(res.data.data.data);
        }, 500);
        setVerify('Verify Bank');
      })
      .catch(err => {
        setVerify('Verify Bank');
        openNotificationWithIconErr(
          err.response.data.message,
          'Error',
          'error',
        );
      });
  };
  const getAllBanks = (name = '') => {
    api
      .get(`/banks?page=${1}&page_limit=${193}`)
      .then(res => {
        setAllBanks(res.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('err', error.data.message);
        setLoading(false);
      });
  };

  const getMyBanks = () => {
    api
      .get(`/user/banks`)
      .then(res => {
        setMyBanks(res.data.data);
        setLoading(false);
      })
      .catch(error => {
        // console.log('err', error.data.message);
        setLoading(false);
      });
  };

  const deleteBank = id => {
    api
      .delete(`deleteBankDetailsById/${id}`)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Bank removal', 'success');
        getMyBanks();
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.response.data.message,
          'Bank removal',
          'error',
        );
      });
  };
  useEffect(() => {
    getAllBanks();
    getMyBanks();
  }, []);

  if (loading) {
    return (
      <div className="addbank-container">
        <div className="addbank-inner-container">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="addbank-container">
        <div className="addbank-inner-container">
          <form
            onSubmit={e => (details ? handleAddBankDetails(e) : verifyBank(e))}
            className="profilebank"
          >
            {props.label === 'no' ? (
              <Singleselect
                value={selected}
                options={Options}
                placeholder="Select your bank"
                onChange={handleChange}
              />
            ) : (
              <Singleselect
                label="Bank Details"
                sublabel="Add New Bank"
                value={selected}
                options={Options}
                placeholder="Select your bank"
                onChange={handleChange}
              />
            )}
            <div
              className={`account-number ${props.label === 'no' &&
                '--nolabel'}`}
            >
              <Inputfloat
                type="number"
                label="ACCOUNT NUMBER"
                name="account"
                value={account}
                placeholder="Enter account number"
                disabled={false}
                onChange={setInput}
              />
            </div>

            {details && (
              <div
                className={`account-name ${props.label === 'no' &&
                  '--nolabel'}`}
              >
                <p> Account Name </p>
                <Inputfloat
                  type="text"
                  label="ACCOUNT NAME"
                  name="account name"
                  value={details.account_name}
                  placeholder=""
                  disabled={true}
                  onChange={setInput}
                />
              </div>
            )}
            {/* {details && <Singleinputlabel
                        type="text"
                        label=""
                        name="account name"
                        value={details.accountName}
                        placeholder=""
                        disabled={true}
                        onChange={setInput}
                    />} */}
            <div
              className={`mybanks-box ${props.label === 'no' && '--nolabel'}`}
            >
              <p className="title">My Banks</p>
              <div className="mybanks-big-container">
                {(myBanks ?? []).map((item, index) => (
                  <Mybank
                    key={index}
                    accountNumberDisplay={item.accountNumberDisplay}
                    bankName={item.bankName}
                    id={item.id}
                    deleteBank={deleteBank}
                  />
                ))}
              </div>
            </div>

            <div className="updateprofile-btn-box">
              {props.label === 'no' ? (
                <Platformbutton
                  name="Go back"
                  type="secondary"
                  click={() => props.goBack()}
                />
              ) : (
                <></>
              )}
              {details ? (
                <button
                  className="save-changes"
                  disabled={
                    Object.keys(selected).length > 0 && account !== ''
                      ? btn === 'Adding Bank ...'
                        ? true
                        : false
                      : true
                  }
                >
                  {btn}
                </button>
              ) : (
                <button
                  className="save-changes"
                  disabled={
                    Object.keys(selected).length > 0 && account !== ''
                      ? verify !== 'Verifying...'
                        ? false
                        : true
                      : true
                  }
                >
                  {verify}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const Mybank = props => {
  return (
    <div className="mybanks-container">
      <div className="mybanks-inner-container">
        <p>
          {props.accountNumberDisplay} {props.bankName}
        </p>
      </div>
      <i
        className="fas fa-times"
        onClick={() => props.deleteBank(props.id)}
      ></i>
    </div>
  );
};
