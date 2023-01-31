import React from 'react';
import low from '../../assets/lowrisk.svg';
import moderate from '../../assets/moderaterisk.svg';
import high from '../../assets/highrisk.svg';
import { Stepback } from 'components/common/stepback/stepback';
import './risklevel.scss';

export const Risklevel = props => {
  const goBack = () => {
    props.onClick(1);
  };
  return (
    <div className="risklevel-container">
      <Stepback onClick={goBack} />
      <p className="risklevel-title">What type of risk taker are you ? </p>
      <div className="risklevel-inner-container">
        <Singlerisk
          image={low}
          title="Low risk taker"
          subtitle="Your risk appetite is very conservative
                    You'll be recommended low risk funds"
          onClick={props.onClick}
        />
        <Singlerisk
          image={moderate}
          title="Moderate risk taker"
          subtitle="Your risk appetite is very conservative
                    You'll be recommended low risk funds"
          onClick={props.onClick}
        />
        <Singlerisk
          image={high}
          title="High risk taker"
          subtitle="Your risk appetite is very conservative
                    You'll be recommended low risk funds"
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

const Singlerisk = props => {
  return (
    <div className="singlerisk-container" onClick={() => props.onClick(3)}>
      <img src={props.image} alt="risk svg" />

      <div className="singlerisk-content">
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
        <p>
          Get Personalized Portfolio
          <i class="fas fa-chevron-right"></i>
        </p>
      </div>
    </div>
  );
};
