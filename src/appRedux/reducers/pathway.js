import { OPEN_DESC, OPEN_STAGES } from 'appRedux/constants';

const INIT_STATE = {
  desc: true,
  stages: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_DESC: {
      return { stages: false, desc: true };
    }
    case OPEN_STAGES: {
      return { desc: false, stages: true };
    }

    default:
      return state;
  }
};
