import React from 'react';
import dummyAvatar from 'assets/dummy-avatar.png';
import '../Admin.css';
import { navigate } from '@reach/router';
import { openUpgradeBox } from 'appRedux/actions/update';
import { useDispatch } from 'react-redux';
export const Singlegroup = props => {
  const dispatch = useDispatch();
  return (
    <div
      className="col-12 mt-3"
      key={props.name}
      onClick={() => {
        props.type.includes('vesti_user')
          ? dispatch(openUpgradeBox())
          : navigate(`/group/${props.id}`);
      }}
    >
      <div
        className="card ml-2 rounded bg-white "
        style={{ borderRadius: '20px' }}
      >
        <div
          style={{
            height: '150px',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#222',
            objectFit: 'cover',
            backgroundPosition: '30% 30%',
            backgroundSize: ' cover',
            backgroundImage: `url(${props.image})`,
            // display:'flex',
            // alignItems:'center',
            // justifyContent:'center',
            margin: '0 auto',
          }}
        >
          {/* <img src = {props.image} alt="group-poo" style={{width:'800px',backgroundSize:' cover',backgroundPosition: '50% 50%', objectFit: 'cover'}}/> */}
        </div>

        <div className="px-3 mt-3">
          <h3>{props.name}</h3>
          <div className="d-flex" style={{ width: '90%' }}>
            <div
              className="mt-2"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '100%',
                backgroundColor: '#000000',
              }}
            />
            <p className="pl-2">{props.description}</p>
          </div>
        </div>

        <div
          className="align-items-center px-4 mt-2 mb-2"
          style={{ display: 'inline-flex', flexDirection: 'row' }}
        >
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '100%',
              position: 'relative',
              border: '4px solid #fff',
              overflow: 'hidden',
              marginLeft: '-20px',
            }}
          >
            <img
              src={dummyAvatar}
              alt="proflie"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </span>
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '100%',
              position: 'relative',
              border: '4px solid #fff',
              overflow: 'hidden',
              marginLeft: '-10px',
            }}
          >
            <img
              src={dummyAvatar}
              alt="proflie"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </span>
          <span
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '100%',
              background: '#F0F3EE',
              color: '#121243',
              marginLeft: '-10px',
              position: 'relative',
              border: '4px solid #fff',
              overflow: 'hidden',
            }}
          >
            +70
          </span>
          Participants
        </div>
      </div>
    </div>
  );
};
