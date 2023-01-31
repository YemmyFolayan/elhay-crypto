import {
  COLLAPSE_DASHBOARD_MENU,
  TOGGLE_DASHBOARD_MENU,
} from 'appRedux/constants';

const INIT_STATE = {
  menuState: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DASHBOARD_MENU: {
      return { menuState: !state.menuState };
    }
    case COLLAPSE_DASHBOARD_MENU: {
      return { menuState: false };
    }

    default:
      return state;
  }
};
