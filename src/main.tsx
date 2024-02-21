import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './contexts/NotificationContext.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: (<App/>)
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <RouterProvider router={routes} />
    </NotificationProvider>
  </React.StrictMode>,
)
