import {
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAIL,
  OPEN_PAUSE,
  CLOSE_PAUSE,
  EDIT_STRIPE,
  STRIPE_TRANSACTION,
  WALLET_TRANS,
  WALLET_TRANSACTION,
} from 'appRedux/constants';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';

export const depositViaPays = (amount, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANSACTION, payload: { transLoading: true } });
    const url = 'paystack/wallet/pay';
    const payload = {
      amount: amount,
      currency: 'NGN_KOBO',
      redirectURL: 'https://app.wevesti.com/bank',
    };
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'Payment link succesfully generated.',
          'Deposit',
          'success',
        );
        dispatch({
          type: WALLET_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          window.open(res.data.data.paymentURL);
          cb();
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANSACTION,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
      });
  };
};

export const fetchTransactions = () => {
  return dispatch => {
    dispatch({ type: FETCH_TRANSACTIONS_START });
    const url = '/transactions';
    api
      .get(url)
      .then(response => {
        const data = response.data.data;
        // console.log(data);
        return dispatch({ type: FETCH_TRANSACTIONS, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_TRANSACTIONS_FAIL, payload: error });
      });
  };
};
export const chargeUserCreditReport = payload => {
  return dispatch => {
    dispatch({ type: FETCH_TRANSACTIONS_START });
    // alert('ibere')
    const url = '/nova/nova_charge_user';
    api
      .post(url, payload)
      .then(response => {
        console.log(response);
        openNotificationWithIcon(response.data.message, 'Credit Report Fee');
        dispatch({ type: FETCH_TRANSACTIONS, payload: response.data.data });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: FETCH_TRANSACTIONS_FAIL, payload: error });
        openNotificationWithIconErr(error.data.message, 'Credit Report Error');
      });
  };
};

export const openPause = value => ({
  type: OPEN_PAUSE,
  payload: value,
});

export const closePause = () => ({
  type: CLOSE_PAUSE,
});

// withdrawal

export const withdrawNGN = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    const url = '/withdraw';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'A transaction has been initiated',
          'Withdrawal',
          'success',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(3, '');
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Withdrawal', 'error');
        setTimeout(() => {
          cb(4);
        }, 100);
      });
  };
};

// wallet deposit

export const fundUsdViaNgn = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    const url = '/wallet/ngn-to-usd-Wallet';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'Payment link succesfully generated.',
          'Deposit',
          'success',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        cb(3);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        cb(4);
        // setTimeout(()=> {
        //   cb(5)
        // }, 100)
      });
  };
};
export const stripeUsdViaCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    const url = 'stripe/checkoutDepositStripe';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'Payment link succesfully generated.',
          'Deposit',
          'success',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          window.open(res.data.data.paymentURL);
          cb();
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        // setTimeout(()=> {
        //   cb(5)
        // }, 100)
      });
  };
};
// stripe

export const stripeTreasury = (id, cb) => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, payload: { loading: true } });
    const url = `stripe/createTreasuryAccountNumber/${id}`;
    api
      .post(url, null, 'stripe')
      .then(res => {
        dispatch({
          type: EDIT_STRIPE,
          payload: { loading: false, message: res.data.message, success: true },
        });
        setTimeout(() => {
          cb();
        }, 1000);
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            loading: false,
            message: error.data.message,
            success: false,
          },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Treausry Account',
          'error',
        );
        setTimeout(() => {
          cb();
        }, 1000);
      });
  };
};

export const stripeDollarCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, payload: { loading: true } });
    const url = 'stripe/createStripeVirtualCard';
    api
      .post(url, payload, 'stripe')
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Dollar Card', 'success');
        dispatch({
          type: EDIT_STRIPE,
          payload: { loading: false, message: res.data.message, success: true },
        });
        cb(3);
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            loading: false,
            message: error.data.message,
            success: false,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Dollar Card', 'error');
        cb(4);
      });
  };
};

export const fetchStripeTransactions = () => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, loading: true });
    const url = '/stripe/Listalltransactions';
    api
      .get(url, null, 'stripe')
      .then(response => {
        const data = response.data.data.transactions;
        return dispatch({
          type: FETCH_TRANSACTIONS,
          payload: { transactions: data, loading: false },
        });
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: { message: error.data.message },
        });
      });
  };
};

// stripe fund card
export const fundStripeViaWalletCard = (name, payload, cb) => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, payload: { cardloading: true } });
    // const url = 'stripe/fundCardFromWallet';
    var url =
      name === 'Stripe'
        ? '/stripe/fundCardFromWallet'
        : '/juice/fundCardFromWallet';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Card Deposit', 'success');
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: res.data.message,
            success: true,
          },
        });
        cb(3);
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: error.data.message,
            success: false,
          },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Card Deposit',
          'error',
        );
        cb(4);
      });
  };
};

export const fundStripeViaCheckoutCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, payload: { cardloading: true } });
    const url = 'stripe/checkoutDepositStripe';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Card Deposit', 'success');
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: res.data.message,
            success: true,
          },
        });
        setTimeout(() => {
          window.open(res.data.paymentURL);
        }, 100);

        setTimeout(() => {
          cb();
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: error.data.message,
            success: false,
          },
        });
        openNotificationWithIconErr(
          error.data.message,
          'Card Deposit',
          'error',
        );
      });
  };
};

