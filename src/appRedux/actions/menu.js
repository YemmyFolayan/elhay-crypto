import {
  COLLAPSE_DASHBOARD_MENU,
  TOGGLE_DASHBOARD_MENU,
} from 'appRedux/constants';

export const toggleMenu = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_DASHBOARD_MENU });
  };
};

export const collapseMenu = () => {
  return dispatch => {
    dispatch({ type: COLLAPSE_DASHBOARD_MENU });
  };
};
