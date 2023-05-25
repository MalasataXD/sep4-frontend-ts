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
import { LoginStatus_Login } from "./components/config";

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LandingPage />} />
      <Route path="/live" element={<LivePage />} />
      <Route index element={<LandingPage />} />
      <Route path={LoginStatus_Login} element={<LoginPage />} />
      <Route path="/history" element={<HistoryGraph />} />
      <Route path="/breadprofile" element={<BreadProfilesPage />} />
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
