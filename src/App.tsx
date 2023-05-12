import React from "react";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

import LoginStaus from "./components/LoginStatus/LoginStatus";
import CollapsibleMenu from "./components/CollapsibleMenu/CollapsibleMenu";

//note: navbar ned to uses outlet

const router = createHashRouter([
  {
    path: "/",
    element: <CollapsibleMenu />, //<div>navbar gos here</div>
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
    element: <div>navbar gos here</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
