/* eslint-disable */

import React, { useEffect } from 'react';
import KycLv1 from './KycLv1';
import KycLv2 from './KycLv2';
import KycLv3 from './KycLv3';
import kycok from '../../assets/kycok.svg';
import kycyellow from '../../assets/kycyellow.svg';
import kycpending from '../../assets/kycpending.svg';
import kycbad from '../../assets/kycbad.svg';
import kycfailed from '../../assets/kycfailed.svg';
import completed from '../../assets/completed.svg';
import { useState } from 'react';
import './accordion.scss';
import { Backtrack } from 'components/common/back/back';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import caretdown from "../../assets/caretdown.svg";
// import circle from "../../assets/circle-check.svg";
function Kyc(props) {
  const [step, setStep] = useState('');

  useEffect(() => {
    props.userdata.kycLevel === 'Level0' && props.userdata.passedKyc === true
      ? setStep(3)
      : props.userdata.kycLevel === 'Level1' &&
        props.userdata.passedKyc === null
      ? setStep(1)
      : props.userdata.kycLevel === 'Level1' &&
        props.userdata.passedKyc === true
      ? setStep(1)
      : props.userdata.kycLevel === 'Level1' &&
        props.userdata.kycDocumentStatus === 'PENDING' &&
        props.userdata.passedKyc === false
      ? setStep(2)
      : props.userdata.kycLevel === 'Level1' &&
        props.userdata.kycDocumentStatus === 'DISAPPROVED' &&
        props.userdata.passedKyc === false
      ? setStep(1)
      : props.userdata.kycLevel === 'Level1' &&
        props.userdata.kycDocumentStatus === 'APPROVED' &&
        props.userdata.passedKyc === true
      ? setStep(4)
      : props.userdata.kycLevel === 'Level2' &&
        props.userdata.passedKyc === true
      ? setStep(4)
      : props.userdata.kycLevel === 'Level3' &&
        props.userdata.passedKyc === true
      ? setStep(0)
      : setStep(3);
    // setStep(3)
    // eslint-disable-next-line
  }, [props.userdata]);

  var _renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <>
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 1 Verification"
              color="#F0F3EE"
            />
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 2 Verification"
              color="#F0F3EE"
            />
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 3 Verification"
              color="#F0F3EE"
            />
          </>
        );
      case 1:
        return (
          <>
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 1 Verification"
              color="#F0F3EE"
            />
            <KycLv2
              state={props.state}
              refetch={props.refetch}
              userdata={props.userdata}
              verifiedKyc={props.userdata.verifiedKyc}
            />
            <KycLv3
              userdata={props.userdata}
              refetch={props.refetch}
              check={props.userdata.kycLevel === 'Level1' ? false : true}
            />
          </>
        );
      case 2:
        return (
          <>
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 1 Verification"
              color="#F0F3EE"
            />
            <NotificationAccordion
              image={kycyellow}
              picture={kycpending}
              title="Level 2 Verification"
              color="#FFF9F0"
              topcolor="#E99F0C"
              bottomcolor="#E99F0C"
              leftcolor="#E99F0C"
              rightcolor="#E99F0C"
            />
            <KycLv3
              userdata={props.userdata}
              refetch={props.refetch}
              check={props.userdata.kycLevel === 'Level1' ? false : true}
            />
          </>
        );
      case 3:
        return (
          <>
            <KycLv1
              state={props.state}
              refetch={props.refetch}
              userdata={props.userdata}
              verifiedKyc={props.userdata.verifiedKyc}
            />
            <KycLv2
              state={props.state}
              refetch={props.refetch}
              userdata={props.userdata}
              verifiedKyc={props.userdata.verifiedKyc}
            />
            <KycLv3
              userdata={props.userdata}
              refetch={props.refetch}
              check={props.userdata.kycLevel === 'Level1' ? false : true}
            />
          </>
        );
      case 4:
        return (
          <>
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 1 Verification"
              color="#F0F3EE"
            />
            <NotificationAccordion
              image={kycok}
              picture={completed}
              title="Level 2 Verification"
              color="#F0F3EE"
            />
            <KycLv3
              userdata={props.userdata}
              check={props.userdata.kycLevel === 'Level1' ? false : true}
              refetch={props.refetch}
            />
          </>
        );
      case 5:
        return (
          <NotificationAccordion
            image={kycyellow}
            picture={kycpending}
            title="Level 2 Verification"
          />
        );
      case 6:
        return (
          <NotificationAccordion
            image={kycok}
            picture={completed}
            title="Level 3 Verification"
          />
        );
      case 7:
        return (
          <NotificationAccordion
            image={kycbad}
            picture={kycfailed}
            title="Level 3 Verification"
            color="#FDE7E8"
          />
        );
      case 8:
        return (
          <NotificationAccordion
            image={kycyellow}
            picture={kycpending}
            title="Level 3 Verification"
          />
        );
      default:
        return <>default</>;
    }
  };

  return (
    <div>
      {props.userdata.country &&
        props.userdata.country.toLowerCase() !== 'nigeria' && (
          <Backtrack click={() => props.back()} />
        )}
      <div className="mb-4"></div>
      <Titlesubtitle title="KYC Verification" subtitle="" />
      {_renderSteps()}
    </div>
  );
}

export default Kyc;

function NotificationAccordion(props) {
  return (
    <>
      <div className="accordion">
        <div className="accordion-item" onClick={() => props.onClick}>
          <div
            className="accordion-title "
            style={{
              backgroundColor: `${props.color}`,
              borderTopColor: `${props.topcolor}`,
              borderBottomColor: `${props.bottomcolor}`,
              borderLeftColor: `${props.leftcolor}`,
              borderRightColor: `${props.rightcolor}`,
            }}
          >
            <div>{props.title}</div>
            <div>
              <img src={props.picture} alt="∧" />
            </div>
          </div>
          <img className="img-fluid picture" src={props.image} alt="" />
        </div>
      </div>
    </>
  );
}
