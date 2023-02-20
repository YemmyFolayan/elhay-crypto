import React, { useState, useEffect } from 'react';
// import Singleinputlabelcol from "components/common/inputs/singleinputlabelcol";
import { Singleselect } from 'components/common/inputs/singleselect';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
// import { Textarea } from "components/common/inputs/textarea"
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import './virtualcard.scss';
import Inputfloat from 'components/common/inputs/inputfloat';
import { Platformbutton } from 'components/common/button/button';
import { Success } from 'components/common/success/success';
import errorsvg from '../../assets/newerror.svg';
import { useAmount, useStep } from 'helpers/hooks';
import { connect } from 'react-redux';
import { createMonoCard, createMonoCardHolder } from 'appRedux/actions/cards';
import { fetchAllStates } from 'appRedux/actions/Common';
import { Comptransaction } from 'components/common/completetransaction/comptransaction';
import { Newprompt } from 'components/common/prompt/prompt';
import vcardprompt from 'assets/vcardprompt.svg';
import { Listcheck } from 'components/common/listcheck/listcheck';
import { Phonenumberng } from 'components/common/inputs/phoneinput';
import { Shortinfonew } from 'components/common/shortinfo/shortinfo';
import { lgaList } from 'helpers/data';
import { openLink, openMail, removeCommaAmount } from 'helpers/utils';
import { Littlebalance } from 'components/bank/littlebalance/littlebalance';
import { Amountinputcurrency } from 'components/common/inputs/amountinput';
import { RadioOption } from 'components/common/radiobutton/radiobutton';
import { Equivalence } from 'components/bank/equivalence';
import { AlertError } from 'components/common/alertboxes/alertboxes';
import { autoAssignProvidusAccount } from 'appRedux/actions/waitlist';
import { depositViaPays } from 'appRedux/actions/transactions';
import { Fileupload } from 'components/common/fileupload/fileupload';
import { Transreview } from 'components/common/transactionreview/review';
const Createmono = props => {
  const myData = localStorage.getItem('userData');
  const { step, previousStep, nextStep, setStep } = useStep(0);
  const [state, setState] = useState({
    bvn: '',

    phone: props.userdata.phoneNumber,
    address_line1: '',
    city: '',
    lga: '',
    state: '',
    identityType: 'NIN',
    number: '',
    // kycUrl:props.userdata.KycPictureURL ? props.userdata.KycPictureURL:'',
    colorType: '',
    cardPin: '',
  });
  // eslint-disable-next-line
  const { amount, handleAmount } = useAmount(0);
  // eslint-disable-next-line
  const [option, setOption] = useState();
  var colorOptions = [
    {
      label: 'Black',
      value: 'Black',
    },
    {
      label: 'Blue',
      value: 'Blue',
    },
    {
      label: 'Green',
      value: 'Green',
    },
    {
      label: 'Yellow',
      value: 'Yellow',
    },
    {
      label: 'Purple',
      value: 'Purple',
    },
  ];

  var setInput = e => {
    var name = e.target.name;
    var value = e.target.value;
    setState({ ...state, [name]: value });
  };

  var handleSelect = (name, value) => {
    setState({ ...state, [name]: value });
  };
  var callBack = value => {
    props.refetch();
    setStep(value);
    props.refetch();
  };
  const __renderTitle = () => {
    switch (step) {
      case 1:
        return 'Amount';
      case 2:
        return 'Fund Option';
      case 3:
        return 'vesti Virtual Card';
      case 4:
        return 'vesti Virtual Card';
      case 5:
        return 'Set Virtual card PIN';
      default:
        return '';
    }
  };

  const __renderSubt = () => {
    switch (step) {
      case 1:
        return 'Enter amount you want to fund this card with after creating.';
      case 2:
        return `How do you intend to fund this card ?`;
      case 3:
        return 'vesti Virtual Card';
      case 4:
        return `Fill in the fields below to create your virtual card.`;
      case 5:
        return `Set Your PIN to finalize creation of your Virtual Card.`;
      default:
        return '';
    }
  };
  const __rendersteps = () => {
    switch (step) {
      case 0:
        return (
          <Stepprompt
            continue={nextStep}
            id={props.id}
            setStep={setStep}
            rate={props.rate}
            userdata={props.userdata}
            autoAssign={props.autoAssignProvidusAccount}
          />
        );
      // case 1:
      //     return <Enteramount
      //         amount={amount} rate={props.rate}
      //         handleAmount={handleAmount}
      //         setStep={setStep} balance={props.balance}
      //     />
      // case 2:
      //     return <Selectdeposit
      //         amount={amount * props.rate} rate={props.rate} setStep={setStep}
      //         diff ={((props.rate * removeCommaAmount(amount)) - props.balance  + 250 ).toLocaleString("en-us") }
      //         balance={props.balance} reload={props.refetch} id={props.id}
      //         option={option} setOption={setOption} deposit={props.depositViaPays}
      //     />
      case 1:
        return (
          <Stepone
            setInput={setInput}
            data={state}
            setState={setState}
            handleSelect={handleSelect}
            goBack={previousStep}
            goContinue={nextStep}
            states={props.states}
            colorOptions={colorOptions}
            setStep={setStep}
            myData={myData}
            lgaList={lgaList}
            userdata={props.userdata}
          />
        );
      case 2:
        return (
          <Steptwo
            setInput={setInput}
            state={state}
            setState={setState}
            setStep={setStep}
            data={state}
            states={props.states}
            url={props.userdata.KycPictureURL}
            loading={props.loading}
            goBack={previousStep}
            goContinue={nextStep}
            createMonoCardHolder={props.createMonoCardHolder}
          />
        );
      case 3:
        return (
          <>
            <Transreview
              data={[
                { title: 'Transaction Type', value: 'Virtual Card' },
                { title: 'Wallet', value: 'NGN Wallet' },
                { title: 'Fee', value: `₦250` },
              ]}
            />
            <div className="mb-2"></div>
            <Comptransaction
              setPin={value => setState({ ...state, cardPin: value })}
              onFinish={() => {
                props.createMonoCard(
                  {
                    // amountInCent : removeCommaAmount(amount) * 100,
                    cardPin: state.cardPin,
                    colorType: state.colorType,
                  },
                  callBack,
                );
              }}
              len={4}
              open={false}
              lower={true}
              pin={state.cardPin}
              title={`Enter a 4 digits PIN of your choice.`}
            >
              <div className="mt-2"></div>
              {!props.id ? (
                <Platformbutton
                  type="normal"
                  name="Finalize"
                  disabled={
                    state.cardPin.length === 4 || !props.loading ? false : true
                  }
                  click={() =>
                    props.createMonoCard(
                      {
                        // amountInCent : removeCommaAmount(amount) * 100,
                        cardPin: state.cardPin,
                        colorType: state.colorType,
                      },
                      callBack,
                    )
                  }
                />
              ) : (
                <Backcontinue
                  goBack={() => (props.id ? setStep(1) : setStep(2))}
                >
                  <Platformbutton
                    type="normal"
                    name="Finalize"
                    disabled={
                      state.cardPin.length === 4 || !props.loading
                        ? false
                        : true
                    }
                    click={() =>
                      props.createMonoCard(
                        {
                          // amountInCent : removeCommaAmount(amount) * 100,
                          cardPin: state.cardPin,
                          colorType: state.colorType,
                        },

                        callBack,
                      )
                    }
                  />
                </Backcontinue>
              )}
            </Comptransaction>
          </>
        );

      case 4:
        return (
          <Success
            title="Successful"
            subtitle={props.message}
            button="Okay Thank You"
            onClick={() => {
              props.refetch();
              props.closeModal();
            }}
          />
        );
      case 5:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={props.message}
            button="Try Again"
            onClick={() => {
              setStep(props.id ? 3 : 1);
            }}
          />
        );

      default:
        return <></>;
    }
  };
  // useEffect(()=> {
  //     props.id ? setStep(3): setStep(0)
  //     // eslint-disable-next-line
  // },[])
  useEffect(() => {
    props.fetchAllStates({ country: 'nigeria' });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="globalgeng">
      {step < 4 && step !== 0 && (
        <Titlesubtitle
          steps={props.id ? `Step 1 of 1` : `Step ${step} of 3`}
          title={__renderTitle()}
          subtitle={__renderSubt()}
        />
      )}
      <div className="globalgeng__content">{__rendersteps()}</div>
    </div>
  );
};

