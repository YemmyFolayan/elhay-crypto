import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './JoinNewsLetter.scss';
import circlesup from '../../../assets/circlesup.svg';
import circlesdown from '../../../assets/circlesdown.svg';
import arrowslant from '../../../assets/arrowslant.svg';
import SubModal from './Iframe';

export const JoinNewsLetter = () => {
  const [modal, showModal] = useState(false);

  var closeModal = () => {
    showModal(false);
  };

  const handleSubscription = () => {
    showModal(true);
  };

  return (
    <>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        maskClosable={false}
        visible={modal}
        onCancel={() => closeModal()}
        destroyOnClose
        footer=""
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <SubModal src="https://vesti.substack.com/embed" />
      </Modal>
     
    </>
  );
};
