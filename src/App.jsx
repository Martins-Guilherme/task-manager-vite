import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import Header from './components/Header'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
