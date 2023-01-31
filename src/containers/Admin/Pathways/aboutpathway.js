import React from 'react';
import Layout from 'components/common/DashboardLayout';
import api from 'appRedux/api';
import { useState, useEffect } from 'react';
import './aboutpathway.scss';
import { useLocation } from '@reach/router';
import { Singlepathway } from 'components/pathway/singlepathway';
import { Empty } from 'components/common/empty/empty';
import Loader from 'components/Loader';
import Back from 'components/common/back/back';
import { connect, useDispatch } from 'react-redux';
import { openStagesBox, openDescBox } from 'appRedux/actions/pathway';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Newprompt } from 'components/common/prompt/prompt';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import subs from 'assets/subscription.svg';
import { errorMessage } from 'helpers/utils';
import { useQuery } from 'react-query';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { Success } from 'components/common/success/success';
import { Smallbox } from 'components/common/smallbox/smallbox';
import { parseDate } from 'helpers/hooks';
import ReactTimeAgo from 'react-time-ago';
import { NotifIco } from 'assets/assets';
import { navigate } from '@reach/router';
const Aboutpathway = props => {
  // const [select , setSelect] =useState({
  //     description:true,
  //     stages: false
  // })
  const { state } = useLocation();
  const { logo = '', title = '', creator = '' } = state || {};
  const [loading, setLoading] = useState(true);
  const [myPathway, setMyPathway] = useState({});
  const [subscribe, setSub] = useState({
    value: false,
    step: 0,
  });
  const dispatch = useDispatch();

  const { data: userSub, isSuccess: subFetched } = useQuery(
    'Fetch user Sub',
    async () => {
      const data = (
        await api.get(
          `/pathway/get_subscribed_pathways?pathwayTemplateId=${props.id}`,
        )
      ).data.data;
      // console.log('data gotten is', data)
      console.log(subFetched);
      return data;
    },
  );

  // eslint-disable-next-line
  var startsub = () => {
    userSub.subscriptionStatus
      ? dispatch(openStagesBox())
      : setSub({ ...subscribe, value: true });
  };

  // eslint-disable-next-line
  var openStages = () => {
    userSub.subscriptionStatus
      ? dispatch(openStagesBox())
      : setSub({ ...subscribe, value: true });
  };

  var subscribeToPathway = () => {
    api
      .post(`/pathway/subscribe`, { pathwayTemplateId: props.id })
      .then(res => {
        openNotificationWithIcon(
          res.message,
          'Pathway Subscription',
          'success',
        );
        setSub({ ...subscribe, step: 1 });
      })
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          'Pathway Subscription',
          'error',
        );

        setTimeout(() => {
          setSub({ ...subscribe, value: false });
        }, 1500);
      });
  };

  var closeSub = () => {
    setSub({ step: 0, value: false });
  };
  useEffect(() => {
    // alert(props.id)
    api
      .get(`/fetchSinglePathway/${props.id}`)
      .then(res => {
        setMyPathway(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [props.id]);

  let number = 1;

  // console.log("asdsad" +JSON.stringify(myPathway))
  if (loading) {
    return <Loader />;
  } else if (props.id === ':id') {
    return (
      <Layout>
        <div className="about-pathway-container">
          <div className="aboutpathway-inner">
            <Empty
              title="Pathway does not exist"
              subtitle="The Pathway you are looking for does not exist."
              link={() => navigate('/pathways')}
              name="Back to Pathways"
            />
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Simplemodal
          onClick={() => setSub({ step: 0, value: false })}
          visible={subscribe.value}
        >
          <Subscription
            title={title}
            cost={myPathway.pathwayCost}
            onClick={subscribeToPathway}
            subscribe={subscribe}
            closeSub={closeSub}
          />
        </Simplemodal>

        <div className="about-pathway-container">
          <div className="aboutpathway-inner">
            <Back page="pathways" link="pathways" />
            <p className="pathway-header">{title} Pathway</p>
            <div className="aboutpathway-inner content">
              <div className="content-link">
                <div className="aboutpathway-link">
                  <p
                    className={`${props.desc ? ' active' : ' '}`}
                    onClick={props.openDescBox}
                  >
                    Description
                  </p>
                  <p
                    className={`${props.stages ? ' active' : ' '}`}
                    onClick={props.openStagesBox}
                  >
                    Stages
                  </p>
                </div>
                <div className="hr"></div>
              </div>

              {props.desc && (
                <div
                  className={`content-description ${
                    props.desc ? ' active' : ' '
                  }`}
                >
                  <div className="pathway-img-box">
                    <img src={logo} alt="content" />
                  </div>

                  <p className="created-by">
                    By <strong>{creator}</strong>{' '}
                  </p>
                  <div className="content-description bottom">
                    <p className="bottom-title">{title}</p>
                    <p className="bottom-content">
                      {myPathway.pathwayDescription}
                    </p>
                    {userSub
                      ? userSub.paymentStatus && (
                          <Smallbox>
                            <img src={NotifIco} alt="Notification" />
                            <p>
                              You are on a <strong> trial period </strong> this
                              will end in{' '}
                              <strong>
                                {' '}
                                <ReactTimeAgo
                                  date={Date.parse(
                                    parseDate(
                                      userSub.expirationDate,
                                      'yyyy/mm/dd',
                                    ),
                                  )}
                                  locale="twitter"
                                />
                              </strong>{' '}
                              time,
                              <br /> and you will be debited after that.
                            </p>
                          </Smallbox>
                        )
                      : ''}
                    <div className="pathway-btn py-2">
                      {
                        <span
                          style={{ cursor: 'pointer' }}
                          // onClick={() => startsub()}
                          onClick={props.openStagesBox}
                        >
                          Claim 30 days Free Trial
                          {/* Pay  {myPathway.pathwayCost} Now */}
                          {/* {userSub.paymentStatus === 'TRIAL' || userSub.paymentStatus === "ACTIVE" ? 'See Stages': 'Use Pathway 30 days Free Trial'} */}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              )}

              {props.stages && (
                <div className="content-stages-bottom">
                  {myPathway.pathways.length < 1 ? (
                    <Empty
                      title="No Stages"
                      subtitle="No Stages for this Pathway, if stages were available, it will be visible here."
                    />
                  ) : (
                    <>
                      {userSub
                        ? userSub.paymentStatus && (
                            <Smallbox>
                              <img src={NotifIco} alt="Notification" />
                              <p>
                                You are on a <strong> trial period </strong>{' '}
                                this will end in{' '}
                                <strong>
                                  {' '}
                                  <ReactTimeAgo
                                    date={Date.parse(
                                      parseDate(
                                        userSub.expirationDate,
                                        'yyyy/mm/dd',
                                      ),
                                    )}
                                    locale="twitter"
                                  />
                                </strong>{' '}
                                time,
                                <br /> and you will be debited after that.
                              </p>
                            </Smallbox>
                          )
                        : ''}

                      {myPathway.pathways.map(
                        ({ title: stageTitle, description, action }) => {
                          return (
                            <Singlepathway
                              pathway={title}
                              key={props.id}
                              id={props.id}
                              number={number++}
                              title={stageTitle}
                              description={description}
                              actions={action}
                              logo={logo}
                            />
                          );
                        },
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

const mapStateToProps = ({ pathway }) => {
  const { desc, stages } = pathway;
  return {
    desc,
    stages,
  };
};

const Subscription = props => {
  const [check, setCheck] = useState(false);

  switch (props.subscribe.step) {
    case 0:
      return (
        <Newprompt img={subs}>
          <Titlesubtitle
            title="Claim your 30days subscription"
            subtitle={`You are about to subscribe for this ${props.title}, it is free for thirty days after that, you will be debited $${props.cost} from your NetWebPay wallet, click this check to accept our terms and condition`}
          />

          <div className="pathwaysubscription">
            <label class="form-control">
              <input
                type="checkbox"
                name="checkbox"
                onChange={() => setCheck(!check)}
                checked={check}
              />
              I agree to vesti’s terms & conditions.
            </label>
            <button
              className="pathwaysubscription__button"
              onClick={() => props.onClick()}
            >
              Yes, I Want to Subscribe
            </button>
          </div>
        </Newprompt>
      );
    case 1:
      return (
        <Success
          title="Subscription Successful"
          subtitle="You just claimed your fee trial subscription for this pathway."
          button="Okay, Thank You."
          onClick={() => props.closeSub()}
        />
      );
    default:
      return <>Nothing to see OG </>;
  }
};
export default connect(mapStateToProps, { openDescBox, openStagesBox })(
  Aboutpathway,
);
