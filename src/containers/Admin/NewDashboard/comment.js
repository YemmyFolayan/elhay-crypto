import './comment.scss';
import React from 'react';
import { parseDate } from 'helpers/hooks';
import ReactTimeAgo from 'react-time-ago';
import dummyAvatar from 'assets/dummy-avatar.png';

export const Comment = props => {
  return (
    <div
      className="single-comment-container"
      style={{ marginLeft: props.marginLeft }}
    >
      <div className="single-comment-inner">
        <img
          src={props.avatar === null ? dummyAvatar : props.avatar}
          alt="Comment Profile"
        />
        <div className="single-comment-inner right">
          <div className="top">
            <p>{props.username} </p>
            {props.createdAt ? (
              <ReactTimeAgo
                date={Date.parse(parseDate(props.createdAt, 'yyyy/mm/dd'))}
                locale="en-US"
              />
            ) : (
              <p></p>
            )}
          </div>
          <div className="comment-content">
            <p>{props.description}</p>
            {!props.remove ? (
              <div className="comment-content bottom">
                <p>
                  <i className="far fa-heart" style={{ color: '#97E373' }} /> 0
                  Likes{' '}
                </p>
                <p>
                  <i className="fas fa-flag" style={{ color: '#97E373' }} />{' '}
                  Flag This Comment{' '}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="left">
          {props.authUserId === props.userId ||
          props.userData.username === 'olusolavesti' ? (
            <Postlink
              toolTip="Delete Comment"
              deleteComment={props.deleteComment}
              commentId={props.id}
            >
              <i
                class="fas fa-trash-alt"
                style={{
                  color: '#CCCCCC',
                }}
              />
            </Postlink>
          ) : (
            <p></p>
          )}
        </div>
      </div>
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
      onClick={() => props.deleteComment(props.commentId)}
    >
      {props.children}
      <span class="tooltiptext">{props.toolTip}</span>
    </div>
  );
};
