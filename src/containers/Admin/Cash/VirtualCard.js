import React, { useState } from 'react';

const VirtualCard = ({ cardData, user }) => {
  const { cardDetails } = cardData ?? {};
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const toggleFlip = () => setFlipped(!flipped);
  const toggleReveal = () => setRevealed(!revealed);
  const {
    cardExpYear,
    cardExpMonth,
    cardNumber,
    customerBalance,
    cardCVC,
  } = cardData ? cardDetails : {};
  const name = `${user.firstName} ${user.lastName}`;
  return (
    <div style={{ overflowX: 'scroll', perspective: '10000px' }}>
      <div
        className="inner"
        onClick={e => !e.target.classList.contains('revealer') && toggleFlip()}
        style={{
          height: '229.8px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform .6s',
          maxWidth: '480px',
          cursor: 'pointer',
          ...(flipped && { transform: 'rotateY(180deg)' }),
        }}
      >
        <div
          className="front h-100 w-100 bg-dark px-5 py-4 d-flex flex-column"
          style={{
            borderRadius: '10px',
            maxWidth: '480px',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            className="h-100 w-100"
            style={{
              backgroundColor: 'rgba(228, 228, 231, 0.06)',
              clipPath: 'ellipse(100% 67% at 12% 91%)',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></div>
          {/* Main Content */}
          {!flipped && (
            <>
              <div
                style={{ fontSize: '1.2rem', color: '#000000' }}
                className="mb-1"
              >
                Current Balance
              </div>
              <div
                style={{ fontWeight: 600, fontSize: '32px' }}
                className="text-white mb-auto"
              >
                ${(customerBalance ?? 0) / 100}
              </div>
              <div style={{ color: '#000000' }}>{name}</div>
              <div
                style={{ fontSize: '1.2rem', zIndex: 1 }}
                className="text-white d-flex justify-content-between"
              >
                <span>
                  <span className="mr-2">
                    {(revealed ? cardNumber ?? '' : 'XXXXXXXXXXXXXXXX')
                      .match(/.{1,4}/g)
                      ?.join(' ')}
                  </span>
                  <span className="revealer text-white" onClick={toggleReveal}>
                    <svg
                      style={{ pointerEvents: 'none', color: '#ffffff' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0)">
                        <path
                          d="M12.0003 8.72729C10.1948 8.72729 8.72754 10.1945 8.72754 12C8.72754 13.8055 10.1948 15.2727 12.0003 15.2727C13.8057 15.2727 15.273 13.8055 15.273 12C15.273 10.1945 13.8057 8.72729 12.0003 8.72729Z"
                          fill="#FFFFFF"
                        />
                        <path
                          d="M12 3.81812C6.54546 3.81812 1.88729 7.21081 0 11.9999C1.88729 16.789 6.54546 20.1818 12 20.1818C17.46 20.1818 22.1128 16.789 24.0001 11.9999C22.1128 7.21081 17.46 3.81812 12 3.81812ZM12 17.4545C8.98911 17.4545 6.54546 15.0108 6.54546 11.9999C6.54546 8.98898 8.98911 6.54537 12 6.54537C15.0109 6.54537 17.4546 8.98903 17.4546 11.9999C17.4546 15.0108 15.0109 17.4545 12 17.4545Z"
                          fill="#FFFFFF"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </span>
                <span>
                  {('0' + cardExpMonth).slice(-2)}/
                  {(cardExpYear ?? '').substr(-2)}
                </span>
              </div>
            </>
          )}
        </div>

        <div
          className="back h-100 w-100 bg-dark px-5 py-4 d-flex flex-column"
          style={{
            borderRadius: '10px',
            maxWidth: '480px',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className="h-100 w-100"
            style={{
              backgroundColor: 'rgba(228, 228, 231, 0.06)',
              clipPath: 'ellipse(100% 67% at 12% 91%)',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></div>
          {/* Main Content */}
          <div
            style={{ fontSize: '1.2rem', color: '#000000' }}
            className="mb-1"
          >
            CVV
          </div>
          <div
            style={{ fontWeight: 600, fontSize: '32px' }}
            className="text-white mb-auto"
          >
            {cardCVC}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;
