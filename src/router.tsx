import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import Layout
import Layout from './components/Layout/Layout';
// imports pages
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import DashBoard from './pages/DashBoard/DashBoard';
import UserTable from './pages/Table/User';
import Chat from './pages/Chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/dashBoard',
        element: <DashBoard />,
      },
      {
        path: '/userTable',
        element: <UserTable />,
      },
    ],
  },
  {
    path: '/chat',
    element: <Chat />,
  },
], {basename: '/admin'});

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
