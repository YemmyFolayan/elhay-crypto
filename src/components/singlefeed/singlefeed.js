// import React, { useEffect } from 'react';
import React from 'react';
// import { useDispatch} from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import Britain from 'assets/Britain.png';
// import sevisserv from '../../assets/sevisserv.png';
// import USA from 'assets/USA.png';
// import usdepartment from '../../assets/usdepartment.png';
// import wesservice from '../../assets/wesservice.png';
// import ukvisa from '../../assets/ukvisa.png';
// import Canada from 'assets/Canada.png';
import {
  // openNotificationWithIcon,
  openNotificationWithIconErr,
} from '../../appRedux/actions/Common';
// import api from '../../appRedux/api';
import { fetchvestiPosts } from '../../appRedux/actions/posts';
import { Form, Formik, Field } from 'formik';
import '../../containers/Admin/Admin.css';
// import { useQuery } from 'react-query';
// import { errorMessage } from 'helpers/utils';
// import axios from 'axios';
import { useUserData } from 'helpers/hooks';
import { Singlepost } from '../../containers/Admin/NewDashboard/singlepost';
import { Singlemigration } from '../../containers/Admin/NewDashboard/singlemigration';
// import { navigate } from '@reach/router';
import { useState, useRef } from 'react';
import { Newpost } from '../common/notifybox/newpost';
const Singlefeed = props => {
  const [scroll, setScroll] = useState();
  const scrollRef = useRef(null);

  const showShareModal = (id, shares) => {
    props.setShareModal({ modal: true, value: id, shares: shares });
  };

  //   const dispatch = useDispatch();

  //   const navigateTo =() => {
  //     navigate('/savings')
  //   }
  const { userData } = useUserData();

  var onScroll = () => {
    const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    const scrollTop = scrollRef.current.scrollTop;
    console.log(
      `onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`,
    );
    setScroll(scrollTop);
  };
  return (
    <div className="col-12 col-md-7 left-main">
      <Titleheader title={props.name} />
      <div
        className="card mb-4 p-4 bg-white w-full overflow-y-scroll vesti-main-feed"
        ref={scrollRef}
        onScroll={() => onScroll()}
        style={{ position: 'relative' }}
      >
        <div>
          <Formik
            initialValues={{
              title: 'Currently in England',
              description: '',
              image: userData.profilePictureURL,
            }}
            onSubmit={(values, { resetForm }) => {
              var fullContent = values.description.replace(/"/g, "'");
              if (
                userData.firstName === null ||
                userData.firstName === '' ||
                userData.lastName === null ||
                userData.lastName === '' ||
                userData.profilePictureURL === null ||
                userData.profilePictureURL === ''
              ) {
                openNotificationWithIconErr(
                  'Post',
                  'Only Users with full profile details can post, update your profile',
                  'error',
                );
              } else {
                props.createMessage(fullContent);
                resetForm({ values: '' });
              }
            }}
          >
            <Form>
              <Field
                style={{
                  width: '100%',
                  border: '1px solid #eaeaea',
                  background: '#f8f9f8',
                  borderRadius: '10px',
                }}
                as="textarea"
                name="description"
                placeholder="Type here...."
                className="create-post focusGreen"
                cols="45"
                rows="8"
              />

              <button
                type="submit"
                className="btn d-flex justify-content-center align-items-center mt-3 mb-3"
                style={{
                  background: '#000000',
                  color: '#fff',
                  width: '170px',
                  height: '45px',
                }}
              >
                Create a Post
              </button>
            </Form>
          </Formik>
          <p></p>
          <hr className="mb-5"></hr>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4
            className="font-weight-bold"
            style={{
              color: '#000000',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            NetWebPay Post
          </h4>
        </div>

        <div className="" style={{ position: 'relative' }}>
          {(scroll > 200) & (scroll < 30000) ? (
            <Newpost />
          ) : (
            <div
              style={{
                height: '30px',
                padding: '20px',
                position: 'sticky',
                top: '20%',
              }}
            ></div>
          )}
          {(props.posts ?? []).map(data => (
            <Singlepost
              key={data.id}
              id={data.id}
              username={data.sender.username}
              firstname={data.sender.firstName}
              lastname={data.sender.lastName}
              fullname={data.sender.firstName + ' ' + data.sender.lastName}
              email={data.sender.email}
              userId={data.senderId}
              userData={userData}
              // title={title}
              description={data.message}
              userComments={[]}
              profileUrl={data.image}
              createdAt={data.createdAt}
              // date={date}
              fetchvestiPosts={fetchvestiPosts}
              setPostLink={showShareModal}
              // hasLiked={hasLiked}
              // likes={likes}
              // shares={shares}
              setProfile={props.setProfile}
              setDetails={props.setDetails}
              group="group"
              deleteMessage={props.deleteMessage}
            />
          ))}
        </div>
      </div>
      <div className="card mb-4 p-4 bg-white w-full overflow-y-scroll">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="font-weight-bold" style={{ color: '#000000' }}>
            Migration Fries
          </h4>
        </div>
        <div className="">
          {(props.postData ?? []).map(
            ({ id, title, content, date, userId }) => (
              <Singlemigration
                key={id}
                id={id}
                title={title}
                content={content}
                date={date}
                // userId={userId}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export const Titleheader = props => {
  return (
    <h4 className="mb-2" style={{ color: '#cccccc' }}>
      {props.title}
    </h4>
  );
};
export default Singlefeed;
