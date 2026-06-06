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


export const router = createBrowserRouter([
  {
    path: '/',
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
