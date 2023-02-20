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
  home,
  trades,
  rates,

  profile,
 
  caramel,
  logoblack,
} from '../../assets/assets';



import './sidebar.scss';
import { colors } from '@material-ui/core';
// import robo from "../../assets/robo.svg"
export default function SideBar() {
  const isProvider = useUserData().userData.userType === 'PROVIDER';

  var userdata = useUserData();
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(clearCurrentLoggedInUser());
  return (
    <div className="side_box">

<nav className="d-flex align-items-center ml-4">
              {/* nav header */}

              <img src={logoblack} alt="netwebpay" width="10%" height="10%" />

              <div className="d-flex pt-2">
                <a className="text-dark title_text main_font_family" href="/">
                  Elhay Limited
                </a>
              </div>
            </nav>


      <div className="mini_side_box">
      <div className="side_box_content">
     

        <div className="side_content_box">
          <div className="pl-5" />
          {/* <p className="sidebar-greeting">
            {' '}
            Hi{' '}
            {userdata && userdata.userData.firstName === 'User'
              ? 'there'
              : userdata.userData.firstName}{' '}
            👋🏽{' '}
          </p> */}

          <Tooltip placement="right" title="My Wallet">
            <NavLink to="/bank">
              <div className="sidebar-links home_sidebar">
                <img className="home_sidebar_icon" src={home} alt="Home SVG"/>
                <p className="side_sub_txt text-white text_manrope">Home</p>
              </div>
            </NavLink>
          </Tooltip>

          <Tooltip placement="right" title="Trades">
            <NavLink to="/trades">
              <div className="sidebar-links">
                <img src={trades} alt="Feeds SVG" />
                <p className="side_sub_txt"> Trades </p>
              </div>
            </NavLink>
          </Tooltip>
        
          <Tooltip placement="right" title="Rates ">
            <NavLink to="/rates">
              <div className="sidebar-links">
                <img src={rates} alt="Feeds SVG" />
                <p className="side_sub_txt">Rates</p>
              </div>
            </NavLink>
          </Tooltip>


          <Tooltip placement="right" title="My Profile">
            <NavLink to="/myprofile">
              <div className="sidebar-links">
                <img src={profile} alt="Profile SVG" />
                <p className="side_sub_txt">
                  {/* <img src={filesIcon} className="pr-2" alt="" /> */}
                 Profile
                </p>
              </div>
            </NavLink>
          </Tooltip>
          <hr />
        
          {/* <Tooltip placement="right" title="Log Out">
            <Link onClick={handleLogout} to="/auth">
              <div className="sidebar-links logout">
                <img src={logout} alt="logout SVG" />
                <p className="side_sub_txt">
              
                  Logout
                </p>
              </div>
            </Link>
          </Tooltip> */}

          <img src={caramel} alt="caramel SVG" className="caramel"/>

             {/* {isProvider && (
            <>
              <Tooltip placement="right" title="Dashboard">
                <NavLink to="/dashboard">
                  <div className="sidebar-links">
                    <img src={provider} alt="Provider SVG" />
                    <p className="side_sub_txt"></p>
                  </div>
                </NavLink>
              </Tooltip>
            </>
          )} */}
        </div>
        <div className="side_content_box" />
      </div>
      {/* <p className="side_sub_txt download svg_ico  i7c_ico ">
                    Member
                  </p> */}

                  </div>
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
