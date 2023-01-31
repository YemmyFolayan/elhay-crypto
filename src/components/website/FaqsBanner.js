import React from 'react';
import './Styles/FaqsBanner.scss';
// import HomePageFooter from './HomePageFooter';
import bkg from '../../assets/background.svg';
import FAQPageFooter from './faq/FAQPageFooter';
import { useState } from 'react';
import { Modal } from 'antd';
import Suggestion from './faq/Suggestion';

function FaqsBanner() {
  const [modal, showModal] = useState(false);

  var openModal = () => {
    showModal(true);
  };
  var closeModal = () => {
    showModal(false);
  };

  return (
    <div className="faqs-main-container">
      <section class="back-ground faqs-top">
        <img src={bkg} alt="background" />
        <div className="faqs-top-cont">
          <div class="vesti-faqs">
            <h2 class="text-center fs-2 fw-bold" style={{ color: '#121243' }}>
              Frequently Asked Questions <span class="vesti-color">(FAQS)</span>
            </h2>
            <p class="text-center vesti-color2 fs-5">
              Join more than 70,000 Users finding home abroad, <br /> raising
              the money they need to move and making difficult international
              payments with NetWebPay.
            </p>
          </div>
          <div class="search-box text-center faqs-search-box">
            <div class="search">
              <p>
                <i class="fas fa-search"></i>
              </p>
              <input
                type="text"
                class="searchTerm"
                placeholder="What is vesti?"
              />
            </div>
          </div>
        </div>
      </section>
      <div class="container mt-n1 faqs-container">
        <section class="">
          <div class="questions pb-5">
            <h1 class="vesti-color3">General</h1>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header vesti-color" id="headingOne">
                  <button
                    class="accordion-button collapsed fs-4 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    What is vesti?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                      with NetWebPay you are given the opportunity to do a
                      short-term investment for relocation and a long term
                      investment on local and international stock exchanges.{' '}
                      <br /> with NetWebPay you get the opportunity to be
                      financially stable in life, whether you choose to move
                      abroad (temporarily/permanently) or stay back in Nigeria.
                      On vesti you can pay for difficult Immigration related
                      payments (international Payments) in your local currency,
                      seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header vesti-color" id="headingTwo">
                    <button
                      class="accordion-button collapsed fs-4 fw-bold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      What can I do with NetWebPay ?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <p>
                        with NetWebPay you are given the opportunity to do a
                        short-term investment for relocation and a long term
                        investment on local and international stock exchanges.{' '}
                        <br /> with NetWebPay you get the opportunity to be
                        financially stable in life, whether you choose to move
                        abroad (temporarily/permanently) or stay back in
                        Nigeria. On vesti you can pay for difficult Immigration
                        related payments (international Payments) in your local
                        currency, seamlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-5 mt-5">
                <h1 class="vesti-color3">Safety & Security</h1>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header vesti-color" id="headingThree">
                      <button
                        class="accordion-button collapsed fs-4 fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Is my money secure with NetWebPay ?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          NetWebPay uses bank level security, PIN authentication,
                          and end to end encryption. Even the team at NetWebPay
                          can’t see your password or Pin. Yes, money is secured
                          on vesti because they with integrity and the company
                          is duly Registered.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pt-5 mt-5 pb-5 mb-5">
                  <h1 class="vesti-color3">Send Money & Crypto</h1>
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header vesti-color" id="headingFour">
                        <button
                          class="accordion-button collapsed fs-4 fw-bold"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Can I send dollar to someone with NetWebPay ?
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <p>
                            Yes, you can. There are two ways. You can withdraw
                            from your dollar wallet (with appropriate charges )
                            into your domiciliary account. Also you can send
                            money to the other person’s vesti Wallet, and they
                            can use on vesti or outside vesti (Withdraw to a
                            Dollar account).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2
                          class="accordion-header vesti-color"
                          id="headingFive"
                        >
                          <button
                            class="accordion-button collapsed fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                            How do I pay for WES vesti ?
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <p>
                              All you need to do is deposit money into your
                              Naira or Dollar Wallet. You can deposit into your
                              wallet by using your credit cards or debit cards
                              or through Barter, USSD, Pay Pal and other
                              methods. You can also read a more detailed
                              instruction.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2
                          class="accordion-header vesti-color"
                          id="headingSix"
                        >
                          <button
                            class="accordion-button collapsed fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                          >
                            Does vesti Sell Cryptocurrency ?
                          </button>
                        </h2>
                        <div
                          id="collapseSix"
                          class="accordion-collapse collapse"
                          aria-labelledby="headingSix"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            <p>
                              No, vesti doesn’t sell crypto currency but rather
                              leverage on deep technology, investment Industry
                              and alternative data and analysis. We may add a
                              peer peer crypto service in the near future. .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal
          cancelButtonProps={{ style: { display: 'none' } }}
          visible={modal}
          onCancel={closeModal}
          destroyOnClose
          footer=""
          className="new-modal"
          centered={true}
          okButtonProps={{ style: { display: 'none' } }}
          maskStyle={{
            background: 'rgba(103, 169, 72, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Suggestion />
        </Modal>
      </div>
      <FAQPageFooter openModal={openModal} />
    </div>
  );
}

export default FaqsBanner;
