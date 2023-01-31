import React, { useEffect, useState } from 'react';
import { Proofofofund } from './pof';
import Loader from 'components/Loader';
import api from 'appRedux/api';

export const Proofoffund = props => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [countries, setCountries] = useState('');
  const [data, setData] = useState('');

  var getCountries = () => {
    api
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        // console.log(res.data)

        var options = (res.data ?? []).map((item, index) => ({
          label: item.flag + ' ' + item.name.common,
          value: item.name.common,
        }));
        console.log([...options]);
        setCountries([...options]);
        setLoading(false);
      })
      .catch(err => err);
  };
  var checkLoan = () => {
    api
      .get('/pof/interest/check')
      .then(res => {
        setData(res.data.data);
        setStep(2);
      })
      .catch(() => {
        setStep(0);
        // setLoading(false)
      });
  };

  useEffect(() => {
    // setLoading(false)
    // setStep(0)
    props.loanPaid ? setStep(5) : checkLoan();
    getCountries();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Proofofofund
        refetch={props.refetch}
        step={step}
        countries={countries}
        setData={setData}
        data={data}
        closePof={props.closePof}
        userData={props.userData}
      />
    );
  }
};
