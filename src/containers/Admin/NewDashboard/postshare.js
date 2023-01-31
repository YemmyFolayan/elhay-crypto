import './postshare.scss';
import React from 'react';
import { parseDate } from 'helpers/hooks';
import ReactTimeAgo from 'react-time-ago';
import dummyAvatar from 'assets/dummy-avatar.png';
import { navigate } from '@reach/router';
export const Singlesharepost = props => {
  return (
    <div className="single-postshare-container">
      <div className="single-postshare-inner">
        <img
          src={!props.profileUrl ? dummyAvatar : props.profileUrl}
          alt={props.username + ' Profile Picture'}
        />
        <div className="single-postshare-inner right">
          <div className="top">
            <p>{props.username} </p>
            {props.createdAt ? (
              <p>
                <ReactTimeAgo
                  date={parseDate(props.createdAt, 'yyyy/mm/dd')}
                  locale="en-US"
                />
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="post-share-content">
            <div className="desc">
              <p
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: props.description }}
              ></p>
            </div>
            {!props.remove ? (
              <div className="post-share-content bottom">
                <p>
                  <i className="fas fa-heart" style={{ color: '#97E373' }} />{' '}
                  {props.likes} Likes{' '}
                </p>
                <button
                  className="post-share-btn"
                  onClick={() => navigate('/register')}
                >
                  Register/Login to Comment{' '}
                </button>
                {/* <p><i className="fas fa-flag" style={{ color: '#97E373' }} /> Flag This Comment </p> */}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
