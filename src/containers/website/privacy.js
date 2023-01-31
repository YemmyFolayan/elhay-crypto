import React, { useEffect } from 'react';
import HomePageFooter from 'components/website/HomePageFooter';
import '../../components/website/Styles/privacy.scss';
import { Navbar } from '../../components/website/Navbar';
import { Pagetop } from 'components/website/pagetop/pagetop';
import { openMail } from 'helpers/hooks';
export const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      <Navbar />
      <Pagetop title="PRIVACY" />
      <div className="privacy-body">
        <p>
          <h2>Global Privacy Policy</h2>
          We are vesti Technology Solutions inc., a Delaware corporation with
          office at 1301, S Bowen Rd, Ste 450, Arlington, Tx, 76013. For any
          access request, questions, or inquiries about how we use your Personal
          Information, please contact us at{' '}
          <i>
            <u>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  openMail('info@wevesti.com');
                }}
              >
                info@wevesti.com
              </a>
            </u>
          </i>{' '}
          At NetWebPay, the privacy of our Users is important to us, and we are
          committed to safeguarding it. Hence, this Privacy Policy explains your
          Personal Information which we collect, why we collect it, and what we
          do with it.
          <br />
          <p></p>
          <h2>Overview</h2>
          This Privacy Policy describes your privacy rights regarding how and
          when we collect, use, store, share and protect your information across
          our website, payment platforms (“Platforms”), APIs, Software
          Applications, (“Apps”), email notifications and tools regardless of
          how you use or access them. This Privacy Policy is applicable to all
          of the Website, software applications (“Apps”) and/or payment
          platforms (“Platforms”) offered by vesti or its subsidiaries or
          affiliated companies collectively referred to as vesti “services”.
          www. and its affiliates are part of a group which is made up of a
          number of local operating entities in a number of markets across the
          globe. “vesti”, “we” “us” or our” in this privacy statement means the
          vesti entity that is responsible for processing your personal
          information.
          <br />
          <p></p>
          <h2>Definition</h2>
          Account: means a NetWebPay Account
          <br />
          <p></p>
          Cookies: A cookie is a small data file that is transferred to your
          computer or mobile device. It enables us to remember your account
          log-in information, IP addresses, web traffic number of times you
          visit, browser type and version, device details, date and time of
          visits.
          <br />
          <p></p>
          vesti means vesti Technology solutions inc and subsidiaries or
          affiliates.
          <br />
          <p></p>
          Personal Information: Any information that can be used to identify a
          living person (including email address, company name, password,
          payment card, financial information such as bank account number,
          etc.), Government-issued Identity card, Bank Verification Number (BVN)
          and/or taxpayer identification it may also include anonymous
          information that is linked to you, for example, your internet protocol
          (IP), log-in information, address, location, device or transaction
          data.
          <br />
          <p></p>
          Sites: means any platform including but not limited to mobile
          applications, websites, and social media platforms.
          <br />
          <p></p>
          User: means an individual who uses the Services or accesses the Sites
          and has agreed to use the end services of vesti.
          <br />
          <p></p>
          Special Categories of Personal Information means details about your
          race or ethnicity, religious or philosophical beliefs, sex life,
          sexual orientation, political opinions, trade union membership,
          information about your health and genetic and biometric data.
          <br />
          <p></p>
          <h2>Objective</h2>
          This privacy policy statement is to provide all persons and
          organizations whose personal data we hold with description of the
          types of Personal Information we collect, the purposes for which we
          collect that Personal Information, the other parties with whom we may
          share it and the measures we take to protect the security of the data.
          <br />
          <p></p>
          Accordingly, we have developed this privacy policy for you to
          understand how we collect, use, communicate, disclose and otherwise
          make use of personal information. We have outlined our privacy policy
          below.
          <br />
          <p></p>
          <h2>Our Privacy Principles</h2>
          vesti focuses on the following core principles
          <br />
          <p></p>
          <ul>
            <li>
              To Empower the individual: vesti wants you to be in charge of your
              personal information and to make your own voluntary choices about
              your personal data;
            </li>
            <li>
              To keep and secure personal information: vesti Technology Inc. and
              its affiliates (collectively, “vesti’) do not take your trusting
              us with your information for granted. We take responsibility to
              ensuring that appropriate security measures are put in place and
              your personal information is protected;
            </li>
            <li>
              To be transparent and to educate users: For you to know what
              personal information is, how we collect personal information, for
              what purpose and how we secure personal information;
            </li>
            <li>
              To abide by local laws: vesti is a global company with local
              privacy expertise. Our privacy practices may vary among the
              countries in which we operate to reflect local practices and legal
              requirements. Specific privacy notices may apply to some of our
              products and services. Please visit the webpage or digital asset
              of the specific product or service to learn more about our privacy
              and information practices in relation to that product or service;
            </li>
            <li>
              To collect and store personal information on the “need to collect”
              basis: vesti collects personal information to perform its services
              for you. We work to have measures in place to prevent collecting
              and storing personal data beyond what we need.
            </li>
          </ul>
          <h2>Personal Information We May Collect About You</h2>
          We may collect, use, process, store, or transfer personal information
          such as:, We may also collect, store, use and transfer non-personal
          information or anonymized data such as statistical or demographic
          data., As a principle, we do not collect any Special Categories of
          Personal Information. If we do collect Special Categories of Personal
          Information, we will ensure compliance with applicable law., This
          Privacy Policy applies to vesti services only. We do not exercise
          control over the sites displayed or linked from within our various
          services. These other sites may place their own cookies, plug-ins or
          other files on your computer, collect data or solicit personal
          information from you. vesti does not control these third-party
          websites and we are not responsible for their privacy statements.
          Please consult such third parties’ privacy statements.
          <br />
          <p></p>
          <ul>
            <li>
              Identity Data: Information such as, your full name(s), your
              government-issued identity number, bank verification number (BVN)
              and your date of birth. This data is to enable us to verify your
              identity in order to offer our services to you;
            </li>
            <li>
              In order to experience the full range of Barter's seamless
              services including the ability to send funds to your phone
              contacts through Barter, we would require your consent granting
              access to your geo-location and your contacts. You have the right
              to withdraw your consent allowing us access to your contacts at
              any time. Please note that where your consent is not given or
              withdrawn, we would require the email address or contact of the
              recipient, in order to facilitate the fund transfer through
              Barter.
            </li>
            <li>
              Contact Data: This is data that is needed to reach out to you,
              such as your contact address, email address, telephone number,
              details of the device you use and billing details;
            </li>
            <li>
              Identification documents :(such as your passport or any
              Government-issued identity card), a photograph (if applicable) and
              any other registration information you may provide to prove you
              are eligible to use our services;
            </li>
            <li>
              Log/Technical information: When you access vesti services, our
              servers automatically record information that your browser sends
              whenever you visit a website, links you have clicked on, length of
              visit on certain pages, unique device identifier, log-in
              information, location and other device details.
            </li>
            <li>
              Financial Data: Information, such as personal account number, the
              merchant’s name and location, the date and the total amount of
              transaction, and other information provided by financial
              institutions or merchants when we act on their behalf;
            </li>
            <li>
              Transactional Data: These are information relating to a payment
              when you as a merchant (using one or more of our payment
              processing services) or as a customer, are using our products or
              services;
            </li>
            <li>
              Marketing and Communications Data: This includes both a record of
              your decision to subscribe or to withdraw from receiving marketing
              materials from us or from our third parties.
            </li>
            <li>
              Records of your discussions with us, if we contact you and if you
              contact us.
            </li>
          </ul>
          <br />
          We may also collect, store, use and transfer non-personal information
          or anonymized data such as statistical or demographic data.
          <br />
          <p></p>
          As a principle, we do not collect any Special Categories of Personal
          Information. If we do collect Special Categories of Personal
          Information, we will ensure compliance with applicable law.
          <br />
          <p></p>
          This Privacy Policy applies to vesti services only. We do not exercise
          control over the sites displayed or linked from within our various
          services. These other sites may place their own cookies, plug-ins or
          other files on your computer, collect data or solicit personal
          information from you. vesti does not control these third-party
          websites and we are not responsible for their privacy statements.
          Please consult such third parties’ privacy statements.
          <br />
          <p></p>
          <h2>How we get your Personal Information and why we have it</h2>
          The Personal Information we have about you is directly made available
          to us when you:
          <br />
          <p></p>
          <ul>
            <li>Sign up for a NetWebPay Account;</li>
            <li>Use any of our services;</li>
            <li>Contact our customer support team;</li>
            <li>Fill our online forms;</li>
            <li>Contact us;</li>
          </ul>
          The lawful basis we rely on for processing your Personal Information
          are:
          <br />
          <p></p>
          <ul>
            <li>
              Your Consent: Where you agree to us collecting your Personal
              Information by using our Services.
            </li>
            <li>
              We have a contractual obligation: Without your Personal
              Information, we cannot provide our Services to you.
            </li>
            <li>
              We have a legal obligation: To ensure we are fully compliant with
              all applicable Financial legislations such as Anti-Money
              Laundering and Counter Terrorist Financing Laws, we must collect
              and store your Personal Information. We protect against fraud by
              checking your identity with your Personal Information.
            </li>
          </ul>
          <br />
          <h2>How We May Use Your Personal Information</h2>
          <br />
          <ul>
            <li>
              Create and manage any accounts you may have with us, verify your
              identity, provide our services, and respond to your inquiries;
            </li>
            <li>
              Process your payment transactions (including authorization,
              clearing, chargebacks and other related dispute resolution
              activities);
            </li>
            <li>
              Protect against and prevent fraud, unauthorized transactions,
              claims and other liabilities;
            </li>
            <li>
              Provide, administer and communicate with you about products,
              services, offers, programs and promotions of vesti, financial
              institutions, merchants and partners;
            </li>
            <li>
              Evaluate your interest in employment and contact you regarding
              possible employment with NetWebPay;
            </li>
            <li>
              Evaluate and improve our business, including developing new
              products and services;
            </li>
            <li>To target advertisements, newsletter and service updates;</li>
            <li>
              As necessary to establish, exercise and defend legal rights;
            </li>
            <li>
              As may be required by applicable laws and regulations, including
              for compliance with Know Your Customers and risk assessment,
              Anti-Money Laundering, anti-corruption and sanctions screening
              requirements, or as requested by any judicial process, law
              enforcement or governmental agency having or claiming jurisdiction
              over vesti or vesti’s affiliates;
            </li>
            <li>
              To use data analytics to improve our Website, products or
              services, and user experiences.
            </li>
            <li>
              For other purposes for which we provide specific notice at the
              time of collection.
            </li>
          </ul>
          <br />
          <h2>Data Security and Retention</h2>
          The security of your Personal Information is important to vesti. We
          are committed to protecting the information we collect. We maintain
          administrative, technical and physical controls designed to protect
          the Personal Information you provide, or we collect against loss or
          theft, as well as against any unauthorized access, risk of loss,
          disclosure, copying, misuse or modification.
          <br />
          <p></p>
          Other security measures include but not limited to, secure servers,
          firewall, data encryption and granting access only to employees in
          order to fulfil their job responsibilities.
          <br />
          <p></p>
          Where you use a password for any of your Accounts, please ensure you
          do not share this with anyone, and the password is kept confidential
          at all times.
          <br />
          <p></p>
          We are committed to conducting our business in accordance with these
          principles in order to ensure that the confidentiality of your
          Personal Information is protected and maintained. Transmitting
          information online is not entirely secure. As such, we cannot
          guarantee that all information provided online is secure. We would
          take all reasonable steps to ensure that your Personal Information is
          secured and well protected.
          <br />
          <p></p>
          We will only retain personal information on our servers for as long as
          is reasonably necessary as long as we are providing Services to you.
          Where you close your Account, your information is stored on our
          servers to the extent necessary to comply with regulatory obligations
          and for the purpose of fraud monitoring, detection and prevention.
          Where we retain your Personal Data, we do so in compliance with
          limitation periods under the applicable law.
          <br />
          <p></p>
          <h2>Disclosing Your Personal Information</h2>
          We may disclose or share your Personal Information with third parties
          which include our affiliates, employees, officers, service providers,
          agents, suppliers, subcontractors as may be reasonably necessary for
          the purposes set out in this policy.
          <br />
          <p></p>
          vesti only shares personal information with External Third parties in
          the following limited circumstances:
          <br />
          <p></p>
          <ul>
            <li>
              We have your consent. We require opt-in consent for the sharing of
              any personal information; We share Personal Information with third
              parties directly authorized by you to receive Personal
              Information, such as when you authorize a third-party application
              provider to access your account. The use of your Personal
              Information by an authorized third party is subject to the third
              party's privacy policy and vesti shall bear no liability for any
              breach which may arise from such authorization by you.
            </li>
            <li>
              We provide such information to our subsidiaries, affiliated
              companies or other trusted businesses or persons for the purpose
              of processing personal information on our behalf. We require that
              these parties agree to process such information based on our
              instructions and incompliance with this Privacy Policy and any
              other appropriate confidentiality and security measures
            </li>
            <li>
              We have a good faith belief that access, use, preservation or
              disclosure of such information is reasonably necessary to:
              <ul>
                <li>
                  satisfy any applicable law, regulation, legal process or
                  enforceable governmental request,
                </li>
                <li>
                  enforce applicable Terms of Service, including investigation
                  of potential violations thereof
                </li>
                <li>
                  detect, prevent, or otherwise address fraud, security or
                  technical issues, or
                </li>
                <li>
                  protect against imminent harm to the rights, property or
                  safety of vesti, its users or the public as required or
                  permitted by law
                </li>
              </ul>
            </li>
            <li>
              If vesti becomes involved in a merger, acquisition, or any form of
              sale of some or all of its assets, we will provide notice before
              personal information is transferred and becomes subject to a
              different privacy policy
            </li>
          </ul>
          <h2>Marketing</h2>
          We may process your Personal Information in order to contact you or
          send you marketing content and communication about our products,
          services or surveys. You may exercise your right to object to such
          contact from us or opt out from the marketing content. Please note
          however that if you opt-out of marketing content, we may still send
          you messages relating to transactions and our Services related to our
          ongoing business relationship.
          <br />
          <p></p>
          We may ask you for permission to send notifications to you. Our
          Services will still work if you do not grant us consent to send you
          notifications.
          <br />
          <p></p>
          <h2>Your Data Protection Rights and Choices</h2>
          Based on your location and applicable laws, below are the rights you
          have as a user in relation to your Personal Information:
          <br />
          <p></p>
          <ul>
            <li>Right to be informed</li>
            <li>
              Right to request access or copies to your Personal Information by
              signing into your Account or contacting us
            </li>
            <li>
              Right to request that vesti erase your Personal Information. You
              have the right to ask us to erase your Personal Information.
              Please note that this is a limited right which applies where the
              data is no longer required, or the processing has no legal
              justification. The exceptions to this right is where the
              applicable law requires vesti to retain a historical archive or
              where we retain a core set of your personal data to ensure we do
              not inadvertently contact you in future where you object to your
              data being used for marketing purposes.
            </li>
            <li>
              Right to correct or rectify any Personal Information that you
              provide which may be incorrect, out of date or inaccurate. You
              also have the right to ask us to complete information you think is
              incomplete.
            </li>
            <li>
              Right to object to the processing of your Personal Information for
              marketing purposes. You have a right to ask us not to contact you
              for marketing purposes by adjusting your notification preference
              on the settings page or by opting out via the unsubscribe link in
              marketing emails we send you.
            </li>
            <li>
              Right to object to processing: You have the right to object to the
              processing of your Personal Information in certain circumstances.
              Please note that where you object to us processing your Personal
              Information, we might be unable to provide the services to you.
            </li>
            <li>To target advertisements, newsletter and service updates;</li>
            <li>
              As necessary to establish, exercise and defend legal rights;
            </li>
            <li>
              As may be required by applicable laws and regulations, including
              for compliance with Know Your Customers and risk assessment,
              Anti-Money Laundering, anti-corruption and sanctions screening
              requirements, or as requested by any judicial process, law
              enforcement or governmental agency having or claiming jurisdiction
              over vesti or vesti’s affiliates;
            </li>
            <li>
              To use data analytics to improve our Website, products or
              services, and user experiences.
            </li>
            <li>
              For other purposes for which we provide specific notice at the
              time of collection.
            </li>
          </ul>
          The basis of we processing your Personal Information is your consent.
          You also have the choice at any time to withdraw consent which you
          have provided.
          <br />
          <p></p>
          You also have a choice to deactivate your Account at any time. You may
          contact us should you wish to de-activate your Account at any time via
          the Contact Us segment below or send us an email at{' '}
          <i>
            <u>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  openMail('info@wevesti.com');
                }}
              >
                info@wevesti.com
              </a>
            </u>
          </i>
          .
          <br />
          <p></p>
          If you wish to exercise any of the rights set above, please contact us
          using the contact information provided in the Contact Us segment
          below. Where we are unsure of your identity, we might ask you for
          proof of your identity for security reasons before dealing your
          request.
          <br />
          <p></p>
          <h2>Cookies</h2>
          Like many other websites, we use cookies to distinguish you from other
          users and to customize and improve our services.
          <br />
          <p></p>
          Some browsers may automatically accept cookies while some can be
          modified to decline cookies or alert you when a website wants to place
          a cookie on your computer. If you do choose to disable cookies, it may
          limit your ability to use our website. For detailed information on the
          cookies and how we use them see our Cookie Policy
          <br />
          <p></p>
          <h2>Minor</h2>
          vesti’s website and applications are not directed at persons under the
          age of eighteen (18) and we do not collect any Personal Information
          knowingly or directly from minors who fall within this category.
          <br />
          <p></p>
          Where you have any belief that vesti has mistakenly or unknowingly
          collected information from a minor, please contact us using the
          information provided under the Contact Us section to enable
          investigate and restrict such data.
          <br />
          <p></p>
          <h2>International Data Transfers</h2>
          Our business is global with affiliates and service providers located
          around the world. As such, Personal Information may be stored and
          processed in any country where we have operations. Also, your Personal
          Data may be transferred to countries which may not have the same data
          protection laws as the country you initially provided your Personal
          Information, but whenever we transfer or transmit your Personal
          Information internationally, we will ensure or take reasonable steps
          to ensure your Personal Information is handled securely in line with
          the applicable data protection laws and standard contractual clauses.
          <br />
          <p></p>
          <h2>Updates to our privacy policy</h2>
          From time to time, we may change, amend, or review this Privacy Policy
          from time to time to reflect new services or changes in our Privacy
          Policy and place any updates on this page. All changes made will be
          posted on this page and where changes will materially affect you, we
          will notify you of this change by placing a notice online or via mail.
          If you keep using our Services, you consent to all amendments of this
          Privacy Policy.
          <h2>Contact Us</h2>
          All access requests, questions, comments, complaints, and other
          requests regarding the privacy policy should be sent to &nbsp;
          <i>
            <u>
              <a
                href="/#"
                onClick={e => {
                  e.preventDefault();
                  openMail('info@wevesti.com');
                }}
              >
                info@wevesti.com
              </a>
            </u>
          </i>
          .
          <br />
          <p></p>
          We may request additional details from you regarding your complaints
          and keep records of your requests and resolution.
          <br />
          <p></p>
          This Privacy Policy was last updated in September 2022
        </p>
        {/* <p dangerouslySetInnerHTML={{ __html: priv }} className="priv-new"></p> */}
      </div>

      <HomePageFooter />
    </div>
  );
};
