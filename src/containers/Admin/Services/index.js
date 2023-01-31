import React, { useState } from 'react';
import '../Admin.css';
import Layout from 'components/common/DashboardLayout';
import { Link } from '@reach/router';
import Modal from 'components/common/Modal';
import PinNote from 'assets/pin_note.svg';
import api from 'appRedux/api';
import { useQuery } from 'react-query';
import Loader from 'components/Loader';
import { getCurrency } from 'helpers/utils';
import { Empty } from 'components/common/empty/empty';
export const ServicesCard = ({ description, amount, about }) => (
  <div className="col-12 col-sm-6 col-md-4 mb-3">
    <div className="p-4 dashboard-card">
      <div className="d-flex align-items-center">
        <span
          className="d-inline-block mr-3"
          style={{
            height: '50px',
            width: '50px',
            borderRadius: '50vw',
            backgroundColor: '#000000',
          }}
        ></span>
        <div
          className="text-uppercase font-light"
          style={{ fontSize: '1rem', fontWeight: 300, maxWidth: '150px' }}
        >
          {description}
        </div>
      </div>
      <div style={{ fontWeight: 600, fontSize: '4rem' }}>{amount}</div>
      <div>
        <Link
          style={{ color: '#000000' }}
          className="bg-transparent px-0 text-left"
          to="/dashboard"
        >
          See My {about}
          <span className="ml-2 d-inline-flex align-items-center">
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
        </Link>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ image, amount, service, description, currency }) => (
  <div
    style={{ boxShadow: 'rgb(245 245 245) 0 0 2px 2px' }}
    className="card border-0"
  >
    <div className="card-body p-2">
      <div className="rounded bg-dark mb-3" style={{ height: '120px' }}>
        <img
          src={image}
          alt="service logo"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="px-2">
        <div className="mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
          {service}
        </div>
        <p className="mb-3" style={{ fontWeight: 300 }}>
          {description}
        </p>
        <div className="d-flex justify-content-between">
          <div>
            <span style={{ fontWeight: 600, fontSize: 18 }}>
              {getCurrency(currency)}
              {amount}
            </span>
          </div>
          <div>0 reviews</div>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: d_list, isSuccess, isLoading } = useQuery('services', () =>
    api
      .get('/provider/fetchEachProviderServices')
      .then(data => data.data.data)
      .catch(err => err),
  );
  const data = d_list ?? [];

  return (
    <Layout>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)} maxWidth="480px">
        <div className="d-flex justify-content-center">
          <img
            src={PinNote}
            alt=""
            style={{ maxWidth: '200px', width: '80%' }}
            className="pb-5 pt-4"
          />
        </div>
        <div className="px-4">
          <div
            style={{ fontSize: '24px', fontWeight: 500, marginBottom: '1rem' }}
          >
            Create Service
          </div>
          <p className="mb-4" style={{ fontWeight: 300 }}>
            The service you create is subject to review and approval from the
            vesti team, do not worry, it won’t take long to review and approve
            your service, contact us at info@wevesti.com for more information.
          </p>
          <Link className="default-btn w-100" to="/create-service">
            Proceed
          </Link>
        </div>
      </Modal>
      <div>
        <div
          className=" isw-container"
          style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
        >
          <div className=" flex_page_container d-flex justify-content-center">
            <div className=" px-3 px-md-4 px-lg-5 w-100">
              <section className="dashboard mb-4">
                <div className="section-heading mb-3">Create A Service</div>
                <div>
                  <span
                    onClick={() => setOpen(true)}
                    className="d-inline-flex text-white align-items-center justify-content-center"
                    style={{
                      background: '#000000',
                      borderRadius: '10px',
                      height: '100px',
                      width: '150px',
                      cursor: 'pointer',
                      fontSize: '3rem',
                    }}
                  >
                    <span className="pb-2">+</span>
                  </span>
                </div>
              </section>
              <section className="services">
                <div className="section-heading mb-3">My Services</div>
                <div className="services-grid">
                  {isLoading && <Loader />}
                  {isSuccess && (
                    <>
                      {data.length > 0 ? (
                        data.map(
                          ({
                            id,
                            image,
                            amount,
                            service,
                            description,
                            currency,
                          }) => (
                            <ServiceCard
                              key={id}
                              {...{
                                image,
                                amount,
                                service,
                                description,
                                currency,
                              }}
                            />
                          ),
                        )
                      ) : (
                        <Empty
                          title="No Services to show"
                          subtitle="You are yet to create a service, once you do, it will appear here, click the green button above to create a service."
                        />
                      )}
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
