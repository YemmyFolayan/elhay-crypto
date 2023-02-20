import React, { useEffect, useState } from 'react';
import { navigate, useLocation } from '@reach/router';
import Layout from 'components/common/DashboardLayout';
// import { Singlecard } from "components/virtualcards/singlecard";
import { Stepback } from 'components/common/stepback/stepback';
import './carddetails.scss';
import { Empty } from 'components/common/empty/empty';
import api from 'appRedux/api';
// import { Modal } from 'antd';
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import { errorMessage, openLink } from 'helpers/utils';
import Fundcard from './fundcard';
import Loader from 'components/Loader';
// import DividedPinInput from "components/common/DividedPinInput"
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import { vestirate } from 'components/common/vestirate/vestirate';
import { Simplemodal } from 'components/common/simplifiedmodal';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { Cardlimit } from './cardlimit';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import {
  changeCardPin,
  deleteCard,
  fetchSingleMonoCard,
  freezeUnfreezeCard,
} from 'appRedux/actions/cards';
import {
  ChangePin,
  Freezecard,
  Ordercard,
  Singletransaction,
} from 'components/virtualcards/cardactions';
import {
  Carddesign,
  Carddetails,
  CardtransInfo,
  MonoCarddetails,
} from 'components/virtualcards/carddetails';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { useRates, useUserData } from 'helpers/hooks';

export const getTransactions = async id => {
  var data = (await api.get(`/juice/cardTransactions/${id}`)).data;
  // setTrans(data)
  // console.log(data)
  var groups = data.data.transactions
    .map((item, index) => ({
      ...item,
      createdAtt: item.createdAt.split(' ')[0] || item.created_at,
    }))
    .reduce((groups, game) => {
      const date = game.createdAtt
        ? game.createdAtt
        : game.created_at.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      // console.log(groups)
      return groups;
    }, {});

  // Edit: to add it in the array format instead
  var groupArrays = Object.keys(groups).map(date => {
    return {
      date,
      transactions: groups[date],
    };
  });
  //   console.log(groupArrays)
  return groupArrays.reverse();
};

