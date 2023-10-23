import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //el strictMode te ayuda a depurar, en produccion lo ignora
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
