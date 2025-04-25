import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import Header from './components/Header'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: '#35383e',
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
