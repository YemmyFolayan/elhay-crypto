import React from 'react';
import './Styles/Navbar.scss';
import vestilogo from '../../assets/netwebpaylogo.svg';
import { Link } from '@reach/router';
import { useState } from 'react';
import japa from '../../assets/vjapa.svg';
import crypto from '../../assets/vcredit.svg';
import vcards from '../../assets/vcards.svg';
import vwallet from '../../assets/vwallet.svg';
import vloan from '../../assets/vloan.svg';
import mlab from '../../assets/mlab.svg';
import soon from '../../assets/soon.svg';
import { clearCurrentLoggedInUser } from 'containers/Auth/Login/actions';
import { useDispatch } from 'react-redux';
import dummyAvatar from '../../assets/dummy-avatar.png';
import ReactFlagsSelect from 'react-flags-select';
import { navigate } from '@reach/router';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
export const Navbar = props => {
  const [open, setOpen] = useState(false);
  //const [prod, setProd] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('NG');
  const storage = localStorage.getItem('userData');
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(clearCurrentLoggedInUser());
  const { search } = useLocation();
  const values = queryString.parse(search);
  var country = values.country;
  var changeCountry = value => {
    setSelected(value);
    value === 'NG' ? navigate('/') : navigate(`/comingsoon?country=${value}`);
  };
  return (
    <div className="navbar">
      <div className="navbar-inner-container">
        <div className="navbar-inner-container left">
          <img src={vestilogo} alt="vesti Logo" width="100px" height="100px"/>
        </div>
        <div className="navbar-inner-container right">
          <div className="right-inner">
            <p>
              {' '}
              <Link className={`navbar-link ${props.home}`} to="/">
                Home
              </Link>{' '}
            </p>

            <div className="navbar__products">
              <p onMouseEnter={() => setShow(true)}>
                {' '}
                Products <i className="fas fa-chevron-down"></i>
              </p>
              <Products setShow={setShow} show={show} />
            </div>
            <p>
              {' '}
              <Link className={`navbar-link ${props.about}`} to="/team">
                Team
              </Link>{' '}
            </p>
            <p>
              <Link
                className={`navbar-link ${props.fries}`}
                to="/migrationfries"
              >
                Migration Fries
              </Link>
            </p>
            {JSON.parse(storage) ? (
              <>
                <p style={{ color: 'red' }} onClick={() => handleLogout}>
                  <Link className={`navbar-link --sign-out`} to="/auth">
                    Sign Out
                  </Link>
                </p>
                <Link to="/bank" className="notif_cont ml-3">
                  <img
                    src={
                      JSON.parse(storage).profilePictureURL === null
                        ? dummyAvatar
                        : JSON.parse(storage).profilePictureURL
                    }
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50vw',
                      objectFit: 'cover',
                    }}
                    className="ml-4"
                    alt="user profile"
                  />
                </Link>
              </>
            ) : (
              <>
                <p>
                  <Link className={`navbar-link`} to="/auth">
                    Sign In
                  </Link>
                </p>
                <Link className="create-free" to="/register">
                  Create Free Account
                </Link>{' '}
              </>
            )}

            <ReactFlagsSelect
              defaultCountry={country ? country : 'NG'}
              selected={selected}
              onSelect={changeCountry}
              countries={['NG', 'GH', 'ZM']}
              customLabels={{ NG: 'NG', GH: 'GH', ZM: 'ZM' }}
              // showSecondarySelectedLabel={false}
              showSelectedLabel={false}
              alignOptionsToRight
              showOptionLabel={true}
              showSecondaryOptionLabel={false}
              placeholder=""
              className="flag-select"
            />
          </div>
        </div>
        <p className="Menu-toggle" onClick={() => setOpen(!open)}>
          <i
            className={` ${open ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'}`}
          ></i>
        </p>
      </div>

      <div
        className={`menu-responsive-container ${
          open ? ' active' : ' disabled'
        }`}
      >
        <div className="menu-responsive-inner">
          <ReactFlagsSelect
            defaultCountry={country ? country : 'NG'}
            selected={selected}
            onSelect={changeCountry}
            countries={['NG', 'GH', 'ZM']}
            customLabels={{ NG: 'NG', GH: 'GH', ZM: 'ZM' }}
            // showSecondarySelectedLabel={false}
            showSelectedLabel={false}
            alignOptionsToRight
            showOptionLabel={true}
            showSecondaryOptionLabel={false}
            placeholder=""
            className="flag-select"
          />
          <p>
            {' '}
            <Link className={`navbar-link ${props.home}`} to="/homepage">
              Home
            </Link>
          </p>
        
         
          {JSON.parse(storage) ? (
            <div className="menu-responsive-inner --user">
              <Link to="/bank" className="notif_cont">
                <img
                  src={
                    JSON.parse(storage).profilePictureURL === null
                      ? dummyAvatar
                      : JSON.parse(storage).profilePictureURL
                  }
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50vw',
                    objectFit: 'cover',
                  }}
                  alt="user profile"
                />
              </Link>
              <p style={{ color: 'red' }} onClick={() => handleLogout}>
                <Link className={`navbar-link --sign-out`} to="/auth">
                  Sign Out
                </Link>
              </p>
            </div>
          ) : (
            <>
              <p>
                <Link className={`navbar-link`} to="/auth">
                  Sign In
                </Link>
              </p>
              <Link className="create-free" to="/register">
                Create Free Account
              </Link>{' '}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Products = props => {
  var data = [
    {
      image: vcards,
      title: 'Cards',
      subtitle: `Ranges from Dreamers’ card (soon),
            Globalgeng Naira and Dollar Card, Founders card`,
      // subtitle :'Dreamers’ card',
      // subtext :'GlobalGeng card ',
      // text :'Virtual Dollar card',
      url: '/vesticard',
    },
    {
      image: japa,
      title: 'Pathways (Japa)',
      subtitle: 'See all immigration pathways available on vesti.',
      url: '/pathways',
    },
    // {
    //     image:vloan,
    //     title : 'Loans',
    //     subtitle :'Coming soon...',
    //     picture: soon
    //     // url:''

    // },

    {
      image: crypto,
      title: 'Credit Score',
      subtitle: 'Start importing your foreign credit history.',
      url: '/creditcard',
    },
    {
      image: vwallet,
      title: 'Wallets',
      subtitle: 'See all your balances available on vesti.',
      url: '/bank',
    },
    // {
    //     image:mlab,
    //     title : 'MLab',
    //     subtitle :'Coming soon...',
    //     picture: soon
    //     // url:''

    // },
    // {
    //     image:crypto,
    //     title : 'Cards',
    //     // subtitle :'Spend safely online, in-store and abroad with the new vesti card',
    //     url:'/vesticard'

    // },
  ];

  var soonCome = [
    {
      image: vloan,
      title: 'Loans',
      subtitle: `Access various migration loans
            on vesti.`,
      picture: soon,
      // url:''
    },
    {
      image: mlab,
      title: 'MLab',
      subtitle: `Coming Soon...`,
      picture: soon,
      // url:''
    },
  ];

  return (
    <div
      className={`products active ${props.value ? ' mactive' : ''}  ${
        props.show ? ' --active' : ' --inactive'
      }`}
      onMouseLeave={() => props.setShow(false)}
    >
      <div className="products__left">
        {data.map((item, index) => (
          <div className={`products__item`} key={index}>
            <img src={item.image} alt="product" />
            <div className="products__content">
              {!item.url ? (
                <p>{item.title} &nbsp;</p>
              ) : (
                <Link className="product-link" to={item.url}>
                  {item.title}
                </Link>
              )}
              <p className="products__subt">{item.subtitle}</p>
              {/* <p className="products__item__content__subtxt">{item.subtext}</p>
                                <p className="products__item__content__subtxt">{item.text}</p> */}
            </div>
            {/* {item.url && <img src={item.picture} alt="" />} */}
          </div>
        ))}
      </div>
      <div className="products__right">
        {soonCome.map((item, index) => (
          <div className={`products__item`} key={index}>
            <img src={item.image} alt="product" />
            <div className="products__content">
              {!item.url ? (
                <p>
                  {item.title} &nbsp;
                  <img src={item.picture} alt="" />
                </p>
              ) : (
                <Link className="product-link" to={item.url}>
                  {item.title}
                </Link>
              )}
              <p className="products__subt">{item.subtitle} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
