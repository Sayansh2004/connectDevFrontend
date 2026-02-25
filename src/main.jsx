import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from "./components/Profile.jsx";

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={appRouter}/>
  </StrictMode>,
)
