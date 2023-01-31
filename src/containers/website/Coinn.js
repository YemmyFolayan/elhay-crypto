import React from 'react';
import { Navbar } from '../../components/website/Navbar';
import CoinVstSuccess from 'components/website/CoinVstSuccess';
function Coin() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Navbar home="active" />
      <CoinVstSuccess />
    </div>
  );
}

export default Coin;
