import React, { Component } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showAuthLoader } from 'appRedux/actions/Common/';
import { updateProfile, updateProfilePicture } from 'appRedux/actions/auth';
import { parse } from 'query-string';
import '../Admin.css';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { getProfile } from 'appRedux/actions/auth';
import Loader from 'components/Loader';
import { Avatar, Input, Form, Modal, Badge, Upload } from 'antd';
import { transferCash } from './actions/index';
import Layout from 'components/common/DashboardLayout';
import { useUserData } from 'helpers/hooks';

class Profile extends Component {
  state = {
    modal: false,
    profilePicture: '',
    uploading: false,
    selectedFile: null,
    fileList: [],
  };

  beforeUpload = () => {};

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('picture', file);
    });

    this.setState({
      uploading: true,
    });
    console.log(fileList);
    // You can use any AJAX library you like
    this.props.updateProfilePicture(formData);
  };

  updateProfilePic = () => {
    console.log('profile file', this.state.selectedFile);
  };

  componentDidMount() {
    const searchParams = parse(this.props.location.search);
    // const searchParams = parse('?status=success&transactionId=c98dff89-a1f9-403d-8151-088986f16a57&message=Successfully%20verified%20transaction?status=success&transactionId=1c16633b-24d2-4143-8737-94984a9b04bb&message=Successfully%20verified%20transaction');
    console.log('search p', searchParams);
    let count = 0;
    if (!_.isEmpty(searchParams && count)) {
      openNotificationWithIcon(searchParams.message);
      count += 1;
    }

    const { userData } = this.props;
    this.setState({ profilePicture: userData.profilePictureURL });
  }

  showModal = () => {
    this.setState({ modal: true });
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({ modal: false });
  };

  onInputChange = value => {
    console.log('changed', value);
    this.setState({ amount: value });
  };

  handleForm = values => {
    console.log(values);
    this.props.updateProfile(values);
    this.handleUpload();
    this.props.getProfile();
  };

  render() {
    const { modal, profilePicture, fileList } = this.state;
    const { loading, userData } = this.props;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
      maxCount: 1,
      listType: 'picture-card',
      showUploadList: false,
    };

    const profileForm = (
      <>
        <div className="text-center mb-4">
          <Upload {...props} style={{ width: '160px', height: '160px' }}>
            {profilePicture ? (
              <Badge count="edit">
                <Avatar
                  size={100}
                  style={{ borderRadius: '20px', width: '100%' }}
                  src={profilePicture}
                  alt="avatar"
                  // style={{ width: '100%' }}
                />
              </Badge>
            ) : (
              <button>upload</button>
            )}
          </Upload>
        </div>
        <div className="pr_form">
          <Form
            layout="vertical"
            requiredMark={false}
            initialValues={userData}
            onFinish={this.handleForm}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group col-md-6">
                <Form.Item
                  name="lastName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
            </div>

            <div className="form-group">
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input a valid email',
                  },
                ]}
              >
                <Input className="form-control" />
              </Form.Item>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <Form.Item
                  name="phoneNumber"
                  label="Mobile Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your mobile number',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group col-md-5">
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your location',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      message: 'Please input your city',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group col-md-5">
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    {
                      message: 'Please input your state',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <Form.Item
                  name="bvn"
                  label="Bank Verification Number (BVN)"
                  rules={[
                    {
                      message: 'Please input your bvn',
                    },
                  ]}
                >
                  <Input className="form-control" />
                </Form.Item>
              </div>
              <div className="form-group col-md-5">
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      message: 'Please input your password',
                    },
                  ]}
                >
                  <input type="password" className="form-control" />
                </Form.Item>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-around mt-5">
              <button
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  marginBottom: '10px',
                }}
              >
                Update
              </button>
              <button
                style={{
                  marginBottom: '10px',
                }}
                type="button"
                onClick={this.closeModal}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </>
    );

    const editProfile = (
      <Modal
        closeIcon={<></>}
        cancelButtonProps={{ style: { display: 'none' } }}
        visible={modal}
        footer=""
        width={600}
        centered={true}
        okButtonProps={{ style: { display: 'none' } }}
        maskStyle={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
        }}
        bodyStyle={{ padding: '20px' }}
        style={{
          padding: '0px',
          background: '#F7F7F7',
        }}
      >
        {loading ? <Loader /> : profileForm}
      </Modal>
    );

    const profile = (
      <div className="flex_page_container d-flex justify-content-start">
        <div className="p-5 w-100">
          <div className="row">
            <div className="col-md-8 mb-5">
              <p className="tr_sub mb-0">Full Name</p>
              <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
            </div>
            <div className="col-md-4 mb-0">
              <Avatar
                size={120}
                src={userData.profilePictureURL}
                style={{ borderRadius: '40px' }}
              />
            </div>
            <div className="col-md-12 mb-5">
              <p className="tr_sub mb-0">Email Address</p>
              <h4>{userData.email}</h4>
            </div>
            <div className="col-md-12 mb-5">
              <p className="tr_sub mb-0">Mobile Number</p>
              <h4>{userData.phoneNumber}</h4>
            </div>
            <div className="col-md-3 mb-5">
              <p className="tr_sub mb-0">Location</p>
              <h4>{userData.location}</h4>
            </div>
            <div className="col-md-3 mb-5">
              <p className="tr_sub mb-0">City</p>
              <h4>{userData.city}</h4>
            </div>
            <div className="col-md-3 mb-5">
              <p className="tr_sub mb-0">State</p>
              <h4>{userData.state}</h4>
            </div>
            <div className="col-md-6 mb-5">
              <p className="tr_sub mb-0">Bank Verification Number (BVN)</p>
              <h4>222**********</h4>
            </div>
          </div>
          <div className="row flex-wrap justify-content-start align-items-center ">
            <button
              style={{ background: '#000000' }}
              className="text-white mr-4 tr_btn mb-3 "
              onClick={this.showModal}
            >
              Edit Account
            </button>
            <Link
              to="/accounts/settings"
              style={{ background: '#000000', borderRadius: '14px' }}
              className="text-white tr_btn px-5 mb-3"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Layout>
          <div className="">
            <div className="d-flex">
              <div className="side_box_cont isw-container" />
              <div
                className=" isw-container"
                style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
              >
                {profile}
                {modal && editProfile}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { loading, error } = common;
  return {
    loading,
    error,
  };
};

const ConnectedProfile = connect(mapStateToProps, {
  transferCash,
  getProfile,
  updateProfile,
  updateProfilePicture,
  showAuthLoader,
})(Profile);
const FunctionalProfile = props => {
  const { userData } = useUserData();

  return <ConnectedProfile userData={userData} {...props} />;
};

export default FunctionalProfile;
