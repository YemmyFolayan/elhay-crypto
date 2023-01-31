import React, { useState } from 'react';
import { Startnow } from 'components/common/startnow/startnow';
import robo from '../../assets/roboadvisor.svg';
import './startrobo.scss';
import { Risklevel } from './risklevel';
import { Reason } from './reason';
import { Singleportfolio } from 'components/portfolio/singleportfolio';
import { Asset } from 'components/portfolio/Asset';
export const Startrobo = () => {
  const [step, setStep] = useState(0);

  var nextStep = value => {
    setStep(value);
  };

  var nextOne = () => {
    setStep(1);
  };

  switch (step) {
    case 0:
      return (
        <Startnow
          image={robo}
          onClick={nextOne}
          btn="Get Started Now!"
          title="Hello there, want to grow your money?"
          subtitle="Grow your money over the long term in a
            diversified way  with the help of our computer
            algorithms and advanced software to build and
            manage your investment portfolio."
        />
      );

    case 1:
      return <Reason onClick={nextStep} />;

    case 2:
      return <Risklevel onClick={nextStep} />;
    case 3:
      return <Singleportfolio onClick={nextStep} />;
    case 4:
      return <Asset onClick={nextStep} />;

    default:
      return <>Errorr</>;
  }
};
