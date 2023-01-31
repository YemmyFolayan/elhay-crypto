import React from 'react';
import './singlepathway.scss';
import { navigate } from '@reach/router';

export const Singlepathway = props => {
  var actions = props.actions;

  return (
    <div className="singlepathway-container">
      <div className="singlepathway-number">{props.number}</div>
      <div className="singlepathway-inner">
        <div className="singlepathway-inner singlepathway-content">
          <p>{props.title}</p>
          <p>{props.description}</p>
        </div>
        {props.nolink === true ? (
          ''
        ) : (
          <p
            onClick={() =>
              props.click
                ? props.click(props.title)
                : navigate(`/actions/${props.id}`, {
                    state: {
                      id: props.id,
                      actions,
                      pathway: props.pathway,
                      title: props.title,
                      description: props.description,
                      logo: props.logo,
                    },
                  })
            }
            href="/"
            className="singlepathway-inner link"
          >
            {' '}
            {props.type === 'payment'
              ? props.linkTitle
                ? props.linkTitle
                : props.title
              : 'View more details'}{' '}
            <i class="fas fa-long-arrow-alt-right"></i>{' '}
          </p>
        )}
      </div>
    </div>
  );
};
