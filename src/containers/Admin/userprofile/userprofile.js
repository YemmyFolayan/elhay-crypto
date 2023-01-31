import React, { useState, useEffect } from 'react';
import Layout from 'components/common/DashboardLayout';
import { Profileside } from 'components/profile/profileside';
import Accountdetails from 'components/profile/accountdetails';

import Security from 'components/profile/security';
// import { Kycupload } from "components/profile/kycupload";

import { useUserData } from 'helpers/hooks';
import { fetchUserData } from 'appRedux/actions/profile';
import { Addbank } from 'components/profile/addbank';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import api from 'appRedux/api';
import Loader from 'components/Loader';
import './userprofile.scss';
// import { vestirate } from "components/common/vestirate/vestirate";
// import Kyc from "../../../components/profile/Kyc";
import Kycustomer from 'components/profile/kycustomer';
// import { Kycupload } from "components/profile/kycupload";

export const Userprofile = () => {
  const { userData, refetch } = useUserData();
  const [step, setStep] = useState(0);

  const [countries, setCountries] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true);
  var getCountries = () => {
    api
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        // console.log(res.data)

        var options = (res.data ?? []).map((item, index) => ({
          label: item.flag + ' ' + item.name.common,
          value: item.name.common,
          alt: item.cca2,
        }));
        console.log([...options]);
        setCountries([...options]);
        setLoading(false);
      })
      .catch(err => err);
  };
  var getStates = () => {
    api
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: 'nigeria',
      })
      .then(response => {
        var options = (response.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        setState(options);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const { search } = useLocation();
  const values = queryString.parse(search);
  var tab = values.tab;

  useEffect(() => {
    fetchUserData();
    getCountries();
    getStates();
    if (tab === 'kyc') {
      refetch();
      setTimeout(() => {
        setStep(3);
      }, 200);
    } else if (tab === 'addbank') {
      refetch();
      setStep(2);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className=" userprofile-container">
          <div className="userprofile-inner-container">
            <div className="userprofile-left">
              <Profileside value={tab} setStep={setStep} />
            </div>

            <div className="userprofile-right">
              <Right
                userdata={userData}
                refetch={refetch}
                step={step}
                countries={countries}
                state={state}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const Right = props => {
  switch (props.step) {
    case 0:
      return (
        <Accountdetails userdata={props.userdata} countries={props.countries} />
      );
    case 1:
      return <Security userdata={props.userdata} />;

    case 2:
      return <Addbank />;
    case 3:
      return (
        <Kycustomer
          state={props.state}
          refetch={props.refetch}
          userdata={props.userdata}
          verifiedKyc={props.userdata.verifiedKyc}
        />
      );
    // return <Kycupload
    //         state={props.state}
    //     refetch={props.refetch}
    //     userdata={props.userdata}
    //     verifiedKyc={props.userdata.verifiedKyc}
    // />
    case 4:
      // return<> <vestirate title="PLATFORM RATE" rate="630"  card="true" /> <span className="mb-2 mt-4"></span> <vestirate title="CARD/WIRE SERVICE RATE"/> </>
      break;
    default:
      return <>Not Found</>;
  }
};
