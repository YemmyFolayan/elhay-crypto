import {
  FETCH_DASHBOARD_STATS_START,
  FETCH_DASHBOARD_STATS_SUCCESS,
  FETCH_DASHBOARD_STATS_FAILURE,
  FETCH_DASHBOARD_TRANSACTION_START,
  FETCH_DASHBOARD_TRANSACTION_SUCCESS,
  FETCH_DASHBOARD_TRANSACTION_FAILURE,
} from './actions/actionTypes';

const initialState = {
  loading: false,
  transactionLoading: false,
  statsData: {
    totalSoldTokens: 0,
    totalSoldTokensValue: 0,
    totalValidatedTokens: 0,
    totalValidatedTokensValue: 0,
  },
  transactionData: [],
  error: null,
};

function DashboardReducer(state = initialState, actions) {
  switch (actions.type) {
    case FETCH_DASHBOARD_STATS_START:
      return { ...state, ...actions.payload };
    case FETCH_DASHBOARD_STATS_SUCCESS:
      const statsData = actions.payload ? actions.payload : state.statsData;
      return { ...state, loading: false, statsData };
    case FETCH_DASHBOARD_STATS_FAILURE:
      const error = actions.payload ? actions.payload : state.error;
      return { ...state, loading: false, error };
    case FETCH_DASHBOARD_TRANSACTION_START:
      return { ...state, ...actions.payload };
    case FETCH_DASHBOARD_TRANSACTION_SUCCESS:
      const transactionData = actions.payload
        ? actions.payload
        : state.transactionData;
      return { ...state, transactionLoading: false, transactionData };
    default:
      return state;
  }
}

export default DashboardReducer;
