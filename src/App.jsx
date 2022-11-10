import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'
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
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={wrapAll(<Home />)} />
        <Route path='/setting' element={wrapAll(<Setting />)} />
        <Route path='/about-us' element={wrapAll(<About />)} />
        <Route path='/quick-nav' element={wrapAll(<QuickStart />)} />
        <Route path='/parking' element={wrap(<Parking />)} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
