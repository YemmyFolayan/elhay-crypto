import Layout from 'components/common/DashboardLayout';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { Link } from '@reach/router';
import { Empty } from 'components/common/empty/empty';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { Membercard } from 'components/member/membercard';
import epreview from '../../../assets/ebookpreview.png';
import {
  // Campaign,
  Exclusive,
  Platinum,
  ArrowDown,
  Standard,
  Selfcare,
  Hand,
  Uploadicon,
  // Padlock,
  // Japaimg,
} from '../../../assets/assets';
import api from 'appRedux/api';
import { objectValuesStringify } from 'helpers/utils';
import Loader from 'components/Loader';
import Modal from 'components/common/Modal';
import { Modal as Emodal } from 'antd';
import { Form, Input, Upload } from 'antd';
import { useUserData } from 'helpers/hooks';
import Webinarcard from 'components/webinar/webinarcard';
import { webinars, paidwebinars, upcomingwebinars } from './constants';
import '.././Admin.css';
import { Singleebook } from 'components/common/pdf/singleebook';
import { openUpgradeBox } from 'appRedux/actions/update';
import { useDispatch } from 'react-redux';
import { Openpdf } from 'components/common/pdf/openpdf';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
// import { Membership } from 'components/membership/membership';
import { navigate } from '@reach/router';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
const SubscriptionPlan = ({ plan, frequency, showModal, setShowModal }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCompleteTransaction = async values => {
    console.log('form Data', formData);
    values.walletToCharge = 'NGN_KOBO';
    values.frequency = frequency;
    values.plan = plan;

    console.log(values);
    setFormData(values);
    const datas = { ...formData, ...values };
    console.log('form datas', datas);
    const url = `/userPlan/startSubscription`;
    setLoading(true);

    try {
      const res = await api.post(url, values);
      console.log({ ...res });
      const { data } = res;
      openNotificationWithIcon(data.message, 'Subscription Payment', 'success');
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      if (error?.data?.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error?.data?.errors),
          'Subscription Payment',
          'error',
        );
      } else {
        const err = error?.data?.message || error.message;
        openNotificationWithIcon(err, 'Subscription Payment', 'error');
      }

      setLoading(false);
    }
  };

  return (
    <div className="">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="d-flex flex-column text-center  justify-content-center">
          <h4>Enter Transaction Pin</h4>
          <Form onFinish={handleCompleteTransaction}>
            <div className="w-100 flex-fill pt-4">
              <Form.Item
                className="mb-4 w-50 mx-auto"
                name="transactionPin"
                rules={[
                  {
                    required: true,
                    message: 'Please input your transaction pin!',
                  },
                ]}
              >
                <Input
                  className=""
                  type="password"
                  style={{
                    padding: '20px',
                    background: '#F8FBF7',
                    borderRadius: '20px',
                    textAlign: 'center',
                    letterSpacing: '16px',

                    border: 'none',
                  }}
                />
              </Form.Item>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="d-flex flex-wrap justify-content-around mt-5">
                <button
                  type="submit"
                  style={{
                    background: '#E4AD50',
                    color: '#ffffff',
                    marginBottom: '10px',
                  }}
                >
                  Continue
                </button>
                <button
                  type="button"
                  style={{
                    marginBottom: '10px',
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    primary: '#000000 !important',
  },
  card: {
    maxWidth: 345,
  },
  membershipCard: {
    maxWidth: 200,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  indicator: {
    backgroundColor: '#000000',
  },
}));

// const theme = createMuiTheme({
//   overrides: {
//     MuiTabs: {
//       indicator: {
//         backgroundColor: orange[700]
//       }
//     },
//     MuiTab: {
//       root: {
//         "&:hover": {
//           backgroundColor: pink[100],
//           color: pink[700]
//         }
//       },
//       selected: {
//         backgroundColor: orange[100],
//         color: orange[700],
//         "&:hover": {
//           backgroundColor: green[100],
//           color: green[700]
//         }
//       }
//     }
//   }
// });

