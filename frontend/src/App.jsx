import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Upload from './pages/Upload'
import Login from './pages/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/login' Component={Login}/>
      <Route path='/upload' Component={Upload}/>
    </Routes>
  )
}

export default App