import {
  OPEN_UPDATE_KYC,
  CLOSE_UPDATE_KYC,
  OPEN_UPGRADE,
  CLOSE_UPGRADE,
} from 'appRedux/constants';

export const openUpdateBox = () => ({
  type: OPEN_UPDATE_KYC,
});

export const closeUpdateBox = () => ({
  type: CLOSE_UPDATE_KYC,
});

export const openUpgradeBox = () => ({
  type: OPEN_UPGRADE,
});

export const closeUpgradeBox = () => ({
  type: CLOSE_UPGRADE,
});
