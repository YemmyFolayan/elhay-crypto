import React from 'react';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import Singleinputlabelcol from 'components/common/inputs/singleinputlabelcol';
import { Backcontinue } from 'components/common/backcontinue/backcontinue';
import { Shortinfo } from 'components/common/shortinfo/shortinfo';
import ccheck from 'assets/circle-check.svg';
import failed from 'assets/failed.svg';
import { Success as Prompt } from 'components/common/success/success';
export const Createhandle = props => {
  const goBack = () => {
    props.move(0);
  };

  const goContinue = () => {
    props.move(2);
  };

  if (props.userData.silaHandle || props.userData.silaKycStatus === 'PASSED') {
    return (
      <div className="createhandle">
        <Prompt
          title="You already have an handle"
          subtitle={`You already created an handle ${props.userData.silaHandle}, there's no need to create another handle, click the button to move to the next phase, thanks.`}
          button="Continue"
          onClick={() => props.move(2)}
        />
      </div>
    );
  } else {
    return (
      <div className="createhandle">
        <Titlesubtitle
          title="Create Your Handle • 1 of  3"
          subtitle="Create a unique handle to identify the end-user and check
                    to ensure it is available."
        />

        <form>
          <div className="form__input">
            <Singleinputlabelcol
              type="text"
              label=""
              name="handle"
              placeholder="Enter a unique user handle"
              value={props.data.handle}
              disabled={false}
              onChange={props.setInput}
            />
            <Shortinfo subject="Spaces, special characters, and uppercase characters are not permitted. Minimum of 3 characters of input required." />
            {props.data.handlecheck === true ? (
              <Shortinfo
                image={ccheck}
                subject={`Success, ${props.data.handle} is available`}
              />
            ) : props.data.handlecheck === false ? (
              <Shortinfo
                image={failed}
                fail={true}
                subject={`Sorry, ${props.data.handle} is not available, try again with another name.`}
              />
            ) : (
              <></>
            )}
            {props.data.handlecheck === true ? (
              <></>
            ) : (
              <button
                className="backcontinue__continue"
                style={{ marginTop: '20px' }}
                disabled={props.data.handle ? false : true}
                onClick={e => props.checkHandle(e)}
              >
                {' '}
                {props.loading ? 'Checking Handle ...' : 'Check Handle'}
              </button>
            )}
          </div>

          <Backcontinue
            text="Continue"
            goBack={goBack}
            // continue = {goContinue}
          >
            <button
              className="backcontinue__continue"
              disabled={props.data.handlecheck === true ? false : true}
              onClick={() => goContinue()}
            >
              Confirm and Continue
            </button>
          </Backcontinue>
        </form>
      </div>
    );
  }
};
