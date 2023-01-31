import React, { useState, useEffect } from 'react';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import ccheck from 'assets/circle-check.svg';
import api from 'appRedux/api';
import Loader from 'components/Loader';

import failed from 'assets/failed.svg';
export const Createwallet = props => {
  const [disable, setDisable] = useState(true);
  const [wallet, setWallet] = useState({});
  const [loading, setLoader] = useState(true);
  const [message, setMessage] = useState('');
  const goBack = e => {
    e.preventDefault();
    // var value = props.data.kyctype === "KYC DOC" ? 3 :2;
    props.move(0);
  };

  var updateInput = e => {
    setWallet({ ...wallet, nickname: e.target.value });
  };
  const openInput = e => {
    e.preventDefault();
    setDisable(false);
  };
  const goContinue = e => {
    e.preventDefault();
    props.move(2);
  };
  var getWallet = () => {
    api
      .get(`/sila/get_single_wallet`)
      .then(response => {
        setWallet(response.data.data[1].wallet);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  var registerWallet = e => {
    e.preventDefault();
    api
      .post(`/sila/register_wallet`, { nickname: wallet.nickname })
      .then(response => {
        setMessage('Wallet successfully registered');
        setLoader(false);

        setTimeout(() => {
          props.move(2);
        }, 1000);
      })
      .catch(err => {
        setLoader(false);
      });
  };

  var updateWallet = e => {
    e.preventDefault();
    api
      .patch(`/sila/update_wallet`, { nickname: wallet.nickname })
      .then(response => {
        setMessage('Wallet nickname updated successfully.');
        setWallet(response.data.data[1].data.wallet);
        setDisable(true);
      })
      .catch(err => {
        setMessage('Wallet nickname updated failed.');
        setDisable(true);
      });
  };

  useEffect(() => {
    getWallet();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="createwallet">
        <Titlesubtitle
          title="Update Your Wallet Name • 1 of  2"
          subtitle="You can choose to update your wallet nickname."
        />
        {/* <p>{wallet.wallet.id}</p> */}
        <form>
          <div className="form__input">
            <Singleinputlabelcol
              type="text"
              label=""
              name="nickname"
              placeholder="Give your wallet a name"
              value={wallet.nickname}
              disabled={disable}
              onChange={updateInput}
            />
            {message.includes('successfully') ? (
              <Shortinfo image={ccheck} subject={message} />
            ) : message ? (
              <Shortinfo image={failed} fail={true} subject={message} />
            ) : (
              <></>
            )}
            <Shortinfo subject="Spaces, special characters, and uppercase characters are not permitted. Minimum of 3 characters of input required." />
          </div>
          {props.data.walletUpdate && (
            <Shortinfo
              image={ccheck}
              subject={`Success, Your wallet name has been updated!`}
            />
          )}
          <button
            className="backcontinue__continue"
            style={{ marginTop: '20px' }}
            disabled={props.data.walletName ? false : false}
            onClick={e => (disable ? openInput(e) : updateWallet(e))}
          >
            {disable ? 'Edit Wallet Name' : 'Update Wallet Name'}
          </button>
          <Backcontinue
            text="Confirm and Continue"
            goBack={goBack}
            continue={goContinue}
          >
            <button
              className="backcontinue__continue"
              disabled={disable ? false : true}
              onClick={e => registerWallet(e)}
            >
              Register Wallet & Continue
            </button>
          </Backcontinue>
        </form>
      </div>
    );
  }
};
