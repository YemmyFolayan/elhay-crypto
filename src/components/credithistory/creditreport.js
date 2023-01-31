import { Empty } from 'components/common/empty/empty';
import { Report } from 'components/common/report';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Tab } from 'components/tab/tab';
import React, { useState } from 'react';
import cc1 from 'assets/cc1.svg';
import cc2 from 'assets/cc2.png';
import cc3 from 'assets/cc3.png';
import cc4 from 'assets/cc4.png';
import './styles.scss';

export const Creditreport = props => {
  const [active, setActive] = useState('Report');
  var score = 700;
  // eslint-disable-next-line
  var __renderRisk = value => {
    switch (value) {
      case score <= 150 || score <= 399:
        return 'very high';
      case score <= 400 || score <= 599:
        return 'medium';
      case score >= 600 || score <= 700:
        return 'low';
      case score >= 700 || score <= 799:
        return 'very low';
      case score >= 800:
        return ' very very low';
      default:
        return 'error';
    }
  };
  var __renderClass = value => {
    switch (value) {
      case 'HIGH':
        return '--high';
      case 'MEDIUM':
        return '--medium';
      case 'GOOD':
        return '--low';
      default:
        return '--error';
    }
  };

  const openLink = () => {
    window.open('https://novacredit.com/contact');
  };
  return (
    <div className="creditreport">
      <Titlesubtitle
        title="Credit Score"
        subtitle="Credit Score generated using a foreign data score provided by CRC Credit Bureau Limited - Nigeria"
      />

      <Tab
        active={active}
        tabs={['Report', 'Offers']}
        setActive={setActive}
        new={true}
        // click = {(value)=> setActive(value)}
      />
      {active === 'Report' ? (
        <>
          <div className="creditreport__content">
            <div className="creditreport__risk">
              <Report
                class="creditreport__report"
                minValue={100}
                maxValue={1000}
                value={props.data.creditData.scores[0].value}
              />
              <p
                className={__renderClass(
                  props.data.creditData.scores[0].risk_indicator,
                )}
              >
                The risk profile for this applicant is{' '}
                <strong>
                  {' '}
                  {props.data.creditData.scores[0].risk_indicator}{' '}
                </strong>
              </p>
              {/* <Platformbutton type="normal" name="Download Report" click={()=> props.click(true)} /> */}
            </div>

            <div className="creditreport__factors">
              <span className="creditreport__info">
                <p>
                  Credit Metrics <i class="fas fa-info-circle" />{' '}
                </p>

                <p className="creditreport__tooltiptext">
                  As provided by CRC Credit Bureau Limited - Nigeria”
                </p>
              </span>
              <div className="creditreport__list">
                {(props.data.creditData.metrics ?? []).map((item, index) => (
                  <span className="creditreport__factor">
                    <h5 className="creditreport__ftitle">
                      {item.metric_label}
                    </h5>

                    {
                      // eslint-disable-next-line
                      <h6 className="creditreport__fstitle">
                        {item.metric_label ===
                        'Revolving Credit Utilization Ratio'
                          ? (item.metric_value * 100).toFixed(2) === NaN
                            ? 'Nothing to show'
                            : (item.metric_value * 100).toFixed(2) + '%'
                          : item.metric_label.includes('Total')
                          ? '$' + item.metric_value
                          : item.metric_value}
                      </h6>
                    }
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="creditreport__disbox">
            <p className="creditreport__disclosure">
              A copy of your Credit Passport® from Nova Credit is available to
              you upon request. You may reach out to Nova Credit with any
              inquiries, including to get a copy of your report via
              <strong onClick={() => openLink()}>
                {' '}
                novacredit.com/contact.{' '}
              </strong>
              Nova Credit helps U.S. newcomers to use their international credit
              history to apply for credit cards and more.
            </p>
            <p className="creditreport__disclosure">
              This information is a snapshot of your international credit
              history retrieved by Nova Credit Inc. Nova Credit allows U.S.
              newcomers to use their international credit history to apply for
              credit cards and more. This snapshot may not include all
              information retrieved. To access a complete copy, you may visit
              <strong onClick={() => openLink()}>
                {' '}
                novacredit.com/contact{' '}
              </strong>{' '}
              and submit a request.
            </p>
          </div>
        </>
      ) : (
        <Offers score={props.data.creditData.scores[0].value} />
      )}
    </div>
  );
};

const Offers = props => {
  var handleClick = () => {
    window.open(`https://www.novacredit.com/affiliate/vesti/`);
  };
  return props.score < 500 ? (
    <Empty
      title="No Offers"
      subtitle="No offers for you at the moment due to your low credit score, you can check back later."
    />
  ) : (
    <div className="creditreport__offers">
      {[cc1, cc2, cc3, cc4].map((item, index) => (
        <img
          key={index}
          src={item}
          alt="credit cards"
          onClick={() => handleClick()}
        />
      ))}
    </div>
  );

  // <span className="offers__comingsoon">Coming Soon.</span>
};
