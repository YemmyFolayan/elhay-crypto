import React, { useEffect, useState } from 'react';
import '../components.css';
import './header.scss';
import { connect } from 'react-redux';
import { NotifIco } from 'assets/assets';
import { userSignOut, getProfile } from '../../appRedux/actions/auth';
import { toggleMenu } from '../../appRedux/actions/menu';
import { useUserData } from 'helpers/hooks';
import { Link } from '@reach/router';
import Empty from '../../assets/empty-gray.svg';
import dummy from 'assets/dummy-avatar.png';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { useQuery } from 'react-query';
import { errorMessage } from 'helpers/utils';
// import { vestirate } from './vestirate/vestirate';

const useFetchNots = () => {
  const { isLoading, data: userNotifications, refetch } = useQuery(
    'my-notifications',
    // {refetchOnWindowFocus: false,enabled: false},
    async () =>
      await api
        .get('notification/get_new_notifications')
        .then(res => res.data.data),
  );

  return { isLoading, userNotifications, refetch };
};

const Header = ({ toggleMenu, info, link, info2, link2 }) => {
  // const [notifications, setNots] = useState([])
  const [open, setOpen] = useState(false);
  const { userData } = useUserData();

  const { userNotifications, refetch } = useFetchNots();

  var deleteNotification = async id => {
    try {
      const res = await api.patch(`notification/cancel_one_notification/${id}`);
      openNotificationWithIcon(
        'Notification Deleted',
        res.data.message,
        'success',
      );
      console.log('');
      refetch();
    } catch (error) {
      openNotificationWithIconErr(errorMessage(error), 'Error', 'error');
    }
  };
  var clearNotification = e => {
    // alert('Hiiii')
    e.preventDefault();
    api
      .patch('notification/cancel_all_my_notifications')
      .then(res => {
        openNotificationWithIcon('Notification', res.data.message, 'success');
        refetch();
      })
      .catch(error => {
        openNotificationWithIconErr(
          'Error clearing all notifications',
          'Error',
          'error',
        );
      });
  };

  useEffect(() => {
    getProfile();
    // getNotifications();
  }, []);

  return (
    <div className="header_box">
      {info && (
        <div className="header_box__info">
          <span>
            <p onClick={() => link && link()}>
              {info} {link && link} {info2 && ','}
            </p>
            {info2 && (
              <p onClick={() => link2 && link2()}>
                {info2} {link2 && link2}
              </p>
            )}
          </span>
        </div>
      )}
      <div className=" w-100 d-flex justify-content-between align-items-center header_box__content">
        <div
          className="curs_pointer d-flex flex-column mr-3 justify-content-between align-items-stretch toggle-menu"
          style={{
            background: 'transparent',
            height: '14px',
          }}
          onClick={toggleMenu}
        >
          <div
            style={{ width: '18px', height: '2px', background: '#000000' }}
          />
          <div
            style={{ width: '18px', height: '2px', background: '#000000' }}
          />
          <div
            style={{ width: '18px', height: '2px', background: '#000000' }}
          />
        </div>
        {/* {notifications.length} */}
        <div className="header-icons ml-auto d-flex align-items-center">
          {/* <vestirate rate={590}/> */}
          {/* <div
            style={{ borderRadius: '50vw' }}
            className={`notif_cont ${open ? ' active' : ''}`}
          >
            <img
              src={NotifIco}
              alt="notification icon"
              className={`notif_icon ${open ? ' active' : ''}`}
              style={{ width: '25px', height: '25px' }}
              onClick={() => setOpen(!open)}
            />
            <div className={`notification-box ${open ? ' active' : ''}`}>
              <p>Notification(s)</p>
              {userNotifications ? (
                userNotifications.length < 1 ? (
                  <div className="notification-box_inner">
                    <img src={Empty} alt="Empty Gray" />
                    <p className="empty">
                      Notification is empty, Nothing to show yet{' '}
                    </p>
                  </div>
                ) : (
                  <div className="notification-box_inner">
                    {(userNotifications ?? []).map((item, index) => (
                      <>
                        <Notification
                          // key={index}
                          data={item}
                          deleteNotification={deleteNotification}
                        />
                        <hr />
                      </>
                    ))}
                    <p
                      className="clear-not"
                      onClick={e => clearNotification(e)}
                    >
                      Clear All Notifications
                    </p>
                  </div>
                )
              ) : (
                <div className="notification-box_inner">
                  <img src={Empty} alt="Empty Gray" />
                  <p className="empty">
                    Notification is empty, Nothing to show yet{' '}
                  </p>
                </div>
              )}
            </div>
          </div> */}
          <Link to="/myprofile" className="notif_cont ml-3 notif_userprofile">
          
            <img
              src={
                userData.profilePictureURL ? userData.profilePictureURL : dummy
              }
              alt=""
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50vw',
                objectFit: 'cover',
              }}
            />

         {' '}
         Hi{' '}, John Doe
         {userData && userData.firstName === 'User'
           ? 'there'
           : userData.firstName}{' '}
         <b className="fw-bolder">﹀</b>{' '}
            
          
          </Link>
          {/* <div className="notif_cont ml-3">
            <img
              src={userData.profilePictureURL}
              alt=""
              style={{ width: '50px', height: '50px', borderRadius: '50vw' }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Notification = props => {
  return (
    <div className="singlenotification" key={props.data.id}>
      <div className="singlenotification__text">
        <p>{props.data.eventType}</p>
        <p>{props.data.title}</p>
      </div>
      <i
        className="fas fa-times"
        onClick={() => props.deleteNotification(props.data.id)}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, common }) => {
  const { loader, alertMessage, showMessage } = auth;
  const { display, message, loading } = common;
  return {
    loader,
    alertMessage,
    showMessage,
    display,
    message,
    loading,
  };
};

export default connect(mapStateToProps, {
  userSignOut,
  getProfile,
  toggleMenu,
})(Header);
