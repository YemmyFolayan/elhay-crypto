import AdminForgotPassword from 'containers/Auth/AdminForgotPassword';
import AdminResetPassword from 'containers/Auth/AdminResetPassword';

import Login from 'containers/Auth/Login';

import Twofactor from 'containers/Auth/Login/twofactor';
import Register from 'containers/Auth/Signup/SignUp';

// import Verification from '../containers/Verification/Verification';
import Cash from 'containers/Admin/Cash';
import Rate from 'containers/Admin/Cash/Rate';
// import Account from 'containers/Admin/Accounts';
// import AccountSettings from 'containers/Admin/Accounts/Settings';
import Transfer from 'containers/Admin/Cash/Transfer';
import Merchants from 'containers/Admin/Merchants';
import Airtime from 'containers/Admin/Airtime';
import Savings from 'containers/Admin/Savings';
import SavingsDetails from 'containers/Admin/Savings/SavingsDetails';
import EditSavings from 'containers/Admin/Savings/EditSavings';
import Dashboard from '../containers/Admin/Dashboard/index';
import Advice from 'containers/Admin/Migration';
import ScrollableTabsButtonAuto from 'containers/Admin/Streaming';
import { MemberStandard } from 'containers/Admin/Streaming';
import { MemberExclusive } from 'containers/Admin/Streaming';
import { MemberPlatinum } from 'containers/Admin/Streaming';
import { CampaignCreate } from 'containers/Admin/Streaming';
import { CampaignDetails } from 'containers/Admin/Streaming';
import { CampaignStory } from 'containers/Admin/Streaming';
import AdviceDetail from 'containers/Admin/Migration/AdviceDetail';
import Pathways from 'containers/Admin/Pathways';
import CreatePathway from 'containers/Admin/Pathways/CreatePathway';
import Services from 'containers/Admin/Services';
import CreateService from 'containers/Admin/Services/CreateService';
import Provider from 'containers/Admin/Provider';
import NewDashboard from 'containers/Admin/NewDashboard';
import Home from 'containers/website/Home';
import FAQ from 'containers/website/FAQ';
import Fries from 'containers/website/MigrationFries';
import Teams from 'containers/website/Team';
import Fees from 'containers/website/Fees';
import ServiceDetail from 'containers/Admin/Merchants/servicedetail';
import Vestisavings from 'containers/Admin/Savings/vestisavings';
import Mycard from 'containers/Admin/Cash/carddetails/carddetails';
import { Singlewallet } from 'containers/Admin/Cash/singlewallet/singlewallet';
import Disclosure from 'containers/website/Disclosure';
import Coin from 'containers/website/Coin';
import Aboutpathway from 'containers/Admin/Pathways/aboutpathway';
import { Actionpathway } from 'containers/Admin/Pathways/actionpathway';
import { Sharedpost } from 'containers/Admin/sharedpost/sharedpost';
import { Fullpost } from 'containers/Admin/NewDashboard/fullpost';
import CoinVstSuccess from 'components/website/CoinVstSuccess';

import Groupfeeds from 'containers/Admin/group/group';

import { Privacy } from 'containers/website/privacy';
import { AML } from 'containers/website/AML';
import { Userprofile } from 'containers/Admin/userprofile/userprofile';

import { Advisor } from 'containers/Admin/Advisor/advisor';
import { Verifyuser } from 'containers/Verification/verifyuser';

import { Singlefry } from 'containers/website/singlefry';
import Vesticards from 'containers/website/CardVesti';
import JapaPage from 'containers/website/JapaPage';
import Testimonials from 'containers/website/Testimonials';
import Mainsuccess from 'containers/Admin/success/success';
import { Countrylaunch } from 'containers/website/countrylaunch';
import Credithistory from 'containers/Admin/credits/credithistory';
import VestiCreditCards from 'containers/website/VestiCreditCards';
import BillPaymentHome from 'containers/Admin/BillPayment/BillPaymentHome';
import AirtimePurchase from 'containers/Admin/BillPayment/Airtime/AirtimePurchase';

