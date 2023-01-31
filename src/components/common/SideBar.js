import React from 'react';
import '../components.css';
import { Link } from '@reach/router';
import { Tooltip } from 'antd';
import vestiLogo from 'assets/NetWebPay_logo.svg';
// import vestiLogo from 'assets/xmasvesti.svg';
import { clearCurrentLoggedInUser } from 'containers/Auth/Login/actions';
import { useDispatch } from 'react-redux';
import { useUserData } from 'helpers/hooks';
import {
  feeds,
  member,
  cash,
  merchant,
  airtime,
  advice,
  savings,
  profile,
  logout,
  pathway,
  provider,
  chistory,
} from '../../assets/assets';
import './sidebar.scss';
// import robo from "../../assets/robo.svg"
export default function SideBar() {
  const isProvider = useUserData().userData.userType === 'PROVIDER';

  var userdata = useUserData();
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(clearCurrentLoggedInUser());
  return (
    <div className="side_box">
      <div className="side_box_content">
        <a href="/" className="sidebar-vesti-logo">
          <img
            src={vestiLogo}
            alt=""
            // style={{ width: '120px' }}
            className="sidebar-logo"
          />
        </a>

        <div className="side_content_box">
          <div className="pl-5" />
          <p className="sidebar-greeting">
            {' '}
            Hi{' '}
            {userdata && userdata.userData.firstName === 'User'
              ? 'there'
              : userdata.userData.firstName}{' '}
            👋🏽{' '}
          </p>

          <Tooltip placement="right" title="My Wallet">
            <NavLink to="/bank">
              <div className="sidebar-links">
                <img src={cash} alt="Feeds SVG" />
                <p className="side_sub_txt">Bank</p>
              </div>
            </NavLink>
          </Tooltip>

          <Tooltip placement="right" title="Migration Fees ">
            <NavLink to="/merchants">
              <div className="sidebar-links">
                <img src={merchant} alt="Feeds SVG" />
                <p className="side_sub_txt">Migration Fees</p>
              </div>
            </NavLink>
          </Tooltip>
          <Tooltip placement="right" title="Credit Card">
            <NavLink to="/credithistory">
              <div className="sidebar-links">
                <img src={chistory} alt="Feeds SVG" />

                <p className="side_sub_txt">
                  {/* // eslint-disable-next-line */}
                  {/* Credit History &#127381; */}
                  Credit Card
                  <img
                    className="chistory"
                    src={
                      'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/new-button.png'
                    }
                    alt="new"
                  />
                </p>
              </div>
            </NavLink>
          </Tooltip>

          <Tooltip placement="right" title="Pathways ">
            <NavLink to="/pathways">
              <div className="sidebar-links">
                <img src={pathway} alt="Feeds SVG" />
                <p className="side_sub_txt">Pathways</p>
              </div>
            </NavLink>
          </Tooltip>
          {isProvider && (
            <>
              <Tooltip placement="right" title="Dashboard">
                <NavLink to="/dashboard">
                  <div className="sidebar-links">
                    <img src={provider} alt="Provider SVG" />
                    <p className="side_sub_txt">Provider Dashboard</p>
                  </div>
                </NavLink>
              </Tooltip>
            </>
          )}
          <Tooltip placement="right" title="Airtime">
            <NavLink to="/buy-airtime">
              <div className="sidebar-links">
                <img src={airtime} alt="Bills Payment SVG" />
                <p className="side_sub_txt">Airtime</p>
              </div>
            </NavLink>
          </Tooltip>
          {/* <Tooltip placement="right" title="Bills Payment">
              <NavLink to="/bills-payment">
                <div className="sidebar-links">
                  <img src={airtime} alt="Airtime SVG"/>
                  <p className="side_sub_txt">
                    Bills Payment
                  </p>
                </div>
              </NavLink>
            </Tooltip> */}

          <Tooltip placement="right" title="My Feeds">
            <NavLink to="/feeds" className="is-active">
              <div className="sidebar-links">
                <img src={feeds} alt="Feeds SVG" />
                <p className="side_sub_txt">Feeds</p>
              </div>
            </NavLink>
          </Tooltip>
          <Tooltip placement="right" title="My Memberships & Webinar">
            <NavLink to="/webinar">
              <div className="sidebar-links">
                <img src={member} alt="Feeds SVG" />
                <p className="side_sub_txt">Member</p>
              </div>
            </NavLink>
          </Tooltip>
          {/* <Tooltip placement="right" title="Buy airtime">
              <NavLink to="/buy-airtime">
                <div className="sidebar-links">
                  <img src={airtime} alt="Airtime SVG"/>
                  <p className="side_sub_txt">
                    Buy Airtime
                  </p>
                </div>
              </NavLink>
            </Tooltip> */}
          <Tooltip placement="right" title="Advice">
            <NavLink to="/advice">
              <div className="sidebar-links">
                <img src={advice} alt="Advice SVG" />
                <p className="side_sub_txt">Advice</p>
              </div>
            </NavLink>
          </Tooltip>
          <Tooltip placement="right" title="My Savings">
            <NavLink to="/savings">
              <div className="sidebar-links">
                <img src={savings} alt="Savings SVG" />
                <p className="side_sub_txt">Savings</p>
              </div>
            </NavLink>
          </Tooltip>
          <Tooltip placement="right" title="My Profile">
            <NavLink to="/myprofile">
              <div className="sidebar-links">
                <img src={profile} alt="Profile SVG" />
                <p className="side_sub_txt">
                  {/* <img src={filesIcon} className="pr-2" alt="" /> */}
                  My profile
                </p>
              </div>
            </NavLink>
          </Tooltip>
          <hr />
          {/* <><p className="coming-soon">Coming Soon...</p>
            <Tooltip placement="right" title="Robo Advisor">
              <NavLink to="/roboadvisor">
                <div className="sidebar-links">
                  <img src={robo} alt="Robot SVG"/>
                  <p className="side_sub_txt">
                    Robo Advisor
                  </p>
                </div>
              </NavLink>
            </Tooltip></> */}
          <Tooltip placement="right" title="Log Out">
            <Link onClick={handleLogout} to="/auth">
              <div className="sidebar-links logout">
                <img src={logout} alt="logout SVG" />
                <p className="side_sub_txt">
                  {/* <img src={filesIcon} className="pr-2" alt="" /> */}
                  Logout
                </p>
              </div>
            </Link>
          </Tooltip>
        </div>
        <div className="side_content_box" />
      </div>
      {/* <p className="side_sub_txt download svg_ico  i7c_ico ">
                    Member
                  </p> */}
    </div>
  );
}

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? 'active' : '',
    })}
  />
);
