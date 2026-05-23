import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './app/Layout/Layout'
import HomePage from './pages/home/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <div>Catalog</div> },
      { path: 'lot/:id', element: <div>Lot Detail</div> },
      { path: 'calculator', element: <div>Calculator</div> },
    ],
  },
])