const Stepprompt = props => {
  var data = [
    `Kindly ensure you submit a valid KYC Document Number for card creation.`,
    `The Verification and Card Creation Process would take up to 2 Minutes.`,
    ` When creating a card, you must have a minimum of ₦${(
      10 * props.rate
    ).toLocaleString(
      'en-us',
    )} which amounts to $10. This is the card minimum  balance. It will be loaded in your virtual card. Immediately.`,
  ];

  return (
    <Newprompt img={vcardprompt}>
      <Titlesubtitle
        title="vesti Virtual Dollar Card Creation"
        subtitle="The process of creating a NetWebPay Virtual Dollar card involves these steps:"
      />
      <div className="stepone__monoprompt">
        <div className="stepone__column">
          <Listcheck data={data} />
          <Shortinfonew subject="You will be charged $40 for a successful credit report pull, but you wont be charged if it fails">
            <span>
              <p>
                If you ever need to convert the dollar amount in your card to
                Naira, Thé conversion rate back to naira is $1 - NGN670 (this
                rate may be updated from time to time)
              </p>
              <p>
                {' '}
                vesti also charges a <strong> NGN 250</strong> card handling and
                creation fee.{' '}
              </p>
              <p>
                {' '}
                Contact support at{' '}
                <strong onClick={() => openMail('help@elhay.com')}>
                  help@elhay.com
                </strong>{' '}
                if you need have any questions.{' '}
              </p>
            </span>
          </Shortinfonew>
        </div>
        <div className="mt-4"></div>
      </div>
      <p className="stepone__see">
        {' '}
        See{' '}
        <strong
          onClick={() =>
            openLink(
              'https://vesti-dollar-card.notion.site/Platforms-where-vesti-s-Virtual-Dollar-Card-Works-a225b6dac88a457a8bb7a0498351948e',
            )
          }
        >
          sites where this card works
        </strong>{' '}
      </p>
      <Platformbutton
        type="normal"
        name="Proceed"
        click={() => {
          // props.id ? props.setStep(1): props.userdata.providusAccountNumber  ? props.continue() :  props.autoAssign(()=>props.continue()) }
          props.id ? props.setStep(3) : props.continue();
        }}
      />
      <div className="mb-2"></div>
      <p> By proceeding you agree to the above terms.</p>
    </Newprompt>
  );
};

