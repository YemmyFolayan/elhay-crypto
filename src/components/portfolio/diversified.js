import React from 'react';
import { Graph } from 'components/common/graph/graph';
import './diversified.scss';
import { Percentage } from './percentage';

export const Diversified = () => {
  return (
    <div className="diversified">
      <p className="diversified__title">Diversified Portfolio</p>
      <div className="diversified__table">
        <table>
          <thead>
            <th>Asset</th>
            <th>Price History</th>
            <th>Market Value</th>
            <th>Return</th>
            <th>Target</th>
          </thead>
          <tbody>
            <Singlediversified price="5.0%" />
            <Singlediversified price="6.0%" />
            <Singlediversified price="5.5%" />
            <Singlediversified price="4.5%" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Singlediversified = props => {
  return (
    <tr className="singlediverse">
      <td>
        <p>DOJ</p>
        <p>The DOW Jones Industrial Average</p>
      </td>
      <td>
        <div className="singlediverse__gaph" style={{ height: '50px' }}>
          <Graph tooltip="no" />
        </div>
      </td>
      <td>$2,000</td>
      <td>
        <Percentage
          // drop="yes"
          price={props.price}
        />
      </td>
      <td>45%</td>
    </tr>
  );
};
