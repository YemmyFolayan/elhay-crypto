import React from 'react';
import './Styles/FeesBanner.scss';
import HomePageFooter from './HomePageFooter';
import { Top } from './top/top';
import { Downloadvesti } from './downloadvesti/downloadvesti';
function FeesBanner() {
  return (
    <>
      <Top
        title="vesti Fees & Charges."
        body="We are Very transparent about all the charges on vesti. We will always display the calculation of how much this fee comes to."
      />
      <div className="container ">
        <section className="fee pb-5">
          <p>
            We are very transparent about all the charges on NetWebPay willalways
            display the calculation of how much this fees comes to, for every
            transaction you are about to make. This is so that you can confirm
            before sending off your order.
          </p>
          <p className="mt-n1">
            Here is a quick overview of all the charges on vesti.
          </p>
          <h3 className="bigfont ">Deposit Charges</h3>
          <ol>
            <li>
              {' '}
              <strong>With a Naira Card:</strong> With a Naira Card: Charges
              with a Naira card are 1.4%, these fees go to our payment
              processors, not us. These charges are capped and will not exceed
              ₦2000.
            </li>
            <li>
              <strong>With a Naira bank transfer:</strong> There are no charges
              for a Naira transfer into your wallet, but withdrawals may attract
              a flat fee of ₦100. This is to cover statutory stamp postage fees
              that our banking partners and payment processors charge.
            </li>
            <li>
              <strong>With a USD Card:</strong> Charges with a USD card are 2.9%
              (and may be reviewed based on processor fees).
            </li>
            <li>
              <strong>Using a USD wire or domiciliary transfer:</strong> There
              are no charges when using a wire transfer on vesti. However, you
              may be charged by your bank.
            </li>
          </ol>

          <h3 className="bigfont">Withdrawal fee</h3>
          <p>
            If you deposited from the Naira payment option, you can only
            withdraw to a Naira account. If you deposited from a USD payment
            option, you can only withdraw to a USD account. There is a
            withdrawal fee of ₦100 to Naira bank accounts and a $1.3% fee to USD
            bank accounts. These fees may be waived for withdrawals above
            $100,000.
          </p>

          <h3 className="bigfont">WES payment on NetWebPay</h3>
          <p>
            If you intend to make payment for World Educational Services (WES)
            services on our platform, you may simply use your NetWebPay virtual
            card. If you need to pay using our service, the dollar to Naira
            exchange rate will depend on the current market rate at the time of
            the transaction. Our rates are subject to constant review depending
            on the market forces. As of today, the current exchange rate will be
            displayed in the app, and this is how you calculate how much you
            will pay to vesti to enable us to help facilitate your WES payment.
            To get updated rate , go in app and click "settings". As a result of
            our competitive payment rate, we charge a 10% extra on most merchant
            payments, billed together when you are paying on the vesti App. This
            fee is for the vesti concierge enabling you to complete a payment.
          </p>
          <h3 className="bigfont">SEVIS fee payment on NetWebPay</h3>
          <p>
            If you intend to make your US-SEVIS fee payment for U.S Student Visa
            Application, there will be flat service charge of $40 in addition to
            the standard SEVIS fee of $350 (+$10Western Union Fees) payable to
            the U.S Department of Homeland Security within the U.S. This will be
            total of $400 payable to vesti and we will make the SEVIS fee
            payment on your behalf within 48hours (business days) after you make
            an order using our app. The dollar to Naira exchange rate will
            depend on the current market rate at the time of the transaction.
            Our rates are subject to constant review depending on the market
            forces. As of today, the current exchange rate will be displayed in
            the app.
          </p>
          <h3 className="bigfont">Custom Tuition payment on NetWebPay</h3>
          <p>
            We update these fees from time to time. Please review this page
            before making transactions. Custom Tuition or Certification payments
            may or may not be listed on the vesti App. You will send your school
            tuition instruction or invoice to info@wevesti.com. Our team will
            give you instruction on Naira Bank Transfers, or you may transfer
            into your wallet, using your Providus Bank account numbers. The rate
            for USD today for high value transactions is competitive and follows
            market rate, also associated wire fees or international card fees
            may apply.
          </p>

          <p>
            Written by{' '}
            <a className="#" href="/">
              Abimbola Amusan
            </a>{' '}
            <br />{' '}
            <span className="text-muted">
              Updated on 8:16am CST on 29th June 2022
            </span>
          </p>
        </section>

        <Downloadvesti />
      </div>

      <HomePageFooter />
    </>
  );
}

export default FeesBanner;
