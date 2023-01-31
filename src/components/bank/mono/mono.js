import React from 'react';
import MonoConnect from '@mono.co/connect.js';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { Platformbutton } from 'components/common/button/button';

export default function Monoconnect(props) {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Loading Account Widget'),
      onSuccess: ({ code }) => {
        api
          .post('/mono/direct-payment/auth', { monoAuthToken: code })
          .then(() => {
            openNotificationWithIcon(
              'Successfully Linked Account',
              'Account',
              'success',
            );
            // console.log(`Linked successfully: ${code}`)
            props.move();
          })
          .catch(() => {
            console.log('Error Occured While connecting');
            openNotificationWithIconErr(
              'Erro occurred while trying to link account',
              'Link Account',
              'error',
            );
          });
      },
      // key: process.env.REACT_APP_MONO_API_KEY
      key: 'live_pk_cZdM0LvuIcAqJXp7tY2n',
      // key:process.env.MONO_SANDBOX_TEST_SEC_KEY
    });

    monoInstance.setup();

    return monoInstance;
    // eslint-disable-next-line
  }, []);

  return (
    <Platformbutton
      type="normal"
      name="Link Your Bank Account"
      click={() => monoConnect.open()}
    />
  );
}
