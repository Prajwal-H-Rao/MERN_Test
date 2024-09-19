import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Upload from './pages/Upload'
import Login from './pages/Login'
import Table from './components/Table'

const App = () => {
  return (
    <Routes>
      <Route path='/login' Component={Login}/>
      <Route path='/upload' Component={Upload}/>
      <Route path='/list' Component={Table}/>
    </Routes>
  )
}

export default App