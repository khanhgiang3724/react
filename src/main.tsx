import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CartContext from './contexs/CartContext.tsx'
import { UserProvider } from './contexs/UserContex.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartContext>
          <App />
        </CartContext>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
