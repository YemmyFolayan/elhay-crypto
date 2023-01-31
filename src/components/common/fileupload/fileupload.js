import React from 'react';
import './fileupload.scss';

export const Fileupload = props => {
  const setValue = e => {
    // console.log(e.target.files[0]);
    // alert('dfadfa')
    props.setValue(e);
  };

  const remove = e => {
    e.preventDefault();
    props.remove();
  };
  return (
    <div className="fileupload">
      <div className="fileupload__container">
        {!props.value ? (
          <>
            <input
              type="file"
              id={props.id}
              value={props.value}
              name={props.name}
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={setValue}
              hidden
            />
            <label htmlFor={props.id}>
              {' '}
              {props.title ? props.title : ` Select File To Upload`}{' '}
            </label>
            <p className="info">
              {' '}
              {props.info ? props.info : 'Image size of limit'}{' '}
              <strong>{` <`} 5MB </strong>
            </p>
          </>
        ) : (
          <button className="fileupload__container__remove" onClick={remove}>
            {' '}
            remove -{' '}
            {typeof props.value.name === 'undefined'
              ? props.name.name
              : props.value.name}
          </button>
        )}
      </div>
      {props.click && (
        <button
          className="fileupload__btn"
          onClick={() => props.click()}
          disabled={props.value ? (props.loading ? true : false) : true}
        >
          {' '}
          {props.loading ? props.loading : 'Upload File'}{' '}
        </button>
      )}
    </div>
  );
};
