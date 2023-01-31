import React from 'react';
import Layout from 'components/common/DashboardLayout';
import { Comingsoon } from 'components/common/comingsoon/comingsoon';
// import { Startrobo } from "components/advisor/startrobo";
import './advisor.scss';

export const Advisor = () => {
  return (
    <Layout>
      <div className="advisor-container">
        <p>Robo advisor</p>
        <div className="advisor-inner-container">
          <Comingsoon
            title="vesti Robo Advisor"
            subtitle="This feature is not available for use at the moment, 
                            we will notify you as soon as it is availaible, 
                            thanks for the patience."
          />
          {/* <Startrobo/> */}
        </div>
      </div>
    </Layout>
  );
};
