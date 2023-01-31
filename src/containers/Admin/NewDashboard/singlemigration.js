import React from 'react';
// import {Comment} from "./comment"
import { Postcomment } from './postcomment';
import dummyAvatar from 'assets/dummy-avatar.png';
import { useState } from 'react';
// import { Form, Formik, Field } from 'formik';
import ReactTimeAgo from 'react-time-ago';
import { errorMessage } from 'helpers/utils';
import '../Admin.css';
// import { useDispatch} from 'react-redux';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
export const Singlemigration = props => {
  const [openComment, setOpenComment] = useState(null);
  const handleClick = id => {
    setOpenComment(id);
  };
  const postComment = values => {
    api
      .post('/createPost', values)
      .then(res => {
        openNotificationWithIcon(
          'You have successfully commented on a post',
          'Success',
          'success',
        );
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Post', 'error');
      });
  };
  // const dispatch = useDispatch();
  // const deletePost = (postId) =>{
  //     api
  //     .delete(`/deletePostById/${postId}`)
  //     .then(res => {
  //         openNotificationWithIcon(
  //             'You have successfully deleted your post',
  //             'Success',
  //             'success',
  //         );
  //         dispatch(props.fetchvestiPosts())

  //     })
  //     .catch(err => {
  //         openNotificationWithIconErr(
  //         errorMessage(err),
  //             'Delete',
  //             'error',
  //         );
  //     });
  // }

  return (
    <div key={props.id} className="single-vesti-post">
      <div className="single-vesti-post-top">
        <span
          className="mr-3"
          style={{
            height: '60px',
            width: '60%',
            // borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <img
            src="https://res.cloudinary.com/wevesti/image/upload/v1622441055/qf9xslgvxkrmsnbrjkio.jpg"
            alt="proflie"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />

          <div>
            <div style={{ fontWeight: 500 }}> Olusola Amusan </div>
            <div style={{ color: '#CCCCCC' }} className="mb-3">
              <ReactTimeAgo date={Date.parse(props.date)} locale="en-US" />•
            </div>
          </div>
        </span>

        <div className="d-flex" style={{ width: '20%', gap: '16px' }}>
          <Postlink>
            <i
              className="fas fa-share"
              style={{
                color: '#CCCCCC',
              }}
            />
            <span className="tooltiptext">Share Post</span>
          </Postlink>

          <Postlink toolTip="Save Post">
            <i
              className="fas fa-bookmark"
              style={{
                color: '#CCCCCC',
              }}
            />
            <span className="tooltiptext">Save Post</span>
          </Postlink>
        </div>
      </div>

      {/* Migration Content */}
      <div className="w-100 single-vesti-post-content">
        <h4
          className="font-weight-bold single-vesti-post-top title"
          style={{ color: '#000000' }}
        >
          {' '}
          {props.title.rendered}{' '}
        </h4>
        <p
          className="mb-4"
          style={{ fontSize: '14px' }}
          dangerouslySetInnerHTML={{ __html: props.content.rendered }}
        ></p>
      </div>

      <div>
        {/* Likes and Comment */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div
            className="d-flex justify-content-around"
            style={{ gap: '10px' }}
          >
            <p className="mr-2">
              <i className="fas fa-heart" style={{ color: '#97E373' }} /> 10
              Likes
            </p>
            <p
              style={{ color: '#ccc', cursor: 'pointer' }}
              onClick={() => handleClick(props.id)}
            >
              <i className="fas fa-share" /> Reply
            </p>
          </div>

          <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
            <Dummyavi />
            <Dummyavi />
            <span
              className="d-flex justify-content-center align-items-center"
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '100%',
                background: '#F0F3EE',
                color: '#121243',
                marginLeft: '-10px',
                position: 'relative',
                border: '4px solid #fff',
                overflow: 'hidden',
              }}
            >
              +70
            </span>
          </div>
        </div>
        {/* {
                    props.userComments.length > 0 ? 

                        props.userComments.map ((comment)=> {
                            return (
                                <Comment
                                    key ={comment.id}
                                    id={comment.id}
                                    avatar={comment.profileUrl}
                                    username = {comment.username}
                                    description={comment.comment}
                                    createdAt ={comment.createdAt}
                                    authUserId = {props.userData.id}
                                    userId = {comment.userId}
                                    deleteComment ={deleteComment}
                                />
                            )
                        })
                        
                    : 
                        <p></p>
                } */}

        <Postcomment
          id={props.id}
          postComment={postComment}
          openComment={openComment}
        />

        <p></p>
        <hr></hr>
      </div>
    </div>
  );
};

export const Postlink = ({ children }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center single-vesti-post-link"
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: '#F8F6F5',
        borderRadius: '100%',
      }}
    >
      {children}
    </div>
  );
};

export const Dummyavi = () => {
  return (
    <span
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '40px',
        width: '40px',
        borderRadius: '100%',
        position: 'relative',
        border: '4px solid #fff',
        overflow: 'hidden',
        marginLeft: '-20px',
      }}
    >
      <img
        src={dummyAvatar}
        alt="proflie"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </span>
  );
};
