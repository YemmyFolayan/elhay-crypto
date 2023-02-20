import React, { useEffect, useState } from 'react';
import { Titlesubtitle } from '../../common/titlesubtitle/titlesubtitle';
import { Littlebalance } from '../littlebalance/littlebalance';
import './ngnwithdrawal.scss';
import { Success } from '../../common/success/success';
import errorsvg from 'assets/newerror.svg';
import { Comptransaction } from '../../common/completetransaction/comptransaction';
import api from 'appRedux/api';
import { Singleselect } from 'components/common/inputs/singleselect';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import Loader from 'components/Loader';
import { navigate } from '@reach/router';
import { useAmount } from 'helpers/hooks';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import { Platformbutton } from 'components/common/button/button';
import { Transreview } from 'components/common/transactionreview/review';
import { withdrawNGN } from 'appRedux/actions/transactions';
import { connect, useDispatch } from 'react-redux';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import { removeCommaAmount } from 'helpers/utils';
import { openReward } from 'appRedux/actions/domore';
import { Smallempty } from 'components/common/empty/empty';
import { radio_ach, radio_users } from 'assets/assets';
const Ngnwithdrawal = props => {
  const { amount, handleAmount } = useAmount(0);
  const [state, setState] = useState({
    currency: 'NGN_KOBO',
    type: '',
  });
  const [pin, setPin] = useState('');
  const [currBank, setCurr] = useState('');
  const [selected, setSelected] = useState('');
  const [userBanks, setUserBanks] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  var dispatch = useDispatch();

  var setTransactionPin = value => {
    setPin(value);
  };

  var handleSelect = value => {
    setSelected(value);
    setCurr(userBanks[value.key]);
  };

  const Finalize = e => {
    var data = {
      amount: removeCommaAmount(amount) * 100,
      bankId: currBank.id,
      currency: 'NGN_KOBO',
      transactionPin: pin,
    };
    props.withdrawNGN(
      data,
      value => {
        props.refetch();
        setStep(value);
      },
      setStep,
    );
  };
  const getBanks = async () => {
    const url = 'user/banks';
    try {
      const res = await api.get(url);
      setUserBanks(res.data.data);
      setLoading(false);
    } catch (error) {
      if (error.data.errors) {
        console.log('err', error.data.errors);
      } else {
        console.log('err', error.data.message);
      }
      console.log({ ...error });
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanks();
    // eslint-disable-next-line
  }, []);

  const _render = () => {
    switch (step) {
      case 0:
        return (
          <Choosetype
            state={state}
            setState={setState}
            setStep={setStep}
            user={props.user}
            balance={props.balance}
            closeModal={props.closeModal}
          />
        );
      case 1:
        return (
          <Firststep
            balance={props.balance}
            setStep={setStep}
            step={step}
            userBanks={userBanks}
            state={state}
            amount={amount}
            handleAmount={handleAmount}
            Finalize={Finalize}
            selected={selected}
            handleSelect={handleSelect}
            user={props.user}
            closeModal={props.closeModal}
            addBen={props.openAddbank}
          />
        );
      case 2:
        return (
          <div className="ngnwithdrawal__review">
            <Transreview
              data={[
                { title: 'Transaction Type', value: 'Withdrawal' },
                {
                  title: 'Amount',
                  value: `₦${removeCommaAmount(amount).toLocaleString(
                    'en-US',
                  )}`,
                },
                { title: 'Fee', value: ` ₦ 100` },
                { title: 'Recipient Name', value: currBank.accountName },
                {
                  title: 'Recipient Account',
                  value: currBank.accountNumberDisplay,
                },
                { title: 'Recipient Bank', value: currBank.bankName },
              ]}
            />
            <div className="mb-2"></div>
            <Comptransaction
              setPin={setTransactionPin}
              loading={props.transLoading}
              goBack={() => setStep(1)}
              btn={`Initiate Withdrawal`}
              onFinish={Finalize}
              len={4}
              lower={true}
            >
              <Backcontinue goBack={() => setStep(1)}>
                <Platformbutton
                  name="Inititate Withdrawal"
                  type="normal"
                  click={() => Finalize()}
                  disabled={props.transLoading ? true : false}
                />
              </Backcontinue>
            </Comptransaction>
          </div>
        );

      case 3:
        return (
          <Success
            title="Withdrawal Successful"
            subtitle={props.transMessage}
            button="Okay, Thank You"
            onClick={() => {
              props.refetch();
              props.closeModal();
              dispatch(openReward());
            }}
            // secondBtntext={ 'Add as Beneficairy'}
          />
        );
      case 4:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Withdrawal Failed"
            subtitle={props.transMessage}
            button="Try Again"
            // onClick={()=> setStep(1)}
            onClick={() => {
              props.refetch();
              // dispatch(openReward())
              setStep(1);
            }}
          />
        );

      default:
        return <></>;
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return _render();
  }
};

