import { Outlet } from 'react-router-dom'
import Header from '../../widgets/header/Header'
import Footer from '../../widgets/footer/Footer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}