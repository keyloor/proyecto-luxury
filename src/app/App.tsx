import { Route, Routes } from 'react-router-dom'
import Layout from './features/shared/layout/Layout'
import CarDetail from './features/cars/pages/CarDetail'
import Contact from './features/contact/pages/Contact'
import Cars from './features/cars/pages/Cars'
import NotFound from './features/shared/components/NotFound'
import Home from './features/home/pages/Home'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App