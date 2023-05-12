import React from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import LoginStaus from "./components/LoginStatus/LoginStatus";

//note: navbar ned to uses outlet

const router = createHashRouter([
  {
    path: "/",
    element: <LoginStaus/>, //<div>navbar gos here</div>
    children: [
        {
            path: "/",
            element: <div>elemnet</div>,
        },
        {
            path: "/",
            element: <div>elemnet</div>,
        },
    ],
  },
  {
    path: "/test",
    element: <div>navbar gos here</div>
  }

]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
