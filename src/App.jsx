import { Routes, Route } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'
import QuickNav from './pages/QuickNav'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/parkit' element={<Home />} />
        <Route path='/quick-nav' element={<QuickNav />} />
        <Route path='/parking' element={<Parking />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
