import React from 'react';
import './creategroup.scss';
import { useState } from 'react';
import api from 'appRedux/api';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage } from 'helpers/utils';
export const Creategroup = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState('');

  const handleForm = e => {
    var name = e.target.name;
    var value = e.target.value;

    setForm({ ...form, [name]: value });
  };
  const submitForm = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('image', selectedFile);
    api
      .post('/createGroup', formData)
      .then(res => {
        openNotificationWithIcon(
          'You have successfully created  a Group',
          'Success',
          'success',
        );
      })
      .catch(err => {
        openNotificationWithIconErr(errorMessage(err), 'Post', 'error');
      });
    // axios
    //   .post(UPLOAD_URL, formData)
    //   .then((res) => {
    //     alert("File Upload success");
    //   })
    //   .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="creategroup-container">
      <div className="creategroup-inner-container">
        <p>Create Group</p>
        <form onSubmit={e => submitForm(e)}>
          <Input
            type="text"
            name="name"
            title="Enter group name"
            value={form.name}
            form={form}
            setValue={handleForm}
          />
          <Textarea
            type="text"
            name="description"
            value={form.description}
            handleChange={setForm}
          />
          <Input
            type="file"
            title="Select Group image"
            value={selectedFile}
            setValue={setSelectedFile}
          />

          <button className="create-group-btn"> Create Group </button>
        </form>
      </div>
    </div>
  );
};

const Input = props => {
  if (props.type === 'text') {
    return (
      <div className="custom-field">
        <p className="mt-2">{props.title}</p>
        <input
          type={props.type}
          name={props.name}
          placeholder={props.title}
          value={props.value}
          onChange={e => props.setValue(e)}
        />
      </div>
    );
  } else {
    return (
      <div className="file-uploader">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={e => props.setValue(e.target.files[0])}
        />

        {props.value && (
          <div className="image-preview">
            <img src={URL.createObjectURL(props.value)} alt="preview" />
          </div>
        )}
      </div>
    );
  }
};

const Textarea = props => {
  return (
    <div className="custom-field">
      <label>Enter group description </label>
      <textarea
        className="description-box"
        value={props.value}
        onChange={e =>
          props.handleChange({ ...props.form, [props.name]: e.target.value })
        }
        rows={5}
        cols={5}
      />
    </div>
  );
};
