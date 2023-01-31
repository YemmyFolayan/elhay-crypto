import React, { useRef, useState } from 'react';
import { Monocard, Singlecard } from './singlecard';
// import { Cardactions } from "./cardactions";
import cfund from 'assets/cfund.svg';
import cfreeze from 'assets/freeze.svg';
import cpin from 'assets/cpin.svg';
import climit from 'assets/climit.svg';

export const CardtransInfo = () => {
  var data = [
    {
      name: '$1 - $80',
      fee: '$1',
    },
    {
      name: '$81 - $150',
      fee: '$2',
    },
    {
      name: '$151 - $500',
      fee: '$3',
    },
    {
      name: '$501 - $1000',
      fee: '$5',
    },
    {
      name: 'Above $1000',
      fee: '$5',
    },
  ];
  return (
    <section className="cardinfo">
      <span className="cardinfo__top">
        <p>Transaction Amount</p>
        <p>Transaction Fee</p>
      </span>
      {data.map((item, index) => (
        <span className="cardinfo__detail" key={index}>
          <p>{item.name}</p>
          <p>{item.fee}</p>
        </span>
      ))}
    </section>
  );
};

export const Carddesign = props => {
  if (props.name === 'Mono') {
    return (
      <>
        <Monocard
          data={{ ...props.data, providerName: 'Mono' }}
          display="yes"
          details="Mycard"
        />
        <Cardbottom
          action={props.action}
          setAction={props.setAction}
          setpinModal={props.setpinModal}
          setLimit={props.setLimit}
          limitmodal={props.limitmodal}
          setOpen={props.setOpen}
          openModal={props.openModal}
          FreezeUnfreeze={props.FreezeUnfreeze}
          data={{ ...props.data, providerName: 'Mono', cardColor: 'Black' }}
        />
      </>
    );
  } else {
    return (
      <>
        <Singlecard data={props.data} display="yes" details="Mycard" />
        <Cardbottom
          action={props.action}
          setAction={props.setAction}
          setpinModal={props.setpinModal}
          setLimit={props.setLimit}
          limitmodal={props.limitmodal}
          setOpen={props.setOpen}
          openModal={props.openModal}
          FreezeUnfreeze={props.FreezeUnfreeze}
          name={props.name}
          data={props.card}
        />
      </>
    );
  }
};

const Cardbottom = props => {
  console.log(props.data);
  var actions = [
    { name: 'fund', img: cfund, click: () => props.openModal() },
    {
      name: 'Delete',
      img: cfreeze,
      click: () => {
        props.setAction(!props.action);
        // FreezeUnfreeze()
        props.data.cardStatus.includes('Inactive')
          ? props.FreezeUnfreeze()
          : props.setLimit({
              ...props.limitmodal,
              name: 'freeze',
              value: true,
            });
      },
    },
    { name: 'convert to ₦', img: climit, click: () => props.openModal('NGN') },
    {
      name: 'PIN',
      img: cpin,
      click: () => {
        props.setAction(!props.action);
        props.setpinModal(true);
      },
    },
  ];
  return (
    <span className="carddetail__btn">
      {props.name !== 'Stripe' && (
        <div className="carddetail__btns">
          {actions.map((item, index) => (
            <span className="" key={index} onClick={() => item.click()}>
              <img src={item.img} alt="action svg" />
              <p>{item.name}</p>
            </span>
          ))}
        </div>
      )}
    </span>
  );
};

