import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
// import { AppContext } from './Context/AppContext.js'
import { MyContextProvider } from './Context/MyContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyContextProvider>
    <App />
    </MyContextProvider>
  </StrictMode>,
)
