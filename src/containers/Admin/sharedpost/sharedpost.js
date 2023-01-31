import React, { useEffect } from 'react';
import './sharedpost.scss';

import api from 'appRedux/api';
import Loader from 'components/Loader';
import { Singlesharepost } from '../NewDashboard/postshare';
import { useState } from 'react';
import { Navbar } from 'components/website/Navbar';
import { Empty } from 'components/common/empty/empty';
import { useParams } from '@reach/router';
export const Sharedpost = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { postId } = useParams();
  useEffect(() => {
    api
      .get(`/getPostById/${postId}`)
      .then(res => {
        setData(res.data.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setData({
          error: 'No Such ID',
        });
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Navbar />
        {data.description ? (
          <>
            <div className="sharedpost-container">
              <div className="sharedpost-inner">
                <Singlesharepost
                  // key={id}
                  // id = {id}
                  username={data.username}
                  firstname={data.firstName}
                  lastname={data.lastName}
                  fullname={data.firstName + ' ' + data.lastName}
                  email={data.email}
                  title={data.title}
                  description={data.description}
                  profileUrl={data.profileUrl}
                  createdAt={data.createdAt}
                  date={data.date}
                  likes={data.likes}
                />
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            <div className="sharedpost-container">
              <div className="sharedpost-inner">
                <Empty
                  title="No Post"
                  subtitle="We are very sorry, the post with that ID does not exist"
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};
