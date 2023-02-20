import { navigate } from '@reach/router';
import { openNotificationWithIconErr } from 'appRedux/actions/Common';
import api from 'appRedux/api';
import Layout from 'components/common/DashboardLayout';
import { errorMessage } from 'helpers/utils';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import './migration.scss';
import { Comment } from '../NewDashboard/comment';
import { useUserData } from 'helpers/hooks';
const AdviceDetail = ({ countryId }) => {
  const [openComment, setOpencomment] = useState({
    name: 'Open',
    value: false,
  });
  const { data, isLoading: loading, isError, isSuccess, error } = useQuery(
    ['adviceDetail', countryId],
    async () => (await api.get('/EachcountryContents/' + countryId)).data.data,
  );
  const advice = isSuccess ? data[0] : [];
  if (isError) {
    openNotificationWithIconErr(errorMessage(error));
  }

  const handleClick = () => {
    if (openComment.value) {
      setOpencomment({ value: false, name: 'Open' });
    } else {
      setOpencomment({ value: true, name: 'Close' });
    }
  };
  const { userData } = useUserData();

  return (
    <Layout>
      <div className="grid-container">
        <div className="container-fluid py-4">
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              navigate('/advice');
            }}
            style={{
              fontWeight: 500,
              fontSize: '1.1rem',
              color: '#000000',
              cursor: 'pointer',
            }}
            className="mb-3 text-uppercase"
          >
            <span className="mr-2 d-inline-flex align-items-center">
              <svg
                style={{ transform: 'rotate(180deg)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.219 10.7797C5.28867 10.8495 5.37143 10.9049 5.46255 10.9427C5.55367 10.9805 5.65135 11 5.75 11C5.84865 11 5.94633 10.9805 6.03745 10.9427C6.12857 10.9049 6.21133 10.8495 6.281 10.7797L10.781 6.27966C10.8508 6.20999 10.9063 6.12723 10.9441 6.03611C10.9819 5.94499 11.0013 5.84731 11.0013 5.74866C11.0013 5.65001 10.9819 5.55233 10.9441 5.46121C10.9063 5.37009 10.8508 5.28733 10.781 5.21766L6.281 0.717661C6.14017 0.576831 5.94916 0.497714 5.75 0.497714C5.55083 0.497714 5.35983 0.576831 5.219 0.717661C5.07817 0.858491 4.99905 1.0495 4.99905 1.24866C4.99905 1.44782 5.07817 1.63883 5.219 1.77966L9.1895 5.74866L5.219 9.71766C5.14915 9.78733 5.09374 9.87009 5.05593 9.96121C5.01812 10.0523 4.99866 10.15 4.99866 10.2487C4.99866 10.3473 5.01812 10.445 5.05593 10.5361C5.09374 10.6272 5.14915 10.71 5.219 10.7797Z"
                  fill="#000000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 5.74854C0 5.94745 0.0458074 6.13821 0.127345 6.27887C0.208883 6.41952 0.319471 6.49854 0.434783 6.49854L9.56522 6.49854C9.68053 6.49854 9.79112 6.41952 9.87265 6.27887C9.95419 6.13821 10 5.94745 10 5.74854C10 5.54962 9.95419 5.35886 9.87265 5.2182C9.79112 5.07755 9.68053 4.99854 9.56522 4.99854L0.434783 4.99854C0.319471 4.99854 0.208883 5.07755 0.127345 5.2182C0.0458074 5.35886 0 5.54962 0 5.74854Z"
                  fill="#000000"
                />
              </svg>
            </span>
            <span>Countries</span>
          </a>
          {loading ? (
            <div className="section-heading text-center">Loading Advice...</div>
          ) : isSuccess ? (
            <>
              <AdviceDetailComponent
                advice={advice}
                openComment={openComment}
                handleClick={handleClick}
                userData={userData}
              />
            </>
          ) : (
            isError && (
              <div className="section-heading text-center">
                Sorry This Category does not exist
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdviceDetail;

const AdviceDetailComponent = ({
  advice,
  openComment,
  userData,
  handleClick,
  ...rem
}) => {
  console.log(advice, rem);

  const user = useSelector(state => state.auth.authUser?.data);
  console.log(user);
  const commentText = useRef();
  const [commenting, setCommenting] = useState(false);
  const [step, setStep] = useState({
    value: 0,
    id: null,
  });
  let number = 0;
  const getStepDetails = () => {
    const description = advice.countryDescription[step.value];
    return {
      country: advice.country,
      updatedAt: advice.updatedAt,
      createdAt: advice.createdAt,
      ...description,
    };
  };
  const {
    id: descriptionId,
    countryId,
    country,
    countryImage,
    firstName,
    lastName,
    profilePicture,
    description,
    comment,
  } = getStepDetails();

  const setAdvice = (number, id) => {
    setStep({
      value: number,
      id: id,
    });
  };

  useEffect(() => {
    var currentId = advice.countryDescription[step.value].id;
    setAdvice(0, currentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="advice-detail mt-5">
      <div className="advice-detail-container">
        <div
          style={{
            fontWeight: 500,
            fontSize: '1rem',
            color: '#000000',
          }}
          className="mb-4 text-uppercase"
        >
          Migration Advice
        </div>

        <div className="advice-detail-top">
          <div
            style={{
              maxWidth: '600px',
            }}
            className="advice-detail-title mb-3"
          >
            Migrating into <strong> {country} </strong> • {step.value + 1}
          </div>
          <div className="steps-box">
            {advice.countryDescription.map(data => {
              var active = number++;
              return (
                <div
                  onClick={() => setAdvice(active, data.id)}
                  className={`advice-detail-steps ${
                    step.id === data.id ? ' active' : ' disabled'
                  }`}
                  key={data.id}
                ></div>
              );
            })}
          </div>
        </div>

        <div className="mb-3">
          <img
            src={countryImage}
            alt={country}
            style={{
              height: '400px',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '24px',
            }}
          />
        </div>
        <div className=" advice-publisher mb-3">
          <img
            style={{
              height: '30px',
              width: '30px',
              borderRadius: '50vw',
              border: '1px solid #000000',
            }}
            src={profilePicture}
            alt="profile"
          />
          <p>
            Published by{' '}
            <strong>
              {firstName} {lastName}{' '}
            </strong>
          </p>
        </div>
        <div
          className="advice-detail-content"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div className="py-3 font-weight-bold">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="21"
              viewBox="0 0 25 21"
              fill="none"
            >
              <path
                d="M23.2442 5.86377H22.5595V13.3896C22.5595 14.5614 21.8773 15.621 20.5096 15.621H7.10938V15.9788C7.10938 17.0147 8.28765 18.0605 9.49765 18.0605H19.7427L23.6622 20.365L23.0938 18.0605H23.2442C24.4534 18.0605 24.999 17.0172 24.999 15.9788V7.6503C24.999 6.61432 24.4534 5.86377 23.2442 5.86377Z"
                fill="#000000"
              />
              <path
                d="M18.5093 0.634766H2.94529C1.57592 0.634766 0 1.85126 0 3.02385V12.4566C0 13.5365 1.33522 14.3163 2.61596 14.4366L1.78246 17.6007L7.12334 14.4586H18.5093C19.8787 14.4586 21.1423 13.6284 21.1423 12.4566V4.82501V3.02385C21.1423 1.85126 19.8779 0.634766 18.5093 0.634766ZM5.31974 8.5973C4.54316 8.5973 3.91377 7.96791 3.91377 7.19133C3.91377 6.41476 4.54316 5.78537 5.31974 5.78537C6.0955 5.78537 6.7257 6.41476 6.7257 7.19133C6.7257 7.96791 6.0955 8.5973 5.31974 8.5973ZM10.5712 8.5973C9.79459 8.5973 9.1652 7.96791 9.1652 7.19133C9.1652 6.41476 9.79459 5.78537 10.5712 5.78537C11.3477 5.78537 11.9771 6.41476 11.9771 7.19133C11.9771 7.96791 11.3477 8.5973 10.5712 8.5973ZM15.8234 8.5973C15.0468 8.5973 14.4166 7.96791 14.4166 7.19133C14.4166 6.41476 15.0468 5.78537 15.8234 5.78537C16.5984 5.78537 17.2294 6.41476 17.2294 7.19133C17.2294 7.96791 16.5984 8.5973 15.8234 8.5973Z"
                fill="#000000"
              />
            </svg>
          </span>
          <span
            onClick={() => handleClick()}
            className={`open-comment ${
              openComment.value ? ' active' : ' disable'
            }`}
          >
            {openComment.name} Comments({comment === null ? 0 : comment.length})
          </span>
        </div>
        <div
          className={`comments-holder px-3 ${
            openComment.value ? ' active' : ' '
          }`}
        >
          {comment === null
            ? ''
            : comment.map(
                ({
                  id,
                  userId,
                  firstName,
                  lastName,
                  review,
                  profilePicture,
                }) => (
                  <div key={id} className="mb-3">
                    {/* <img
                  style={{
                    height: '24px',
                    width: '24px',
                    borderRadius: '50vw',
                    marginRight: '.5rem',
                  }}
                  src={profilePicture}
                  alt="profile"
                />
                <span style={{ fontWeight: 500 }}>
                  {firstName} {lastName}
                </span>
                <div className="mt-1">{review}</div> */}

                    <Comment
                      avatar={profilePicture}
                      username={firstName + '' + lastName}
                      description={review}
                      remove={true}
                      userData={userData}
                      authUserId={userData.id}
                      userId={id}
                      marginLeft={0}
                    />
                  </div>
                ),
              )}
        </div>
        <div
          className="comment-box"
          // style={{borderRadius: '30px' }}
        >
          <div className="text-uppercase pt-4 mb-2 comment-title">Comment</div>
          <div>
            <textarea
              // style={{ outline: 'none', border: 'none', resize: 'none' }}
              // className="w-100 bg-white rounded-lg p-2 mb-3"
              className="comment-textarea"
              name="comment"
              id="comment"
              rows="10"
              placeholder="Type in your comment..."
              ref={commentText}
            ></textarea>
          </div>
          {commenting && <span className="default-btn">Loading...</span>}
          {!commenting && (
            <a
              onClick={e => {
                if (commenting) return;
                setCommenting(true);
                e.preventDefault();
                const textarea = commentText.current;
                if (textarea.value.length > 0) {
                  api
                    .post('/countryContents/PostComment', {
                      comment: textarea.value,
                      CountryId: countryId,
                      descriptionId,
                    })
                    .then(() => {
                      comment.push({
                        id: Math.random(),
                        ...user,
                        review: textarea.value,
                      });
                    })
                    .finally(() => {
                      setCommenting(false);
                      textarea.value = '';
                    });
                }
              }}
              href="/"
              className="default-btn"
            >
              Add Comment
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