export const changeStripePin = (name, payload, cb) => {
  return dispatch => {
    dispatch({ type: EDIT_STRIPE, payload: { cardloading: true } });
    // const url = 'stripe/changeCardPin';
    var url = name.includes('Apto')
      ? '/juice/changeCardPin'
      : name.includes('Stripe')
      ? '/stripe/changeCardPin'
      : '/juice/changeCardPin';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'update PIN', 'success');
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: res.data.message,
            success: true,
          },
        });
        cb(2);
      })
      .catch(error => {
        dispatch({
          type: EDIT_STRIPE,
          payload: {
            cardloading: false,
            message: error.data.message,
            success: false,
          },
        });
        openNotificationWithIconErr(error.data.message, 'update PIN', 'error');
      });
  };
};

// treasury deposit
export const stripeFundViaCard = (payload, cb) => {
  return dispatch => {
    dispatch({ type: STRIPE_TRANSACTION, payload: { transLoading: true } });
    const url = 'stripe/deposit/checkoutDepositStripeFoundersChannel1';
    api
      .post(url, payload, 'stripe')
      .then(res => {
        openNotificationWithIcon(
          'Payment link succesfully generated.',
          'Deposit',
          'success',
        );
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          window.open(res.data.data.paymentURL);
          cb(4, 'link');
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        setTimeout(() => {
          cb(5);
        }, 100);
      });
  };
};

export const stripeAchOne = (payload, cb) => {
  return dispatch => {
    dispatch({ type: STRIPE_TRANSACTION, payload: { transLoading: true } });
    const url = 'stripe/deposit/createACHMicroDebitFromUSBankRequestChannel2';
    api
      .post(url, payload, 'stripe')
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Deposit', 'success');
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(2);
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        setTimeout(() => {
          cb(3);
        }, 100);
      });
  };
};

export const stripeAchFinal = (payload, cb) => {
  return dispatch => {
    dispatch({ type: STRIPE_TRANSACTION, payload: { transLoading: true } });
    const url = 'stripe/verifyBankAccountMicroDebitFromUSBankRequest';
    api
      .post(url, payload, 'stripe')
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Deposit', 'success');
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(2);
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        setTimeout(() => {
          cb(3);
        }, 100);
      });
  };
};

export const stripeFundViaUSD = (payload, cb) => {
  return dispatch => {
    dispatch({ type: STRIPE_TRANSACTION, payload: { transLoading: true } });
    const url =
      '/transfer/createTransferToConnectedAccountsFromUSDWalletChannel4';
    api
      .post(url, payload, 'stripe')
      .then(res => {
        openNotificationWithIcon(
          'A Deposit transaction has been initiated',
          'Deposit',
          'success',
        );
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(4, '');
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        setTimeout(() => {
          cb(5);
        }, 100);
      });
  };
};

// treasury withdrawal

export const stripeWithdrawal = (payload, cb) => {
  return dispatch => {
    dispatch({ type: STRIPE_TRANSACTION, payload: { transLoading: true } });
    const url = 'stripe/withdraw/createPayoutToExternalBank';
    api
      .post(url, { ...payload, payment_method_network: 'ach' }, 'stripe')
      .then(res => {
        openNotificationWithIcon(
          'Withdrawal successfully initiated.',
          'Withdrawal',
        );
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(4);
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: STRIPE_TRANSACTION,
          payload: { transLoading: false, transMessage: error.data.message },
        });
        openNotificationWithIconErr(error.data.message, 'Withdrawal', 'error');
        setTimeout(() => {
          cb(5);
        }, 100);
      });
  };
};

// fbo
export const depositUsdViaCard = (url, payload, cb, cbb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    // const url = 'stripe/checkoutDepositStripe';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'Payment link succesfully generated.',
          'Deposit',
          'success',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        window.open(res.data.data.trxUrl);
        setTimeout(() => {
          cb();
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        setTimeout(() => {
          cbb();
        }, 100);
      });
  };
};

export const depositUsdViaAccount = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    const url = '/fbio/receive_money';
    api
      .post(url, payload)
      .then(res => {
        // openNotificationWithIcon(
        //   'Payment link succesfully generated.',
        //   'Deposit',
        //   'success',
        // );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data },
        });
        setTimeout(() => {
          cb(res.data.data);
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Deposit', 'error');
        // setTimeout(()=> {
        //   cb(5)
        // }, 100)
      });
  };
};

export const withdrawFboUSD = (payload, cb) => {
  return dispatch => {
    dispatch({ type: WALLET_TRANS, payload: { transLoading: true } });
    const url = '/fbio/send_money';
    api
      .post(url, payload)
      .then(res => {
        openNotificationWithIcon(
          'A transaction has been initiated',
          'Withdrawal',
          'success',
        );
        dispatch({
          type: WALLET_TRANS,
          payload: { transLoading: false, transMessage: res.data.message },
        });
        setTimeout(() => {
          cb(6);
        }, 100);
      })
      .catch(error => {
        dispatch({
          type: WALLET_TRANS,
          payload: {
            transLoading: false,
            transMessage: error.data.message || error.message,
          },
        });
        openNotificationWithIconErr(error.data.message, 'Withdrawal', 'error');
        setTimeout(() => {
          cb(7);
        }, 100);
      });
  };
};
