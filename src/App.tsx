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
      <Route
        index
        element={
          <div>
            <TitleCard
              title={"Livepage"}
              description={
                "Dette er et link til de nyeste værdier fra dit klima køle anlæg :)"
              }
              image={
                "https://lh3.googleusercontent.com/pw/AJFCJaWn751DzAU67z_RAiGDpz0S_kLRahQ4TcLLNjkg7u3Y3Q6hGGCYMsIUTJgNWCjvlMlJi0c0eW6jXacPk_CKWmzi3aSM_kY-4kc3M4qcD3MWE6uZQkk=w2400"
              }
              link={"/test"}
              color={"blue"}
            />
          </div>
        }
      />
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
