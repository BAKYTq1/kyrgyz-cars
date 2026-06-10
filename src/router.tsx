import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './app/Layout/Layout'
import HomePage from './pages/home/HomePage'
import LotDetailPage from './pages/lot/LotDetailPage'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Help from './pages/help/Help'
import Delivery from './pages/help/Delivery'
import Support from './pages/help/Support'
import Formal from './pages/help/Formal'
import Payments from './pages/help/Payments'
import Deposit from './pages/help/Deposit'
import AccountLayout from './pages/account/AccountLayout'
import AccountHome from './pages/account/AccountHome'
import { AccountProfile } from './pages/account/AccountSection'
import { Registration } from './widgets/Auth/Registration/Registration'
import { Login } from './widgets/Auth/Login/Login'
import { ForgotPasswordd } from './widgets/Auth/forgotPassword/ForgotPasswordd'
import { PopularMakes } from './widgets/PopularMakes/PopularMakes'
import PrePurchaseProcess1 from './widgets/howItWorks/PrePurchaseProcess1/PrePurchaseProcess1'
import PurchaseProcess from './widgets/howItWorks/PurchaseProcess/PurchaseProcess'
import { DeliveryTimes } from './widgets/DeliveryTimes/DeliveryTimes'
import { Current } from './widgets/current/Current'
import { Won } from './widgets/won/Won'
import { Lost } from './widgets/lost/Lost'
import { Settings } from './widgets/settings/Settings'
import { Shipping } from './widgets/shipping/Shipping'
import { Watchlist } from './widgets/watchlist/Watchlist'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <div>Catalog</div> },
      { path: 'calculator', element: <div>Calculator</div> },
      { path: 'lot/:id', element: <LotDetailPage /> },
      { path: 'help', element: <Help /> },
      { path: 'delivery', element: <Delivery /> },
      { path: 'support', element: <Support /> },
      { path: 'formal', element: <Formal /> },
      { path: 'payments', element: <Payments /> },
      { path: 'deposit', element: <Deposit /> },
      { path: 'about', element: <About /> },
      { path: 'contacts', element: <Contact /> },
      { path: 'popularmakes', element: <PopularMakes /> },
      { path: 'prePurchaseProcess1', element: <PrePurchaseProcess1 /> },
      { path: 'how-it-works', element: <PurchaseProcess /> },
      { path: 'delivery-times', element: <DeliveryTimes /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountHome /> },
          { path: 'profile', element: <AccountProfile /> },
          { path: 'watchlist', element: <Watchlist /> },
          { path: 'shipping', element: <Shipping /> },
          // { path: 'deposits', element: <AccountDeposits /> },
          { path: 'current', element: <Current /> },
          { path: 'won', element: <Won /> },
          { path: 'lost', element: <Lost /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
  {
    path: 'registration',
    element: <Registration />,
  },
  {
    path: 'register',
    element: <Registration />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forgotpassword',
    element: <ForgotPasswordd />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordd />,
  },
])
