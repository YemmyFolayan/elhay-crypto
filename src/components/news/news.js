import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import './news.scss';

export const News = () => {
  const [data, setData] = useState([]);
  var kId = 'PK3FDUJELNUP2XPRTAY1';
  var sk = 'YSYGDTpzvtWAWriAUvz5KPEkY9tGj7cDn6q2QmKc';
  var getNews = () => {
    axios
      .get('https://data.alpaca.markets/v1beta1/news', {
        headers: {
          'Apca-Api-Key-Id': kId,
          'Apca-Api-Secret-Key': sk,
        },
      })
      .then(response => {
        setData(response.data.news);
      });
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="news">
      <p className="news__title">News Updates</p>
      <div className="news__inner">
        {(data ?? []).map((item, index) => (
          <Singlenews
            key={index}
            date={item.created_at}
            headline={item.headline}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
};

const Singlenews = props => {
  return (
    <div className="singlenews">
      <div className="singlenews__top">
        <p>
          {' '}
          <strong>{props.author}</strong> •{' '}
          <ReactTimeAgo date={Date.parse(props.date)} locale="en-US" />
        </p>
        <p>{props.headline}</p>
      </div>
      <p className="singlenews__link">
        Read more <i class="fas fa-arrow-right"></i>
      </p>
    </div>
  );
};
