import React, { Component } from 'react';
import logo from '../../assets/quicktellerlogo.png';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import './PageLayout.css';
import LinkComponent from 'routes/LinkComponent';
import { connect } from 'react-redux';

class PageNavbar extends Component {
  state = { isOpen: false };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  userSignOutTappedHandler = e => {
    if (typeof this.props.onChange === 'function') {
      this.props.userSignOutTapped(e.target.value);
    }
  };

  render() {
    const { token, temp_email } = this.props;
    console.log('temp_email', temp_email);
    return (
      <Navbar light expand="md" style={{ marginTop: '10px' }}>
        <NavbarBrand href="/" className="header__logo ">
          <img src={logo} alt="Quickteller log" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {temp_email == null ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                {token ? (
                  <Button
                    className="primary-btn btn-secondary"
                    style={{ width: '98px' }}
                    onClick={this.userSignOutTappedHandler}
                  >
                    {' '}
                    Log Out{' '}
                  </Button>
                ) : (
                  <LinkComponent
                    to="/buy-generic-paycode"
                    className={'primary-btn btn'}
                    style={{ width: '98px' }}
                  >
                    {' '}
                    Register{' '}
                  </LinkComponent>
                )}
              </NavItem>
            </Nav>
          ) : (
            ''
          )}
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token } = auth;
  return { token };
};

export default connect(mapStateToProps, {})(PageNavbar);
PageNavbar.defaultName = 'PageNavbar';
