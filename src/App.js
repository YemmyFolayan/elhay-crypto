/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';

import RouteComponent from './routes/RouteComponent';

import './App.css';
import PageLayout from './containers/PageLayout/PageLayout';
import configureStore from './appRedux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactGA from 'react-ga';

export const store = configureStore();
const queryClient = new QueryClient();
ReactGA.initialize('UA-228693387-1');
function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <RouteComponent />
      </PageLayout>
    </QueryClientProvider>
  );
}

export default App;
