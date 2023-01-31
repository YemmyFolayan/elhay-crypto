import React, { useState, useEffect } from 'react';

import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import './dockyc.scss';
import Loader from 'components/Loader';
import api from 'appRedux/api';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import ccheck from 'assets/circle-check.svg';
import failed from 'assets/failed.svg';
export const Dockyc = props => {
  const [doc, setDoc] = useState({
    fileType: '',
    value: '',
    valueTwo: '',
  });
  const [doctypes, setTypes] = useState([]);
  const [loading, setLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [btnname, setBtnname] = useState('Upload Doc');
  const goBack = () => {
    props.move(3);
  };

  var fileType = value => {
    setDoc({ ...doc, fileType: value });
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.files[0];
    // console.log(e.target.files)

    setDoc({ ...doc, [name]: value });
    // setDoc({...doc, value:value})
  };
  const goContinue = () => {
    props.move(5);
  };

  var getDoctypes = e => {
    api.get('/sila/document_types').then(response => {
      var options = (response.data.data[1].document_types ?? []).map(
        (item, index) => ({
          value: item.name,
          label: item.label,
        }),
      );

      setTypes(options);
      console.log(response.data.data[1].document_types);
      setLoader(false);
    });
  };

  var uploadBack = () => {
    // e.preventDefault();
    var formData = new FormData();

    formData.append('fileType', doc.fileType.value);
    formData.append('silaDocumentPicture', doc.valueTwo);

    api
      .post('/sila/upload_document', formData)
      .then(response => {
        setMessage(response.data.data[1].data.message);
        setTimeout(() => {
          props.move(5);
        }, 1000);
      })
      .catch(err => {
        console.log(err.data.message);
        // setMessage(err.data.message)
        setMessage('Document upload failed, try again.');
      });
  };
  var uploadDoc = e => {
    e.preventDefault();
    var formData = new FormData();
    setBtnname('Uploading Doc...');
    formData.append('fileType', doc.fileType.value);
    formData.append('silaDocumentPicture', doc.value);
    formData.append('identityType', doc.fileType.label);
    api
      .post('/sila/upload_document', formData)
      .then(response => {
        doc.fileType.value === 'id_drivers_license' && uploadBack();
        setMessage(response.data.data[1].data.message);
        setBtnname('Doc Uploaded');
        doc.fileType.value !== 'id_drivers_license' &&
          setTimeout(() => {
            props.move(5);
          }, 1000);
      })
      .catch(err => {
        console.log(err.data.message);
        // setMessage(err.data.message)
        setMessage('Document upload failed, try again.');
      });
  };

  useEffect(() => {
    getDoctypes();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="dockyc">
        <Titlesubtitle
          title="Upload a Document • 3 of  3"
          subtitle="Please make sure all information on the document is visible and clear. We accept files in these formats: PNG, JPG, and PDF, no larger than 20MB."
        />
        <Singleselect
          label=""
          value={doc.fileType}
          options={doctypes}
          onChange={fileType}
        />

        {doc.fileType && (
          <Fileupload
            title={doc.fileType.value}
            id={1}
            id2={2}
            name="value"
            value={doc.value}
            doc={doc}
            nameTwo="valueTwo"
            setValue={setInput}
          />
        )}

        {message.includes('successfully') ? (
          <Shortinfo image={ccheck} subject={message} />
        ) : message ? (
          <Shortinfo image={failed} fail={true} subject={message} />
        ) : (
          <></>
        )}
        <button
          className="backcontinue__continue"
          style={{ marginTop: '20px' }}
          disabled={doc.value ? false : true}
          onClick={e => uploadDoc(e)}
        >
          {btnname}
        </button>

        <Backcontinue
          text="Confirm and Continue"
          goBack={goBack}
          // continue = {goContinue}
        >
          <button
            className="backcontinue__continue"
            disabled={
              message &&
              message.includes('successfully') &&
              doc.fileType !== '' &&
              doc.value
                ? false
                : true
            }
            onClick={() => goContinue()}
          >
            Confirm and Continue
          </button>
        </Backcontinue>
      </div>
    );
  }
};

const Fileupload = props => {
  return (
    <div className="kycdoc-container">
      <div className="kycdoc-inner-container">
        {/* <img src={picture} alt="upload"/> */}
        <input
          type="file"
          id={props.id}
          name={props.name}
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={e => props.setValue(e)}
          hidden
        />
        <label for={props.id}>
          {' '}
          {props.value
            ? props.value.name
            : ` Select ${
                props.title === 'id_drivers_license' ? 'Front ' : ''
              } ${props.title} To Upload`}{' '}
        </label>
        <p className="info">
          Image size of limit <strong>{` <`} 20MB </strong>
        </p>
      </div>
      {props.title === 'id_drivers_license' && (
        <div className="kycdoc-inner-container">
          {/* <img src={picture} alt="upload"/> */}
          <input
            type="file"
            id={props.id2}
            name={props.nameTwo}
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={e => props.setValue(e)}
            hidden
          />
          <label for={props.id2}>
            {' '}
            {props.doc.valueTwo
              ? props.doc.valueTwo.name
              : ` Select back page of ${props.title} To Upload`}{' '}
          </label>
          <p className="info">
            Image size of limit <strong>{` <`} 20MB </strong>
          </p>
        </div>
      )}

      {/* {props.value && <div className="overflow">
                <img src={URL.createObjectURL(props.value)} alt="preview"/>
            </div>} */}
    </div>
  );
};

// style={{ backgroundImage: props.value ?`url(${URL.createObjectURL(props.value)})` : '', objectFit:'cover'}}
