import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/common/DashboardLayout';
// import dummyAvatar from 'assets/dummy-avatar.png';
import Britain from 'assets/Britain.png';
import sevisserv from 'assets/sevisserv.png';
import USA from 'assets/USA.png';
import usdepartment from 'assets/usdepartment.png';
import wesservice from 'assets/wesservice.png';
import ukvisa from 'assets/ukvisa.png';
//import { getCurrency, objectValuesStringify } from 'helpers/utils';
import Canada from 'assets/Canada.png';
import jobsvg from 'assets/jobsvg.svg';
import schsvg from 'assets/scholarship.svg';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import { fetchvestiPosts } from 'appRedux/actions/posts';
//import Modal from 'components/common/Modal';
// import { Form, Formik, Field} from 'formik';
import '../Admin.css';
import { useQuery } from 'react-query';
import { errorMessage } from 'helpers/utils';
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'
// import ru from 'javascript-time-ago/locale/ru.json'
import axios from 'axios';
import { useUserData } from 'helpers/hooks';
import { Singlepost } from './singlepost';
import { Singlemigration } from './singlemigration';
// import Notifybox from 'components/common/notifybox/notifybox';
// import Refer from "../../../assets/refer.svg"
import { navigate } from '@reach/router';
import { useState, useRef } from 'react';
import { Modal } from 'antd';
import { Newpost } from 'components/common/notifybox/newpost';
import { Profilepop } from 'components/profilepop/profilepop';
import { Creategroup } from 'components/creategroup/creategroup';
import { Singlegroup } from './singlegroup';
import { Membership } from 'components/membership/membership';
import { Createpost } from 'components/feeds/createpost';
// import { openReward } from 'appRedux/actions/domore';
// import {Singleprovider} from "./singleprovider"
// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(ru)

