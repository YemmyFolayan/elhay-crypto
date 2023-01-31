import React from 'react';
import Layout from 'components/common/DashboardLayout';
import { useLocation } from '@reach/router';
import { Singlepathway } from 'components/pathway/singlepathway';
import { Empty } from 'components/common/empty/empty';
import './actionpathway.scss';
import Back from 'components/common/back/back';
import { useDispatch } from 'react-redux';
import { openLoan } from 'appRedux/actions/domore';
import { pathwayActionFunc, pathwayActionLink } from 'helpers/utils';
export const Actionpathway = ({ id }) => {
  const { state } = useLocation();
  const {
    actions = '',
    pathway = '',
    title = '',
    description = '',
    logo = '',
  } = state || {};
  const dispatch = useDispatch();
  let pathwayActions = [
    {
      id: '182b52f2-59a6-4687-89fc-9bab0a2bec8a',
      title: 'Virtual Call Meeting',
      description: 'Virtual Call/Meeting',
    },
    {
      id: '282b52f2-59a6-4687-89fc-9bab0a2bec82',
      title: 'Make a Payment',
      description: 'Make a Payment',
    },
    {
      id: '124b52f2-59a6-4687-89fc-9bab0a2bec8a',
      title: 'Review documents',
      description: 'Review documents',
    },
    {
      id: '282b52f2-59a6-4687-89fc-9bab0a2bec8a',
      title: 'Upload Documents',
      description: 'Upload Documents',
    },
    {
      id: '182b52f2-69a6-4687-89fc-9bab0a2bec8a',
      title: 'Submit to Government',
      description: 'Submit to Government',
    },
    {
      id: '282b52f2-59a6-1237-89fc-9bab0a2bec8a',
      title: 'Wait Action',
      description: 'Wait Action',
    },
    {
      id: '182b52f2-59a6-4687-89fc-9bab1a2bec8a',
      title: 'Apply for a Visa',
      description: 'Apply for a Visa',
    },
    {
      id: '182b52f2-59a6-4687-12fc-9bab0a2bec8a',
      title: 'Apply to a School',
      description: 'Apply to a School',
    },
  ];

  let number = 1;
  const merchantTypes = [
    {
      name: 'Initial Evaluation',
      value: 'Initial Evaluation',
    },
    {
      name: 'Virtual Call Meeting',
      value: 'Virtual Call Meeting',
    },
    {
      name: 'Proof of fund',
      value: 'proof of fund',
    },
    {
      name: 'Proof of Funds',
      value: 'proof of Funds',
    },
    {
      name: 'WES',
      value: 'WES',
    },
    {
      name: 'SEVIS',
      value: 'SEVIS',
    },
    {
      name: 'WESECA',
      value: 'WESECA',
    },
    {
      name: 'Education pathway',
      value: 'Education pathway',
    },
    {
      name: 'IHS',
      value: 'IHSUk',
    },
    {
      name: 'UK Student Visa',
      value: 'ukstudentvisa',
    },
    {
      name: 'US Visa Payments',
      value: 'USVISADS160',
    },
    {
      name: 'NMC',
      value: 'NMC',
    },
    {
      name: 'TEF',
      value: 'TEF',
    },
    {
      name: 'IELTS',
      value: 'IELTS',
    },
  ];

  return (
    <Layout>
      <div className="action-pathway-container ">
        <Back
          page={`${title} Pathway`}
          // back ={false}
          link={`pathwaydesc/${id}`}
          logo={logo}
          id={id}
        />

        <div className="action-pathway-container top">
          <p className="action-header">Action {title}</p>

          <p>{description}</p>
        </div>

        {actions.length < 1 ? (
          <Empty
            title="No Actions"
            subtitle="No Action(s) for this Pathway Stage, if Actions were available, it will be visible here."
          />
        ) : (
          actions.map(action => {
            let act = pathwayActions.filter(a => a.title === action);
            // eslint-disable-next-line
            const match = merchantTypes.find(item => {
              if (title.includes(item.name)) {
                return true;
              }
            });
            // eslint-disable-next-line
            const matchtwo = merchantTypes.find(item => {
              if (
                description
                  .split(' ')
                  .slice(0, 3)
                  .join(' ')
                  .includes(item.name)
              ) {
                return true;
              }
            });

            var actionFunction = value => {
              var name = match.value || matchtwo.value;
              value.includes('Proof')
                ? dispatch(openLoan())
                : pathwayActionFunc(value, name);
              // pathwayActionFunc(value, name)
              // ['Proof of fund', 'Proof of Fund', 'proof of fund', 'proof of funding'].some(element => (match.name || matchtwo.value).includes(element))
              //   ? dispatch(openLoan()):
              //   navigate(`/merchants?merchant=${match.value || matchtwo.value}`)
              // // (match.name || matchtwo.value).includes('Proof of fund', 'proof of fund', 'proof of funding', 'SEVIS')  ? dispatch(openLoan()): navigate(`/merchants?merchant=${match.value || matchtwo.value}`)
              // pathway === 'US- Alien with Extraordinary Ability (O-1)' && window.open('app.wevesti.com')
            };

            var preamble =
              match || matchtwo
                ? (match.name || matchtwo.value).includes('proof of fund')
                  ? 'Apply for '
                  : 'Pay for '
                : '';
            var linkTitle = `${
              match
                ? preamble + match.name
                : matchtwo
                ? preamble + matchtwo.name
                : ''
            }`;
            return (
              <div key={act[0].id} className="content-stages-bottom">
                {/* {match.name} */}
                {/* <p>make {act[0].title ==='Make a Payment' ? match.value || matchtwo.value :'review'} </p> */}
                <Singlepathway
                  key={act[0].id}
                  number={number++}
                  name={title}
                  pathway={pathway}
                  linkTitle={pathwayActionLink(
                    match || matchtwo
                      ? linkTitle.includes('Proof')
                        ? 'Apply for Proof of Fund'
                        : linkTitle
                      : act[0].title,
                  )}
                  title={
                    match || matchtwo
                      ? linkTitle.includes('Proof')
                        ? 'Apply for Proof of Fund'
                        : linkTitle
                      : act[0].title
                  }
                  description={act[0].description}
                  nolink={
                    match ||
                    matchtwo ||
                    pathway === 'US- Alien with Extraordinary Ability (O-1)'
                      ? false
                      : true
                  }
                  click={value => actionFunction(value)}
                  type="payment"
                />
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
};
