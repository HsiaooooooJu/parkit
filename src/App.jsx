import { Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'
import QuickNav from './pages/QuickNav'
import NotFound from './pages/NotFound'

function App() {
  const wrap = (children) => {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/parkit' />} />
        <Route path='/parkit' element={wrap(<Home />)} />
        <Route path='/quick-nav' element={wrap(<QuickNav />)} />
        <Route path='/setting' element={wrap(<Setting />)} />
        <Route path='/parking' element={<Parking />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
