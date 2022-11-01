import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'
import About from './pages/About'
import QuickNav from './pages/QuickNav'
import NotFound from './pages/NotFound'

function App() {
  const wrapAll = (children) => {
    return (
      <>
        {children}
        <Footer />
      </>
    )
  }

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/parkit' />} />
        <Route path='/parkit' element={wrapAll(<Home />)} />
        <Route path='/setting' element={wrapAll(<Setting />)} />
        <Route path='/about-us' element={wrapAll(<About />)} />
        <Route path='/quick-nav' element={wrapAll(<QuickNav />)} />
        <Route path='/parking' element={<Parking />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
