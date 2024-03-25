import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Slider from '../src/Components/Slider/Slider.jsx'
import Login from '../src/Components/Login/Login.jsx'
import Signup from '../src/Components/SignUp/Signup.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Search from './Components/Search/Search.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Slider/>

      },

      {
        path : "login",
        element : <Login/>
      },
      {
        path : "signup",
        element : <Signup/>

      }
    ]
  },
  {
    path: "/dashboard",
    element : <Dashboard/>,
    children : [
      {
        path : "/dashboard",
        element : <Search/>
      }
    
    ]
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
