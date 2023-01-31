import React from 'react';
import { Navbar } from '../../components/website/Navbar';
// import CoinVstSuccess from 'components/website/CoinVstSuccess';
import CardPageFooter from 'components/website/cardpagefooter/CardPageFooter';
import CorporateEntities from 'components/website/coporateentities/CorporateEntities';
import { WhatsvestiCard } from 'components/website/whatsvesticard/Whatsvesticard';
import CardOfferings from 'components/website/cardofferings/CardOfferings';
import CreateCards from 'components/website/createcard/CreateCard';
import BenefitCards from 'components/website/benefitcards/BenefitCards';
import SafetyAndSecurity from 'components/website/safetyandsecurity/SafetyAndSecurity';
import Vesticard from 'components/website/vestiCard/Vesticard';
import { useState } from 'react';
import Reservecard from 'components/website/reservecard/reservecard';
import { Modal } from 'antd';
import { navigate } from '@reach/router';
function Vesticards() {
  const [modal, showModal] = useState(false);

  var openModal = () => {
    showModal(true);
  };
  var closeModal = () => {
    showModal(false);
    setTimeout(() => {
      navigate('/bank');
    }, 100);
  };
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
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
        <Reservecard />
      </Modal>
      <Navbar vcards="active" />
      <vesticard openModal={openModal} />
      <CorporateEntities />
      <WhatsvestiCard openModal={openModal} />
      <CardOfferings />
      <BenefitCards />
      <CreateCards openModal={openModal} />
      <SafetyAndSecurity />
      <CardPageFooter openModal={openModal} />
    </div>
  );
}

export default Vesticards;
