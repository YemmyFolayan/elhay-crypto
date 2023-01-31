import React, { useEffect, useState } from 'react';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Navbar } from '../../components/website/Navbar';
import HomePageFooter from 'components/website/HomePageFooter';
import api from 'appRedux/api';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Platformbutton } from 'components/common/button/button';
import { Success } from 'components/common/success/success';
import { navigate } from '@reach/router';
import axios from 'axios';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import './homepage.scss';
import Loader from 'components/Loader';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const config = {
  cors: 'https://cors-anywhere.herokuapp.com/', // <optional> doesn't display the cors error
  formUrl:
    'https://docs.google.com/forms/d/1tsr9NtKzLf4Gh2jCdvinmTs-mQG4lc8ydW4t2FbZ07s/formResponse',
};

export const Countrylaunch = () => {
  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    email: '',
    country: '',
  });
  var getCountries = () => {
    api
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        var options = (
          res.data.filter(item => item.region === 'Africa') ?? []
        ).map((item, index) => ({
          label: item.flag + ' ' + item.name.common,
          value: item.name.common,
        }));
        setCountries([...options]);
        setLoading(false);
      })
      .catch(err => err);
  };
  const { search } = useLocation();
  const values = queryString.parse(search);
  var country = values.country;
  var submit = async e => {
    e.preventDefault();
    const formData = new FormData();

    for (var key in state) {
      const value = Array.isArray(state[key])
        ? JSON.stringify(state[key])
        : state[key];
      key === 'email'
        ? formData.append(`entry.2124489599`, value)
        : formData.append(`entry.404672547`, value.value);
    }
    console.log(formData);
    await axios({
      url: `${config.formUrl}`,
      method: 'post',
      data: formData,
      responseType: 'json',
    })
      .then(res => {
        openNotificationWithIcon('Survey', 'vesti Fees Survey', 'success');
      })
      .catch(error => {
        openNotificationWithIcon(
          'Waitlist',
          `You’ll be one of the first to know when we launch in ${state.country.value}`,
          'success',
        );
        setStep(1);
      });
  };

  var __renderCountry = value => {
    switch (value) {
      case 'GH':
        return 'Ghana';
      case 'NG':
        return 'Nigeria';
      case 'ZM':
        return 'Zambia';
      default:
        return 'your Country';
    }
  };
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <>
      <Navbar home="active" />
      <section className="launch">
        <div className="launch__inner">
          <span className="launch__header">
            <h2>
              Find out as soon as vesti launches in {__renderCountry(country)}
            </h2>
            <p>
              We're expanding all over Africa - enter your details below to find
              out as soon as we're live in your country! You'll also be added to
              our email list and receive occasional updates and product
              announcements from vesti.
            </p>
          </span>
          <div className="launch__form">
            {loading ? (
              <Loader />
            ) : (
              <Launchform
                setState={setState}
                state={state}
                countries={countries}
                submit={submit}
                step={step}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </section>
      <HomePageFooter />
    </>
  );
};

const Launchform = props => {
  switch (props.step) {
    case 0:
      return (
        <form onSubmit={e => props.submit(e)}>
          <Inputfloat
            label="EMAIL ADDRESS"
            type="text"
            name="email"
            value={props.state.email}
            placeholder="Email address"
            onChange={e =>
              props.setState({ ...props.state, email: e.target.value })
            }
          />
          <>
            <Singleselect
              placeholder="Select Country"
              value={props.state.country}
              options={props.countries}
              onChange={value =>
                props.setState({ ...props.state, country: value })
              }
            />
          </>
          <Platformbutton
            type="submit"
            name="Notify Me"
            disabled={props.state.email && props.state.country ? false : true}
          />
        </form>
      );
    case 1:
      return (
        <Success
          title="Successful"
          subtitle={`Thank you! You’ll be one of the first to know when we launch in ${props.state.country.value}`}
          onClick={() => {
            props.setState({ email: '', country: '' });
            navigate('/');
          }}
        />
      );
    default:
      return <></>;
  }
};
