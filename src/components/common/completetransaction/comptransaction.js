import React from 'react';
import { Form } from 'antd';
import DividedPinInput from '../DividedPinInput';
import Loader from 'components/Loader';
import './comptransaction.scss';
import { Platformbutton } from '../button/button';
export const Comptransaction = props => {
  return (
    <Form onFinish={props.onFinish} style={{ width: '100%' }}>
      {props.lower ? <></> : props.children}
      <div className="w-100 flex-fill pt-4" style={{ width: '100%' }}>
        <p>{props.title ? props.title : 'Enter Your Transaction PIN'} </p>
        <DividedPinInput
          onChange={props.setPin}
          len={props.len}
          open={props.open}
        />
      </div>
      {props.loading ? (
        <Loader />
      ) : props.children ? (
        props.children
      ) : (
        <div className="btn-container">
          {/* <div
                    type="submit"
                    className="btn-left"
                    
                    onClick={props.goBack}
                    >
                        Back
                    </div> */}
          <Platformbutton
            name="Back"
            type="secondary"
            click={() => props.goBack()}
          />
          {/* <button
                        type="submit"
                        className="btn-right"
                    >
                        {props.btn}
                    </button> */}
          <Platformbutton name={props.btn} type="submit" />
        </div>
      )}
    </Form>
  );
};
