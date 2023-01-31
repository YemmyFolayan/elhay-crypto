import React from 'react';
import './Styles/MigrationFriesBanner.scss';
import students from '../../assets/students.png';
import { Downloadvesti } from './downloadvesti/downloadvesti';
import axios from 'axios';

import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { navigate } from '@reach/router';
import Loader from 'components/Loader';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
function MigrationFriesBanner(props) {
  const [posts, setPosts] = useState({});
  const [filtered, setFilter] = useState({});
  const [clicked, setClicked] = useState('All');
  const [loading, setLoading] = useState(true);
  async function getTutorial() {
    try {
      const data = (await axios.get('https://wevesti.com/wp-json/wp/v2/posts'))
        .data;
      console.log('Fetched Data', data);
      //   return data;
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  var getPosts = (name, value) => {
    setLoading(true);

    axios
      .get(`https://wevesti.com/wp-json/wp/v2/posts/?categories=${value}`)
      .then(response => {
        setClicked(name);
        setPosts(response.data);
        setLoading(false);
      });
  };
  const { search } = useLocation();
  const values = queryString.parse(search);
  var tab = values.tab;

  var filterContent = (value, name) => {
    var data = [];
    setClicked(name);
    posts.filter(item => {
      // eslint-disable-next-line
      for (var ke in item.categories) {
        if (name === 'News') {
          if (!item.categories.includes(17) && !item.categories.includes(18)) {
            if (!data.includes(item)) {
              data.push(item);
            }
          }
        } else if (name === 'All') {
          if (item.categories.includes(value)) {
            if (!data.includes(item)) {
              data.push(posts);
            }
          }
        } else {
          if (item.categories.includes(value)) {
            if (!data.includes(item)) {
              data.push(item);
            }
          }
        }
      }
      return data;
    });
    setFilter(data);
    if (tab) {
      window.location.href = '/migrationfries';
    }
  };

  var SigninandMove = id => {
    // props.openModal();
    props.setId(id);
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (tab === 'jobs') {
      getPosts('Jobs', 18);
    } else if (tab === 'scholarships') {
      getPosts('Scholarship', 17);
    } else {
      getTutorial();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="migrationfries-container">
      <section class="bac-ground">
        <div class="vesti-fees">
          <p>
            NetWebPay willbecome the Bank of <br /> the Future For Immigrants.
          </p>
          <p>
            Founded by two Brothers who self-migrated to the U.S, <br />{' '}
            <a href="/">Olu and Abimbola</a> an AI Engineer and a migration
            attorney, <br /> vesti provides unique guidance and financial
            services for people.
          </p>
        </div>
        <div className="migrationfries-links">
          <p
            onClick={() => filterContent(0, 'All')}
            className={`jobs ${clicked === 'All' ? ' active' : ''}`}
          >
            {' '}
            All{' '}
          </p>
          <p
            onClick={() => filterContent(18, 'Jobs')}
            className={`jobs ${clicked === 'Jobs' ? ' active' : ''}`}
          >
            {' '}
            Jobs{' '}
          </p>
          <p
            className={`news ${clicked === 'News' ? ' active' : ''}`}
            onClick={() => filterContent(17, 'News')}
          >
            {' '}
            News{' '}
          </p>
          <p
            onClick={() => filterContent(17, 'Scholarship')}
            className={`scholarships ${
              clicked === 'Scholarship' ? ' active' : ''
            }`}
          >
            Scholarship
          </p>
        </div>
      </section>
      <div class="fries-container">
        <div
          class="row row-cols-1 row-cols-md-3 g-4"
          style={{ justifyContent: 'center' }}
        >
          {!loading ? (
            (filtered.length > 0 ? filtered : posts).map((post, index) => (
              <Post
                key={index}
                image={students}
                title={post.title.rendered}
                date={post.date}
                id={post.id}
                content={post.content.rendered}
                SigninandMove={SigninandMove}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="vesti-download-container">
        <Downloadvesti />
      </div>
    </div>
  );
}

const Post = props => {
  return (
    <div
      class="col rounded-3"
      onClick={e => {
        e.preventDefault();
        // navigate(`/fries/${props.id}`, { state: {content: props.content,title: props.title} });
        // localStorage.getItem('userData') ? navigate(`/fry/${props.id}`) : props.SigninandMove(props.id)
        navigate(`/fry/${props.id}`);
      }}
    >
      <div class="card h-100">
        {/* <div className="card-img-div">
                    <img src={props.image}  class="card-img-top" alt="participants"/>
                </div> */}

        <div class="card-body">
          <p class="vesti-color">
            Migration Fries &nbsp;&nbsp;<span> &#9679;</span>{' '}
            <span class="text-muted">
              <ReactTimeAgo date={Date.parse(props.date)} locale="en-US" />
            </span>
          </p>
          <h5 class="card-title vesti-color3">{props.title}</h5>
          {/* <p class="card-text vesti-color2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit enim iste tempora iure saepe. Voluptas aut assumenda quo dolore hic?.</p> */}
          <a href="/" class="vesti-color">
            Continue Reading
          </a>
        </div>
      </div>
    </div>
  );
};
export default MigrationFriesBanner;
