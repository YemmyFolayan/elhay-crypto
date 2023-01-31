import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'components/common/DashboardLayout';
// import Britain from 'assets/Britain.png';
import sevisserv from 'assets/sevisserv.png';
// import USA from 'assets/USA.png';
import usdepartment from 'assets/usdepartment.png';
import wesservice from 'assets/wesservice.png';
import ukvisa from 'assets/ukvisa.png';
// import Canada from 'assets/Canada.png';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import { fetchvestiPosts } from 'appRedux/actions/posts';

import '../Admin.css';
import { useQuery } from 'react-query';
import { errorMessage } from 'helpers/utils';
import axios from 'axios';
// import { useUserData } from 'helpers/hooks';
// import Notifybox from 'components/common/notifybox/notifybox';
// import Refer from "../../../assets/refer.svg"
// import { navigate } from '@reach/router';
import { useState } from 'react';
import { Referal } from 'components/referal/referal';
import { Modal } from 'antd';

import { Profilepop } from 'components/profilepop/profilepop';
import Singlefeed from 'components/singlefeed/singlefeed';
import Loader from 'components/Loader';
import Back from 'components/common/back/back';
const Groupfeeds = props => {
  console.log(props.id);
  const [profile, setProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiledetails, setDetails] = useState({
    image: '',
    name: '',
    username: '',
    email: '',
  });
  const [shareModal, setShareModal] = useState({
    modal: false,
    value: null,
    shares: null,
  });

  const closeProfile = () => {
    setProfile(false);
  };

  const closeShareModal = () => {
    setShareModal({ ...shareModal, modal: false });
  };

  const shareNum = (postId, shares) => {
    var numShares = parseInt(shares);
    api
      .post('/editPost', {
        postId: postId,
        hasLiked: 'true',
        shares: numShares + 1,
      })
      .then(res => {})
      .catch(err => {
        openNotificationWithIconErr(
          errorMessage(err),
          'Error sharing a Post',
          'error',
        );
      });
  };

  const { data: groupData, isSuccess: groupFetched } = useQuery(
    'vesti-groups',
    async () => {
      const data = (await api.get(`/getGroupById/${props.id}`)).data.data[0];
      console.log('Fetched data name', data.name);
      return data;
    },
  );

  const { data: postData, isSuccess: postFetched } = useQuery(
    'vesti-posts',
    async () => {
      console.log('Fetched');
      const data = (await axios.get('https://wevesti.com/wp-json/wp/v2/posts'))
        .data;

      return data;
    },
  );

  const { data: messageData, isSuccess: messageFetched } = useQuery(
    'vesti-message',
    async () => {
      // const data = (await axios.get('https://wevesti.com/wp-json/wp/v2/posts')).data;
      const data = (await api.get(`/getGroupMessages/${props.id}`)).data.data;
      console.log('Fetched', data);
      setLoading(false);
      return data;
    },
  );

  const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts.data);

  const createMessage = value => {
    api
      .post('/createGroupMessage', { groupId: props.id, message: value })
      .then(res => {
        openNotificationWithIcon(
          'You have successfully created  a post',
          'Success',
          'success',
        );
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Post', 'error');
      });
  };

  const deleteMessage = postId => {
    api

      .delete(`/deleteGroupMessageById/${postId}`)

      .then(res => {
        openNotificationWithIcon(
          'You have successfully deleted your post',
          'Success',
          'success',
        );
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Delete', 'error');
      });
  };
  console.log(postFetched);
  console.log(groupFetched);
  console.log(messageFetched);

  // const { userData } = useUserData();
  useEffect(() => {
    dispatch(fetchvestiPosts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Layout>
        <div className="mt-4 feeds-dashboard">
          <div
            className="isw-container"
            style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
          >
            <Modal
              cancelButtonProps={{ style: { display: 'none' } }}
              visible={profile}
              onCancel={closeProfile}
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
              <Profilepop
                image={profiledetails.image}
                name={profiledetails.name}
                username={profiledetails.username}
                email={profiledetails.email}
              />
            </Modal>

            <Modal
              cancelButtonProps={{ style: { display: 'none' } }}
              visible={shareModal.modal}
              onCancel={closeShareModal}
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
              <Referal
                title="Copy Post Link"
                link={'app.wevesti.com/sharedpost/' + shareModal.value}
                id={shareModal.value}
                shares={shareModal.shares}
                shareNum={shareNum}
              />
            </Modal>

            <div className=" flex_page_container d-flex justify-content-center">
              <div className=" row px-3 px-md-4 px-lg-5 w-100 pb-5">
                {/* Left Main */}
                <Back page="Feed" link="feeds" />
                <Singlefeed
                  posts={messageData && messageData}
                  postData={postData}
                  setDetails={setDetails}
                  setProfile={setProfile}
                  setShareModal={setShareModal}
                  name={groupData && groupData.name}
                  createMessage={createMessage}
                  deleteMessage={deleteMessage}
                />
                {/* Dummy Col */}
                {/* <div className="col-12 col-md-1" /> */}
                {/* Dummy Col End*/}
                {/* Right Main */}
                <div className="col-12 col-md-5">
                  <div
                    className="card d-flex flex-column px-4 pt-4 pb-5 mb-5"
                    style={{
                      borderRadius: '10px',
                      overflowX: 'scroll',
                    }}
                  >
                    <h4
                      className="font-weight-bold mb-3"
                      style={{ color: '#cccccc' }}
                    >
                      Recommended Services
                    </h4>
                    <div className="d-flex">
                      <div
                        className="p-3 d-flex flex-column justify-content-center align-items-center mr-3"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #EAEAEA',
                          boxShadow: '0px 0px 5px #F5F5F5',
                          borderRadius: '10px',
                          height: '250px',
                          minWidth: '235px',
                        }}
                      >
                        <img
                          src={sevisserv}
                          alt="proflie"
                          style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                          }}
                          className="d-block bg-dark mb-1"
                        />
                        <div
                          className="text-uppercase mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                          }}
                        >
                          SEVIS FEE
                        </div>
                        <p
                          style={{
                            maxWidth: '200px',
                            fontWeight: 300,
                            fontSize: '.9rem',
                          }}
                          className="text-center mb-3"
                        >
                          Easily Pay your SEVIS fees without hassle
                        </p>
                        <a
                          href="/merchants"
                          style={{ color: '#000000', fontWeight: 500 }}
                          onClick={e => e.preventDefault()}
                        >
                          Pay Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>

                      <div
                        className="p-3 d-flex flex-column justify-content-center align-items-center mr-3"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #EAEAEA',
                          boxShadow: '0px 0px 5px #F5F5F5',
                          borderRadius: '10px',
                          height: '250px',
                          minWidth: '235px',
                        }}
                      >
                        <img
                          src={wesservice}
                          alt="proflie"
                          style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                          }}
                          className="d-block bg-dark mb-1"
                        />
                        <div
                          className="text-uppercase mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                          }}
                        >
                          WES FEE
                        </div>
                        <p
                          style={{
                            maxWidth: '200px',
                            fontWeight: 300,
                            fontSize: '.9rem',
                          }}
                          className="text-center mb-3"
                        >
                          Easily Pay your WES fees without hassle
                        </p>
                        <a
                          href="/merchants"
                          style={{ color: '#000000', fontWeight: 500 }}
                          onClick={e => e.handlePayment('wes')}
                        >
                          Pay Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div
                        className="p-3 d-flex flex-column justify-content-center align-items-center mr-3"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #EAEAEA',
                          boxShadow: '0px 0px 5px #F5F5F5',
                          borderRadius: '10px',
                          height: '250px',
                          minWidth: '235px',
                        }}
                      >
                        <img
                          src={usdepartment}
                          alt="proflie"
                          style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                          }}
                          className="d-block bg-dark mb-1"
                        />
                        <div
                          className="text-uppercase mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                          }}
                        >
                          US VISA
                        </div>
                        <p
                          style={{
                            maxWidth: '200px',
                            fontWeight: 300,
                            fontSize: '.9rem',
                          }}
                          className="text-center mb-3"
                        >
                          Easily Pay your USA VISA without hassle
                        </p>
                        <a
                          href="/merchants"
                          style={{ color: '#000000', fontWeight: 500 }}
                          onClick={e => e.preventDefault()}
                        >
                          Pay Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                      <div
                        className="p-3 d-flex flex-column justify-content-center align-items-center mr-3"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #EAEAEA',
                          boxShadow: '0px 0px 5px #F5F5F5',
                          borderRadius: '10px',
                          height: '250px',
                          minWidth: '235px',
                        }}
                      >
                        <img
                          src={ukvisa}
                          alt="proflie"
                          style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                          }}
                          className="d-block bg-dark mb-1"
                        />
                        <div
                          className="text-uppercase mb-3"
                          style={{
                            fontWeight: 600,
                            fontSize: '1.2rem',
                          }}
                        >
                          UK STUDENT
                        </div>
                        <p
                          style={{
                            fontWeight: 300,
                            fontSize: '.9rem',
                          }}
                          className="text-center mb-3"
                        >
                          Easily Pay your UK VISA without hassle
                        </p>
                        <a
                          href="/merchants"
                          style={{ color: '#000000', fontWeight: 500 }}
                          onClick={e => e.preventDefault()}
                        >
                          Pay Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                    </div>
                    <a
                      href="/merchants"
                      className="mt-4"
                      style={{
                        color: '#000000',
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    >
                      View More Services -
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export const Titleheader = props => {
  return (
    <h4 className="mb-2" style={{ color: '#cccccc' }}>
      {props.title}
    </h4>
  );
};
export default Groupfeeds;
