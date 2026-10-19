import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <NavBar />
        <main>
          <Outlet/>
        </main>
      <Footer />
    </>
  )
}

export default Layout
