import { Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
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
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/parkit' />} />
        <Route path='/parkit' element={wrapAll(<Home />)} />
        <Route path='/setting' element={wrapAll(<Setting />)} />
        <Route path='/about-us' element={wrapAll(<About />)} />
        <Route path='/parking' element={<Parking />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
