import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from "./components/Profile.jsx";
import { Provider } from 'react-redux';
import appStore from './utils/app.store.js';
import Connections from './components/Connections.jsx';

import ProtectedRoute from "./components/ProtectedRoute";
import Requests from './components/Requests.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />  
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "/connections",
        element: (
          <ProtectedRoute>
            <Connections />
          </ProtectedRoute>
        )
      },
      {
        path:"/requests",
        element:(
          <ProtectedRoute>
            <Requests/>
          </ProtectedRoute>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
       <RouterProvider router={appRouter}/>
    </Provider>
  
  </StrictMode>,
)
