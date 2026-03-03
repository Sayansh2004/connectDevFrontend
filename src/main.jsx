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

// import ProtectedRoute from "./components/ProtectedRoute";
import Feed from './components/Feed.jsx';
import Requests from './components/Requests.jsx';
import Chat from './components/Chat.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,   
    children: [
      { index: true, element: <Feed /> },   
      { path: "profile", element: <Profile /> },
      { path: "connections", element: <Connections /> },
      { path: "requests", element: <Requests /> },
      { path: "chat/:targetUserId", element: <Chat /> }
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
