import React from 'react';
import { Empty } from 'components/common/empty/empty';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
import { Success } from 'components/common/success/success';
import errorsvg from 'assets/error-2.svg';
import pending from 'assets/pending.svg';
import { Shortinfonew } from 'components/common/shortinfo/shortinfo';
export const Importcredit = props => {
  var __renderResult = () => {
    switch (props.step) {
      case 0:
        return (
          <section>
            <div className="mt-4">
              <Empty
                title="No Credit History Imported Yet"
                subtitle="Import your Nigerian credit history to start your
                        application for the vesti Credit Card."
                type="normal"
                name="Import Credit History"
                click={() => props.click()}
              />
              <Shortinfonew subject="You will be charged $40 for a successful credit report pull, but you wont be charged if it fails">
                <p>
                  {' '}
                  You will be charged <strong> $40</strong> for a successful
                  credit report pull, but you wont be charged if it fails.{' '}
                </p>
              </Shortinfonew>
            </div>
          </section>
        );
      case 1:
        return (
          <Success
            title="Successful"
            subtitle={props.message}
            button="See My Report"
            onClick={() => props.setShow(true)}
          />
        );
      case 2:
        return (
          <Success
            image={errorsvg}
            type="error"
            title="Failed"
            subtitle={props.message}
            // button="Try Again"
            // onClick={()=> props.setStep(0)}
          />
        );
      case 3:
        return (
          <Success image={pending} title="Pending" subtitle={props.message} />
        );
      default:
        return <>nothing og</>;
    }
  };

  return (
    <div className="importcredit">
      <Titlesubtitle title={props.title} subtitle={props.subtitle} />
      {__renderResult()}
    </div>
  );
};