const Choosetype = props => {
  var __renderBtn = () => {
    switch (props.state.type) {
      case 'vesti':
        return (
          <Platformbutton
            name="Continue"
            type="normal"
            click={() => {
              props.closeModal();
              navigate('/bank/transfer');
            }}
          />
        );
      case 'BANK':
        return (
          <Platformbutton
            name="Continue"
            type="normal"
            click={() => props.setStep(1)}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <section className="ngnwithdrawal__firststep">
      <Titlesubtitle
        title="Type of Transfer"
        subtitle="Select type of money transfer"
      />
      <Littlebalance
        title="Naira Balance"
        currency={'₦'}
        amount={props.balance / 100}
      />
      <div className="ngnwithdrawal__col">
        <RadioOption
          image={radio_users}
          changed={value => props.setState({ ...props.state, type: value })}
          id="0"
          isSelected={props.state.type === 'vesti'}
          label="Transfer to a NetWebPay user"
          sublabel="Send money to a NetWebPay user"
          value="vesti"
        />
        <RadioOption
          image={radio_ach}
          changed={value => props.setState({ ...props.state, type: value })}
          id="1"
          isSelected={props.state.type === 'BANK'}
          label="Transfer to a bank account"
          sublabel="Send money to a saved beneficiary bank."
          value="BANK"
        />
      </div>
      <div className="mb-4"></div>
      {__renderBtn()}
    </section>
  );
};

const Firststep = props => {
  return (
    <section className="ngnwithdrawal">
      <Titlesubtitle
        steps={`Step 1 of 2`}
        title="Withdrawal"
        subtitle="Withdraw from your NetWebPay wallet."
      />
      <Littlebalance
        title="Naira Balance"
        currency={'₦'}
        amount={props.balance / 100}
      />
      <div className="ngnwithdrawal__col">
        <Amountinputcurrency
          type="text"
          currency="₦"
          name="amount"
          label="Amount"
          value={
            props.amount === 'NaN' ? 0 : props.amount.toLocaleString('en-US')
          }
          disabled={false}
          placeholder="Enter amount to deposit"
          onChange={props.handleAmount}
          pattern="[0-9,.]*"
        >
          <Shortinfo subject="Amount should be greater than 200" />
        </Amountinputcurrency>

        {props.userBanks.length > 0 ? (
          <div className="ngnwithdrawal__smallcol">
            <p>Beneficiaries</p>
            <Singleselect
              value={props.selected}
              options={(props.userBanks ?? []).map((item, index) => ({
                key: index,
                label:
                  item.accountNumberDisplay +
                  ' ' +
                  item.accountName +
                  ' ' +
                  item.bankName,
                value: item.id,
              }))}
              placeholder="Select your beneficiary"
              onChange={props.handleSelect}
            />
            <Platformbutton
              type="withiconnobg"
              name="Add Beneficiary"
              classname="fas fa-plus"
              click={() => props.addBen()}
            />
          </div>
        ) : (
          <Smallempty
            name="Add Beneficiary"
            type="normal"
            title="Empty"
            subtitle="You are yet to add any beneficiary account(s), when you do they will all appear here."
            click={() => props.addBen()}
          />
        )}
      </div>

      <div className="mb-2"></div>
      {removeCommaAmount(props.amount) > 0 &&
        (removeCommaAmount(props.amount) > props.balance / 100 ||
          removeCommaAmount(props.amount) < 200) && (
          <AlertError
            body={
              removeCommaAmount(props.amount) < 200
                ? `Amount should be greater than 200 Naira.`
                : `You do not have upto ₦${props.amount} in your NetWebPay NAIRA WALLET BALANCE, please deposit into your account.`
            }
          />
        )}
      {props.userBanks.length > 0 && (
        <Backcontinue goBack={() => props.setStep(0)}>
          <Platformbutton
            name="Continue to PIN"
            type="normal"
            disabled={
              removeCommaAmount(props.amount) >= 0 &&
              (removeCommaAmount(props.amount) > props.balance / 100 ||
                props.selected === '' ||
                removeCommaAmount(props.amount) < 200)
                ? true
                : false
            }
            click={() => props.setStep(2)}
          />
        </Backcontinue>
      )}
    </section>
  );
};

const mapStateToProps = ({ transactions }) => {
  const { transMessage, transLoading } = transactions;
  return {
    transMessage,
    transLoading,
  };
};

const mapDispatchToProps = {
  withdrawNGN,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ngnwithdrawal);