const NewDashboard = () => {
  const [profile, setProfile] = useState(false);

  const [member, setMinder] = useState(true);
  const [group, setGroup] = useState(false);
  const [post, setPost] = useState({
    title: 'moveMeIn12Months',
    description: '',
    image: '',
    button: 'Creating Post',
  });

  const [profiledetails, setDetails] = useState({
    image: '',
    name: '',
    username: '',
    email: '',
    userId: '',
  });

  const [scroll, setScroll] = useState();
  const scrollRef = useRef(null);

  // console.log('migrationfries');
  // const migrationfries = getTutorial();
  // console.log('migrationfries', migrationfries);

  const setInput = e => {
    var value = e.target.value;
    setPost({ ...post, description: value });
  };

  const setImage = e => {
    var value = e.target.files[0];
    console.log(value);
    setPost({ ...post, image: value });
  };

  var Remove = () => {
    setPost({ ...post, image: '' });
  };
  const createPost = e => {
    e.preventDefault();
    setPost({ ...post, button: 'Creating Post...' });
    var formData = new FormData();

    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('postPictureUrl', post.image);
    if (
      userData.firstName === null ||
      userData.firstName === '' ||
      userData.lastName === null ||
      userData.lastName === '' ||
      userData.profilePictureURL === null ||
      userData.profilePictureURL === '' ||
      userData.verifiedKyc !== 'APPROVED'
    ) {
      openNotificationWithIconErr(
        'Post',
        'Only Users with full profile details can post, go to your profile and update your profile.',
        'error',
      );
    } else {
      api
        .post('/create_post', formData)
        .then(res => {
          openNotificationWithIcon(
            'You have successfully created a post',
            'Success',
            'success',
          );

          dispatch(fetchvestiPosts());
          setPost({ description: '', image: '', button: 'Create Post' });
        })
        .catch(err => {
          openNotificationWithIconErr(errorMessage(err), 'Post', 'error');
          setPost({ description: '', image: '', button: 'Create Post' });
        });
    }
  };

  const closeProfile = () => {
    setProfile(false);
  };

  var closeMinder = () => {
    setMinder(false);
    localStorage.setItem('memberReminder', 'close');
  };

  const closeGroup = () => {
    setGroup(false);
  };

  // const setLinkPost = (id)=> {
  //   setShareModal({...shareModal, value:id});
  // }
  // eslint-disable-next-line
  const { data: postData, isSuccess: postFetched } = useQuery(
    'vesti-post',
    async () => {
      const data = (
        await axios.get(
          'https://wevesti.com/wp-json/wp/v2/posts/?categories=13',
        )
      ).data;

      return data;
    },
  );

  const { data: jobData } = useQuery('vesti-jobs', async () => {
    const data = (
      await axios.get('https://wevesti.com/wp-json/wp/v2/posts/?categories=18')
    ).data;

    return data;
  });

  const { data: schData } = useQuery('vesti-sch', async () => {
    const data = (
      await axios.get('https://wevesti.com/wp-json/wp/v2/posts/?categories=17')
    ).data;

    return data;
  });

  const { data: groupData } = useQuery('vesti-group', async () => {
    const data = (await api.get('/fetchAllGroups')).data.data;
    return data;
  });

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);

  // const navigateTo =() => {
  //   navigate('/savings')
  // }
  var goTofull = id => {
    navigate(`/fullpost/${id}`);
  };

  const { userData } = useUserData();
  useEffect(() => {
    dispatch(fetchvestiPosts());
  }, [dispatch]);

  var onScroll = () => {
    // const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
    const scrollTop = scrollRef.current.scrollTop;
    setScroll(scrollTop);
  };

  var filt = {
    address: 'England',
    name: 'Mark',
  };

  var exclusive = [
    '0-1 Candidate US',
    'Business Class',
    'First Class',
    '1000 Students',
  ];

  var myReminder = localStorage.getItem('memberReminder');
  return (
    <Layout>
      <div className="mt-4 feeds-dashboard">
        <div
          className="isw-container"
          style={{ height: '85vh', width: '100%', overflow: 'scroll' }}
        >
          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={profile}
            onCancel={closeProfile}
            destroyOnClose
            footer=""
            className="new-modal"
            centered={true}
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(103, 169, 72, 0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Profilepop
              image={profiledetails.image}
              name={profiledetails.name}
              username={profiledetails.username}
              email={profiledetails.email}
              userId={profiledetails.userId}
              closeSuccess={closeProfile}
            />
          </Modal>

          {(userData.planType === 'BASIC_USER' ||
            userData.planType === null) && (
            <Modal
              cancelButtonProps={{ style: { display: 'none' } }}
              visible={myReminder === 'close' ? false : member}
              onCancel={closeMinder}
              destroyOnClose
              footer=""
              className="new-modal"
              centered={true}
              okButtonProps={{ style: { display: 'none' } }}
              maskStyle={{
                background: 'rgba(103, 169, 72, 0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Membership feeds="feeds" close={closeMinder} />
            </Modal>
          )}

          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            visible={group}
            onCancel={closeGroup}
            destroyOnClose
            footer=""
            className="new-modal"
            centered={true}
            okButtonProps={{ style: { display: 'none' } }}
            maskStyle={{
              background: 'rgba(103, 169, 72, 0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Creategroup />
          </Modal>
          <div className=" flex_page_container d-flex justify-content-center">
            <div className=" row px-3 px-md-4 px-lg-5 w-100 pb-5">
              {/* <div className="col-12 mb-3">
                  <Titleheader
                    title="My Feeds"
                  />
                </div> */}
              {/* Left Main */}
              <div className="col-12 col-md-7 left-main">
                <Titleheader title="My Feeds" />
                <div
                  className="card mb-4 p-4 bg-white w-full overflow-y-scroll vesti-main-feed"
                  ref={scrollRef}
                  onScroll={() => onScroll()}
                  style={{ position: 'relative' }}
                >
                  <div className="create-post-container">
                    <Createpost
                      name={userData.firstName}
                      post={post}
                      setInput={setInput}
                      setImage={setImage}
                      createPost={createPost}
                      picture={userData.profilePictureURL}
                      remove={Remove}
                    />
                    {/* <Formik
                        initialValues={{
                          title: 'Currently in England',
                          description: '',
                          image: userData.profilePictureURL,
                        }}
                        onSubmit={(values, {resetForm}) => {
                          var fullContent = values.description.replace(/"/g, "'");
                          if (userData.firstName === null || userData.firstName === '' || userData.lastName === null || userData.lastName === '' || userData.profilePictureURL === null || userData.profilePictureURL === ''  || userData.verifiedKyc !== "APPROVED"  ) {

                            openNotificationWithIconErr(
                              
                              'Post',
                              'Only Users with full profile details can post, go to your profile and update your profile.',
                              'error',
                            );

                          }else {
                              api
                              .post('/createPost', {...values, description: fullContent, image: userData.profilePictureURL})
                              .then(res => {
                                openNotificationWithIcon(
                                  'You have successfully created a post',
                                  'Success',
                                  'success',
                                );

                                dispatch(fetchvestiPosts())
                                resetForm({values:''})

                              })
                              .catch(err => {
                                openNotificationWithIconErr(
                                  errorMessage(err),
                                  'Post',
                                  'error',
                                );
                                resetForm({values:''})
                              });
                          }
                          
                        }}
                      >
                        <Form>

                          <Field
                            style={{
                              width: '100%',
                              border: '1px solid #eaeaea',
                              background: '#f8f9f8',
                              borderRadius: '10px',
                            }}
                            as="textarea"
                            name="description"
                            placeholder="Type here...."
                            className="create-post focusGreen"
                            cols="45" rows="8"
                          />

                          <button  type="submit" className="btn d-flex justify-content-center align-items-center mt-3 mb-3"
                              style={{ background: '#000000', color: '#fff', width: '170px', height: '45px' }}>Create a Post
                          </button>
                        </Form>
                      </Formik> */}
                    {/* <p></p>
                      <hr className='mb-5'></hr> */}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4
                      className="font-weight-bold"
                      style={{
                        color: '#000000',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      NetWebPay Post
                    </h4>
                  </div>

                  <div className="" style={{ position: 'relative' }}>
                    {(scroll > 200) & (scroll < 30000) ? (
                      <Newpost />
                    ) : (
                      <div
                        style={{
                          height: '30px',
                          padding: '20px',
                          position: 'sticky',
                          top: '20%',
                        }}
                      ></div>
                    )}
                    {posts.map(
                      ({
                        id,
                        userId,
                        username,
                        firstName,
                        email,
                        lastName,
                        title,
                        description,
                        userComments,
                        profileUrl,
                        createdAt,
                        date,
                        hasLiked,
                        likes,
                        shares,
                        postPictureUrl,
                      }) => (
                        <Singlepost
                          key={id}
                          id={id}
                          username={username}
                          firstname={firstName}
                          lastname={lastName}
                          fullname={firstName + ' ' + lastName}
                          email={email}
                          userId={userId}
                          userData={userData}
                          title={title}
                          description={description}
                          userComments={userComments}
                          profileUrl={profileUrl}
                          createdAt={createdAt}
                          date={date}
                          fetchvestiPosts={fetchvestiPosts}
                          hasLiked={hasLiked}
                          likes={likes}
                          shares={shares}
                          setProfile={setProfile}
                          setDetails={setDetails}
                          postPictureUrl={postPictureUrl}
                          onClick={goTofull}
                        />
                      ),
                    )}
                  </div>
                </div>
                {/* Services */}

                <Interludescroll name="Services" link="/merchants">
                  <Interlude image={sevisserv} name="SEVIS" link="/merchants" />
                  <Interlude image={wesservice} name="WES" link="/merchants" />
                  <Interlude
                    image={usdepartment}
                    name="US VISA"
                    link="/merchants"
                  />
                  <Interlude
                    image={ukvisa}
                    name="UK STUDENT VISA"
                    link="/merchants"
                  />
                </Interludescroll>
                {/* MIGRATION FRIES */}
                <div className="card mb-4 p-4 bg-white w-full overflow-y-scroll">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4
                      className="font-weight-bold"
                      style={{ color: '#000000' }}
                    >
                      Migration Fries
                    </h4>
                  </div>
                  <div className="">
                    {(postData ?? []).map(
                      ({ id, title, content, date, userId }) => (
                        <Singlemigration
                          key={id}
                          id={id}
                          title={title}
                          content={content}
                          date={date}
                          // userId={userId}
                        />
                      ),
                    )}
                  </div>
                </div>
                {/* <Notifybox
                      name="Refer"
                      image ={Refer}
                      title="Refer Five(5) Friends"
                      subtitle="Get free N1500 when you refer Five (5) friends to join our vesti Community."
                      button="Refer Friends Now!"
                      click={()=>dispatch(openReward())}
                  />

                  <Notifybox
                      name="Saving"
                      image ={Refer}
                      title="Save with NetWebPay"
                      subtitle="Begin saving for your relocation, Earn up to 
                      12% on savings from our partners, 
                      terms and conditions apply."
                      button="Start Savings Now"
                      click ={navigateTo}
                  /> */}

                {/* Jobs */}
                <Interludescroll name="Jobs">
                  {(jobData ?? []).map((jobs, index) => (
                    <Interlude
                      key={index}
                      name={jobs.title.rendered}
                      image={jobsvg}
                      content={jobs.content.rendered}
                      link={`/fry/${jobs.id}`}
                      linkname="Read More"
                    />
                  ))}
                </Interludescroll>
                {/* Scholarhsips */}
                <Interludescroll name="Scholarships">
                  {(schData ?? []).map((sch, index) => (
                    <Interlude
                      key={index}
                      name={sch.title.rendered}
                      image={schsvg}
                      content={sch.content.rendered}
                      link={`/fry/${sch.id}`}
                      linkname="Read More"
                    />
                  ))}
                </Interludescroll>
              </div>
              {/* Dummy Col */}
              {/* <div className="col-12 col-md-1" /> */}
              {/* Dummy Col End*/}
              {/* Right Main */}
              <div className="col-12 col-md-5">
                <Titleheader title="Top Countries" />
                <Interludescroll name="Countries">
                  <Interlude
                    image={Britain}
                    content="If you’re travelling to United Kingdom, our travel advice and
                      updates give you practical."
                    link="/advice/f9415af9-12a2-42fd-bd74-af2ad8fdaefe"
                    linkname="Read more"
                  />
                  <Interlude
                    image={USA}
                    content="If you’re travelling to USA, our travel advice and
                      updates give you practical."
                    link="/advice/89bc2058-3f2a-4ad2-9131-a5d2e3510c9b"
                    linkname="Read more"
                  />
                  <Interlude
                    image={Canada}
                    content="If you’re travelling to Canada, our travel advice and
                      updates give you practical."
                    link="/advice/48c3e662-033d-4add-8a3a-d74f864b5aa8"
                    linkname="Read more"
                  />
                </Interludescroll>
                {userData.adminType === 'contentwriter' ||
                userData.adminType === 'superadmin' ? (
                  <div className="create-group" onClick={() => setGroup(true)}>
                    Create Group{' '}
                  </div>
                ) : (
                  <></>
                )}

                {/* Lower */}

                {/* <Titleheader
                    title="My Provider(s)"
                  />
                  <div className="row mb-5">
                    <Singleprovider/>
                  </div> */}

                <Titleheader title="My Group(s)" />
                <div className="row">
                  {userData.planType === 'BASIC_USER' ||
                  userData.planType === null
                    ? (groupData ?? [])
                        .filter(function(item) {
                          // eslint-disable-next-line
                          for (var key in filt) {
                            if (
                              item.name === '0-1 Candidate US' ||
                              item.name === 'Business Class' ||
                              item.name === 'First Class' ||
                              item.name === '1000 Students'
                            )
                              return true;
                            // return false;
                          }
                          return true;
                        })
                        .map((data, index) => (
                          <Singlegroup
                            image={data.profileUrl}
                            description={data.description}
                            id={data.id}
                            key={index}
                            name={data.name}
                            username={data.username}
                            // type={ data.name === "0-1 Candidate US"  || data.name === "Business Class" || data.name === "First Class" || data.name === "1000 Students"  ? "vesti_user" : ''}
                            type={exclusive.map(
                              (item, index) =>
                                item === data.name && 'vesti_user',
                            )}
                          />
                        ))
                    : (groupData ?? []).map(data => (
                        <Singlegroup
                          image={data.profileUrl}
                          description={data.description}
                          id={data.id}
                          name={data.name}
                          username={data.username}
                          type=""
                        />
                      ))}

                  {/* <h4 className="mb-2 ml-3 mt-3 font-weight-bolder" style={{ color: '#cccccc' }}>
                      Sponsored
                    </h4>
                    <div className="col-12">
                      <div className="card rounded" style={{ background: '#F8F6F5', width: '437px', height: '232px' }}>

                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Interludescroll = props => {
  return (
    <div
      className="card d-flex flex-column px-4 pt-4 pb-5 mb-5"
      style={{
        borderRadius: '10px',
        overflowX: 'scroll',
      }}
    >
      <h4 className="font-weight-bold mb-3" style={{ color: '#cccccc' }}>
        Recommended {props.name}
      </h4>
      <div className="d-flex">{props.children}</div>
      {props.link && (
        <a
          href={props.link}
          className="mt-4"
          style={{ color: '#000000', fontWeight: 600, fontSize: '1rem' }}
        >
          View More
          {props.name} -
        </a>
      )}
    </div>
  );
};
const Interlude = props => {
  return (
    <div
      className="p-3 d-flex flex-column justify-content-center align-items-center mr-3"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        boxShadow: '0px 0px 5px #F5F5F5',
        borderRadius: '10px',
        height: '250px',
        minWidth: '235px',
      }}
    >
      <img
        src={props.image}
        alt="proflie"
        style={{
          height: '60px',
          width: '60px',
          borderRadius: '50%',
        }}
        className="d-block bg-dark mb-1"
      />
      <p
        className="text-uppercase text-center mb-3 feedsinterlude__title"
        style={{
          fontWeight: 500,
        }}
      >
        {props.name}
      </p>
      {!props.content ? (
        <p
          style={{
            fontWeight: 300,
            fontSize: '.9rem',
          }}
          className="text-center mb-3 feedsinterlude__subtitle"
        >
          Easily Pay your {props.name} fees without hassle
        </p>
      ) : (
        <p
          className="feedsinterlude__subtitle"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
      )}
      <a
        href={props.link}
        style={{ color: '#000000', fontWeight: 500 }}
        // onClick={e => e.preventDefault()}
      >
        {props.linkname ? props.linkname : 'Pay Now'}{' '}
        <i className="fas fa-arrow-right" />
      </a>
    </div>
  );
};

export const Titleheader = props => {
  return (
    <h4 className="mb-2" style={{ color: '#cccccc' }}>
      {props.title}
    </h4>
  );
};
export default NewDashboard;
