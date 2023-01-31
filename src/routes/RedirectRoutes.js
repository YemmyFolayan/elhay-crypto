import { navigate } from '@reach/router';
import { clearSession } from 'appRedux/store/cookies';
import { getSession } from '../appRedux/store/cookies';

// export const redirectDashboard = () => navigate('/cash');
export const redirectDashboard = () => navigate('/bank');
export const redirectFeedsDashboard = () => navigate('/bank');
// export const redirectFeedsDashboard = () => navigate('/feeds');
export const redirectTransfer = () => navigate('/bank/transfer');

export const redirectLogin = () => {
  clearSession();
  if (!getSession()) {
    if (
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ] !== 'auth'
    ) {
      return window.location.replace('/auth');
    }
  }
  // return navigate(`/auth`);
};

export const redirectResetPassword = () => navigate('/auth/reset-password');
export const redirectToFlutterwavePaymentLink = paymentUrl =>
  window.open(paymentUrl, '_blank');
export const redirectToPaypalPaymentLink = paymentUrl =>
  window.open(paymentUrl, '_blank');

export const goBack = () => window.history.go(-1);