//   render() {
//     if (this.state.isActive) {
//       return (
//         <div>
//           <h1>Hello react</h1>
//           <button onClick={this.handleHide}>Hide</button>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <button onClick={this.handleShow}>Show</button>
//         </div>
//       );
//     }
//   }
// }

function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openbook, setBook] = useState(false);

  const closePdf = () => {
    setBook(false);
  };

  const openPdf = () => {
    setBook(true);
  };

  const { userData } = useUserData();

  const planType = userData.planType;
  const { search } = useLocation();
  const values = queryString.parse(search);
  var tab = values.tab;
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (tab) {
      navigate('/webinar');
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (tab === 'documents') {
      setValue(1);
    } else {
      setValue(0);
    }
    // eslint-disable-next-line
  }, []);
  if (planType === 'EXCLUSIVE_USER' || planType === 'PLATINUM_USER') {
    // console.log('planType', planType);

    ///EXCLUSIVE USER AND PREMIUM USER CONTENTS

    return (
      <Layout>
        <div className="grid-container">
          <div className={classes.root}>
            <Emodal
              cancelButtonProps={{ style: { display: 'none' } }}
              visible={openbook}
              isOpen={openbook}
              onCancel={closePdf}
              destroyOnClose
              footer=""
              className="new-modal"
              centered={true}
              okButtonProps={{ style: { display: 'none' } }}
              maskStyle={{
                background: 'rgba(103, 169, 72, 0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Openpdf />
            </Emodal>

            <AppBar position="static" color="#FFF">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Member Area"
                inkBarStyle={{ background: '#000000' }}
              >
                <Tab label="My Memberships" {...a11yProps(0)} />
                <Tab label="Webinar" {...a11yProps(1)} />
                <Tab label="Documents" {...a11yProps(2)} />
                {/* <Tab label="Crowdfunding/SendMe Abroad" {...a11yProps(2)} /> */}

                {/* <Tab label="Products" {...a11yProps(4)} /> */}
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={1}>
              {/* <p>
      Show : <span className="member-card__title">Upcoming</span> 
      </p> */}

              <p className="member__title">
                Show : <span className="member-webinar__title"> Upcoming</span>{' '}
                <img src={ArrowDown} width="37" height="40" alt="campaign" />
              </p>

              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  {upcomingwebinars.length > 0 ? (
                    upcomingwebinars.map(webinar => {
                      return (
                        <Webinarcard
                          key={webinar.id}
                          link={webinar.link}
                          title={webinar.title}
                          featuring={webinar.featuring}
                          date={webinar.date}
                          subtitle={webinar.subtitle}
                          type={webinar.type}
                        />
                      );
                    })
                  ) : (
                    <Empty
                      title="No Upcoming Webinar"
                      subtitle="No Upcoming Webinar to show at the moment, once there is, it will always appear here."
                    />
                  )}
                </div>
              </div>

              <p></p>

              {/* <p className="member__title">Webinar Replays</p> */}
              <Titlesubtitle
                title="Webinar Replays"
                subtitle="Catch up on previous webinars you missed."
              />
              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  {webinars.map(webinar => {
                    return (
                      <Webinarcard
                        key={webinar.id}
                        link={webinar.link}
                        title={webinar.title}
                        featuring={webinar.featuring}
                        date={webinar.date}
                        subtitle={webinar.subtitle}
                        type={webinar.type}
                      />
                    );
                  })}
                </div>
              </div>

              <div
                className="more"
                // style={{
                //   background: '#FCFFFA',
                //   border: '0.5px solid #000000',
                //   borderRadius: '5px',
                //   width: '170px',
                //   justifySelf: 'center',
                // }}
              >
                <div className="mb-3">
                  <button
                    style={{ color: '#000000' }}
                    //onClick={onClick}
                    className="text-left see-more-events-btn"
                  >
                    See More Events
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
                  </button>
                </div>
              </div>

              {/* <p className="member__title">Paid Webinars</p> */}
              <div className="mt-4"></div>
              <Titlesubtitle
                title="Paid Webinars"
                subtitle="Only available to First Class and Second Class vesti users."
              />
              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  {paidwebinars.map(webinar => {
                    return (
                      <Webinarcard
                        key={webinar.id}
                        link={webinar.link}
                        title={webinar.title}
                        featuring={webinar.featuring}
                        date={webinar.date}
                        subtitle={webinar.subtitle}
                        user="premium"
                        // type={webinar.type}
                      />
                    );
                  })}
                </div>
              </div>

              <div
                className="more"
                // style={{
                //   background: '#FCFFFA',
                //   border: '0.5px solid #000000',
                //   borderRadius: '5px',
                //   width: '170px',
                //   justifySelf: 'center',
                // }}
              >
                <div className="mb-3">
                  <button
                    style={{ color: '#000000' }}
                    //onClick={onClick}
                    className="text-left see-more-events-btn"
                  >
                    See More Events
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
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="mt-4"></div>
              <Titlesubtitle
                title="vesti eBooks"
                subtitle="Selected immigration eBooks."
              />
              <Singleebook
                title="The Relocation Playbook vol 1"
                author="Olusola Amusan"
                click={openPdf}
                image={epreview}
              />
            </TabPanel>

            <TabPanel value={value} index={0}>
              <Titlesubtitle
                title="My Memberships"
                subtitle="Select a NetWebPay Immigration plan that is convenient for you."
              />

              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  <Membercard
                    image={Standard}
                    link="/member/standard"
                    name="ECONOMY"
                    subtitle="Ready To Move"
                    planType={planType === 'BASIC_USER' ? true : ''}
                  />

                  <Membercard
                    image={Exclusive}
                    link="/member/exclusive"
                    name="BUSINESS"
                    subtitle="Serious Mover"
                    planType={planType === 'EXCLUSIVE_USER' ? true : ''}
                  />

                  <Membercard
                    image={Platinum}
                    link="/member/platinum"
                    name="FIRST CLASS"
                    subtitle="Quick Mover"
                    planType={planType === 'PLATINUM_USER' ? true : ''}
                  />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </Layout>
    );
  } else {
    // STANDARD OR NORMAL USER CONTENTS

    // console.log('standard User');

    return (
      <Layout>
        <div className="grid-container">
          <div className={classes.root}>
            {/* <Emodal
              cancelButtonProps={{ style: { display: 'none' } }}
              visible={upgrade}
              // isOpen={upgrade}
              onCancel={closeUpgrade}
              destroyOnClose
              footer=""
              className="new-modal"
              centered={true}
              okButtonProps={{ style: { display: 'none' } }}
              maskStyle={{
                background: 'rgba(103, 169, 72, 0.2)',
                backdropFilter: 'blur(4px)',
              }}
              
            >
              <Membership/>
            
            </Emodal> */}

            <AppBar position="static" color="#FFFFFF">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Member Area"
                inkBarStyle={{ background: '#000000' }}
              >
                <Tab label="My Memberships" {...a11yProps(0)} />
                <Tab label="Webinar" {...a11yProps(1)} />
                <Tab label="Documents" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={1}>
              {/* <p>
      Show : <span className="member-card__title">Upcoming</span> 
      </p> */}
              <div className="mt-4"></div>
              <p className="member__title">
                Show : <span className="member-webinar__title"> Upcoming </span>{' '}
                <img src={ArrowDown} width="37" height="40" alt="campaign" />
              </p>
              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  {upcomingwebinars.length > 0 ? (
                    upcomingwebinars.map(webinar => {
                      return (
                        <Webinarcard
                          key={webinar.id}
                          link={webinar.link}
                          title={webinar.title}
                          featuring={webinar.featuring}
                          date={webinar.date}
                          subtitle={webinar.subtitle}
                          type={webinar.type}
                          user="standard"
                        />
                      );
                    })
                  ) : (
                    <Empty
                      title="No Upcoming Webinar"
                      subtitle="No Upcoming Webinar to show at the moment, once there is, it will always appear here."
                    />
                  )}
                </div>
              </div>

              <p></p>

              {/* <p className="member__title">Webinar Replays</p> */}
              <Titlesubtitle
                title="Webinar Replays"
                subtitle="Catch up on previous webinars you missed."
              />
              <div className="flex_page_container">
                <div className="row mt-4">
                  {webinars.map(webinar => {
                    return (
                      <Webinarcard
                        key={webinar.id}
                        link={webinar.link}
                        title={webinar.title}
                        featuring={webinar.featuring}
                        date={webinar.date}
                        subtitle={webinar.subtitle}
                        type={webinar.type}
                      />
                    );
                  })}
                </div>
              </div>

              <div
                className="more"
                // style={{
                //   background: '#FCFFFA',
                //   border: '0.5px solid #000000',
                //   borderRadius: '5px',
                //   width: '170px',
                //   justifySelf: 'center',
                // }}
              >
                <div className="mb-3">
                  <button
                    style={{ color: '#000000' }}
                    //onClick={onClick}
                    className=" text-left see-more-events-btn"
                  >
                    See More Events
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
                  </button>
                </div>
              </div>

              {/* <p className="member__title">Paid Webinars</p> */}

              <Titlesubtitle
                title="Paid Webinars"
                subtitle="Only available to First Class and Second Class vesti users."
              />
              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  {paidwebinars.map(webinar => {
                    return (
                      <Webinarcard
                        key={webinar.id}
                        // link={webinar.link}
                        image={webinar.image}
                        title={webinar.title}
                        featuring={webinar.featuring}
                        date={webinar.date}
                        subtitle={webinar.subtitle}
                        type={webinar.type}
                        user="standard"
                      />
                    );
                  })}
                </div>
              </div>

              <div
                className="more"
                // style={{
                //   background: '#FCFFFA',
                //   border: '0.5px solid #000000',
                //   borderRadius: '5px',
                //   width: '170px',
                //   justifySelf: 'center',
                // }}
              >
                <div className="mb-3">
                  <button
                    style={{ color: '#000000' }}
                    //onClick={onClick}
                    className=" text-left see-more-events-btn"
                  >
                    See More Events
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
                  </button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="mt-4"></div>
              <Titlesubtitle
                title="vesti eBooks"
                subtitle="Selected immigration eBooks."
              />

              <Singleebook
                title="The Relocation Playbook vol 1"
                author="Olusola Amusan"
                click={() => dispatch(openUpgradeBox())}
                image={epreview}
              />
            </TabPanel>

            <TabPanel value={value} index={0}>
              <div className="mt-4"></div>
              <Titlesubtitle
                title="My Memberships"
                subtitle="Select a NetWebPay Immigration plan that is convenient for you."
              />

              <div className="flex_page_container pt-4">
                <div className="row mt-4">
                  <Membercard
                    image={Standard}
                    link="/member/standard"
                    name="ECONOMY"
                    subtitle="Ready To Move"
                    planType={planType === 'BASIC_USER' ? true : ''}
                  />

                  <Membercard
                    image={Exclusive}
                    link="/member/exclusive"
                    name="BUSINESS"
                    subtitle="Serious Mover"
                    planType={planType === 'EXCLUSIVE_USER' ? true : ''}
                  />

                  <Membercard
                    image={Platinum}
                    link="/member/platinum"
                    name="FIRST CLASS"
                    subtitle="Quick Mover"
                    planType={planType === 'PLATINUM_USER' ? true : ''}
                  />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </Layout>
    );
  }
}

function MemberStandard() {
  const classes = useStyles();

  return (
    <Layout>
      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">My Memberships • Standard</p>
          <p className="member-card__title ml-4">
            {' '}
            Select a NetWebPay Immigration plan that is convenient for you.
          </p>

          <div className="flex_page_container pt-4">
            <div className="row mt-4">
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="p-4 textleft mb-3">
                  <div className="d-flex flex-column justify-content-center align-items-between">
                    <Card className={classes.card}>
                      <CardContent>
                        <div className="text-center plan-card">
                          <div className="circleLeft"></div>
                          <div className="circleRight"></div>
                          <p></p>
                          <p className="date__title">BASIC PLAN</p>

                          <p className="merchant-card__title margin30">
                            <sup>₦</sup> FREE{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Free Immigration Account (no monthly charges)
                          </p>
                          <p className="plan-card__title margin30">
                            Free Feed on Advice
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Join Free Groups
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Access to Free Webinars{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Access to some Webinar Replay{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Email Support (normal priority){' '}
                          </p>

                          <p className="marginPP">
                            <a
                              href="/"
                              onClick={e => {
                                e.preventDefault();
                              }}
                              className="default-btn"
                            >
                              You're already on this Plan
                            </a>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="margin30">
                      <a href="/webinar" className="backBtn margin30">
                        Back
                      </a>

                      <a href="/member/exclusive" className="default-btn">
                        Next
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MemberExclusive() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [subscription, setSubscription] = useState({
    plan: null,
    frequency: null,
  });

  const { userData } = useUserData();

  const planType = userData.planType;

  // eslint-disable-next-line
  let buttonMessage;
  if (planType === 'EXCLUSIVE_USER') {
    buttonMessage = "You're Already on this Plan";
  } else {
    buttonMessage = 'Choose This Plan';
  }

  return (
    <Layout>
      <SubscriptionPlan
        {...subscription}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">My Memberships • Exclusive</p>
          <p className="member-card__title ml-4">
            {' '}
            Select a NetWebPay Immigration plan that is convenient for you.
          </p>

          <div className="flex_page_container pt-4">
            <div className="row mt-4">
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="p-4 textleft mb-3">
                  <div className="d-flex flex-column justify-content-center align-items-between">
                    <Card className={classes.card}>
                      <CardContent>
                        <div className="text-center plan-card">
                          <div className="circleLeft"></div>
                          <div className="circleRight"></div>
                          <p></p>
                          <p className="date__title">SECOND CLASS PLAN</p>

                          <p className="merchant-card__title margin30">
                            <sup>₦</sup>
                            <strike> 50,000</strike> 40,000
                          </p>
                          <p className="margin30">YEARLY (Save 20,000) </p>

                          <p className="plan-card__title margin30">
                            {' '}
                            Free 30 Minutes Expert Immigration planning Session
                          </p>
                          <p className="plan-card__title margin30">
                            One year access to an Exclusive support network
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            All year access to ask unlimited questions in
                            “Advice”
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Access to All Webinar Replays
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Free access to Relocation playbook{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Priority Email Support{' '}
                          </p>

                          {/* <p className="marginPP">
                            <button
                              onClick={() => {
                                setSubscription({
                                  plan: 'EXCLUSIVE_USER',
                                  frequency: 'YEARLY',
                                });
                                setShowModal(true);
                              }}
                              className="default-btn"
                            >
                              {`${buttonMessage}`}
                            </button>
                          </p> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-3">
                <div className="p-4 textleft mb-3">
                  <div className="d-flex flex-column justify-content-center align-items-between">
                    <Card className={classes.card}>
                      <CardContent>
                        <div className="text-center plan-card">
                          <div className="circleLeft"></div>
                          <div className="circleRight"></div>
                          <p></p>
                          <p className="date__title">SECOND CLASS PLAN</p>

                          <p className="merchant-card__title margin30">
                            <sup>₦</sup> 5,000{' '}
                          </p>
                          <p className="margin30"> MONTHLY (cancel anytime)</p>

                          <p className="plan-card__title margin30">
                            {' '}
                            Free 30 Minutes Expert Immigration planning Session
                          </p>
                          <p className="plan-card__title margin30">
                            One year access to an Exclusive support network
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            All year access to ask unlimited questions in
                            “Advice”
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Access to All Webinar Replays
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Free access to Relocation playbook{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Priority Email Support{' '}
                          </p>

                          {/* <p className="marginPP">
                            <button
                              onClick={() => {
                                setSubscription({
                                  plan: 'EXCLUSIVE_USER',
                                  frequency: 'MONTHLY',
                                });
                                setShowModal(true);
                              }}
                              className="default-btn"
                            >
                              {`${buttonMessage}`}
                            </button>
                          </p> */}
                        </div>
                      </CardContent>
                    </Card>

                    <p className="margin30">
                      <a href="/member/standard" className="backBtn margin30">
                        Back
                      </a>

                      <a href="/member/platinum" className="default-btn">
                        Next
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MemberPlatinum() {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [subscription, setSubscription] = useState({
    plan: null,
    frequency: null,
  });

  const { userData } = useUserData();

  const planType = userData.planType;
  // eslint-disable-next-line
  let buttonMessage;
  if (planType === 'PLATINUM_USER') {
    buttonMessage = "You're Already on this Plan";
  } else {
    buttonMessage = 'Choose This Plan';
  }

  return (
    <Layout>
      <SubscriptionPlan
        {...subscription}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">My Memberships • Platinum</p>
          <p className="member-card__title ml-4">
            {' '}
            Select a NetWebPay Immigration plan that is convenient for you.
          </p>

          <div className="flex_page_container pt-4">
            <div className="row mt-4">
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="p-4 textleft mb-3">
                  <div className="d-flex flex-column justify-content-center align-items-between">
                    <Card className={classes.card}>
                      <CardContent>
                        <div className="text-center plan-card">
                          <div className="circleLeft"></div>
                          <div className="circleRight"></div>
                          <p></p>
                          <p className="date__title">FIRST CLASS PLAN</p>

                          <p className="merchant-card__title margin30">
                            <sup>₦</sup> 100,000{' '}
                          </p>
                          <p className="margin30">YEARLY </p>

                          <p className="plan-card__title margin30">
                            {' '}
                            Exclusive Support with an assigned mentor
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Free Documents and templates{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Worksheets, Reminders and Accountability Sessions{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Reduced cost for Extended clarity sessions{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Discounted costs for trainings and events{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            20% Off IELTS and French Coaching Class{' '}
                          </p>

                          {/* <p className="marginPP">
                            <button
                              onClick={() => {
                                setSubscription({
                                  plan: 'PLATINUM_USER',
                                  frequency: 'YEARLY',
                                });
                                setShowModal(true);
                              }}
                              className="default-btn"
                            >
                              {`${buttonMessage}`}
                            </button>
                          </p> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-3">
                <div className="p-4 textleft mb-3">
                  <div className="d-flex flex-column justify-content-center align-items-between">
                    <Card className={classes.card}>
                      <CardContent>
                        <div className="text-center plan-card">
                          <div className="circleLeft"></div>
                          <div className="circleRight"></div>
                          <p></p>
                          <p className="date__title">FIRST CLASS PLAN</p>

                          <p className="merchant-card__title margin30">
                            <sup>₦</sup> 10,000{' '}
                          </p>
                          <p className="margin30"> MONTHLY (cancel anytime)</p>

                          <p className="plan-card__title margin30">
                            {' '}
                            Exclusive Support with an assigned mentor
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Free Documents and templates{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Worksheets, Reminders and Accountability Sessions{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Reduced cost for Extended clarity sessions{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            Discounted costs for trainings and events{' '}
                          </p>
                          <p className="plan-card__title margin30">
                            {' '}
                            20% Off IELTS and French Coaching Class{' '}
                          </p>

                          {/* <p className="marginPP">
                            <button
                              onClick={() => {
                                setSubscription({
                                  plan: 'PLATINUM_USER',
                                  frequency: 'MONTHLY',
                                });
                                setShowModal(true);
                              }}
                              className="default-btn"
                            >
                              {`${buttonMessage}`}
                            </button>
                          </p> */}
                        </div>
                      </CardContent>
                    </Card>

                    <p className="margin30">
                      <a href="/member/exclusive" className="backBtn margin">
                        Back
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CampaignCreate() {
  const classes = useStyles();

  const { userData } = useUserData();

  return (
    <Layout>
      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">Create Campaign • 1 of 3</p>
          <p className="member-card__title">
            Hi {`${userData.firstName}`}, who are you crowdfunding for ?
          </p>

          <p></p>

          <div className="campaign-card">
            <div className="image">
              <img src={Selfcare} width="37" height="40" alt="campaign" />
            </div>

            <div className="main">
              <p className="campaign-card__title">
                Are You Crowdfunding For Yourself ?
              </p>
              <p className="date__title">
                Load your card using vesti wallet easily.
              </p>
            </div>
          </div>

          <p></p>

          <div className="campaign-card">
            <div className="image">
              <img src={Hand} width="37" height="40" alt="campaign" />
            </div>

            <div className="main">
              <p className="campaign-card__title">
                {' '}
                Are You Crowdfunding For Someone Else ?
              </p>
              <p className="date__title">
                {' '}
                Add money in your card using your bank.
              </p>
            </div>
          </div>

          <p className="marginPP">
            <a href="/campaign/detail" className="default-btn">
              Proceed
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

function CampaignDetails() {
  const classes = useStyles();

  return (
    <Layout>
      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">Campaign Detail • 2 of 3</p>
          <p className="member-card__title ml-4">
            {' '}
            Select a NetWebPay Immigration plan that is convenient for you.
          </p>

          <div className="search_form_container flex-grow-1">
            <input
              type="text_box"
              name="text_campaign"
              className="campaign_search_control"
              placeholder="Tell a story about the reason why you are creating the campaign"
            />
            <span />
          </div>

          <p className="black__title"> Add a Cover Photo or Video </p>

          <Upload>
            <img
              src={Uploadicon}
              max-width="620"
              max-height="150"
              alt="campaign"
            />
          </Upload>
          <p className="marginPP">
            <a href="/campaign/create" className="backBtn margin30">
              Back
            </a>

            <a href="/campaign/story" className="default-btn">
              Continue
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

function CampaignStory() {
  const classes = useStyles();

  return (
    <Layout>
      <div className="grid-container">
        <div className={classes.root}>
          <p className="member__title">Campaign Story • 3 of 3</p>
          <p className="member-card__title ml-4">
            {' '}
            Select a NetWebPay Immigration plan that is convenient for you.
          </p>

          <div className="search_form_container flex-grow-1">
            <input
              type="text_box"
              name="text_campaign"
              className="campaign_search_control"
              placeholder="Tell a story about the reason why you are creating the campaign"
            />
            <span />
          </div>

          <p className="black__title"> Add a Cover Photo or Video </p>

          <Upload>
            {' '}
            <img
              src={Uploadicon}
              max-width="620"
              max-height="150"
              alt="campaign"
            />
          </Upload>

          <p className="marginPP">
            <a href="/campaign/detail" className="backBtn margin30">
              Back
            </a>

            <a href="/member/exclusive" className="default-btn">
              Finish
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

// const NavLink = props => (
//   <Link
//     {...props}
//     getProps={({ isCurrent }) =>
//       // the object returned here is passed to the
//       // anchor element's props
//       ({
//         className: isCurrent ? 'active' : '',
//       })
//     }
//   />
// );

//export default ScrollableTabsButtonAuto;
export default ScrollableTabsButtonAuto;
export {
  MemberStandard,
  MemberExclusive,
  MemberPlatinum,
  CampaignCreate,
  CampaignDetails,
  CampaignStory,
};

//export { MemberStandard , MemberExclusive, MemberPlatinum };
