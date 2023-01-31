import React from 'react';
import { Comment } from './comment';
import { Postcomment } from './postcomment';
import dummyAvatar from 'assets/dummy-avatar.png';
import { useState } from 'react';
// import { Form, Formik, Field } from 'formik';
import ReactTimeAgo from 'react-time-ago';
import { errorMessage } from 'helpers/utils';
import '../Admin.css';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { post } from "jquery";
import { parseDate } from 'helpers/hooks';
import { openShare } from 'appRedux/actions/Alertbox';
export const Singlepost = props => {
  const [openComment, setOpenComment] = useState({
    id: null,
    name: 'Open',
  });
  const [comments, setComments] = useState({
    id: null,
    name: 'Open',
  });
  const handleClick = id => {
    if (id === openComment.id) {
      setOpenComment({ id: null, name: 'Open' });
    } else {
      setOpenComment({ id: id, name: 'Close' });
    }
  };
  const openClick = id => {
    if (id === comments.id) {
      setComments({ id: null, name: 'Open' });
    } else {
      setComments({ id: id, name: 'Close' });
    }
  };

  const dispatch = useDispatch();
  const postComment = (values, postId) => {
    var image = props.userData.profilePictureURL;

    if (
      props.userData.firstName === null ||
      props.userData.lastName === null ||
      image === null
    ) {
      openNotificationWithIconErr(
        'Comment',
        'only Users with full profile details can comment, please update your profile',
        'error',
      );
    } else {
      api
        .post('/createCommentOnPost', {
          ...values,
          postId: postId,
          profilePictureURL: image,
        })
        .then(res => {
          openNotificationWithIcon(
            'You have successfully commented on a post',
            'Success',
            'success',
          );
          dispatch(props.fetchvestiPosts());
          setOpenComment(false);
        })
        .catch(err => {
          openNotificationWithIconErr(errorMessage(err), 'Comment', 'error');
        });
    }
  };

  const deletePost = postId => {
    if (props.group === 'group') {
      props.deleteMessage(postId);
      dispatch(props.fetchvestiPosts());
    } else {
      api
        .delete(`/deletePostById/${postId}`)
        .then(res => {
          openNotificationWithIcon(
            'You have successfully deleted your post',
            'Success',
            'success',
          );
          dispatch(props.fetchvestiPosts());
        })
        .catch(err => {
          openNotificationWithIconErr(errorMessage(err), 'Delete', 'error');
        });
    }
  };

  const deleteComment = commentId => {
    api
      .delete(`/deleteCommentOnPostById/${commentId}`)
      .then(res => {
        openNotificationWithIcon(
          'You have successfully deleted your Comment',
          'Success',
          'success',
        );
        dispatch(props.fetchvestiPosts());
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Delete', 'error');
      });
  };

  const reactToPost = (postId, userId) => {
    api
      .post(`/react_to_post?postId=${postId}&userId=${userId}`)
      .then(res => {
        openNotificationWithIcon(res.data.message, 'Success', 'success');
        dispatch(props.fetchvestiPosts());
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Like Post', 'error');
      });
  };

  // const unLikePost = (postId) =>{
  //     api
  //         .post('/unLikePost', {postId:postId})
  //         .then(res => {
  //             openNotificationWithIcon(
  //                 'You have successfully unliked a post',
  //                 'Success',
  //                 'success',
  //             );
  //             dispatch(props.fetchvestiPosts())

  //         })
  //         .catch(err => {
  //             openNotificationWithIconErr(
  //             errorMessage(err),
  //                 'UnLike Post ',
  //                 'error',
  //             );
  //         });
  // }

  // const LikePost = (postId) =>{
  //     var numlikes = parseInt(props.likes)
  //     api
  //         .post('/editPost', {postId:postId, hasLiked:"true", likes : numlikes + 1,  })
  //         .then(res => {
  //             openNotificationWithIcon(
  //                 'You have successfully liked a post',
  //                 'Success',
  //                 'success',
  //             );
  //             dispatch(props.fetchvestiPosts())

  //         })
  //         .catch(err => {
  //             openNotificationWithIconErr(
  //             errorMessage(err),
  //                 'Like Post',
  //                 'error',
  //             );
  //         });
  // }
  return (
    <div
      key={props.id}
      className="single-vesti-post"
      style={{ marginTop: '-20px' }}
    >
      {/* Top Content */}
      <div className="single-vesti-post-top">
        <span
          className="mr-3"
          style={{
            height: '60px',
            width: '60%',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start',
            cursor: 'pointer',
          }}
          onClick={() => {
            props.setProfile(true);
            props.setDetails({
              image: props.profileUrl !== null ? props.profileUrl : dummyAvatar,
              name: props.fullname ? props.fullname : props.username,
              username: props.username,
              email: props.email,
              userId: props.userId,
            });
          }}
        >
          <img
            src={props.profileUrl !== null ? props.profileUrl : dummyAvatar}
            alt="proflie"
            className="single-vesti-post-img"
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>
              {' '}
              {props.username === 'User null'
                ? props.email
                : props.username.includes('-')
                ? props.fullname
                : props.username}
            </div>
            <div style={{ color: '#CCCCCC' }} className="mb-3">
              <ReactTimeAgo
                date={Date.parse(parseDate(props.createdAt, 'yyyy/mm/dd'))}
                locale="en-US"
              />
              {/* <ReactTimeAgo date={props.date} locale="en-US"/> • {props.date} */}
              {/* { timeAgo(parseDate (props.createdAt, 'yyyy/mm/dd')) }  • {props.createdAt} */}
            </div>
          </div>
        </span>

        <div className="d-flex" style={{ width: 'fit-content', gap: '16px' }}>
          <Postlink
            toolTip="Share Post"
            click={() => dispatch(openShare(props.id))}
            postId={props.id}
          >
            <i
              className="fas fa-share"
              style={{
                color: '#CCCCCC',
              }}
            />
          </Postlink>

          {props.userData.username === 'olusolavesti' ? (
            <Postlink toolTip="Save Post" type="save">
              <i
                className="fas fa-bookmark"
                style={{
                  color: '#CCCCCC',
                }}
              />
            </Postlink>
          ) : null}

          {props.userData.id === props.userId ||
          props.userData.username === 'olusolavesti' ? (
            <Postlink
              toolTip="Delete Post"
              click={deletePost}
              postId={props.id}
            >
              <i
                class="fas fa-trash-alt"
                style={{
                  color: '#CCCCCC',
                }}
              />
            </Postlink>
          ) : (
            <Postlink toolTip="Save Post" type="save">
              <i
                className="fas fa-bookmark"
                style={{
                  color: '#CCCCCC',
                }}
              />
            </Postlink>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div
        className="w-100"
        onClick={() => props.onClick && props.onClick(props.id)}
        style={{ cursor: 'pointer' }}
      >
        <p
          className="mb-4"
          style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
        {props.postPictureUrl && (
          <img
            className="post-image"
            src={props.postPictureUrl}
            alt="post ima"
          />
        )}
      </div>
      <div>
        {/* Likes and Comment */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div
            className="d-flex justify-content-around post-actions"
            style={{ gap: '10px' }}
          >
            <p
              className="like-click"
              onClick={() => reactToPost(props.id, props.userId)}
              style={{ marginRight: '10px' }}
            >
              <i
                className={
                  props.hasLiked === 'true' ? `fas fa-heart` : `far fa-heart`
                }
                style={{ color: '#97E373' }}
              />{' '}
              {props.likes < 0 ? 0 : props.likes} like
              {props.likes > 1 ? 's' : ''}
            </p>
            {/* <p className="like-click" onClick = { () => props.hasLiked === "true" ? props.likes ===0 ? '': unLikePost(props.id) :LikePost(props.id) }  style={{ marginRight: "10px"  }}><i className= { props.hasLiked === "true" ? `fas fa-heart` : `far fa-heart`} style={ { color: '#97E373'} }/> {props.likes < 0 ? 0 : props.likes } like{props.likes > 1 ? 's' :''}</p> */}
            <p
              className={`reply-click  ${
                openComment.id === props.id ? ' active' : ' disable'
              }  `}
              style={{ marginRight: '10px' }}
              onClick={() => handleClick(props.id)}
            >
              <i className="fas fa-share" /> Reply
            </p>
            <p
              className={`comments-click ${
                comments.id === props.id ? ' active' : ' disable'
              } `}
              onClick={() => openClick(props.id)}
            >
              <i className="fas fa-comments" /> Comments (
              {props.userComments ? props.userComments.length : 0})
            </p>
          </div>

          <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
            {props.userComments.length > 0
              ? props.userComments.slice(0, 2).map((item, index) => (
                  <span
                    className="d-flex justify-content-center align-items-center"
                    key={index}
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
                      src={
                        item.profileUrl === null ? dummyAvatar : item.profileUrl
                      }
                      alt="proflie"
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </span>
                ))
              : '  '}
            <span
              className="d-flex justify-content-center align-items-center"
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '100%',
                background: '#000000',
                color: '#121243',
                marginLeft: '-10px',
                position: 'relative',
                border: '4px solid #fff',
                overflow: 'hidden',
              }}
            >
              {props.likes && props.userComments
                ? parseInt(props.likes * 1) +
                    parseInt(props.userComments.length * 1) <
                  1
                  ? 0
                  : parseInt(props.likes * 1) +
                    parseInt(props.userComments.length * 1)
                : 0}
            </span>
          </div>
        </div>
      </div>

      <Postcomment
        id={props.id}
        postComment={postComment}
        openComment={openComment.id}
        userData={props.userData}
      />

      <div
        className={`comments-container mt-5 ${
          comments.id === props.id ? ' active' : ' '
        } `}
      >
        {props.userComments.length > 0 ? (
          (props.userComments > 3
            ? props.userComments.slice(0, 3)
            : props.userComments
          ).map(comment => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                avatar={comment.profileUrl}
                username={comment.username}
                description={comment.comment}
                createdAt={comment.createdAt}
                authUserId={props.userData.id}
                userId={comment.userId}
                deleteComment={deleteComment}
                userData={props.userData}
                marginLeft="50px"
              />
            );
          })
        ) : (
          <p></p>
        )}
      </div>

      <hr className="single-vesti-hr" />
    </div>
  );
};

export const Postlink = props => {
  return (
    <div
      className="d-flex justify-content-center align-items-center single-vesti-post-link"
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: '#F8F6F5',
        borderRadius: '100%',
      }}
      onClick={() => (props.type === 'save' ? '' : props.click(props.postId))}
    >
      {props.children}
      <span className="tooltiptext">{props.toolTip}</span>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser, userEmail } = auth;

  return {
    userEmail,
    authUser,
  };
};

export default connect(mapStateToProps)(Singlepost);
