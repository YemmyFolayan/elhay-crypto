import React, { useEffect, useRef, useState } from 'react';
import '../Admin.css';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import Loader from 'components/Loader';
import Layout from 'components/common/DashboardLayout';
import { Form, Input, Modal, Select as AntdSelect } from 'antd';
import api from 'appRedux/api';
import { objectValuesStringify } from 'helpers/utils';

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allBanks, setAllBanks] = useState([]);
  const kycFrontRef = useRef();
  const kycBackRef = useRef();
  const [kycFileList, setKycFileList] = useState({ front: null, back: null });
  const handleChangeTransactionPin = async values => {
    setLoading(true);

    try {
      const res = await api.post('/auth/pin/change', values);
      console.log({ ...res });
      const { data } = res;
      openNotificationWithIcon(data.message, 'Transaction Pin', 'success');
      setShowModal(false);
    } catch (error) {
      if (error?.data?.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error?.data?.errors),
          'Transaction Pin',
          'error',
        );
      } else {
        const err = error?.data?.message || error.message;
        openNotificationWithIcon(err, 'Transaction Pin', 'error');
      }
    }
    setLoading(false);
  };

  const handleAddBankDetails = async values => {
    setLoading(true);

    try {
      const res = await api.post('/user/banks', values);
      console.log({ ...res });
      const { data } = res;
      openNotificationWithIcon(data.message, 'Bank Details', 'success');
      setShowBankModal(false);
    } catch (error) {
      if (error?.data?.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error?.data?.errors),
          'Bank Details',
          'error',
        );
      } else {
        const err = error?.data?.message || error.message;
        openNotificationWithIcon(err, 'Bank Details', 'error');
      }
    }
    setLoading(false);
  };

  const getAllBanks = async (name = '') => {
    const url = `banks?search=${name}`;
    try {
      const res = await api.get(url);
      console.log('All banks', res.data);
      const data = res.data.data;
      setAllBanks(data);
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Bank List',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIcon(error.data.message, 'Bank List', 'error');
      }
      console.log({ ...error });
    }
  };
  useEffect(() => {
    getAllBanks();
  }, []);
  return (
    <>
      <Layout>
        <div className="">
          <Modal
            destroyOnClose
            closeIcon={<></>}
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={showBankModal}
            footer=""
            centered
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div className="d-flex flex-column text-center  justify-content-center">
              <>
                <h4>Add Bank Details</h4>
                <Form onFinish={handleAddBankDetails}>
                  <div className="w-100 flex-fill pt-4">
                    <Form.Item
                      className="mb-4"
                      name="currency"
                      rules={[
                        {
                          required: true,
                          message: 'Please select currency!',
                        },
                      ]}
                    >
                      <AntdSelect
                        className="cur_dropdown"
                        style={{ width: 150 }}
                        placeholder="Choose Currency"
                      >
                        <AntdSelect.Option selected value="NGN_KOBO">
                          Naira
                        </AntdSelect.Option>
                      </AntdSelect>
                    </Form.Item>
                    <Form.Item
                      className="mb-4 w-50 mx-auto"
                      name="bankCode"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your bank code!',
                        },
                      ]}
                    >
                      <AntdSelect
                        showSearch
                        className="cur_dropdown"
                        style={{ width: 150 }}
                        placeholder="Choose Bank"
                        onSearch={value => {
                          getAllBanks(value);
                        }}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {allBanks.map(bank => (
                          <AntdSelect.Option key={bank.code} value={bank.code}>
                            {bank.name}
                          </AntdSelect.Option>
                        ))}
                      </AntdSelect>

                      {/* <Input
                        type="number"
                        style={{
                          padding: '20px',
                          background: '#F8FBF7',
                          borderRadius: '20px',
                          border: 'none',
                        }}
                        placeholder="Bank Code"
                      /> */}
                    </Form.Item>

                    <Form.Item
                      className="mb-4 w-50 mx-auto"
                      name="accountNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your account number!',
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        style={{
                          padding: '20px',
                          background: '#F8FBF7',
                          borderRadius: '20px',
                          border: 'none',
                        }}
                        placeholder="Account Number"
                      />
                    </Form.Item>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="d-flex flex-wrap justify-content-around mt-5">
                      <button
                        type="submit"
                        style={{
                          background: '#000000',
                          color: '#ffffff',
                          marginBottom: '10px',
                        }}
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        style={{
                          marginBottom: '10px',
                        }}
                        onClick={() => setShowBankModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Form>
              </>
            </div>
          </Modal>
          <Modal
            destroyOnClose
            closeIcon={<></>}
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={showModal}
            footer=""
            centered
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div className="d-flex flex-column text-center  justify-content-center">
              <>
                <h4>Set Transaction Pin</h4>
                <Form onFinish={handleChangeTransactionPin}>
                  <div className="w-100 flex-fill pt-4">
                    <Form.Item
                      className="mb-4 w-50 mx-auto"
                      name="newTransactionPin"
                      rules={[
                        {
                          required: true,
                          max: 4,
                          min: 4,
                          //   message: 'Please input your transaction pin!',
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        style={{
                          padding: '20px',
                          background: '#F8FBF7',
                          borderRadius: '20px',
                          textAlign: 'center',
                          letterSpacing: '16px',
                          border: 'none',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="mb-4 w-50 mx-auto"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input
                        type="password"
                        style={{
                          padding: '20px',
                          background: '#F8FBF7',
                          borderRadius: '20px',
                          border: 'none',
                        }}
                        placeholder="Password"
                      />
                    </Form.Item>
                  </div>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="d-flex flex-wrap justify-content-around mt-5">
                      <button
                        type="submit"
                        style={{
                          background: '#000000',
                          color: '#ffffff',
                          marginBottom: '10px',
                        }}
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        style={{
                          marginBottom: '10px',
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Form>
              </>
            </div>
          </Modal>
          <div
            className=" isw-container"
            style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
          >
            <div className="flex_page_container pt-4" id="savings">
              <h3 className="txt_2ch4 mt-3">Transaction Settings</h3>
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <div
                    style={{ background: '#F8FBF7', borderRadius: '18.6264px' }}
                    className="w-100 p-4 text-left mb-3"
                  >
                    <div className="row justify-content-between align-items-center">
                      <div className="col-sm-12">
                        <h3 className="txt_2ch4 mt-3">Change Transation Pin</h3>
                        <p>You can change your transaction pin here</p>
                      </div>
                      <div className="col-sm-12">
                        <button
                          onClick={() => setShowModal(true)}
                          className="tr_btn "
                          style={{
                            padding: '10px',
                            borderRadius: '20px',
                            border: 'none',
                            color: '#fff',
                          }}
                        >
                          Update Transaction Pin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    style={{ background: '#F8FBF7', borderRadius: '18.6264px' }}
                    className="w-100 p-4 text-left mb-3"
                  >
                    <div className="row justify-content-between align-items-center">
                      <div className="col-sm-12">
                        <h3 className="txt_2ch4 mt-3">Bank Details</h3>
                        <p>You can add your bank details here</p>
                      </div>
                      <div className="col-sm-12">
                        <button
                          onClick={() => setShowBankModal(true)}
                          className="tr_btn "
                          style={{
                            padding: '20px',
                            borderRadius: '20px',
                            border: 'none',
                            width: 'max-content',
                            color: '#fff',
                          }}
                        >
                          Add New
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ paddingLeft: '5%', paddingRight: '5%' }}
              className="flex_page_container pt-4"
            >
              <h3 className="txt_2ch4 mt-3">Kyc Uploads</h3>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-3">
                  Current (Required*):{' '}
                  {kycFileList.front?.name ?? 'Not Selected'}
                  <form style={{ display: 'none' }}>
                    <input
                      ref={kycFrontRef}
                      type="file"
                      accept="image/*"
                      id="kycFront"
                    />
                  </form>
                  <button
                    onClick={() => {
                      const fileElement = kycFrontRef.current;
                      fileElement.onchange = () => {
                        fileElement.files.length &&
                          setKycFileList({
                            ...kycFileList,
                            front: fileElement.files[0],
                          });
                      };
                      fileElement.click();
                    }}
                    className="p-4 font-bold"
                    style={{
                      background: 'rgb(248, 251, 247)',
                      borderRadius: '18.6264px',
                    }}
                  >
                    <span className="txt_2ch4">Set Kyc Image (Front)</span>
                  </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4 d-flex flex-column mb-3">
                  Current: {kycFileList.back?.name ?? 'Not Selected'}
                  <form style={{ display: 'none' }}>
                    <input
                      ref={kycBackRef}
                      type="file"
                      accept="image/*"
                      id="kycBack"
                    />
                  </form>
                  <button
                    onClick={() => {
                      const fileElement = kycBackRef.current;
                      fileElement.onchange = () => {
                        fileElement.files.length &&
                          setKycFileList({
                            ...kycFileList,
                            back: fileElement.files[0],
                          });
                      };
                      fileElement.click();
                    }}
                    className="p-4 font-bold"
                    style={{
                      background: 'rgb(248, 251, 247)',
                      borderRadius: '18.6264px',
                    }}
                  >
                    <span className="txt_2ch4">Set Kyc Image (Back)</span>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => {
                    const data = new FormData();
                    data.append('frontPicture', kycFileList.front);
                    data.append('BackPicture', kycFileList.back);
                    api
                      .patch('profiles/kyc-verification', data)
                      .then(() =>
                        openNotificationWithIcon(
                          'Kyc Documents',
                          'Kyc Uploaded successfully',
                        ),
                      )
                      .catch(({ response }) => {
                        openNotificationWithIconErr(
                          'Kyc Documents',
                          'Could not upload files',
                        );
                      });
                  }}
                  className="p-4 font-bold"
                  style={{
                    background: '#000000',
                    borderRadius: '18.6264px',
                  }}
                >
                  <span className="txt_2ch4 text-white">Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
