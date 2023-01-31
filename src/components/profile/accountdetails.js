import React, { useState, useEffect } from 'react';
import Singleinputlabel from 'components/common/inputs/singleinputlabel';
import api from 'appRedux/api';
import { connect } from 'react-redux';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { useDispatch } from 'react-redux';
import dummyAvatar from '../../assets/dummy-avatar.png';
import './accountdetails.scss';
import {
  fetchUserData,
  updateUsername,
  updateEmail,
  updateLocation,
  updateNumber,
  sendVerificationMail,
} from 'appRedux/actions/profile';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Referal } from 'components/referal/referal';
import { Platformbutton } from 'components/common/button/button';

const Accountdetails = props => {
  // const [inputs, setInputs] = useState({});
  const [profile, setProfile] = useState();
  const [error, setError] = useState({
    email: '',
  });
  const [btn, setButton] = useState('');

  const dispatch = useDispatch();

  var setInput = e => {
    dispatch(props.updateUsername(e.target.value));
    console.log(e.target.value);
    // setInputs({ ...inputs, [e.target.name]: [e.target.value] }, [inputs]);
  };

  var setLocation = value => {
    // dispatch(props.updateLocation(e.target.value))
    // console.log(e.target.value)
    // setInputs({ ...inputs, [e.target.name]: [e.target.value] }, [inputs]);

    dispatch(props.updateLocation(value.value));
  };

  var setNumber = e => {
    dispatch(props.updateNumber(e.target.value));
    console.log(e.target.value);
    // setInputs({ ...inputs, [e.target.name]: [e.target.value] }, [inputs]);
  };

  var setEmail = e => {
    var phoneRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g); //eslint-disable-line
    if (phoneRegex.test(e.target.value)) {
      console.log('bastard');
      dispatch(props.updateEmail(e.target.value));
      setError({ ...error, email: '' });
    } else {
      setError({ ...error, email: 'invalid email' });
    }

    console.log(e.target.value);
    // setInputs({ ...inputs, [e.target.name]: [e.target.value] }, [inputs]);
  };

  var changeProfilePicture = event => {
    event.preventDefault();
    setProfile(
      event.currentTarget.files.length && event.currentTarget.files[0],
    );

    var formData = new FormData();
    formData.append('picture', profile);
    api
      .patch('profiles/update-profile-picture', formData)
      .then(() => {
        openNotificationWithIcon(
          'Profile Picture',
          'Profile Picture Uploaded successfully',
          'success',
        );
        setProfile('');
      })
      .catch(({ response }) => {
        openNotificationWithIconErr(
          'Profile Picture',
          'Could not upload files',
          'error',
        );
      });
  };

  var submitForm = e => {
    e.preventDefault();
    setButton('Saving...');
    api
      .patch('/profiles', props.singleProfile)
      .then(() => {
        openNotificationWithIcon(
          `You have successfully updated your profile`,
          'Profile Update',
          'success',
        );
        setButton('');
      })

      .catch(({ response }) => {
        openNotificationWithIconErr(
          'Profile Update',
          'Could not upload profile',
          'error',
        );
        setButton('');
      });
  };

  useEffect(() => {
    props.fetchUserData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="accountdetails">
      <div className="accountdetails__inner">
        <div className="accountdetails__picture">
          <img
            src={
              props.userdata.profilePictureURL !== null
                ? props.userdata.profilePictureURL
                : dummyAvatar
            }
            alt="myprofile"
          />
          <input
            type="file"
            id="actual-btn"
            accept=".jpg, .jpeg, .png .JPG, .JPEG"
            onChange={e => changeProfilePicture(e)}
            hidden
          />
          <label for="actual-btn">Edit</label>
        </div>
        <form onSubmit={e => submitForm(e)} className="accountdetails__form">
          <Singleinputlabel
            type="text"
            label="Username"
            name="username"
            value={props.singleProfile.username}
            placeholder="Edit your username"
            disabled={false}
            onChange={setInput}
          />
          <Singleinputlabel
            type="text"
            label="Full Name"
            name="fullname"
            value={props.userdata.firstName + ' ' + props.userdata.lastName}
            disabled={true}
            onChange={setInput}
          />

          <Singleinputlabel
            type="text"
            label="Email"
            name="email"
            placeholder="Edit your Email address"
            value={props.singleProfile.email}
            disabled={true}
            onChange={setEmail}
            error={error.email}
          />
          <Singleinputlabel
            type="text"
            label="Phone Number"
            name="pnumber"
            placeholder="Edit your Phone number"
            value={props.singleProfile.phoneNumber}
            disabled={true}
            onChange={setNumber}
          />

          <Singleselect
            label="Location"
            sublabel="Edit your location"
            options={props.countries}
            value={{
              value:
                props.singleProfile.country || props.singleProfile.location,
              label:
                props.singleProfile.country || props.singleProfile.location,
            }}
            name="location"
            // disable={true}
            onChange={setLocation}
          />
          <span className="mb-4"></span>
          <div className="referal">
            <Referal
              title="Copy Referal Link"
              link={props.userdata.ReferalLink}
            />
          </div>
          <span className="mb-4"></span>
          <div className="referal">
            {props.userdata.emailVerified === false && (
              <Platformbutton
                type="normal"
                name="Verify Account"
                disabled={props.loading ? true : false}
                click={() => props.sendVerificationMail(props.userdata.id)}
              />
            )}
          </div>
          {/* <Singleinputlabel
                        type="text"
                        label="Location"
                        name="location"
                        value={props.singleProfile.location}
                        disabled={false}
                        onChange={setLocation}
                    /> */}

          <button
            className="save-changes"
            disabled={error.email.length > 1 ? true : false}
          >
            {btn !== '' ? btn : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile }) => {
  const { singleProfile, loading } = profile;
  return {
    singleProfile,
    profile,
    loading,
  };
};

export default connect(mapStateToProps, {
  fetchUserData,
  updateUsername,
  updateEmail,
  updateLocation,
  updateNumber,
  sendVerificationMail,
})(Accountdetails);
