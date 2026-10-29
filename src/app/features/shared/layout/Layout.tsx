import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import '../styles/Layout.css'

const Layout = () => {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    if (hash === '') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return (
    <div className={isHome ? 'layout layout--home' : 'layout'}>
      <NavBar />
      <main key={pathname} className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
