import { combineReducers } from 'redux';

import Common from 'appRedux/reducers/Common';
import Auth from 'appRedux/reducers/Auth';
import Profile from 'appRedux/reducers/Profile';
import Menu from 'appRedux/reducers/menu';
import Transactions from 'appRedux/reducers/transactions';
import posts from 'appRedux/reducers/posts';
import countries from './countries';
import alertbox from './Alertbox';
import pathway from './pathway';
import kycupdate from './update';
import domore from './domore';
import waitlist from './waitlist';
import cards from './cards';

import merchants from './merchants';

import wallets from './wallets';

const reducers = combineReducers({
  alertbox: alertbox,
  common: Common,
  auth: Auth,
  profile: Profile,
  menu: Menu,
  transactions: Transactions,
  countries: countries,
  posts: posts,
  pathway: pathway,
  kycupdate: kycupdate,
  domore: domore,
  waitlist: waitlist,
  cards: cards,

  merchants: merchants,

  wallets: wallets,
});

export default reducers;
