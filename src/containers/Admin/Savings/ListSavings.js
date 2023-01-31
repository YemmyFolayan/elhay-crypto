import React, { useState, useEffect } from 'react';
import './index.css';
import api from 'appRedux/api';
import { openNotificationWithIcon } from 'appRedux/actions/Common';
import { objectValuesStringify } from 'helpers/utils';
// import { Link } from '@reach/router';
import { Empty } from 'components/common/empty/empty';
import { Singlesavings } from 'components/savings/singlesavings';
import Loader from 'components/Loader';
import { Titlesubtitle } from 'components/common/titlesubtitle/titlesubtitle';
const ListSavings = props => {
  const [savingsPlans, setSavingsPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSavings();
  }, []);

  const getSavings = async () => {
    const url = '/savings';
    try {
      const res = await api.get(url);
      console.log(res.data);
      const { data } = res.data;
      setSavingsPlans(data);
      setLoading(false);
    } catch (error) {
      if (error.data.errors) {
        openNotificationWithIcon(
          objectValuesStringify(error.data.errors),
          'Bank Details',
          'error',
        );
      } else {
        console.log('err', error.data.message);
        openNotificationWithIcon(error.data.message, 'Bank Details', 'error');
      }
      console.log({ ...error });
      setLoading(false);
    }
  };

  // const savingg = [
  //   {
  //     frequencyInDays: 3,
  //     amountToBeSaved: 4000,
  //     currency: "USD_CENTS",
  //     endDate: "2020-02-03"
  //   },
  //   {
  //     frequencyInDays: 3,
  //     amountToBeSaved: 4000,
  //     currency: "NGN_KOBO",
  //     endDate: "2020-02-03"
  //   }
  // ]

  var activeSavings =
    savingsPlans.length > 0
      ? savingsPlans.filter(saving => {
          return saving.status === 'ACTIVE';
        })
      : '';

  var inactiveSavings =
    savingsPlans.length > 0
      ? savingsPlans.filter(saving => {
          return saving.status === 'INACTIVE';
        })
      : '';

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="flex_page_container pt-4" id="nsavings">
        <Titlesubtitle
          title="Active Savings"
          subtitle="Current and active savings will appear below."
        />
        {savingsPlans.length > 0 ? (
          <>
            <div
              className="row flex-wrap justify-content-start align-items-center"
              style={{ gap: '20px' }}
            >
              {activeSavings.length > 0 ? (
                activeSavings.map(saving => (
                  // <div>
                  //   <Link to={`/savings/${saving.id}`} />
                  //   {`Status: ${saving.status}`}
                  //   <br /> <br />
                  //   {`Target Amount: ${(saving.currency = 'USD_CENTS'
                  //     ? '$'
                  //     : 'N')}  ${saving.amountToBeSaved}`}
                  //   <br /> <br />
                  //   {`Next Payment Due: ${saving.nextPaymentDate}`}
                  //   <br /> <br />
                  // </div>
                  <Singlesavings
                    id={saving.id}
                    name={saving.name}
                    currency={saving.currency}
                    amount={saving.amountToBeSaved}
                    endDate={saving.endDate}
                    frequency={saving.frequencyInDays}
                  />
                ))
              ) : (
                <Empty title="No Active Savings Plan" />
              )}
            </div>

            <Titlesubtitle
              title="Inactive Savings"
              subtitle="Past savings will appear below."
            />
            <div
              className="row flex-wrap justify-content-start align-items-center"
              style={{ gap: '20px' }}
            >
              {inactiveSavings.length > 0 ? (
                inactiveSavings.map(saving => (
                  // <div>
                  //   <Link to={`/savings/${saving.id}`} />
                  //   {`Status: ${saving.status}`}
                  //   <br /> <br />
                  //   {`Target Amount: ${(saving.currency = 'USD_CENTS'
                  //     ? '$'
                  //     : 'N')}  ${saving.amountToBeSaved}`}
                  //   <br /> <br />
                  //   {`Next Payment Due: ${saving.nextPaymentDate}`}
                  //   <br /> <br />
                  // </div>
                  <Singlesavings
                    id={saving.id}
                    status="inactive"
                    name={saving.name}
                    currency={saving.currency}
                    amount={saving.amountToBeSaved}
                    endDate={saving.endDate}
                    frequency={saving.frequencyInDays}
                  />
                ))
              ) : (
                <Empty title="No Inactive Savings Plan" />
              )}
            </div>
          </>
        ) : (
          // <p className="text-center pt-5">You do not have any savings</p>
          <div className="empty-box">
            <Empty
              title="No Savings Plan"
              subtitle="Once you create a Saving plan, it will become visible / available here, click the button
              below to create a Saving plan."
            />
            <button
              className="create-savings-plan"
              onClick={props.openUpdateModal}
            >
              Create Savings Plan
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default ListSavings;
