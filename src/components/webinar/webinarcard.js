import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import './webinar.scss';
import { Padlock, Japaimg } from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { openUpgradeBox } from 'appRedux/actions/update';
import { useUserData } from 'helpers/hooks';

const Webinarcard = props => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      primary: '#000000 !important',
    },
    card: {
      maxWidth: 350,
    },
    membershipCard: {
      maxWidth: 200,
      margin: 5,
    },
    media: {
      height: 0,
      width: '100%',
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
    // avatar: {
    //   backgroundColor: red[500],
    // },
    indicator: {
      backgroundColor: '#000000',
    },
  }));
  const classes = useStyles();

  var dispatch = useDispatch();
  const { userData } = useUserData();

  var openUpdateModal = () => {
    (userData.planType === 'BASIC_USER' || userData.planType === null) &&
    props.type !== 'FREE' &&
    props.user !== 'premium'
      ? dispatch(openUpgradeBox())
      : (() => {})();
  };
  return (
    <div className="col-md-6 col-lg-4 mb-3 " onClick={() => openUpdateModal()}>
      {/* p-4 here */}
      <div className=" textleft mb-3">
        <div className="d-flex flex-column justify-content-center align-items-between webinar-card">
          <Card className={classes.card} elevation={0}>
            {props.link ? (
              <CardMedia
                component="iframe"
                style={{ width: '100%', objectFit: 'contain' }}
                // width="560"
                // height="315"
                className="webinar-card webinar-card-media"
                src={props.link}
                title={props.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              ''
            )}
            {!props.link ? (
              <CardMedia
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  overflow: 'hidden',
                }}
                className="webinar-card webinar-card-media"
                image={Japaimg}
                title={props.title}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              ''
            )}

            <CardContent className="webinar-card-content">
              {props.type !== 'FREE' && props.user !== 'premium' ? (
                <div className="padlock">
                  <img
                    className="padlockIcon"
                    src={Padlock}
                    max-width="30"
                    max-height="30"
                    alt="campaign"
                  />
                </div>
              ) : (
                ''
              )}

              <p className="body2 webinar-title">{props.title} </p>
              <p className="member-card__title webinar-featuring">
                {' '}
                {props.featuring}
              </p>
              <p className="date__title webinar-date">{props.date}</p>
              <p className="body2 webinar-subtitle">{props.subtitle}</p>

              <p
                className={
                  props.type === 'FREE' ? 'free_label' : 'exclusive_label'
                }
              >
                {props.type}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return {
    authUser,
  };
};

const mapDispatchToProps = {
  openUpgradeBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(Webinarcard);