const Mycard = props => {
  const { state } = useLocation();
  const { userData } = useUserData();
  var lData = localStorage.getItem('userData');
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState();
  const { pricesData } = useRates();
  // const [transactions, setTrans] = useState({})
  // eslint-disable-next-line
  const [data, setData] = useState({
    walletToCharge: '',
    amount: '',
    cardId: '',
    transactionPin: '',
  });
  const [change, setChange] = useState({
    password: '',
    cardId: state ? state.cdata.id : '',
    newCardPin: '',
  });

  const [order, setOrder] = useState({
    street_one: '',
    locality: '',
    region: '',
    postal_code: '',
    country: 'USA',
  });
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const [states, setStates] = useState();
  const [modal, setModal] = useState({
    value: false,
    currency: '',
    action: 'liquidate',
  });
  // eslint-disable-next-line
  const [info, setInfo] = useState('open');
  const [openorder, setOpen] = useState(false);
  const [pinmodal, setpinModal] = useState(false);
  const [action, setAction] = useState(false);
  // eslint-disable-next-line
  const [btn, setBtn] = useState('');
  const [refresh, setRefresh] = useState(false);
  // eslint-disable-next-line
  const [limitmodal, setLimit] = useState({ name: '', value: false });
  var handleFeeModal = value => {
    lData = lData ? JSON.parse(lData) : [];
    lData['transFee'] = value;
    localStorage.setItem('userData', JSON.stringify(lData));
    setInfo(value);
  };
  // convert = {()=> setFundmodal({...fundmodal, currency:'NGN', value:true})}
  var openModal = value => {
    value
      ? setModal({ ...modal, value: true, currency: value })
      : setModal({ ...modal, value: true });
  };
  var closeModal = () => {
    setModal({ ...modal, value: false, currency: '' });
  };
  var closepinModal = () => {
    setpinModal(false);
  };
  var goBack = () => {
    navigate('/bank');
    // setModal(false)
  };

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    setOrder({ ...order, [name]: value });
  };
  var setField = e => {
    var name = e.target.name;
    var value = e.target.value;
    setChange({ ...change, [name]: value });
  };

  var setPinfield = value => {
    setChange({ ...change, newCardPin: value });
  };

  var Orderphy = cb => {
    api
      .post('/apto/mobile/setShippingAdressMobileApto', {
        ...order,
        region: order.region.value,
      })
      .then(res => {
        openNotificationWithIcon(
          res.data.message,
          'Physical Card Order Successful',
          'success',
        );
        setMessage(res.data.message);
        cb && cb(2);
      })
      .catch(error => {
        openNotificationWithIconErr(
          errorMessage(error),
          'Physical Card Request Failed',
          'error',
        );
        setMessage(error.data.message);
        cb && cb(3);
      });
  };

  var handleRefresh = () => {
    setRefresh(!refresh);
    setLimit({ ...limitmodal, name: '', value: false });
  };
  var handleRefreshTwo = () => {
    handleRefresh();
    props.fetchSingleMonoCard(state.cdata.cardId, setCard, setLoading);
  };
  var FreezeUnfreeze = () => {
    // props.freezeUnfreezeCard(data.cardId,card.cardStatus, handleRefresh )
    props.deleteCard(data.cardId, card.cardStatus, handleRefresh);
  };

  // eslint-disable-next-line
  const { data: cardTrans, isLoading, isSuccess, refetch } = useQuery(
    ['transactions', state && state.cdata.id],
    () => getTransactions(state.cdata.cardId),
  );
  // const {data:cardTrans,isLoading, isSuccess, refetch} = useQuery(['transactions', state.cdata.cardId], () =>getTransactions(state.cdata.cardId))

  var getCard = () => {
    // setLoading(true)
    refetch();
    api
      .get(`/juice/singleCard/${state.cdata.cardId}`)
      .then(res => {
        setCard(res.data.data.cardDetails);
        setLoading(false);
      })
      .catch(() => {
        console.log('');
      });
  };
  var getStates = () => {
    api
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: 'united states',
      })
      .then(response => {
        var options = (response.data.data.states ?? []).map((item, index) => ({
          value: item.state_code,
          label: item.name,
        }));
        setStates(options);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (state) {
      setData({ ...data, cardId: state.cdata.cardId });
      setChange({ ...change, cardId: state.cdata.cardId });
      setTimeout(() => {
        state.cdata.providerName === 'Mono'
          ? props.fetchSingleMonoCard(state.cdata.cardId, setCard, setLoading)
          : getCard();
      }, 500);
      // getTransactions();
    } else {
      // navigate('/bank')
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [refresh]);

  useEffect(() => {
    handleFeeModal('close');
    getStates();
    return () => {
      setData({ ...data, cardId: '' });
    };
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Layout
        info={
          state &&
          state.cdata.providerName === 'Mono' &&
            'Click to see sites that accepts this card'
        }
        link={() =>
          state &&
          state.cdata.providerName === 'Mono' &&
            openLink(
              'https://vesti-dollar-card.notion.site/Platforms-where-vesti-s-Virtual-Dollar-Card-Works-a225b6dac88a457a8bb7a0498351948e',
            )
        }
      >
        <Loader />
      </Layout>
    );
  } else if (!state || !card) {
    return (
      <Layout>
        <section className="mycard__empty">
          <Empty
            title="Card not found"
            subtitle="The card with ID does not exist, kindly go back to the bank page and select the card you want to see here
                        , if issue persists kindly reach out to help@elhay.com."
            type="normal"
            name="Back to Bank"
            click={() => navigate('/bank')}
          />
        </section>
      </Layout>
    );
  } else {
    return (
      // info =" Our cards are not currently working on these sites: binance, crypto.com, skrill, and kucoin"
      // info ="Transaction processing fee of 0.36cents will be charged once daily for all transactions performed on a single day."
      <Layout
        info={
          state.cdata.providerName === 'Mono' &&
          'Click to see sites that accepts this card'
        }
        link={() =>
          state.cdata.providerName === 'Mono' &&
          openLink(
            'https://vesti-dollar-card.notion.site/Platforms-where-vesti-s-Virtual-Dollar-Card-Works-a225b6dac88a457a8bb7a0498351948e',
          )
        }
        info2={
          state.cdata.providerName === 'Mono' &&
          'Click to see transaction rates'
        }
        link2={() =>
          state.cdata.providerName === 'Mono' && handleFeeModal('open')
        }
      >
        {state.cdata.providerName === 'Mono' && (
          <Simplemodal
            onClick={() => handleFeeModal('close')}
            visible={JSON.parse(lData).transFee === 'close' ? false : true}
          >
            <Titlesubtitle
              title="Transaction Fee"
              subtitle={`Amount we charge per Virtual Card transaction amount.`}
            />
            <CardtransInfo />
          </Simplemodal>
        )}

        <Simplemodal onClick={() => closeModal()} visible={modal.value}>
          <Fundcard
            name={state.cdata.providerName}
            cardId={state.cdata.cardId}
            closeModal={closeModal}
            balance={state.balance}
            cb={() =>
              state.cdata.providerName === 'Mono'
                ? handleRefreshTwo()
                : refetch()
            }
            rate={state.rate}
            action={modal.action}
            currency={modal.currency}
          />
        </Simplemodal>
        <Simplemodal onClick={() => setOpen(false)} visible={openorder}>
          <Ordercard
            data={order}
            states={states}
            setInput={setInput}
            ordercard={Orderphy}
            setData={setOrder}
            message={message}
            closeModal={() => setOpen(false)}
          />
        </Simplemodal>
        <Simplemodal onClick={() => closepinModal()} visible={pinmodal}>
          <ChangePin
            data={change}
            currency={modal.currency}
            setField={setField}
            setPinfield={setPinfield}
            changecardPin={props.changeCardPin}
            closepinModal={closepinModal}
            btn={btn}
            name={card.providerName}
            loading={props.cardLoading}
            message={props.message}
          />
        </Simplemodal>
        <Simplemodal
          onClick={() =>
            setLimit({ ...limitmodal, name: '', value: !limitmodal.value })
          }
          visible={limitmodal.value}
        >
          {limitmodal.name === 'limit' ? (
            <Cardlimit
              name={state.cdata.providerName}
              closeModal={() =>
                setLimit({ ...limitmodal, name: '', value: !limitmodal.value })
              }
            />
          ) : (
            <Freezecard
              rate={pricesData.MONO_LIQUIDATION_RATE / 100}
              balance={parseFloat(card.customerBalance / 100)}
              cancel={() =>
                setLimit({ ...limitmodal, name: '', value: !limitmodal.value })
              }
              freeze={FreezeUnfreeze}
              delete={props.deleteCard}
            />
          )}
        </Simplemodal>
        {
          <section className="mycard">
            <Stepback onClick={goBack} />
            <vestirate
              card="true"
              // name={state.cdata.providerName}
              name="Mono"
              // rate={MONO_CARD_RATE}
            />

            {state.cdata.providerName === 'Juice' && (
              <Shortinfo
                // subject="vesti does not help to convert other currencies to Naira."
                subject="Transaction processing fee of 0.36cents will be charged once daily for all transactions performed on a single day, i.e a one time fee daily."
              />
            )}

            <div className="mb-4"></div>
            <div className="mycard__inner">
              <div className="mycard__left">
                <Title title="Virtual Card" />
                <Carddesign
                  name={state.cdata.providerName}
                  action={action}
                  setAction={setAction}
                  setpinModal={setpinModal}
                  setLimit={setLimit}
                  limitmodal={limitmodal}
                  setOpen={setOpen}
                  openModal={openModal}
                  FreezeUnfreeze={FreezeUnfreeze}
                  data={{
                    ...card,
                    cardStatus:
                      card.cardStatus === null ? 'active' : card.cardStatus,
                  }}
                />
                {state.cdata.providerName === 'Mono' ? (
                  <MonoCarddetails
                    data={{
                      ...card,
                      cardStatus:
                        card.cardStatus === null ? 'active' : card.cardStatus,
                    }}
                    openModal={openModal}
                    setpinModal={setpinModal}
                  />
                ) : (
                  <Carddetails
                    data={card}
                    openModal={openModal}
                    setpinModal={setpinModal}
                    userdata={userData}
                  />
                )}
              </div>
              <div className="mycard__right">
                <div className="mycard__title">
                  <Title title="Transactions" />
                  {/* <Shortinfo
                                    subject="Transaction processing fee of 0.36cents will be charged once daily for all transactions performed in a single day."
                                /> */}
                </div>
                {/* {cardTrans && cardTrans.length}lenght  */}
                {/* {cardTrans && cardTrans.length} */}
                <div className="mycard__transactions">
                  {cardTrans ? (
                    cardTrans.length < 1 ? (
                      <Empty
                        title="No Transactions"
                        subtitle="You are yet to carry out any transactions, when you do they'll appear here, click the buttons above to carry out transactions."
                      />
                    ) : (
                      (cardTrans ?? []).map((item, index) => (
                        <>
                          <Singletransaction data={item} key={index} />
                          <hr />
                        </>
                      ))
                    )
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </section>

          // : <Empty
          //         title="Empty"
          // />
        }
      </Layout>
    );
  }
};

const Title = props => {
  return <p className="title">{props.title}</p>;
};

const mapStateToProps = ({ cards }) => {
  const { message, loading, cardLoading } = cards;
  return {
    message,
    loading,
    cardLoading,
  };
};

const mapDispatchToProps = {
  fetchSingleMonoCard,
  changeCardPin,
  freezeUnfreezeCard,
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mycard);
