import {
  FETCH_POSTS_START,
  FETCH_POSTS,
  FETCH_POSTS_FAIL,
} from 'appRedux/constants';
import api from 'appRedux/api';

export const fetchvestiPosts = () => {
  return dispatch => {
    dispatch({ type: FETCH_POSTS_START });
    const url = '/fetchAllPosts?page=1&page_limit=100';
    api
      .get(url)
      .then(response => {
        const data = response.data.data;
        return dispatch({ type: FETCH_POSTS, payload: data });
      })
      .catch(error => {
        // console.log("errrrrrrrr",error);
        dispatch({ type: FETCH_POSTS_FAIL, payload: error });
      });
  };
};
