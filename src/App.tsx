import React from "react";
import "./App.css";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LivePage from "./routes/LivePage/LivePage";
import LandingPage from "./routes/Landing/Landing";
import HistoryGraph from "./components/HistoryGraph/HistoryGraph";
import LoginPage from "./routes/Login/LoginPage";
import BreadProfilesPage from "./routes/BreadProfilesPage/BreadProfilesPage";
import { Live, BreadProfile, History, Login } from "./components/config";

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LandingPage />} />
      <Route path={Live} element={<LivePage />} />
      <Route path={BreadProfile} element={<BreadProfilesPage />} />
      <Route path={History} element={<HistoryGraph />} />
      <Route path={Login} element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
