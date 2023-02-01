import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
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
      <Navbar light expand="md">
        <NavbarBrand href="/">
          <img src={Logo} width="20px" height="20px" alt="netwebpay" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto home_nav" navbar>
            <NavItem className="ml-md-5">
              <a href="/">Home</a>
            </NavItem>
            <NavItem>
              <a href="/about">About</a>
            </NavItem>
            <NavItem>
              <a href="/fees">Fees</a>
            </NavItem>
            <NavItem>
              <a href="/disclosure">TERMS OF SERVICE</a>
            </NavItem>
            <NavItem>
              <a href="/aml">AML</a>
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