export const Carddetails = props => {
  var data = [
    {
      name: 'type',
      value: props.data.cardType,
    },
    {
      name: 'name',
      value:
        props.data.cardObject.card_name ||
        props.data.cardHolderObject.card_name ||
        props.data.cardHolderObject.name,
    },
    {
      name: 'number',
      value: props.data.cardNumber
        ? props.data.cardNumber.toString().replace(/(\d{4})/g, '$1 ')
        : props.data.cardNumber,
    },
    {
      name: 'cvv',
      value: props.data.cardCVC,
    },
    {
      name: 'card status',
      value: props.data.cardStatus,
    },
    {
      name: 'billing address',
      value: props.data.cardAddress,
    },
    {
      name: 'Account Number',
      value: props.data.ddaNumber,
    },
    {
      name: 'routing number',
      value: props.data.routingNumber,
    },
  ];
  var dataStripe = [
    {
      name: 'type',
      value: props.data.cardType,
    },
    // {
    //     name:'name',
    //     value:props.data.cardObject.card_name || props.data.cardHolderObject.card_name || props.data.cardHolderObject.name
    // },
    {
      name: 'Expiry Date',
      value: props.data.cardExpMonth,
    },
    {
      name: 'number',
      value: props.data.cardNumber
        ? props.data.cardNumber.toString().replace(/(\d{4})/g, '$1 ')
        : props.data.cardNumber,
    },
    {
      name: 'cvv',
      value: props.data.cardCVC,
    },
    {
      name: 'card status',
      value: props.data.cardStatus,
    },
    {
      name: 'billing address',
      value: props.data.cardAddress,
    },
    {
      name: 'Account Number',
      value: props.userdata.stripeVirtualAccountNumber
        ? props.userdata.stripeVirtualAccountNumber
        : '',
    },
    {
      name: ' Account Routing Number',
      value: props.userdata.stripeVirtualAccountRoutingNumber
        ? props.userdata.stripeVirtualAccountRoutingNumber
        : '',
    },
    {
      name: ' Bank Name',
      value: props.userdata.stripeVirtualBankName
        ? props.userdata.stripeVirtualBankName
        : '',
    },
    {
      name: ' Swift Code',
      value: props.userdata.stripeVirtualSwiftCode
        ? props.userdata.stripeVirtualSwiftCode
        : '',
    },
  ];
  return (
    <div className="carddetail">
      <Title title="Card Details" />

      <div className="carddetail__bottom">
        {(props.data.providerName === 'Apto'
          ? data
          : props.data.providerName === 'Stripe'
          ? dataStripe
          : data.slice(0, 6)
        ).map((item, index) => (
          <div
            key={index}
            className={`carddetail__bsingle ${
              item.name === 'card status'
                ? item.value.includes('Inactive')
                  ? ' --inactive'
                  : ' --active'
                : ''
            }`}
          >
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MonoCarddetails = props => {
  const [copied, setCopied] = useState();

  const board = useRef(null);
  // var billing = props.data.billing_address
  var data = [
    {
      name: 'type',
      value: 'Virtual Card',
    },
    {
      name: 'name',
      value: props.data.cardName,
    },
    {
      name: 'number',
      value: props.data.cardNumber,
    },
    {
      name: 'cvv',
      value: props.data.cardCVC,
    },
    {
      name: 'Expiry Date',
      value: props.data.cardExpMonth + ' / ' + props.data.cardExpYear,
    },
    {
      name: 'card status',
      value: props.data.cardStatus === null ? 'active' : props.data.cardStatus,
    },
    {
      name: 'billing address',
      value: '256 Chapman Road STE 105-4,Newark,Delaware US 19702',
    },
    // {
    //     name:'billing address',
    //     value:billing.street +',' + billing.city +',' + billing.state +','+ billing.country
    // }
  ];

  const copyCodeToClipboard = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopied(index);
  };
  return (
    <div className="carddetail">
      <Title title="Card Details" />

      <div className="carddetail__bottom">
        {(props.data.providerName === 'Apto' ? data : data.slice(0, 7)).map(
          (item, index) => (
            <div
              key={index}
              className={`carddetail__bsingle ${
                item.name === 'card status'
                  ? item.value.includes('Inactive')
                    ? ' --inactive'
                    : ' --active'
                  : ''
              }`}
              onClick={() => copyCodeToClipboard(item.value, index)}
            >
              <p>{item.name}</p>
              <p ref={board}>
                {item.value}
                {item.name !== 'type' &&
                  item.name !== 'name' &&
                  item.name !== 'card status' && (
                    <i
                      class={`fas fa-copy ${copied === index && ' --copied'}`}
                    />
                  )}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
const Title = props => {
  return <p className="title">{props.title}</p>;
};
