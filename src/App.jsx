import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import { ParkingProvider } from './context/ParkingContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import FavPark from './pages/FavPark'
import About from './pages/About'
import QuickStart from './pages/QuickStart'
import NotFound from './pages/NotFound'

function App() {
  const wrap = (children) => {
    return (
      <>
        <Navbar />
        {children}
      </>
    )
  }

  const wrapAll = (children) => {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }

  return (
    <HashRouter>
      <ParkingProvider>
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={wrapAll(<Home />)} />
          <Route path='/quick-nav' element={wrapAll(<QuickStart />)} />
          <Route path='/fav-park' element={wrapAll(<FavPark />)} />
          <Route path='/parking' element={wrap(<Parking />)} />
          <Route path='/about-us' element={wrapAll(<About />)} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ParkingProvider>
    </HashRouter>
  )
}

export default App
