import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

//test
import LoginStaus from "./components/LoginStatus/LoginStatus";
import LivePage from "./routes/LivePage/LivePage";
import TitleCard from "./components/TitleCard/TitleCard";

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LivePage></LivePage>} />
      <Route path="/test" element={<LoginStaus />} />
    </Route>
  )
);

//do not add to this. Add to router (maybe only css)
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
