import React from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";


//test
import EditValues from "./components/EditValues/EditValues";

//note: navbar ned to uses outlet

const router = createHashRouter([
  {
    path: "/",
    element: <Navbar/>, //navbar gos here
    children: [ //all the pages under here (gos in children).
        {
            path: "/",
            element: <EditValues/>,
        },
        {
            path: "/test",
            element: <div>elemnet</div>,
        },
    ],
  },
]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
