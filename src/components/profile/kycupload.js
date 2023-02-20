import React, { useEffect, useState } from 'react';
import api from 'appRedux/api';
import picture from '../../assets/picture.svg';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
import { Success } from 'components/common/success/success';
import pending from '../../assets/pending.svg';
import ccheck from '../../assets/circle-check.svg';
import './kycupload.scss';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
// import { Selectbox } from "components/common/inputs/selectbox";
import Inputfloat from 'components/common/inputs/inputfloat';
import errorsvg from 'assets/error-2.svg';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Singleselect } from 'components/common/inputs/singleselect';
import { navigate } from '@reach/router';
import { Platformbutton } from 'components/common/button/button';
export const Kycupload = props => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [type, setType] = useState('passport');
  // eslint-disable-next-line
  const [district, setDistrict] = useState('');
  const [step, setStep] = useState();
  // eslint-disable-next-line
  const [state, setState] = useState({
    type: '',
    identityNumber: '',
  });
  const [btn, setBtn] = useState({
    name: 'Validate KYC',
    value: true,
  });

  var options = [
    {
      label: 'passport',
      value: 'passport',
    },
    {
      label: 'BVN',
      value: 'BVN',
    },
    {
      label: 'nin',
      value: 'NIN',
    },
    {
      label: 'voters card',
      value: 'VOTERS_CARD',
    },
  ];

  // eslint-disable-next-line
  var setInput = e => {
    var value = e.target.value;
    setType(value);
    // setState({...state, type:value})
  };
  var setTy = value => {
    // var value = e.target.value;
    setType(value);
    setState({ ...state, type: value });
  };
  var __renderStep = value => {
    switch (value) {
      case '00':
        return setStep(1);
      // case '01':
      //     return setStep(1);
      default:
        return setStep(3);
    }
  };

  var uploadKyc = () => {
    setBtn({ ...btn, value: true, name: 'Uploading...' });
    var formData = new FormData();
    formData.append('frontPicture', front);
    formData.append('BackPicture', back);
    var timeoutOne = setTimeout(() => {
      setBtn({ ...btn, value: true, name: 'Still Uploading...' });
    }, 10000);

    var timeoutTwo = setTimeout(() => {
      setBtn({ ...btn, value: true, name: 'Just a little more...' });
    }, 20000);
    api
      .patch('/profiles/kyc-verification', formData)
      .then(() => {
        setBtn({ ...btn, value: true, name: 'Uploaded' });
        openNotificationWithIcon(
          'KYC Upload',
          'KYC document Uploaded successfully',
          'success',
        );
        setTy('');
        setFront('');
        setBack('');
        props.refetch();
        clearTimeout(timeoutOne);
        clearTimeout(timeoutTwo);
        setTimeout(() => {
          // window.location.reload()
          navigate('/myprofile?tab=kyc');
          window.location.reload();
        }, 500);
      })
      .catch(error => {
        openNotificationWithIconErr(errorMessage(error), 'Error', 'error');
        setBtn({ ...btn, value: false, name: 'Upload KYC' });
        clearTimeout(timeoutOne);
        clearTimeout(timeoutTwo);
      });
  };
  // eslint-disable-next-line
  var uploadKycno = () => {
    setBtn({ ...btn, value: true, name: 'Validatiing...' });
    var statedis = district
      ? district.label.includes('State')
        ? district.label.slice(0, -6)
        : district.label
      : '';
    var data =
      state.type.value === 'passport'
        ? {
            ...state,
            firstName: props.userdata.firstName,
            lastName: props.userdata.lastName,
          }
        : state.type.value === 'VOTERS_CARD'
        ? { ...state, type: state.type.value, state: statedis }
        : { ...state, type: state.type.value };
    api
      .post('/identity/verification', data)
      .then(res => {
        // alert(res.data.data.response_code)
        res.data.data.response_code === '00'
          ? openNotificationWithIcon(
              `${state.type.value} validation`,
              `${state.type.value} has been successfully validated.`,
              'success',
            )
          : res.data.response_code === '01' || res.data.response_code === '02'
          ? openNotificationWithIconErr(
              `${state.type.value} validation`,
              `${res.data.message} ID not found`,
              'error',
            )
          : openNotificationWithIconErr(
              `${state.type.value} validation`,
              `An Error occured reach out to help@elhay.com`,
              'error',
            );
        setBtn({ ...btn, value: false, name: 'Validate KYC' });

        __renderStep(res.data.data.response_code);

        props.refetch();
        // setTimeout(()=> {
        //     navigate('/myprofile?tab=kyc')
        //     window.location.reload()
        // }, 500)
      })
      .catch(error => {
        // console.log(error.data.data.response_code)
        // alert(error.data.data && error.data.data.response_code)
        openNotificationWithIconErr(errorMessage(error), 'Error', 'error');
        setBtn({ ...btn, value: false, name: 'Validate KYC' });
        setMessage(error.data.message);
        setStep(3);
      });
  };

  useEffect(() => {
    props.verifiedKyc === 'PENDING'
      ? setStep(0)
      : props.verifiedKyc === 'APPROVED'
      ? setStep(1)
      : props.verifiedKyc === true
      ? setStep(1)
      : props.verifiedKyc === 'DEFAULT' || props.verifiedKyc === false
      ? setStep(2)
      : setStep(3);
    // setStep(2)
    // eslint-disable-next-line
  }, []);

  var _renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Success
            image={pending}
            title="Pending"
            subtitle={` Your KYC Document is still waiting for approval.`}
          />
        );
      case 1:
        return (
          <Success
            title="Approved"
            subtitle={` Your KYC Document has been approved successfully.`}
          />
        );
      case 2:
        return (
          <div className="kycupload-inner-container">
            {/* <div className="kycupload-inner-container left">
                        <p>KYC Uploads</p>
                        <p>Upload KYC</p>
                    </div> */}

            <Titlesubtitle
              title="KYC (Know Your Customer)"
              subtitle="To avoid disruption of service, please kindly go ahead and provide your KYC document."
            />
            <div className="kycupload-inner-container right">
              {/* {props.verifiedKyc ==="DISAPPROVED" && <p className="disapproved">Your Kyc Verification Was Disapproved, Try again</p>} */}
              <Validdoc />
              <>
                <p>Select KYC Type</p>
                <Singleselect
                  value={state.type}
                  options={options}
                  name="type"
                  // disable={true}
                  onChange={setTy}
                />
                {state.type.value === 'passport' && (
                  <Kycdoc
                    value={front}
                    id="front-btn"
                    setValue={setFront}
                    title="Passport"
                    type={type.label}
                    setBtn={setBtn}
                    btn={btn}
                    remove={() => setFront('')}
                  />
                )}
              </>
              <span className="mt-4"></span>
              {state.type && state.type.value !== 'passport' && (
                <Inputfloat
                  label={`${state.type.label} NUMBER`}
                  type="text"
                  value={state.identityNumber}
                  placeholder={`Enter Your ${
                    state.type ? state.type.label : 'KYC'
                  } Number`}
                  onChange={e =>
                    setState({ ...state, identityNumber: e.target.value })
                  }
                />
              )}
              <span className="mt-2"></span>
              {state.type.value === 'VOTERS_CARD' && (
                <Singleselect
                  value={district}
                  options={props.state}
                  name="state"
                  // disable={true}
                  onChange={value => setDistrict(value)}
                />
              )}
              {state.type.value === 'passport' && (
                <Shortinfo
                  subject={
                    btn.name.includes('...')
                      ? 'This might take 2-3minutes to upload your document'
                      : 'This is a regulatory requirement for most organizations like ours doing cross border payments. To avoid disruption of service or limits on your transactions, please kindly go ahead and upload your KYC documents below '
                  }
                />
              )}
              <div className="updateprofile-btn-box">
                {/* <button className="save-changes" disabled={btn.value} onClick={uploadKycno}>
                            {btn.name}
                        </button> */}
                {state.type.value === 'passport' ? (
                  <Platformbutton
                    disabled={front.name ? false : true}
                    name={btn.name === 'Validate KYC' ? 'Submit' : btn.name}
                    type="normal"
                    click={() => uploadKyc()}
                  />
                ) : (
                  <button
                    className="save-changes"
                    disabled={
                      state.type &&
                      state.identityNumber &&
                      btn.name === 'Validate KYC'
                        ? false
                        : true
                    }
                    onClick={
                      state.type.value === 'passport' ? uploadKyc : uploadKycno
                    }
                  >
                    {btn.name}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={
              message ||
              'Your kyc doc failed our verification process, click button below to try again.'
            }
            button="Try Again"
            onClick={() => setStep(2)}
          />
        );
      default:
        return <>default</>;
    }
  };

  return <div className="kycupload-container">{_renderSteps()}</div>;
};
// eslint-disable-next-line
const Kycdoc = props => {
  return (
    <div className="kycdoc-container">
      {/* style={{ backgroundImage: props.value ?`url(${URL.createObjectURL(props.value)})` : '', objectFit:'cover'}}, */}
      <div className="kycdoc-inner-container">
        <img src={picture} alt="upload" />
        {!props.value ? (
          <>
            <input
              type="file"
              id={props.id}
              value={props.value}
              name={props.name}
              accept="image/*"
              onChange={e => {
                props.setValue(e.currentTarget.files[0]);
                props.setBtn({ ...props.btn, value: false });
              }}
              hidden
            />
            <label htmlFor={props.id}>
              {' '}
              Select {props.type} {props.title} To Upload
            </label>
            <p className="info">
              {' '}
              {props.info
                ? props.info
                : 'Image(jpg, jpeg, png) size of limit'}{' '}
              <strong>{` <`} 2MB </strong>
            </p>
          </>
        ) : (
          <button
            className="fileupload__container__remove"
            onClick={props.remove}
          >
            {' '}
            remove -{' '}
            {typeof props.value.name === 'undefined'
              ? props.name.name
              : props.value.name}
          </button>
        )}
      </div>
    </div>
  );
};

const Validdoc = () => {
  var data = [
    'Valid passport (International or local).',
    'Valid Driver’s License.',
    'Valid National Identity Card.',
    'Valid Voters card.',
  ];
  // var data = ['BVN','Valid National Identity Card.','Valid Voters card.']

  return (
    <div className="validdoc">
      <p className="validdoc__title">Acceptable documents</p>
      <p className="validdoc__subt">
        These are the type of documents we accept.
      </p>

      <div className="validdoc__list">
        {data.map((item, index) => (
          <p key={index}>
            <img src={ccheck} alt="ccheck-icon" /> {item}
          </p>
        ))}
      </div>
    </div>
  );
};
