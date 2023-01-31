import React from 'react';
import { Navbar } from '../../components/website/Navbar';
import CoinVstBanner from 'components/website/CoinVstBanner';
import { Modal } from 'antd';
import { Joinwaitlist } from 'components/common/joinwaitlist/joinwaitlist';
import { useState } from 'react';
function Coin() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        footer=""
        className="new-modal"
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Joinwaitlist />
      </Modal>
      <Navbar home="active" />
      <CoinVstBanner showModal={showModal} />
    </div>
  );
}

export default Coin;
