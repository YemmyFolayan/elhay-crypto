import {
  OPEN_BOX,
  CLOSE_SKILL_BOX,
  CLOSE_SAVING_BOX,
  CLOSE_KYC_BOX,
  CLOSE_SHARE,
  OPEN_SHARE,
} from 'appRedux/constants';

const INIT_STATE = {
  closeBox: true,
  closeSkillBox: false,
  closeSavingBox: false,
  closeKycBox: false,
  sharePost: {
    id: '',
    value: false,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OPEN_BOX: {
      return { ...state, closeBox: true };
    }
    case CLOSE_SKILL_BOX: {
      return { ...state, closeSkillBox: true };
    }

    case CLOSE_SAVING_BOX: {
      return { ...state, closeSavingBox: true, closeBox: false };
    }
    case CLOSE_KYC_BOX: {
      return { ...state, closeKycBox: true, closeBox: false };
    }
    case OPEN_SHARE: {
      return {
        ...state,
        sharePost: { ...state.sharePost, id: action.payload, value: true },
      };
    }
    case CLOSE_SHARE: {
      return { ...state, sharePost: { ...state.sharePost, value: false } };
    }

    default:
      return state;
  }
};
