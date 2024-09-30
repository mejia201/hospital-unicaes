import './App.css'
import Login from './views/login'
import Dashboard from './views/Dashboard'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      
        {/* Redirigir la ruta raíz a /login */}
        <Route path='/' element={<Navigate to='/login' />} />


      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     
    </Routes>
      
    </BrowserRouter>
     
    </>
  )
}

export default App
