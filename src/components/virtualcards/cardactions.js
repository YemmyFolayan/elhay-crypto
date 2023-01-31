import React, { useState } from 'react';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Success } from 'components/common/success/success';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import vin from 'assets/vdeposit.svg';
import vout from 'assets/vout.svg';
import vrev from 'assets/vrev.svg';
import order from 'assets/orderphy.svg';
// import limit from "assets/cardlimit.svg"
import change from 'assets/changepin.svg';
// import freeze from "assets/confirmfreeze.svg"
import del from 'assets/deletecard.svg';
import frozen from 'assets/frozencard.svg';
import errorsvg from 'assets/error-2.svg';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Newprompt } from 'components/common/prompt/prompt';
// import { Platformbutton } from "components/common/button/button";
import moment from 'moment';

export const Singletransaction = props => {
  return (
    <div className="singletransaction" key={props.key}>
      <p className="singletransaction__title">{props.data.date}</p>
      {(props.data.transactions ?? []).map((item, index) => (
        <Atransaction data={item} key={index} />
      ))}
    </div>
  );
};

const Atransaction = props => {
  var currency =
    props.data.currency && props.data.currency.split('_')[0] === 'NGN'
      ? 'N'
      : '$';
  const type =
    props.data.type === 'CARD_LIQUIDATION'
      ? 'card liquidation'
      : props.data.type.split('_')[0];
  const sign =
    props.data.type === 'CARD_LIQUIDATION'
      ? '-'
      : props.data.type.split('_')[0] === 'DEBIT'
      ? '-'
      : '+';
  // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', };
  // const newDate =  (props.data.created_at || props.data.createdAt).includes('UTC') ? new Date(Date.UTC(props.data.created_at || props.data.createdAt)).toLocaleDateString("en-US", options): new Date(props.data.created_at || props.data.createdAt).toLocaleDateString("en-US", options);
  const transdate = moment(
    props.data.created_at || props.data.createdAt,
    'YYYY-MM-DD HH:mm:ss',
  );
  //    console.log(transdate)
  // const newDate =  (props.data.created_at || props.data.createdAt).includes('UTC') ? new Date(Date.UTC(props.data.created_at || props.data.createdAt)).toLocaleDateString("en-US", options): (transdate).toLocaleDateString("sv-SE", options);
  const charges = props.data.charges ? props.data.charges : 0;
  return (
    <div className="singletransaction__single">
      {/* {props.data.createdAt} */}
      <span className="singletransaction__left">
        <img
          src={
            type.includes('CREDIT')
              ? vin
              : type.includes('reversal')
              ? vrev
              : vout
          }
          alt="transaction svg"
        />
        {
          <p>
            A {type} of{' '}
            <strong>
              {currency}
              {props.data.amount / 100}{' '}
            </strong>{' '}
            •{' '}
            <strong>
              {' '}
              {transdate.format('dddd, MMMM Do YYYY, h:mm:ss a')}{' '}
            </strong>{' '}
            •{' '}
            <strong>{props.data.description && props.data.description}</strong>
            {/* {props.data.card_balance_before &&
                    <>• <strong>{props.data.narrative}</strong> • before <strong>${(props.data.card_balance_before/100).toLocaleString('en-us')}</strong> after <strong>${(props.data.card_balance_after/100).toLocaleString('en-us')}</strong> </>}   */}
          </p>
        }
      </span>
      <div className="singletransaction__right">
        <p
          className={`singletransaction__amount ${
            sign === '+' ? ' --credit' : ' --debit'
          } `}
        >
          {sign}
          {currency}
          {props.data.amount / 100}
        </p>
        {props.data.charges ? (
          <p className="singletransaction__charges">-${charges}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export const ChangePin = props => {
  const [step, setStep] = useState(0);

  var changeIt = () => {
    // e.preventDefault()
    props.changecardPin(
      {
        password: props.data.password,
        cardId: props.data.cardId,
        newCardPin: props.data.newCardPin,
      },
      props.name,
      setStep,
    );
  };

  var goToStart = () => {
    setStep(0);
  };
  switch (step) {
    case 0:
      return (
        <form onSubmit={() => setStep(1)} style={{ width: '100%' }}>
          <Titlesubtitle
            steps="Step 1 of 2"
            title="Change Virtual card PIN"
            subtitle={`Enter your NetWebPay password to start this process.`}
          />
          <Inputfloat
            type="password"
            label="vesti password"
            name="password"
            placeholder="Enter your NetWebPay password"
            value={props.data.password}
            disabled={false}
            onChange={props.setField}
          />

          <button
            className="cardlimit__btn"
            disabled={props.data.password ? false : true}
            onClick={() => setStep(1)}
          >
            Continue
          </button>
        </form>
      );
    case 1:
      return (
        <>
          <Titlesubtitle
            steps="Step 2 of 2"
            title="Change Virtual card PIN"
            subtitle={`Enter your desired new five(4) digits card PIN.`}
          />
          <Comptransaction
            title="Enter your desired new five(4) digits card PIN"
            setPin={props.setPinfield}
            loading={props.loading}
            goBack={() => setStep(0)}
            onFinish={changeIt}
            lower={true}
            len={props.name === 'Mono' ? 4 : 5}
          >
            <Backcontinue text="Continue" goBack={() => setStep(0)}>
              <button
                className="backcontinue__continue"
                disabled={
                  props.data.newCardPin
                    ? props.btn === '' || !props.loading
                      ? false
                      : true
                    : true
                }
              >
                {props.btn !== '' ? props.btn : ` Change PIN`}
              </button>
            </Backcontinue>
          </Comptransaction>
        </>
      );
    case 2:
      return (
        <Success
          title={`Succesful`}
          subtitle={`You successfully changed your virtual card PIN.`}
          btn="Done, Thank You."
          onClick={props.closepinModal}
        />
      );
    case 3:
      return (
        <Success
          image={errorsvg}
          button="Try Again"
          onClick={goToStart}
          title={`PIN update failed`}
          subtitle={props.message}
          // subtitle={'Your virtual card PIN change failed, try again.'}
          type="error"
        />
      );
    default:
      return <></>;
  }
};

export const Cardactions = props => {
  console.log(props.data);
  var status =
    props.data.cardStatus === undefined ? 'Active' : props.data.cardStatus;
  var data = [
    {
      image: order,
      name: 'Order physical card',
      click: props.order,
    },
    // {
    //     image:limit,
    //     name:'Set card limit',
    //     click: props.limit
    // },
    {
      image: change,
      name: 'Change card PIN',
      click: props.pin,
    },
    {
      image: frozen,
      name: status.includes('Inactive') ? 'Unfreeze Card' : 'freeze Card',
      click: props.freeze,
    },
  ];

  return (
    <div className={`cardactions ${props.action ? ' --active' : ''}`}>
      {(props.name.includes('Apto')
        ? data
        : props.name.includes('Stripe')
        ? data.slice(1, 3)
        : data.slice(1, 4)
      ).map((item, index) => (
        <span key={index} onClick={() => item.click()}>
          <img src={item.image} alt="Action" />
          <p>{item.name}</p>
        </span>
      ))}
    </div>
  );
};

export const Freezecard = props => {
  return (
    // <section className="freezecard">
    //     <img src={freeze} alt="freeze"/>
    //     <span>
    //         <p>Freeze This Card</p>
    //         <p> Are you sure that you want to
    //             freeze this card ? you won’t be able to unfreeze this card.
    //         </p>
    //     </span>
    //     <Backcontinue
    //         back="No,cancel"
    //         goBack={()=>props.cancel()}
    //         text="Yes, Freeze Card"
    //         continue = {()=> props.freeze()}

    //     />
    // </section>
    <Newprompt img={del}>
      <section className="freezecard">
        <span>
          <p>Delete This Card</p>
          <h6>
            {' '}
            Are you sure you want to delete this card ? note the{' '}
            <strong>${props.balance}</strong> will be liquidated to your Naira
            wallet.
            <strong> @{props.rate} </strong>
          </h6>
        </span>
        <Backcontinue
          back="No! Cancel"
          goBack={() => props.cancel()}
          text="Yes, Delete Card"
          continue={() => props.freeze()}
        />
      </section>
    </Newprompt>
  );
};

export const Ordercard = props => {
  const [step, setStep] = useState(0);

  switch (step) {
    case 0:
      return (
        <Shipping
          data={props.data}
          setData={props.setData}
          ordercard={props.ordercard}
          setStep={setStep}
          setInput={props.setInput}
          states={props.states}
        />
      );
    case 2:
      return (
        <Success
          title={`Succesful`}
          subtitle={`You successfully placed an  order for your physical card.`}
          btn="Done, Thank You."
          onClick={props.closeModal}
        />
      );
    case 3:
      return (
        <Success
          image={errorsvg}
          button="Try Again"
          onClick={() => setStep(0)}
          title={`Failed`}
          subtitle={props.message}
          type="error"
        />
      );
    default:
      return <></>;
  }
};

const Shipping = props => {
  return (
    <div className="ordercard" style={{ width: '100%' }}>
      <Titlesubtitle
        title="Order Physical Card"
        subtitle="Easily create virtual cards to cater for your needs."
      />

      <Singleselect
        value={props.data.region}
        options={props.states}
        onChange={value => props.setData({ ...props.data, region: value })}
        placeholder="Select States"
      />

      <div className="ordercard__location">
        <Inputfloat
          type="text"
          label="locality"
          name="locality"
          placeholder="Enter Your Locality"
          value={props.data.locality}
          disabled={false}
          onChange={props.setInput}
        />

        <Inputfloat
          type="number"
          label="Postal Code"
          name="postal_code"
          placeholder="Postal Code"
          value={props.data.postal_Code}
          disabled={false}
          onChange={props.setInput}
        />
      </div>

      <Inputfloat
        type="text"
        label="Street Address"
        name="street_one"
        placeholder="Enter Your Street Address"
        value={props.data.street_one}
        disabled={false}
        onChange={props.setInput}
      >
        <p className="apto-error">
          {props.data.street_one.split(' ').length > 3
            ? 'This is more than the format provided'
            : ' '}
        </p>
        <Shortinfo subject="E.g 504 Ammonite Ct " />
      </Inputfloat>

      {/* disabled={Object.values(props.data).slice(0,10).every(value => !!value) && props.data.billingAddress.split(' ').length <= 3 ?  false : true     }  */}
      <button
        className="backcontinue"
        disabled={
          Object.values(props.data)
            .slice(0, 6)
            .every(value => !!value) &&
          props.data.street_one.split(' ').length <= 3
            ? false
            : true
        }
        onClick={() => props.ordercard(props.setStep)}
      >
        Order Card
      </button>
    </div>
  );
};
