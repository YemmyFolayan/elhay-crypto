import { editStripeAccountModal } from 'appRedux/actions/Common';
import { walletAction } from 'appRedux/actions/wallets';
import Loader from 'components/Loader';
import { Tab } from 'components/tab/tab';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Accounttoggle } from "./accounttoggle";
import './balancecard.scss';
export const Newbalancecard = props => {
  // var account = true
  // const [active, setActive] = useState(0)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  var data = [
    {
      name: 'Founders ACCOUNT BALANCE',
      // amount:props.userdata.foundersFinancialBalance /100,
      amount: props.foundersBalance,
      type: 'Founders Card',
      buttons: [
        {
          name: `See Details`,
          click: () => dispatch(editStripeAccountModal(true)),
        },
        {
          name: `Add Money`,
          click: () =>
            dispatch(walletAction({ open: true, action: 'deposit' })),
        },
        {
          name: `Send Money`,
          click: () =>
            dispatch(walletAction({ open: true, action: 'withdraw' })),
        },
      ],
    },
    {
      name: 'balance',
      amount: props.currency ? props.nairaAmount : props.dollarAmount,
      accountNumber: props.accountNumber,
      buttons: [
        // {
        //     name:`Send ${props.currency ?'NGN':'USD'}`,
        //     click: () => props.send()
        // },
        {
          // name:`Add ${props.currency ?'NGN':'USD'}`,
          name: `Add Money`,
          click: () => props.deposit(),
        },
        {
          // name:`Send ${props.currency ?'NGN':'USD'}`,
          name: `Send Money`,
          click: () => props.withdraw(),
        },
        // {
        //     name:`Convert to NGN`,
        //     click: () => props.convert()
        // },
      ],
    },
  ];
  const [fulldata, setData] = useState(
    props.stripeVirtualAccountNumber ? data : [data[1]],
  );
  // eslint-disable-next-line
  var loan = [
    {
      name: 'balance',
      amount: props.loanAmountPaid,
      amounttwo: props.loanAmount,
      buttons: [
        {
          name: `Upload Form`,
          click: () => props.setUpload(true),
        },
        {
          name: `Extend Loan Duration`,
          click: () => props.withdraw(),
        },
      ],
    },
  ];
  var dat = props.stripeVirtualAccountNumber ? data : data[1];
  useEffect(() => {
    dat.length > 1 ? setData(dat) : setData([dat]);
    // eslint-disable-next-line
  }, [props.userdata, props.foundersBalance, props.currency]);
  if (props.userdata.walletInNGNKobo) {
    return (
      <div className="balancecontainer">
        <div className="balancecontainer__row">
          <Singlebalance
            data={fulldata[props.active]}
            // key={index}
            title={
              fulldata[props.active] &&
              fulldata[props.active].name.includes('Founders')
                ? fulldata[props.active].name
                : props.title
            }
            active={props.active}
            show={show}
            setShow={setShow}
            currency={props.currency}
            userdata={props.userdata}
            request={props.request}
            accountNumber={props.accountNumber}
            toggleCurrency={props.toggleCurrency}
            stripeVirtualAccountNumber={props.stripeVirtualAccountNumber}
          />
          {/* : <Loan item = {loan[0]} loanForm={props.loanForm}/>} */}
        </div>
        <div className="balancecontainer__boxes">
          {fulldata.length > 1 ? (
            (fulldata ?? []).map((item, index) => (
              <div
                key={index}
                className={`balancecontainer__boxes__box${
                  props.active === index ? ' --active' : ''
                }`}
                onClick={() => props.setActive(index)}
              ></div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const Singlebalance = props => {
  // var dispatch = useDispatch()

  return (
    <div
      className={`newbalance  ${props.title.includes('Founders') &&
        ' --founders'}`}
      key={props.key}
    >
      <div className="newbalance__top">
        <div className="newbalance__balance">
          <p>{props.title}</p>
          <span>
            <p className="currency">
              {props.title.includes('Founders')
                ? '$'
                : props.currency
                ? '₦'
                : '$'}
            </p>
            {/* <p>{ props.data.amount.toString() === 'NaN' ? 0.00 : props.show ? props.data.amount.toLocaleString('en-US') : 'XXX'}</p> <i className={`fas fa-${props.show ? 'eye': 'eye-slash'}`} onClick={()=>props.setShow(!props.show)}/>
             */}
            <p>
              {props.show
                ? props.data.amount.toString() === 'NaN'
                  ? 0.0
                  : props.data.amount.toLocaleString('en-US')
                : 'XXX'}
            </p>{' '}
            <i
              className={`fas fa-${props.show ? 'eye' : 'eye-slash'}`}
              onClick={() => props.setShow(!props.show)}
            />
          </span>
        </div>
        {/* {props.data.name === 'balance' &&<Accounttoggle
                    currency={props.currency}
                    toggleCurrency ={props.toggleCurrency}
                />
                } */}

        {props.data.name === 'balance' && (
          <Tab
            type="small"
            active={props.currency ? 'NGN' : 'USD'}
            tabs={['NGN', 'USD']}
            setActive={props.toggleCurrency}
            // new = {true}
            // click = {(value)=> setActive(value)}
          />
        )}
      </div>

      {!props.transfer && (
        <span className="newbalance__mid">
          {props.currency &&
          (props.accountNumber === null ||
            props.accountNumber === 'No Account' ||
            !props.accountNumber) ? (
            <p onClick={() => props.request()} className="newbalance__request">
              {' '}
              I Need An Account number <i class="fas fa-arrow-right"></i>{' '}
            </p>
          ) : (
            props.currency &&
            !props.title.includes('Founders') && (
              <>
                <p>PROVIDUS ACCOUNT NUMBER</p>
                <p>{props.data.accountNumber}</p>
              </>
            )
          )}
        </span>
      )}

      {/* {
                    // props.stripeVirtualAccountNumber && (props.currency === false && <p onClick={()=> dispatch(editStripeAccountModal(true))} className="newbalance__seedetails"> See Account Details <i class="fas fa-arrow-right"></i> </p>)
                    props.stripeVirtualAccountNumber && (props.active === 0 && <p onClick={()=> dispatch(editStripeAccountModal(true))} className="newbalance__seedetails"> See Account Details <i class="fas fa-arrow-right"></i> </p>)
                } */}

      {!props.transfer && props.data.buttons ? (
        <div className="newbalance__btns">
          {(props.stripeVirtualAccountNumber && props.active === 0
            ? props.data.buttons
            : props.currency
            ? props.data.buttons.slice(0, 3)
            : props.data.buttons.slice(0, 3)
          ).map((item, index) => (
            <button
              key={index}
              className="newbalance__btns__btn "
              onClick={() => item.click()}
            >
              {' '}
              {item.name}{' '}
            </button>
          ))}
        </div>
      ) : (
        <div className="newbalance__btns"></div>
      )}
    </div>
  );
};

export const Transferbalance = props => {
  const [show, setShow] = useState(false);
  var amount = props.currency ? props.nairaAmount : props.dollarAmount;
  return (
    <div className="balancecontainer --transfer">
      <div className="balancecontainer__row">
        <div className="newbalance">
          <div className="newbalance__top">
            <div className="newbalance__balance">
              <p>{props.title}</p>
              <span>
                <p className="currency">{props.currency ? '₦' : '$'}</p>{' '}
                <p>
                  {amount.toString() === 'NaN'
                    ? 0.0
                    : show
                    ? amount.toLocaleString('en-US')
                    : 'XXX'}
                </p>{' '}
                <i
                  className={`fas fa-${show ? 'eye' : 'eye-slash'}`}
                  onClick={() => setShow(!show)}
                />{' '}
              </span>
            </div>
            <Tab
              type="small"
              active={props.currency ? 'NGN' : 'USD'}
              tabs={['NGN', 'USD']}
              setActive={props.toggleCurrency}
              // new = {true}
              // click = {(value)=> setActive(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
// eslint-disable-next-line
const Loan = props => {
  return (
    <div className="loanbalance" key={props.index}>
      <div className="loanbalance__top">
        <div className="loanbalance__top__balance --left">
          <p>PROOF OF FUND INTEREST PAID</p>
          <span>
            <p className="currency">₦</p>{' '}
            <p>
              {props.item.amount.toString() === 'NaN'
                ? 0.0
                : props.item.amount.toLocaleString('en-US')}
            </p>
          </span>
        </div>
        <div className="loanbalance__top__balance --right">
          <p>PROOF OF FUND LOAN</p>
          <span>
            <p className="currency">₦</p>{' '}
            <p>
              {props.item.amounttwo.toString() === 'NaN'
                ? 0.0
                : props.item.amounttwo.toLocaleString('en-US')}
            </p>
          </span>
        </div>
      </div>

      <span className="loanbalance__mid"></span>
      <div className="loanbalance__btns">
        {(!props.loanForm
          ? props.item.buttons
          : props.item.buttons.slice(1, 2)
        ).map((item, index) => (
          <button
            key={index}
            className="newbalance__btns__btn "
            onClick={() => item.click()}
          >
            {' '}
            {item.name}{' '}
          </button>
        ))}
      </div>
    </div>
  );
};
