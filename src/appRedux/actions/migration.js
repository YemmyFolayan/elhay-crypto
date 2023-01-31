import {
  FETCH_COUNTRIES_START,
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_FAIL,
} from 'appRedux/constants';
import api from 'appRedux/api';

export const fetchCountries = () => {
  return dispatch => {
    dispatch({ type: FETCH_COUNTRIES_START });
    const url = '/AllCountryContents';
    api
      .get(url)
      .then(response => {
        // console.log("vesti country", response);
        const data = response.data.data;
        return dispatch({ type: FETCH_COUNTRIES, payload: data });
      })
      .catch(error => {
        dispatch({ type: FETCH_COUNTRIES_FAIL, payload: error });
      });
  };
};
