import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Upload from './pages/Upload'

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Upload}/>
    </Routes>
  )
}

export default App