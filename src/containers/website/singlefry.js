import React, { useEffect } from 'react';
import '../../components/website/Styles/singlefry.scss';
import Loader from 'components/Loader';
import { useState } from 'react';
import { Navbar } from 'components/website/Navbar';
import { Empty } from 'components/common/empty/empty';
import { useParams } from '@reach/router';
import axios from 'axios';
import HomePageFooter from 'components/website/HomePageFooter';
export const Singlefry = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // const [link, setLink]= useState('')

  const { postId } = useParams();
  // const openNewTab = ()=> {

  //     if(data.link){
  //         var x = document.getElementById("fry-content");
  //         var myLink = x.getElementsByTagName('a');
  //         setLink(myLink[0].innerText)
  //         myLink[0].addEventListener( 'click',  (e)=> {
  //             e.preventDefault();
  //             window.open(myLink[0].innerText, '_blank');
  //             // console.log(myLink[0].innerText)
  //         })
  //     }

  // }
  async function getPost() {
    try {
      const data = (
        await axios.get(`/wp-json/wp/v2/posts/${postId}`)
      ).data;
      //   console.log('Fetched Data', data);
      //   return data;
      setData(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();

    // eslint-disable-next-line
  }, []);
  //   openNewTab();
  if (loading) {
    return (
      <div id="fry-content">
        <Loader />
        {/* <a href=""></a> */}
      </div>
    );
  } else {
    return (
      <>
        <Navbar fries="active" />
        {data.link ? (
          <>
            <div className="singlefry-container">
              <div className="singlefry-inner">
                <p className="singlefry-title">{data.title.rendered}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: data.content.rendered }}
                  className="singlefry-content"
                  id="fry-content"
                ></div>
                {/* <a href="#">ASas</a> */}
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            <div className="singlefry-container" id="fry-content">
              <div className="singlefry-inner">
                <Empty
                  title="No Post"
                  subtitle="We are very sorry, the post you are looking for does not exist."
                />
                {/* <a href=""></a> */}
              </div>
            </div>
          </>
        )}
        <HomePageFooter />
      </>
    );
  }
};
