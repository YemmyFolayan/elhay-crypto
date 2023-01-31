import React from 'react';
import { Router } from '@reach/router';

import Routes from './index';
import AppComponent from './AppComponent';
import NotFound from '../components/common/NotFound';

function RouteComponent() {
  const RouteList = Routes.map((route, index) => {
    let routeComponent = null;
    if (typeof route.children !== 'undefined') {
      const childrens = route.children;
      const childrenComponent = childrens.map((route, index) => (
        <AppComponent
          key={index}
          path={route.path}
          auth={route.auth}
          component={route.component}
        />
      ));

      routeComponent = (
        <AppComponent
          path={route.path}
          key={index}
          auth={route.auth}
          component={route.component}
        >
          {childrenComponent}
        </AppComponent>
      );
    } else {
      routeComponent = (
        <AppComponent
          key={index}
          path={route.path}
          auth={route.auth}
          component={route.component}
        />
      );
    }
    return routeComponent;
  });

  return (
    <>
      <Router>
        {RouteList}

        <NotFound default />
      </Router>
    </>
  );
}

export default RouteComponent;
