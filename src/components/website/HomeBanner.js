import React from 'react';
// import "./Styles/Global.css";
import './Styles/HomeBanner1.scss';
import avi from '../../assets/avi.png';
import wes from '../../assets/wes.png';
import ceu from '../../assets/ceuimage.png';
import uh from '../../assets/uh.PNG';
import sunderland from '../../assets/sunderland.png';
import usa from '../../assets/usadept.png';

import { Downloadvesti } from './downloadvesti/downloadvesti';
import { Dowithvesti } from './dowithvesti/dowithvesti';
import { International } from './international/international';
import { Getstarted } from './getstarted/getstarted';
import { Assured } from './assured/assured';
import { navigate } from '@reach/router';
import TrustedPatners from './trustedpartners/TrustedPatners';
import { JoinNewsLetter } from './joinnewsletter/JoinNewsLetter';
function HomeBanner() {
  return (
    <div>
      <div className="homepage-container">
        <Dowithvesti />
        <Getstarted />
      
        <International />

        <TrustedPatners />
        {/* <div style={{width: '80%'}}> */}
        <Downloadvesti />
        {/* </div> */}
        <Assured />
        <JoinNewsLetter />
      </div>
    </div>
  );
}

export default HomeBanner;
