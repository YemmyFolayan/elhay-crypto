import { Platformbutton } from 'components/common/button/button';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { removeCommaAmount, returnAmount } from 'helpers/utils';
import React from 'react';
import './currencyamount.scss';

export const Currencyamount = props => {
  var handleAmount = e => {
    var newValue = parseFloat(
      e.target.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ).toLocaleString('en-US');
    props.onAmountChange(newValue);
  };
  return (
    <div className="currencyamount">
      <div className="currencyamount__inputs">
        <span>
          <select
            class="currencyamount__inputs__select"
            id="contentselect"
            value={props.currency}
            onChange={e => props.handleCurrencyChange(e.target)}
          >
            <option value="USD_CENTS">($) USD</option>
            <option value="NGN_KOBO">(₦) NGN</option>
          </select>
          <Amountinputcurrency
            type="text"
            currency={props.currency === 'USD_CENTS' ? '$' : '₦'}
            name="amount"
            label="Amount in USD"
            value={returnAmount(props.amount)}
            disabled={false}
            //  placeholder="Enter amount to deposit"
            onChange={e => handleAmount(e)}
            pattern="[0-9,.]*"
          />
          {/* <input type="number" name = "amount" placeholder="Enter Amount" value={props.amount} onChange={ (e) => props.onAmountChange(e.target.value)}/> */}
        </span>
      </div>

      {/* <button className="currencyamount__btn" disabled={props.currency === "USD_CENTS" ? removeCommaAmount(props.amount ) < 1 ? true : false : removeCommaAmount(props.amount ) < 100 ? true : false} onClick={()=> props.onClick()}>
                {props.btn} <i class="fas fa-arrow-right"></i>
            </button> */}
      <div className="mb-4"></div>
      <Platformbutton
        name={props.btn}
        type="normal"
        disabled={
          props.currency === 'USD_CENTS'
            ? removeCommaAmount(props.amount) < 1
              ? true
              : false
            : removeCommaAmount(props.amount) < 100
            ? true
            : false
        }
        click={() => props.onClick()}
      />
    </div>
  );
};
