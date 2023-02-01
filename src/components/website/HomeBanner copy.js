import React from 'react';
// import "./Styles/Global.css";
import './Styles/HomeBanner.scss';
import man from '../../assets/main_img1.svg';
import guy from '../../assets/main_img2.svg';
import girl from '../../assets/main_img4.svg';
import lady from '../../assets/logo.png';
import setup from '../../assets/setup.svg';
import coin from '../../assets/coins.svg';
import phone from '../../assets/phone.png';
import avi from '../../assets/avi.png';
import hassle from '../../assets/hassle.svg';
import fast from '../../assets/fast-time.svg';
import real from '../../assets/real.svg';
import aws from '../../assets/aws.svg';
import google from '../../assets/google.svg';
import microsoft from '../../assets/microsoft.svg';
import facebook from '../../assets/facebook.svg';
import vaultnew from '../../assets/vaultnew.svg';
import lock from '../../assets/lock.svg';
import { Downloadvesti } from './downloadvesti/downloadvesti';
function HomeBanner() {
  return (
    <div>
      <div class="container">
        <div class="mt-5 pt-5">
          <h3 class="text-center">What Can You Do with NetWebPay?</h3>
          <p class="text-center vesti-color2">
            vesti gives humans the power to move overseas to 110 countries. We
            are the future of legal <br /> Immigration and global Immigration.
            NetWebPay uses deep technology like AI and Blockchain to help <br />{' '}
            thousands of Immigrants to find new homes.
          </p>
        </div>
        <section class="mb-5">
          <div class="image-container">
            <figure class="d-flex justify-content-between align-items-center figure-box">
              <div class="overlay-container">
                <div class="image pt-5">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={man}
                    alt="man smiling"
                  />
                  <div class="overlay">
                    <div class="overlay-text px-3 py-3">
                      <h3>
                        Move abroad <span class="vesti-color">with NetWebPay</span>.{' '}
                        
                      </h3>
                      <p class="text-left">
                        Want To Move Overseas To Live, For School or For Work?
                        Try NetWebPay Now, Join more than 10,000 Users finding home
                        abroad, raising the money they need to move and making
                        difficult international payments with NetWebPay.
                      </p>
                      <p class="text-left ">
                        with NetWebPay you can monitor your investment. Whether you
                        are a first time investor or an expert
                      </p>
                      <p>
                        <a href="/">
                          Get NetWebPay Now{' '}
                          <span>
                            <i class="px-3 fas fa-arrow-right"></i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="overlay-container">
                <div class="image pt-5">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={guy}
                    alt="guy sitting"
                  />
                  <div class="overlay">
                    <div class="overlay-text px-3 py-3 ">
                      <h3>
                        Financial Service for all intending Immigrants and the
                        diaspora.
                      </h3>
                      <p>
                        Send money to a service provider once you Know their
                        username. Recieve money for a service by sending your
                        unique vesti name, No complex setup required. Use your
                        money immediately to pay for fees like WES and US-SEVIS.
                      </p>
                      <p>
                        Hundreds of trusted Immigration service providers, all
                        in one place
                      </p>
                      <p>
                        <a href="/">
                          Get NetWebPay Now{' '}
                          <span>
                            <i class="px-3 fas fa-arrow-right"></i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
            <figure class="d-flex justify-content-between align-items-center figure-box">
              <div class="overlay-container">
                <div class="image pt-5">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={lady}
                    alt="lady smiling"
                  />
                  <div class="overlay">
                    <div class="overlay-text px-3 py-3">
                      <h3>Raise The Money you need to migrate</h3>
                      <p>
                        NetWebPay allows you the opportunity to do short-term
                        investments as you plan your relocation, and long term
                        investments on local and international stock exchanges.
                      </p>
                      <p>
                        with NetWebPay you easily monitor your investments, whether
                        you are a first time investor or an expert. Our
                        interface has no jargon. What you see is what you own.{' '}
                      </p>
                      <p>
                        <a href="/">
                          Get NetWebPay Now{' '}
                          <span>
                            <i class="px-3 fas fa-arrow-right"></i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="overlay-container">
                <div class="image pt-5">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={girl}
                    alt="girl smiling"
                  />
                  <div class="overlay">
                    <div class="overlay-text px-3 py-3 ">
                      <h3>
                        Want To Move Overseas To Live, For School or ForWork?{' '}
                        <span class="vesti-color"> Try NetWebPay Now!</span>
                      </h3>
                      <p>
                        Join more than 10,000 Users finding home abroad,raising
                        the money they need to move and making difficult
                        international payments with NetWebPay.
                      </p>
                      <p>
                        <a href="/">
                          Get NetWebPay Now{' '}
                          <span>
                            <i class="px-3 fas fa-arrow-right"></i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>
        <section class="backfall">
          <div class=" mt-5 pt-5 pb-5">
            <h3 class="text-center">Get Started In Few Minutes</h3>
            <p class="text-center vesti-color2">
              We protect your money woth military-grade security and <br />{' '}
              fraud systems. Your money is insured by the NDIC.
            </p>
          </div>

          <div class="banner4 d-flex align-items-center justify-content-around pb-5">
            <div class=" text-left vesti-color2">
              <h3>Setup in Minutes.</h3>
              <p>
                From your bed or office desk you can get a NetWebPay account <br />{' '}
                without lifting a finger, decide which country you want to
                migrate to <br /> and start a savings or relocation inestment
                plan.
              </p>
              <p>
                with NetWebPay you easily monitor your investments, whether <br />{' '}
                you are a first time investor or an expert. Our interface <br />{' '}
                has no jargon. What you see is what you own{' '}
              </p>
            </div>
            <div>
              <img class=".img-fluid mw-100 h-auto" src={setup} alt="" />
            </div>
          </div>
          <div class="banner4 d-flex align-items-center justify-content-around pb-5">
            <div>
              <img class=".img-fluid mw-100 h-auto" src={coin} alt="" />
            </div>

            <div class=" text-left vesti-color2">
              <h3>Trust is everything.</h3>
              <p>
                At NetWebPay, our people come first we believe that protecting{' '}
                <br /> you, your data and money is our number one <br />{' '}
                assignment.
              </p>
              <p>
                As a result we comply with the highest standards of <br /> the
                market offers and lead with integrity
              </p>
            </div>
          </div>
        </section>

        <div class="pb-5 mb-5 d-flex payment align-items-center justify-content-between can-do">
          <div class="phone">
            <img class=".img-fluid mw-100 h-auto" src={phone} alt="phone" />
          </div>
          <div class="bunch pb-5">
            <div class="pb-3 ms-3">
              <h3 class="">
                International Fee <br /> Payment Simplified
              </h3>
              <p class="vesti-color2">
                Think lifting a feather is effortless? Try payment with NetWebPay
              </p>
            </div>
            <div class="hassle-container d-flex payment">
              <div class="hassle-free  d-flex align-items-center justify-content-between ">
                <div class="me-2">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={hassle}
                    alt="hassle free"
                  />
                </div>
                <div class="hassle-text payment">
                  <h4 class="spacing">Without Hassle</h4>
                  <p class="vesti-color2">
                    We use state-of-the-art data encryption <br /> when handling
                    financial details.
                  </p>
                </div>
              </div>
              <div class="international ms-5 d-flex justify-content-between align-items-center">
                <div class="me-2">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={fast}
                    alt="fast time"
                  />
                </div>
                <div class="interntl-text ">
                  <h4 class="spacing">Seamless International</h4>
                  <p class="vesti-color2">
                    We use state-of-the-art data encryption <br /> whenhandling
                    financial details.
                  </p>
                </div>
              </div>
            </div>
            <div class="hassle-container d-flex payment ">
              <div class="international d-flex justify-content-around align-items-center">
                <div class="me-2">
                  <img
                    class=".img-fluid mw-100 h-auto"
                    src={fast}
                    alt="fast time"
                  />
                </div>
                <div class="interntl-text payment">
                  <h4 class="spacing">Real time Vees Values</h4>
                  <p class="vesti-color2">
                    We use state-of-the-art data encryption <br /> when handling
                    financial details.
                  </p>
                </div>
              </div>
              <div class="international ms-5 d-flex justify-content-around align-items-center">
                <div class="me-2">
                  <img class=".img-fluid mw-100 h-auto" src={real} alt="real" />
                </div>
                <div class="interntl-text ">
                  <h4 class="spacing">Real time Fees Values</h4>
                  <p class="vesti-color2">
                    We use state-of-the-art data encryption <br /> when handling
                    financial details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>




        <section class="mt-5 pt-5">
          <div>
            <h2 class="text-center vesti-color2">Be Rest Assured</h2>
            <p class="text-center vesti-color">
              {' '}
              Learn how we help people and talent migrate to <br /> the country
              of their choice.
            </p>
          </div>
          <div class="assurance d-flex flex-row align-items-center justify-content-around">
            <div class="security d-flex flex-column">
              <figure class="text-center">
                <img class=".img-fluid mw-100 h-auto" src={vaultnew} alt="" />
              </figure>
              <h4 class="text-center">Bank level Security</h4>
              <p class="text-center">
                We use state-of-the-art data encryption when handling <br />{' '}
                financial informaion and and (2FA) protection. We are backed{' '}
                <br /> by top financial market operators and we not only meet{' '}
                <br /> traditional security standards but exceed them.
              </p>
            </div>
            <div class="vertical-line"></div>
            <div class="protection">
              <figure class="text-center">
                <img class=".img-fluid mw-100 h-auto" src={lock} alt="" />
              </figure>
              <h4 class="text-center">Protected by the NG & US SEC</h4>
              <p class="text-center">
                Accounts are held by our banking partner, a <br /> firm duly
                registered by the central bank of Nigeria (CBN).
                <br /> Nigerian and US securities are comming soon on this
                platform <br /> traditional security standards but exceed them.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomeBanner;
