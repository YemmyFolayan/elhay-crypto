import React from 'react';
import './pagination.scss';
export const Pagination = props => {
  return (
    <div className="pagination">
      <p
        className={`pagination__previous ${props.page === 1 && ' --disabled'}`}
        onClick={() => props.setPage(props.page > 1 ? props.page - 1 : 1)}
      >
        {`<`} Previous
      </p>
      {([...Array(props.totalPages)] ?? []).map((item, index) => (
        <p
          key={index}
          onClick={() => props.setPage(index + 1)}
          className={`pagination__single-page ${
            props.page === index + 1 ? ' active' : ''
          }`}
        >
          {index + 1}
        </p>
      ))}
      <p
        className={`pagination__next ${props.page === props.totalPages &&
          ' --disabled'}`}
        onClick={() =>
          props.setPage(props.page < props.totalPages ? props.page + 1 : 1)
        }
      >
        Next {`>`}{' '}
      </p>
    </div>
  );
};