// eslint-disable-next-line
const Enteramount = props => {
  return (
    <div>
      {/* <Titlesubtitle
                steps="1 of 4"
                title="Amount"
                subtitle="Enter amount you want to fund this card with after creating."
            /> */}

      <Littlebalance
        currency="₦"
        amount={removeCommaAmount(props.balance)}
        title="NGN BALANCE"
      />
      <div className="mb-2"></div>
      <Amountinputcurrency
        type="text"
        currency="$"
        name="amount"
        label="Amount in USD"
        value={
          props.amount === 'NaN' ? 0 : props.amount.toLocaleString('en-US')
        }
        disabled={false}
        placeholder="Enter amount to deposit"
        onChange={props.handleAmount}
        pattern="[0-9,.]*"
      />
      {removeCommaAmount(props.amount) > 0 && (
        <Equivalence
          first="$"
          second="₦"
          amount={removeCommaAmount(props.amount).toLocaleString('en-US')}
          equal={
            (removeCommaAmount(props.amount) * props.rate + 250).toLocaleString(
              'en-US',
            ) + ` +250 card creation fee`
          }
        />
      )}

      <div className="mb-4"></div>

      {removeCommaAmount(props.amount) > 0 &&
        removeCommaAmount(props.amount) <= 9.9 && (
          <AlertError body="The least amount to fund your card with is $10.00" />
        )}
      <Backcontinue>
        <Platformbutton
          name="Continue"
          type="normal"
          disabled={removeCommaAmount(props.amount) <= 9.9 ? true : false}
          click={() => props.setStep(2)}
        />
      </Backcontinue>
    </div>
  );
};
// eslint-disable-next-line
const Selectdeposit = props => {
  const [refresh, setRef] = useState(false);
  return (
    <div>
      {/* <Titlesubtitle
                steps="2 of 4"
                title="Payment Option"
                subtitle="Enter amount you want to fund this card with after creating."
            /> */}

      <Littlebalance
        currency="₦"
        amount={removeCommaAmount(props.balance)}
        title="NGN BALANCE"
      />

      {removeCommaAmount(props.balance) >
      removeCommaAmount(props.amount) + 250 ? (
        <RadioOption
          changed={value => props.setOption(value)}
          id="0"
          isSelected={props.option === 'NGN'}
          label="Add money via your NAIRA WALLET BALANCE"
          sublabel={`Pay  ₦${props.amount.toLocaleString(
            'en-us',
          )} from your NAIRA WALLET BALANCE.`}
          value="NGN"
        />
      ) : (
        <RadioOption
          changed={value => props.setOption(value)}
          id="1"
          isSelected={props.option === 'CARD'}
          label="Add money via your debit card"
          sublabel={`Pay  ₦${props.diff.toLocaleString(
            'en-us',
          )} from your Naira debit card.`}
          value="CARD"
        />
      )}
      {refresh && (
        <p
          className="monoreload"
          onClick={() => {
            props.reload();
            setRef(false);
          }}
        >
          Click to refresh after paying ₦{props.diff.toLocaleString('en-us')}{' '}
          <i class="fas fa-redo-alt" />
        </p>
      )}
      <div className="mb-2"></div>
      {removeCommaAmount(props.balance) < removeCommaAmount(props.amount) && (
        <AlertError
          body={`You do not have up to ₦${(
            removeCommaAmount(props.amount) + 250
          ).toLocaleString(
            'en-us',
          )} in your wallet, select an option and click the add button below to add the remaining ₦${
            props.diff
          } to your wallet. `}
        />
      )}
      <div className="mb-2"></div>
      <Backcontinue back="Go Back" goBack={() => props.setStep(1)}>
        {props.option ? (
          removeCommaAmount(props.balance) >
          removeCommaAmount(props.amount) + 250 ? (
            props.id ? (
              <Platformbutton
                name="Continue"
                type="normal"
                click={() => props.setStep(5)}
              />
            ) : (
              <Platformbutton
                name="Continue"
                type="normal"
                click={() => props.setStep(3)}
              />
            )
          ) : (
            <Platformbutton
              type="normal"
              name={`Add ${props.diff}`}
              click={() => {
                props.deposit(removeCommaAmount(props.diff) * 100, value => {
                  // props.setStep(value)
                  setRef(true);
                });
              }}
            />
          )
        ) : (
          <></>
        )}
      </Backcontinue>
    </div>
  );
};

