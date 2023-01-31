import React, { useState, useEffect } from 'react';
import Signin from 'components/common/signinprompt/signin';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Importcredit } from 'components/credithistory/importcredit';
import { Assuredd } from 'components/website/assured/assuredd';
import Benefits from 'components/website/benefits/Benefits';
import CreditCardTop from 'components/website/creditcard/CreditCardTop';
import { Downloadvesti } from 'components/website/downloadvesti/downloadvesti';
import { Eligible } from 'components/website/eligible/Eligible';
import HomePageFooter from 'components/website/HomePageFooter';
import ThisWorks from 'components/website/howthisworks/ThisWorks';
import { Navbar } from 'components/website/Navbar';
// import Purpose from 'components/website/purpose/Purpose';
import TrustedPatners from 'components/website/trustedpartners/TrustedPatners';
import { navigate } from '@reach/router';

function VestiCreditCards() {
  const [modal, setModal] = useState({ name: '', value: false });
  const [step, setStep] = useState(0);

  var openNova = () => {
    // setModal({name:'nova', value:true})
    // window.Nova.fire()
    navigate('/credithistory');
  };
  var openSignin = () => {
    localStorage.getItem('userData')
      ? openNova()
      : setModal({ name: 'signin', value: true });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.onload = window.Nova.register({
      env: 'production',
      // process.env.REACT_APP_NOVA_PUBID
      publicId: process.env.REACT_APP_NOVA_PUBID,
      productId: process.env.REACT_APP_NOVA_PRID,
      userArgs: localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData')).id
        : '',
      hideButton: true,
      onSuccess: function(publicToken, status) {
        navigate('/credithistory');
      },
      onError: function() {},
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Simplemodal
        onClick={() => setModal({ name: '', value: false })}
        visible={modal.value}
      >
        {/* setModal({name:'nova',value:true})} */}
        {modal.name === 'signin' ? (
          <Signin mycb={() => navigate('/credithistory')} />
        ) : (
          <Importcredit
            title={step === 0 ? 'Import Credit History' : 'Credit history'}
            subtitle={
              step === 0
                ? 'New to the U.S.? vesti has partnered with Nova Credit, so now your credit in Nigeria can travel with you. Start the application for a NetWebPaycard by importing your foreign credit history'
                : 'Update on your Credit history report'
            }
            step={step}
            setStep={setStep}
            click={window.Nova.fire}
            // setShow={setShow}
          />
        )}
      </Simplemodal>
      <Navbar products="active" />
      <CreditCardTop click={openSignin} />
      {/* <Purpose/> */}
      <Eligible click={openSignin} />
      <ThisWorks />
      <Benefits click={openSignin} />
      <TrustedPatners />
      <Downloadvesti />
      <Assuredd />
      <HomePageFooter />
    </div>
  );
}

export default VestiCreditCards;
