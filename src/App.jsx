import { Routes, Route } from 'react-router-dom'
import './App.scss'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Parking from './pages/Parking'
import Setting from './pages/Setting'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/parkit' element={<Home />} />
        <Route path='/parking' element={<Parking />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </>
  )
}

export default App
