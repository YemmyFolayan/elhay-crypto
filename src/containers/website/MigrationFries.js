import React, { useState } from 'react';
import { Navbar } from '../../components/website/Navbar';
import MigrationFriesBanner from 'components/website/MigrationFriesBanner';
import HomePageFooter from 'components/website/HomePageFooter';
import { Modal } from 'antd';
import { navigate } from '@reach/router';

import Signin from 'components/common/signinprompt/signin';

function Fries() {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState('');
  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const setId = id => {
    setSelected(id);
  };
  const goToNews = () => {
    navigate(`/fry/${selected}`);
  };
  return (
    <div>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        onCancel={closeModal}
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
        <Signin mycb={goToNews} />
      </Modal>
      <Navbar fries="active" />
      <MigrationFriesBanner
        openModal={openModal}
        closeModal={closeModal}
        setId={setId}
      />
      <HomePageFooter />
    </div>
  );
}

export default Fries;
