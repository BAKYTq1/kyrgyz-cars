import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './app/Layout/Layout'
import HomePage from './pages/home/HomePage'
import LotDetailPage from './pages/lot/LotDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <div>Catalog</div> },
      { path: 'calculator', element: <div>Calculator</div> },
      { path: 'lot/:id', element: <LotDetailPage /> },
    ],
  },
])