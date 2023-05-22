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
import LoginPage from "./routes/Login/LoginPage";

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LandingPage></LandingPage>} />
      <Route path="/live" element={<LivePage></LivePage>} />
      <Route path="/login" element={<LoginPage></LoginPage>} />
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