const Stepone = props => {
  const { address_line1, state, city, lga, phone } = props.data;

  return (
    <div className="mcard" style={{ width: '100%' }}>
      <div className="mcard__column">
        <Singleselect
          value={props.data.colorType}
          options={props.colorOptions}
          onChange={value => props.handleSelect('colorType', value)}
          placeholder="Select your card color"
        />
        <Inputfloat
          type="text"
          label="Address"
          name="address_line1"
          placeholder="What's your address"
          value={props.data.address_line1}
          disabled={false}
          onChange={props.setInput}
        />
        <Singleselect
          value={props.data.state}
          options={Object.keys(props.lgaList).map(item => ({
            value: item,
            label: item,
          }))}
          onChange={value => {
            props.handleSelect('state', value);
          }}
          placeholder="Select your state"
        />
        <div className="mcard__row">
          <Inputfloat
            type="text"
            label="city"
            name="city"
            placeholder="Enter Your city"
            value={props.data.city}
            disabled={false}
            onChange={props.setInput}
          />
          <Singleselect
            value={props.data.lga}
            options={(
              lgaList[
                props.data.state
                  ? props.data.state.label.includes('State')
                    ? props.data.state.label.slice(0, -6)
                    : props.data.state.label
                  : ''
              ] ?? []
            ).map(item => ({
              value: item,
              label: item,
            }))}
            onChange={value => {
              console.log(value.value);
              props.handleSelect('lga', value);
            }}
            placeholder="Select your lga"
          />
        </div>
        <span className="createstripe__phone">
          <Phonenumberng
            value={props.data.phone}
            // country = {props.userdata.location || 'NG'}
            country="NG"
            setValue={value => props.setState({ ...props.data, phone: value })}
          />
        </span>
      </div>

      <Backcontinue goBack={props.goBack}>
        <Platformbutton
          name="Proceed"
          type="normal"
          disabled={
            !address_line1 || !state || !city || !lga || !phone ? true : false
          }
          click={() => props.goContinue()}
        />
      </Backcontinue>
    </div>
  );
};

