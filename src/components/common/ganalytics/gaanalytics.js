import ReactGA from 'react-ga';

const useAnalyticsEventTracker = (category = 'category') => {
  const eventTracker = (action = 'Onboard Action', label = 'Onboard label') => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
