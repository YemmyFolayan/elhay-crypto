import React, { useEffect, useState, useRef } from 'react';
import { Silaprompt } from './silaprompt';
import { Createhandle } from './createhandle';
import { Createwallet } from './createwallet';
import { Success as Prompt } from 'components/common/success/success';
import { Silakyc } from './silakyc';
import { Dockyc } from './dockyc';
import api from 'appRedux/api';
import { Kycverification } from './checkverification';
import errorsvg from 'assets/error-2.svg';
import SimplePlaidLink from 'components/plaidlink/plaidlink.tsx';
import pending from 'assets/pending.svg';
import { navigate } from '@reach/router';
import { useUserData } from 'helpers/hooks';
import getBrowserFingerprint from 'get-browser-fingerprint';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  console.log(ref.current);
  return ref.current;
}

export const Sila = props => {
  const userData = localStorage.getItem('userData');
  const newData = useUserData();
  var date = new Date();
  const [step, setStep] = useState(0);
  const [loading, setLoader] = useState(false);
  const [reg, setReg] = useState([]);
  const [update, setUpdate] = useState([]);
  const [req, setReq] = useState('');
  const [uuid, setUuid] = useState('');
  const [ref, setRef] = useState('');
  const [data, setData] = useState({
    firstName: JSON.parse(userData).firstName,
    lastName: JSON.parse(userData).lastName,
    email: JSON.parse(userData).email,
    address: JSON.parse(userData).location,
    number: JSON.parse(userData).phoneNumber || '',
    dob: JSON.parse(userData).dob || date.toString(),
    ssn: '',
    city: '',
    state: '',
    zip: '',
    handle: '',
    handlecheck: '',
    kyctype: '',
    doctype: '',
    docvalue: '',
    walletName: '',
    walletUpdate: false,
    kycresult: '',
    process: 4,
  });
  const [upData, setUpdata] = useState('');
  const { address, city, state, zip } = data;
  const prevData = usePrevious({ address, city, state, zip });
  var setDob = value => {
    setData({ ...data, dob: value });
  };

  var goTobank = () => {
    navigate('/bank');
  };
  var checkHandle = e => {
    e.preventDefault();
    setLoader(true);

    api
      .get(`/sila/check_handle?handle=${data.handle}`)
      .then(response => {
        setData({ ...data, handlecheck: response.data.data[1].data.success });
        setLoader(false);
      })
      .catch(err => {
        setData({ ...data, handlecheck: false });
        setLoader(false);
      });
  };
  var requestKyc = () => {
    api
      .get(`/sila/request_kyc`)
      .then(response => {
        // setCheck(response.data.data)
        // setReg(response.data.data[1])
        console.log('Requested KYC Verfication');
        setReq(response.data.data[1].message);
        setStep(3);
      })
      .catch(err => {
        console.log(err);
        setReq(err.data.data[1].message);
        console.log('KYC request failed');
      });
  };
  var getUuid = () => {
    api.get('sila/get_entity').then(res => {
      console.log(res.data.data[1].data.emails[0].uuid);
      setUuid(res.data.data[1].data);
      return res.data.data[1].data.emails[0].uuid;
    });
  };
  var silaRegister = e => {
    e.preventDefault();
    const fingerprint = getBrowserFingerprint();
    var myData = {
      kycLevel: data.kyctype,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dob,
      email: data.email,
      phone: data.number,
      addressAlias: 'Home',
      address: data.address,
      city: data.city,
      state: data.state.value,
      zipCode: data.zip,
      ssn: data.ssn,
    };
    data.kyctype === 'INSTANT-ACH' && (myData.fingerprint = fingerprint);
    api
      .post(`/sila/register`, myData)
      .then(response => {
        console.log(response.data.data[1].data);
        setReg(response.data.data[1].data);

        // setTimeout(() => {
        //     response.data.data[1].data.success === true && requestKyc()
        // }, 1500)
        response.data.data[1].data.success === true && requestKyc();
        console.log('Registration Done');
      })
      .catch(err => {
        console.log('');
        setReg(err.data.data[1].data);
      });
  };
  var silaUpdate = e => {
    e.preventDefault();
    // var uid = getUuid();
    // const uid = uuid;
    // var myData = {phone: data.number, newAddressAlias: "Home Number Two", streetAddressOne:data.address, city:data.city, state:data.state.value, zipCode:data.zip, ssn : data.ssn, uuid:uid}

    api
      .patch(`/sila/update_user`, {
        ...upData,
        city: data.city,
        state: data.state.value,
        postalCode: data.zip,
        country: 'US',
      })
      .then(response => {
        console.log(response.data.data[1].data);
        setUpdate(response.data.data[1].data);

        setTimeout(() => {
          response.data.data[1].data.success === true && requestKyc();
        }, 1500);
        console.log('Registration Done');
      })
      .catch(err => {
        console.log(err.response.data.data[1].data);
        setUpdate(err.response.data.data[1].data);
      });
  };
  var updateWallet = e => {
    e.preventDefault();
    setData({ ...data, walletUpdate: true });
  };
  var setInput = e => {
    var name = e.target.name;
    var value = name === 'docvalue' ? e.currentTarget.files[0] : e.target.value;
    setData({ ...data, [name]: value });
    if (uuid !== '') {
      if (prevData.address !== newData.userData.location) {
        setUpdata({
          ...upData,
          streetAddressOne: data.address,
          addressUUID: uuid.addresses[0].uuid,
        });
      }
    }
  };

  var handleState = value => {
    setData({ ...data, state: value });
  };

  // const myData = localStorage.getItem('userData');
  var status = newData.userData.silaDocStatus;

  useEffect(() => {
    getUuid();
    if (status === 'DISAPPROVED') {
      setStep(7);
    } else if (status === 'PENDING') {
      setStep(6);
    } else {
      console.log(status);
    }
    // eslint-disable-next-line
  }, [ref]);

  // var aw = false
  if (status === 'APPROVED') {
    switch (step) {
      case 0:
        return (
          <Prompt
            title="Document Verification was Successful"
            subtitle={`Your document(s) passed the verification check, click the button below to finish up your process.`}
            button="Continue"
            onClick={() => setStep(1)}
          />
        );
      case 1:
        return (
          <Createwallet
            data={data}
            move={setStep}
            setInput={setInput}
            updateWallet={updateWallet}
          />
        );
      case 2:
        return <SimplePlaidLink move={setStep} goTobank={goTobank} />;
      case 3:
        return (
          <Prompt
            title="Wallet Successfully Linked"
            subtitle={`Perfect! You Have Set Up Your Personal Wallet
                            Which WIll Be Available To Use Shortly. We Will
                            Notify Soon About Card Activation Via Mail.`}
            button="Okay, Thank You."
            onClick={() => props.close()}
          />
        );
      case 4:
        return (
          <Prompt
            title="Account Linking Failed"
            subtitle={`We tried linking your account, but it failed, click the button below to try again.`}
            button="Try Again"
            type="error"
            onClick={() => setStep(2)}
          />
        );
      default:
        return <>Nothing to see OG </>;
    }
  } else {
    switch (step) {
      case 0:
        return <Silaprompt data={data} move={setStep} />;
      case 1:
        return (
          <Createhandle
            data={data}
            loading={loading}
            setInput={setInput}
            move={setStep}
            checkHandle={checkHandle}
            userData={newData.userData}
          />
        );
      case 2:
        return (
          <Silakyc
            data={data}
            setInput={setInput}
            setDob={setDob}
            move={setStep}
            handleState={handleState}
            reg={reg}
            update={update}
            silaRegister={silaRegister}
            silaUpdate={silaUpdate}
            uuid={uuid}
            userData={newData.userData}
            upData={upData}
            setUpdata={setUpdata}
          />
        );
      case 3:
        return (
          <Kycverification
            move={setStep}
            req={req}
            setRef={setRef}
            setReq={setReq}
          />
        );
      case 4:
        return <Dockyc data={data} setInput={setInput} move={setStep} />;
      case 5:
        return (
          <Prompt
            title="Upload Was Successful"
            subtitle={`Perfect! your document upload was successful,
                            it can take up to 2 business days to review documents once received
                            we will notify you to know if it passed verification.`}
            button="Okay, Thank You."
            onClick={() => props.close()}
          />
        );
      case 6:
        return (
          <Prompt
            image={pending}
            title="KYC Verification Pending"
            subtitle={`Your document verification is still PENDING, kindly be patient.`}
            button="Okay, Thank You."
            onClick={() => props.close()}
          />
        );
      case 7:
        return (
          <Prompt
            image={errorsvg}
            title="KYC Verification Failed"
            subtitle={`Sorry, your document failed verification, click the button below to try again.`}
            button="Try Document Upload Again."
            type="error"
            onClick={() => setStep(4)}
          />
        );
      default:
        return <>Nothing to see OG </>;
    }
  }
};