const Routes = [
  { path: '/', component: Login, auth: false },
  { path: '/twofactor', component: Twofactor},
  { path: '/faq', component: FAQ },
  { path: '/fees', component: Fees },
  // { path: '/team', component: Teams },
  // { path: '/vesticoin', component: Coin, auth: false },
  // { path: '/vesticard', component: Vesticards },
  // { path: '/vesticoinsuccess', component: CoinVstSuccess, auth: false },
  { path: '/disclosure', component: Disclosure },
  { path: '/migrationfries', component: Fries },
  { path: '/privacy', component: Privacy },
  { path: '/aml', component: AML },
  { path: '/japa', component: JapaPage },
  // { path: '/testimonials', component: Testimonials },
  { path: '/comingsoon', component: Countrylaunch },
  { path: '/dashboard', component: Dashboard, auth: true },
  { path: '/feeds', component: NewDashboard, auth: true },
  // { path: '/fry/:postId', component: Singlefry },
  // { path: '/group/:id', component: Groupfeeds, auth: true },
  // { path: '/creditcard', component: VestiCreditCards },

  // Pathways
  // { path: '/pathways', component: Pathways, auth: true },
  // { path: '/pathwaydesc/:id', component: Aboutpathway, auth: true },
  // { path: '/actions/:id', component: Actionpathway, auth: true },
  // { path: '/create-pathway', component: CreatePathway, auth: true },
  // Services
  { path: '/services', component: Services, auth: true },
  { path: '/create-service', component: CreateService, auth: true },
  { path: '/provider', component: Provider, auth: true },
  { path: '/mydashboard', component: Cash, auth: false },
  { path: '/rates', component: Rate, auth: false },

  // { path: '/advice', component: Advice, auth: true },
  // { path: '/advice/:countryId', component: AdviceDetail, auth: true },
  // { path: '/service/:id', component: ServiceDetail, auth: true },
  // { path: '/webinar', component: ScrollableTabsButtonAuto, auth: true },
  // { path: '/accounts', component: Account, auth: true },
  { path: '/myprofile', component: Userprofile, auth: true },
  // { path: '/accounts/settings', component: AccountSettings, auth: true },
  { path: '/merchants', component: Merchants, auth: true },
  { path: '/buy-airtime', component: Airtime, auth: true },
  { path: '/bills-payment', component: BillPaymentHome, auth: true },
  { path: '/airtime', component: AirtimePurchase, auth: true },

  // //shared post
  // { path: '/sharedpost/:postId', component: Sharedpost },
  // { path: '/fullpost/:postId', component: Fullpost },

  // // SAVINGs
  // { path: '/savings', component: Savings, auth: true },
  // { path: '/createsavings', component: Vestisavings, auth: true },
  // { path: '/savings/:savingsId', component: SavingsDetails, auth: true },
  // { path: '/savings/:savingsId/update', component: EditSavings, auth: true },

  // // no auth routes
  // { path: '/', component: Login, auth: false },
  { path: '/register', component: Register, auth: false },
  { path: '/auth', component: Login, auth: false },
  { path: '/auth/forgot-password', component: AdminForgotPassword },
  // token for reset password
  { path: '/auth/reset-password/:token', component: AdminResetPassword },
  { path: '/verified/:userId', component: Verifyuser },

  // P2P cash transfer
  { path: '/bank/transfer', component: Transfer },

  // // MEMBER
  // { path: '/member/standard', component: MemberStandard, auth: true },
  // { path: '/member/exclusive', component: MemberExclusive, auth: true },
  // { path: '/member/platinum', component: MemberPlatinum, auth: true },
  // { path: '/campaign/create', component: CampaignCreate, auth: true },
  // { path: '/campaign/detail', component: CampaignDetails, auth: true },
  // { path: '/campaign/story', component: CampaignStory, auth: true },
  // { path: '/advice/:countryId', component: CampaignStory, auth: true },

  // // Robo


  // { path: '/roboadvisor', component: Advisor, auth: true },

  { path: '/mycard', component: Mycard, auth: true },
  { path: '/singlewallet', component: Singlewallet, auth: true },

  { path: '/transactionstatus', component: Mainsuccess, auth: false },

  // credit hitory and credit cards
  { path: '/credithistory', component: Credithistory, auth: true },
];

export default Routes;
