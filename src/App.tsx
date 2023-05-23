import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LivePage from "./routes/LivePage/LivePage";
import LandingPage from "./routes/Landing/Landing";
import HistoryGraph from "./components/HistoryGraph/HistoryGraph";
import LoginPage from "./routes/Login/LoginPage";
import { LoginStatus_Login } from "./components/config";

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LandingPage></LandingPage>} />
      <Route path="/live" element={<LivePage></LivePage>} />
      <Route index element={<LandingPage></LandingPage>} />
      <Route path={LoginStatus_Login} element={<LoginPage />} />
      <Route path="/history" element={<HistoryGraph />} />
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
