import React from 'react';
import { Modal } from 'antd';
import './modal.scss';

export const Simplemodal = props => {
  return (
    <Modal
      closable={props.closable ? false : true}
      keyboard={props.closable ? false : true}
      cancelButtonProps={{ style: { display: 'none' } }}
      visible={props.visible}
      onCancel={props.onClick}
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
      {props.children}
    </Modal>
  );
};
