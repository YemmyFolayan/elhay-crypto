import React, { useEffect } from 'react';
import HomePageFooter from 'components/website/HomePageFooter';
import '../../components/website/Styles/privacy.scss';
import { Navbar } from '../../components/website/Navbar';
import { Pagetop } from 'components/website/pagetop/pagetop';
import { openMail } from 'helpers/hooks';
export const AML = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      <Navbar />

      <Pagetop title="ANTI-MONEY LAUNDERING STATEMENT" />
      <div className="privacy-body">
        <p>
          It is the Policy of vesti Technology Solutions Inc (vesti) to actively
          prohibits and prevents money laundering and the funding of terrorist
          or criminal activities. Money laundering is generally defined as the
          concealment of the origins of illegally obtained money, typically by
          means of transfers involving foreign banks or legitimate businesses.
          vesti’s AML policy conforms with the tenets of the rules enacted by
          the U.S Department of Treasury, Financial Crimes Enforcement Network,
          31 CFR part 103, Section 120.140c, under the Bank Secrecy Act (BSA)
          and its implementing regulations.
          <br />
          <p></p>
          Considering the risks associated with carrying out our business, our
          AML policies, practices, and internal controls are designed to ensure
          compliance with all applicable BSA regulations and FINRA rules and
          will be reviewed and updated on a regular basis to ensure appropriate
          policies, practices and internal controls are in place to account for
          both changes in regulations and changes in our business.
          <br />
          <p></p>
          In the same vein, we have appointed an AML Compliance Officer who will
          be responsible to lead our AML Committee, ensure that the AML program
          is executed in a manner that is efficient, and train employees in the
          program and related processes.
          <br />
          <p></p>
          The AML Compliance Person will also ensure that the firm keeps and
          maintains all the required AML records and will ensure that Suspicious
          Activity Reports (SARs) are filed with the Financial Crimes
          Enforcement Network (FinCEN) when appropriate.
          <br />
          <p></p>
          The AML Compliance Person is vested with full responsibility and
          authority to enforce the firm’s AML program. The AML compliance
          officer will also ensure that all employees serve as money laundering
          watchdogs and whistle blowers, with the responsibility of exposing all
          activities that may appear suspicious.
          <br />
          <p></p>
          For more information about vesti’s AML program and related processes,
          please contact{' '}
          <a
            href="/#"
            onClick={e => {
              e.preventDefault();
              openMail('aml-compliance@wevesti.com');
            }}
          >
            aml-compliance@wevesti.com
          </a>{' '}
          <br />
        </p>
      </div>

      <HomePageFooter />
    </div>
  );
};
