import { navigate } from '@reach/router';
import { fetchCountries } from 'appRedux/actions/migration';
import Layout from 'components/common/DashboardLayout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Notifybox from 'components/common/notifybox/notifybox';
// import Skill from "../../../assets/skill.svg"
import './migration.scss';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';

const Advice = () => {
  const countries = useSelector(state => state.countries.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  //  const goTo =()=> {
  //   window.open('https://digitalforall.tech4dev.com/');
  //  }
  return (
    <Layout>
      <div className="grid-container">
        <div className="container-fluid py-4">
          <Titlesubtitle
            title="Advice"
            subtitle="Get numerous tips on different countries across the world."
          />
          <div className="row">
            {countries.map(({ id, country, imageUrl }) => (
              <div key={id} className="col-12 col-sm-6 col-md-4">
                <div className="advice-card p-3">
                  <img
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '0 auto 10px',
                    }}
                    src={imageUrl}
                    alt={country}
                  />
                  <div
                    className="mb-3 advice-card-title"
                    style={{ fontWeight: 500 }}
                  >
                    {country}
                  </div>
                  <div
                    // style={{ fontWeight: 400, fontSize: "1rem", color: '#3C512C' }}
                    className="mb-3 px-3 text-center advice-card-subtitle"
                  >
                    If you’re travelling to {country}, our travel advice and
                    updates give you practical tips and useful information.
                  </div>
                  <a
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: '#000000',
                    }}
                    href="/"
                    onClick={e => {
                      e.preventDefault();
                      navigate(`/advice/${id}`);
                    }}
                  >
                    <span className="mr-2">Learn More</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.219 10.7797C5.28867 10.8495 5.37143 10.9049 5.46255 10.9427C5.55367 10.9805 5.65135 11 5.75 11C5.84865 11 5.94633 10.9805 6.03745 10.9427C6.12857 10.9049 6.21133 10.8495 6.281 10.7797L10.781 6.27966C10.8508 6.20999 10.9063 6.12723 10.9441 6.03611C10.9819 5.94499 11.0013 5.84731 11.0013 5.74866C11.0013 5.65001 10.9819 5.55233 10.9441 5.46121C10.9063 5.37009 10.8508 5.28733 10.781 5.21766L6.281 0.717661C6.14017 0.576831 5.94916 0.497714 5.75 0.497714C5.55083 0.497714 5.35983 0.576831 5.219 0.717661C5.07817 0.858491 4.99905 1.0495 4.99905 1.24866C4.99905 1.44782 5.07817 1.63883 5.219 1.77966L9.1895 5.74866L5.219 9.71766C5.14915 9.78733 5.09374 9.87009 5.05593 9.96121C5.01812 10.0523 4.99866 10.15 4.99866 10.2487C4.99866 10.3473 5.01812 10.445 5.05593 10.5361C5.09374 10.6272 5.14915 10.71 5.219 10.7797Z"
                          fill="#000000"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 5.74854C0 5.94745 0.0458074 6.13821 0.127345 6.27887C0.208883 6.41952 0.319471 6.49854 0.434783 6.49854L9.56522 6.49854C9.68053 6.49854 9.79112 6.41952 9.87265 6.27887C9.95419 6.13821 10 5.94745 10 5.74854C10 5.54962 9.95419 5.35886 9.87265 5.2182C9.79112 5.07755 9.68053 4.99854 9.56522 4.99854L0.434783 4.99854C0.319471 4.99854 0.208883 5.07755 0.127345 5.2182C0.0458074 5.35886 0 5.54962 0 5.74854Z"
                          fill="#000000"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* <Notifybox
                name="Skill"
                image ={Skill}
                title="Introducing Digital Skills"
                subtitle="Get ahead of your peers with digital Skills, Register to learn and win."
                button="Register Now!!"
                click ={goTo}
            /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Advice;
