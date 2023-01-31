import {
  OPEN_BOX,
  CLOSE_SKILL_BOX,
  CLOSE_SAVING_BOX,
  CLOSE_KYC_BOX,
  CLOSE_SHARE,
  OPEN_SHARE,
} from 'appRedux/constants';

export const closeNotificationBox = () => ({
  type: OPEN_BOX,
});

export const closeNotificationSkillBox = () => ({
  type: CLOSE_SKILL_BOX,
});

export const closeNotificationSavingsBox = () => ({
  type: CLOSE_SAVING_BOX,
});

export const closeNotificationKycBox = () => ({
  type: CLOSE_KYC_BOX,
});

export const openShare = id => ({
  type: OPEN_SHARE,
  payload: id,
});

export const closeShare = () => ({
  type: CLOSE_SHARE,
});
