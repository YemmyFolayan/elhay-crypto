import { CREATE_MONO_CARD, CARD_ACTION, FETCH_CARD } from 'appRedux/constants';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from './Common';
import { errorMessage, getCardApi, getCardPinApi } from 'helpers/utils';
import { navigate } from '@reach/router';

export const createMonoCardHolder = (payload, cb) => {
  return dispatch => {
    dispatch({ type: CREATE_MONO_CARD, payload: { loading: true } });
    const url = 'mono/create_card_holder';
    api
      .post(url, {
        ...payload,
        state: payload.state.label,
        lga: payload.lga.value,
      })
      .then(res => {
        dispatch({
          type: CREATE_MONO_CARD,
          payload: { loading: false, message: res.data.message },
        });
        cb(3);
      })
      .catch(error => {
        dispatch({
          type: CREATE_MONO_CARD,
          payload: { loading: false, message: error.data.message },
        });
        cb(5);
      });
  };
};

export const createMonoCard = (payload, cb) => {
  var colors = ['Black', 'Yellow', 'Green', 'Purple', 'Blue'];
  return dispatch => {
    dispatch({ type: CREATE_MONO_CARD, payload: { loading: true } });
    const url = 'mono/create_card';
    api
      .post(url, {
        ...payload,
        colorType:
          payload.colorType.value || colors[Math.floor(Math.random() * 4) + 1],
      })
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Virtual Card', 'success');
        dispatch({
          type: CREATE_MONO_CARD,
          payload: { loading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb(6);
        }, 100);
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.data.message,
          'Virtual Card',
          'error',
        );
        dispatch({
          type: CREATE_MONO_CARD,
          payload: { loading: false, message: error.data.message },
        });

        setTimeout(() => {
          cb(7);
        }, 100);
      });
  };
};

export const fetchSingleMonoCard = (payload, cb, cbb) => {
  return dispatch => {
    dispatch({ type: FETCH_CARD, payload: { loading: true } });
    const url = `mono/card/${payload}`;
    api
      .get(url)
      .then(res => {
        setTimeout(() => {
          // console.log(res.data.data.data)
          console.log(res.data.data);
          cb(res.data.data);
          cbb(false);
        }, 100);
        dispatch({ type: FETCH_CARD, payload: { loading: false } });
      })
      .catch(error => {
        setTimeout(() => {
          console.log(error);
        }, 100);
        dispatch({ type: FETCH_CARD, payload: { loading: false } });
        cbb(false);
      });
  };
};

export const fundCard = (payload, name, cb) => {
  // alert(name)
  var load =
    name === 'Mono'
      ? { amountInUsdCent: payload.amount * 100, cardId: payload.cardId }
      : payload;
  return dispatch => {
    dispatch({ type: CARD_ACTION, payload: { cardLoading: true } });
    const url = getCardApi(name);
    api
      .post(url, load)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Card Funding', 'success');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb(3);
        }, 100);
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.data.message,
          'Card Funding',
          'error',
        );

        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: error.data.message },
        });
        cb(4);
      });
  };
};

export const changeCardPin = (payload, name, cb) => {
  // alert(name)
  return dispatch => {
    dispatch({ type: CARD_ACTION, payload: { cardLoading: true } });
    const url = getCardPinApi(name);
    api
      .patch(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'PIN update', 'success');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb(2);
        }, 100);
      })
      .catch(error => {
        console.log(errorMessage(error));
        openNotificationWithIconErr(errorMessage(error), 'PIN update', 'error');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: errorMessage(error) },
        });
        cb(3);
      });
  };
};

export const freezeUnfreezeCard = (payload, status, cb) => {
  // alert(name)
  return dispatch => {
    dispatch({ type: CARD_ACTION, payload: { cardLoading: true } });
    const url = status.includes('Inactive')
      ? `/mono/unfreeze/${payload}`
      : `/mono/freeze/${payload}`;
    api
      .patch(url)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Virtual Card', 'success');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb();
        }, 100);
      })
      .catch(error => {
        console.log(errorMessage(error));
        openNotificationWithIconErr(
          errorMessage(error),
          'Virtual Card',
          'error',
        );
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: errorMessage(error) },
        });
        cb();
      });
  };
};

export const liquidateCard = (payload, id, cb) => {
  // alert(name)
  // var load = name === 'Mono' ? {amountInUsdCent:payload.amount * 100, cardId:payload.cardId} : payload
  return dispatch => {
    dispatch({ type: CARD_ACTION, payload: { cardLoading: true } });
    const url = `/mono/cards/liquidate/${id}`;
    api
      .patch(url, payload)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Liquidate Card', 'success');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb(3);
        }, 100);
      })
      .catch(error => {
        // console.log(error.data.data.message)
        openNotificationWithIconErr(
          error.response.data.message,
          'Liquidate Card',
          'error',
        );

        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: error.response.data.message },
        });
        cb(4);
      });
  };
};

// delete card mono/cards/delete/cardId

export const deleteCard = (payload, status, cb) => {
  // alert(name)
  return dispatch => {
    dispatch({ type: CARD_ACTION, payload: { cardLoading: true } });
    const url = `mono/cards/delete/${payload}`;
    api
      .delete(url)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Virtual Card', 'success');
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: res.data.message },
        });

        setTimeout(() => {
          cb();
          navigate('/bank');
        }, 100);
      })
      .catch(error => {
        openNotificationWithIconErr(
          error.response.data.message,
          'Virtual Card',
          'error',
        );
        dispatch({
          type: CARD_ACTION,
          payload: { cardLoading: false, message: errorMessage(error) },
        });
        cb();
      });
  };
};
