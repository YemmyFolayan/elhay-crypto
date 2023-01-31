import React from 'react';
import './merchant.css';

const MerchantPayment = ({
  title,
  description,
  paymentHandler,
  amount = '102,965.50',
  custom = false,
  setCurrent,
  button,
}) => {
  let dollarUSLocale = Intl.NumberFormat('en-US');

  // var perc = amount && (dollarUSLocale.format(amount.ngn.replace(/[^0-9.-]+/g,"") / 10));
  return (
    <div className="col-md-6 col-lg-4 mb-3 merchant-box">
      <div className="merchant-card p-4 textleft mb-3">
        <div className="merchant-card-container">
          <div>
            <h3 className="merchant-card__title">{title}</h3>
            <p className="merchant-card__desc">{description}</p>
            {!custom && (
              <div className="mb-5 d-flex align-items-center flex-wrap">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M12.2517 16.0171H3.74829C1.67822 16.0171 0 14.339 0 12.2688V3.77954C0 1.70947 1.67822 0.03125 3.74829 0.03125H12.2517C14.3218 0.03125 16 1.70947 16 3.77954V12.2688C16 14.339 14.3218 16.0171 12.2517 16.0171Z"
                      fill="#F2C94C"
                    />
                    <path
                      d="M12.25 0.03125H11C13.071 0.03125 14.75 1.70874 14.75 3.77795V12.2704C14.75 14.3397 13.071 16.0171 11 16.0171H12.25C14.321 16.0171 16 14.3397 16 12.2704V3.77795C16 1.70874 14.321 0.03125 12.25 0.03125Z"
                      fill="#AE8C26"
                    />
                    <path
                      d="M5.60537 7.59496L5.61928 6.99791C5.62478 6.76256 5.80422 6.56798 6.03847 6.54308L8.98037 6.23094C9.25881 6.2014 9.50087 6.42076 9.49856 6.70042L9.45144 12.3754L9.95107 12.4026C10.1997 12.4161 10.3943 12.6214 10.3943 12.8701V13.3644C10.3943 13.6224 10.1854 13.8318 9.92727 13.8327L6.17373 13.8464C5.91189 13.8474 5.7001 13.6339 5.70327 13.3724L5.70925 12.8826C5.71218 12.6357 5.90639 12.4336 6.1531 12.4205L6.68557 12.3924L6.69167 8.09361L6.05935 8.07384C5.80202 8.0659 5.59939 7.85204 5.60537 7.59496Z"
                      fill="white"
                    />
                    <path
                      d="M9.56241 3.66626C9.56241 2.74438 8.81436 1.99707 7.89163 1.99707C6.96902 1.99707 6.22098 2.74438 6.22098 3.66626C6.22098 4.58826 6.96902 5.33557 7.89163 5.33557C8.81436 5.33557 9.56241 4.58826 9.56241 3.66626Z"
                      fill="white"
                    />
                    <path
                      d="M9.95131 12.4023L9.45167 12.3751L9.49879 6.7003C9.50111 6.42052 9.25893 6.20116 8.98048 6.2307L8.06801 6.3275C8.17836 6.41356 8.25001 6.54771 8.24879 6.7003L8.20167 12.3751L8.70131 12.4023C8.94984 12.4159 9.14455 12.6212 9.14455 12.87V13.3642C9.14455 13.6222 8.93568 13.8317 8.6775 13.8325L6.11183 13.8419C6.13222 13.8445 6.15273 13.8463 6.17384 13.8463L9.9275 13.8326C10.1857 13.8317 10.3944 13.6222 10.3944 13.3642V12.87C10.3945 12.6212 10.1998 12.4159 9.95131 12.4023Z"
                      fill="#EAEAEA"
                    />
                    <path
                      d="M7.89174 1.99707C7.67079 1.99707 7.45998 2.04041 7.26674 2.11829C7.87978 2.3656 8.31252 2.96533 8.31252 3.66626C8.31252 4.36731 7.87978 4.96704 7.26674 5.21435C7.45998 5.29224 7.67079 5.33557 7.89174 5.33557C8.81447 5.33557 9.56252 4.58813 9.56252 3.66626C9.56252 2.74438 8.81447 1.99707 7.89174 1.99707Z"
                      fill="#EAEAEA"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {/* Includes <span className="font-weight-bold mx-1">$40</span>{' '} */}
                Includes vesti platform charge of
                <span className="font-weight-bold ml-1">
                  {/* (${amount?.usd_ten_percent}). */}
                  (₦
                  {amount?.usd_ten_percent < 40
                    ? dollarUSLocale.format(
                        amount.ngn.replace(/[^0-9.-]+/g, '') / 10,
                      )
                    : (40 * 600)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  ).
                  {/* {amount && (dollarUSLocale.format(amount.ngn.replace(/[^0-9.-]+/g,"") / 10))} */}
                  {/* {perc} */}
                  {/* (₦{(40 * 585).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}). */}
                </span>
              </div>
            )}
          </div>
          <div>
            <div
              className="merchant-card__btn px-0"
              onClick={() => {
                setCurrent(amount);
                paymentHandler(custom);
              }}
            >
              {!custom ? (
                <span className="font-weight-bold mx-1">
                  {' '}
                  Pay ₦{amount?.ngn} <i class="fas fa-arrow-right"></i> Now{' '}
                </span>
              ) : (
                <span className="font-weight-bold mx-1">
                  {' '}
                  {button}
                  <i class="fas fa-arrow-right"></i>{' '}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPayment;
