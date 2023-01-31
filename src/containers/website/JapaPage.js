import React, { useState } from 'react';
import { JapaTop } from 'components/website/japatop/JapaTop';
import JapaWithSense from 'components/website/japawithsense/JapaWithSense';
import StartJapaJourney from 'components/website/startjapajourney/StartJapaJourney';
import GreenBand from 'components/website/greenband/GreenBand';
import JoinCommunity from 'components/website/joincommunity/JoinCommunity';
import { FeedBack } from 'components/website/feedback/FeedBack';
import JapaFooter from 'components/website/japafooter/JapaFooter';
import { Navbar } from 'components/website/Navbar';
import GreenBlock from 'components/website/greenblock/GreenBlock';
import { Modal } from 'antd';
import { Japareg } from 'components/website/japatop/japareg';
export default function JapaPage() {
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
        <Japareg onClick={closeModal} />
      </Modal>
      <Navbar home="active" />
      <JapaTop onClick={openModal} />
      <JapaWithSense />
      <StartJapaJourney />
      <GreenBand />
      <JoinCommunity />
      <FeedBack />
      <GreenBlock />
      <JapaFooter />
    </div>
  );
}
