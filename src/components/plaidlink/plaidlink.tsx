// eslint-disable-next-line
import React, { useCallback, useState, useEffect} from 'react';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,

} from 'react-plaid-link';
import "./plaidlink.scss"
import { fetchLinkAccount, fetchLinkToken } from 'appRedux/actions/Common';
import { connect} from 'react-redux';
import { Platformbutton } from 'components/common/button/button';
const SimplePlaidLink = (props: any) => {
  const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        props.fetchLinkToken('bank/get_link_token', setToken)
        // eslint-disable-next-line
    }, []);

  

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // var myData : any = localStorage.getItem('userData')
    // var user = JSON.parse(myData);
    console.log(metadata)
    props.handleLinking({publicToken:publicToken, accountID: metadata.accounts[0].id})
      // eslint-disable-next-line
  }, []);
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    console.log('exited plaid')
    // console.log(error, metadata);
    
    // if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
    //   exit({force: true}, () => {
    //     console.log('exit!');
    //   });

    // }else {
    //   exit({force: true}, () => {
    //     console.log('exit!');
    //   });
    // }
  }, []);

 
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    <Platformbutton type='normal' name="Link Bank Account"  click={()=>open()} disabled={!ready} />
  );
  
};

const mapStateToProps = ({ common}:any) => {
  const {states} = common
  return {
      states
  };
};

const mapDispatchToProps:any = {
  fetchLinkToken,
  fetchLinkAccount
};
export default connect(mapStateToProps,mapDispatchToProps)(SimplePlaidLink);