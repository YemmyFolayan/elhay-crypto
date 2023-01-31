import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from '@reach/router';
import '../components.css';
import { connect } from 'react-redux';
import { Logo } from '../../assets/assets';
import { userSignOut } from '../../appRedux/actions/auth';

function HeaderMain() {
  useEffect(() => {});

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container">
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">
          <img src={Logo} width="90" height="35" alt="netwebpay" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto home_nav" navbar>
            <NavItem className="ml-md-5">
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              {localStorage.getItem('userData') && (
                <Link to="/bank">Dashboard</Link>
              )}
              {!localStorage.getItem('userData') && (
                <Link to="/invest">NetWebPay Cash</Link>
              )}
            </NavItem>
            <NavItem>
              <a href="/aml">AML</a>
            </NavItem>
  
            <NavItem>
              <a href="/privacy">Privacy</a>
            </NavItem>
            <NavItem>
              <a href="/auth">Login</a>
            </NavItem>
          </Nav>
       
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = ({ auth, common }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  const { display, message, loading } = common;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    display,
    message,
    loading,
  };
};

export default connect(mapStateToProps, {
  userSignOut,
})(HeaderMain);
