import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './app/Layout/Layout'
import HomePage from './pages/home/HomePage'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Help from './pages/help/Help'
import Delivery from './pages/help/Delivery'
import Support from './pages/help/Support'
import Formal from './pages/help/Formal'
import Payments from './pages/help/Payments'
import Deposit from './pages/help/Deposit'

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./app/Layout/Layout";
import HomePage from "./pages/home/HomePage";
import { Registration } from "./widgets/Auth/Registration/Registration";
import { Login } from "./widgets/Auth/Login/Login";
import { ForgotPasswordd } from "./widgets/Auth/forgotPassword/ForgotPasswordd";
import { PopularMakes } from "./widgets/PopularMakes/PopularMakes";
import PrePurchaseProcess1 from "./widgets/howItWorks/PrePurchaseProcess1/PrePurchaseProcess1";
import PurchaseProcess from "./widgets/howItWorks/PurchaseProcess/PurchaseProcess";
import { DeliveryTimes } from "./widgets/DeliveryTimes/DeliveryTimes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <div>Catalog</div> },
      { path: 'lot/:id', element: <div>Lot Detail</div> },
      { path: 'calculator', element: <div>Calculator</div> },
      { path: '/help', element: <Help /> },
      { path: '/delivery', element: <Delivery /> },
      { path: '/support', element: <Support /> },
      { path: '/formal', element: <Formal /> },
      { path: '/payments', element: <Payments /> },
      { path: '/deposit', element: <Deposit /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contact /> },

      
      
     
    ],
  },
])
      { path: "catalog", element: <div>Catalog</div> },
      { path: "lot/:id", element: <div>Lot Detail</div> },
      { path: "calculator", element: <div>Calculator</div> },
      { path: "popularmakes", element: <PopularMakes /> },
      { path: "prePurchaseProcess1", element: <PrePurchaseProcess1 /> },
      { path: "how-it-works", element: <PurchaseProcess /> },
      { path: "delivery", element: <DeliveryTimes /> },
    ],
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPasswordd />,
  },
]);
