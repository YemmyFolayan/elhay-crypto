import React, { useState } from 'react';
import { Navbar } from '../../components/website/Navbar';
import HomePageFooter from 'components/website/HomePageFooter';
import { Downloadvesti } from 'components/website/downloadvesti/downloadvesti';
import JobDescriptionBanner from 'components/website/jobdescription/JobDescriptionBanner';
import { Modal } from 'antd';
import { JobApplication } from 'components/website/jobdescription/JobApplication';

function JobDescription() {
  const [modal, showModal] = useState(false);

  var openModal = () => {
    showModal(true);
  };
  var closeModal = () => {
    showModal(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        onCancel={closeModal}
        destroyOnClose
        footer=""
        //   className="new-modal"
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(103, 169, 72, 0.2)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <JobApplication onClick={closeModal} />
      </Modal>
      <Navbar home="active" />
      <JobDescriptionBanner onClick={openModal} />
      <Downloadvesti />
      <HomePageFooter />
    </div>
  );
}

export default JobDescription;
