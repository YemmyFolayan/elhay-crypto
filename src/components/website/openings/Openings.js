import { filter } from 'lodash';
import React from 'react';
import chevron from '../../../assets/chevron.svg';
import filterimg from '../../../assets/musicadjust.svg';
import searchh from '../../../assets/searchh.svg';
import './Openings.scss';

function Openings() {
  return (
    <div>
      <div className="openings-container">
        <div className="openings-container-inner">
          <p>Job Openings</p>
          <div className="search-area">
            <div class="input-group-lg">
              <span class="input-group-text">
                <img className="img-fluid h-100" src={searchh} alt="" />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search Team"
              />
              <span class="input-group-text">
                <img className="img-fluid h-100" src={filterimg} alt="" />
              </span>
            </div>
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>All Teams</option>
              <option value="1">Backend Developer</option>
              <option value="2">Backend Developer</option>
              <option value="3">Backend Developer</option>
            </select>
          </div>
          <SingleOpenings Title="Program Manager" Text="Remote - Fulltime" />
          <SingleOpenings Title="Frontend Developer" Text="Remote - Fulltime" />
          <SingleOpenings Title="Product Designer" Text="Remote - Fulltime" />
          <SingleOpenings
            Title="Digital Account Manager"
            Text="Remote - Fulltime"
          />
        </div>
      </div>
    </div>
  );
}

export default Openings;

const SingleOpenings = props => {
  return (
    <>
      <div className="long-btn">
        <div className="single-position">
          <a href="#">{props.Title}</a>
          <br /> <p className="text-muted">{props.Text}</p>
        </div>
        <span className="btn__icon">
          <img src={chevron} alt="" />
        </span>
      </div>
    </>
  );
};
