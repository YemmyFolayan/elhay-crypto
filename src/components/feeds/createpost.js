import React from 'react';
import dummyAvatar from 'assets/dummy-avatar.png';
import { Textarea } from 'components/common/inputs/textarea';
import './createpost.scss';

export const Createpost = props => {
  return (
    <div className="createpost">
      <img
        src={!props.picture ? dummyAvatar : props.picture}
        alt="user avatar"
      />
      <div className="createpost__right">
        <Textarea
          type="text"
          label=""
          name="post"
          placeholder={`What's on your mind ${props.name} ?`}
          value={props.post.description}
          onChange={props.setInput}
        >
          <p>{props.post.image ? props.post.image.name : ''}</p>
        </Textarea>
        <div className="createpost__right__bottom">
          <button
            className="createpost__right__bottom__button"
            onClick={e => props.createPost(e)}
            disabled={props.post.button === 'Creating Post...' ? true : false}
          >
            {props.post.button}
          </button>

          {!props.post.image.name ? (
            <div className="createpost__right__bottom__image">
              <input
                type="file"
                id="1"
                accept=".jpg, .jpeg, .png"
                onChange={e => props.setImage(e)}
                hidden
              />
              <label for="1">
                <i className="fas fa-plus"></i>
                {`Add Photos (Max Size: 5MB)`}
              </label>
            </div>
          ) : (
            <p
              className="createpost__right__remove"
              onClick={() => props.remove()}
            >
              <i className="fas fa-minus"></i>
              {`Remove Photo`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
