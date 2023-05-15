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

//test
import TargetCard from "./components/TargetCard/TargetCard";

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      <Route index element={<LivePage />} />
      <Route path="/test" element={<TargetCard title="test" state={true} />} />
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
