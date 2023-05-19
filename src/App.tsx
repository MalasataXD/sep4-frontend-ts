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
import TitleCard from "./components/TitleCard/TitleCard";
import LandingPage from "./routes/Landing/Landing";

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route path="/live" element={<LivePage></LivePage>} />
      <Route index element={<LandingPage></LandingPage>} />
      <Route path="/test" element={<TitleCard />} />
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