const Steptwo = props => {
  const { number, bvn } = props.data;

  return (
    <div className="mcard" style={{ width: '100%' }}>
      <div className="mcard__column">
        <Inputfloat
          type="number"
          label="NIN"
          name="number"
          placeholder="National Identity Number"
          value={props.data.number}
          disabled={false}
          onChange={props.setInput}
        />
        <Inputfloat
          type="number"
          label="BVN"
          name="bvn"
          placeholder="Bank Verification Number"
          value={props.data.bvn}
          disabled={false}
          onChange={props.setInput}
        />
        <div className="mb-2"></div>
        {!props.url && (
          <div className="waitlist__uploaddocs__docs">
            <p> Upload Verification document </p>
            <Fileupload
              id={2}
              value={props.state.kycUrl ? props.state.kycUrl : ''}
              name="document"
              setValue={e => {
                props.setState({
                  ...props.state,
                  kycUrlt: e.currentTarget.files[0],
                });
              }}
              remove={() => {
                props.setState({ ...props.state, kycUrl: '' });
              }}
            />
          </div>
        )}
      </div>

      <Backcontinue goBack={() => props.goBack()}>
        <Platformbutton
          name="Proceed to Create"
          type="normal"
          disabled={!number || !bvn || props.loading === true ? true : false}
          click={() => {
            const formData = new FormData();
            var data = Object.fromEntries(
              Object.entries({ ...props.data }).slice(0, 9),
            );
            for (var key in data) {
              const value = Array.isArray(data[key])
                ? JSON.stringify(data[key])
                : data[key];
              formData.append(`${key}`, value);
            }
            props.createMonoCardHolder(
              Object.fromEntries(Object.entries(props.data).slice(0, 8)),
              // formData,
              props.setStep,
            );
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]);
            // }
          }}
        />
      </Backcontinue>
    </div>
  );
};

const mapStateToProps = ({ cards, common, transactions, waitlist }) => {
  const { message, loading } = cards;
  const { states } = common;
  const { loading: tload } = transactions;
  const { loading: wload } = waitlist;
  return {
    message,
    loading,
    states,
    tload,
    wload,
  };
};

const mapDispatchToProps = {
  createMonoCardHolder,
  createMonoCard,
  fetchAllStates,
  autoAssignProvidusAccount,
  depositViaPays,
};

export default connect(mapStateToProps, mapDispatchToProps)(Createmono);
