import React, { useEffect } from 'react';
import '../sharedpost/sharedpost.scss';

import api from 'appRedux/api';
import Loader from 'components/Loader';
import { fetchvestiPosts } from 'appRedux/actions/posts';
import Singlepost from './singlepost';
import { useState } from 'react';
import { Empty } from 'components/common/empty/empty';
import { useParams } from '@reach/router';
import Layout from 'components/common/DashboardLayout';
import { useUserData } from 'helpers/hooks';
import { Stepback } from 'components/common/stepback/stepback';
import { navigate } from '@reach/router';
export const Fullpost = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { userData } = useUserData();

  const { postId } = useParams();

  var goBack = () => {
    navigate('/feeds');
  };
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
      <Layout>
        {data && data.error !== 'No Such ID' ? (
          <>
            <div className="sharedpost-container">
              <div className="sharedpost-inner">
                <Stepback onClick={goBack} />
                <Singlepost
                  key={data.userId}
                  // id = {id}
                  id={postId}
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
                  userComments={[]}
                  fetchvestiPosts={fetchvestiPosts}
                  hasLiked={data.hasLiked}
                  postPictureUrl={data.postPictureUrl}
                  userData={userData}
                />
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            <div className="sharedpost-container">
              <div className="sharedpost-inner">
                <Stepback onClick={goBack} />
                <Empty
                  title="No Post"
                  subtitle="We are very sorry, the post with that ID does not exist"
                />
              </div>
            </div>
          </>
        )}
      </Layout>
    );
  }
};
