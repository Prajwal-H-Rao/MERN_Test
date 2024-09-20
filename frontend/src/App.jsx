import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Upload from './pages/Upload'
import Login from './pages/Login'
import Table from './components/Table'
import Edit from './pages/Edit'

const App = () => {
  return (
    <Routes>
      <Route path='/login' Component={Login}/>
      <Route path='/upload' Component={Upload}/>
      <Route path='/list' Component={Table}/>
      <Route path='/update' Component={Edit}/>
    </Routes>
  )
}

export default App