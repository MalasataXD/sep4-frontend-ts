import React from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route, RouterProvider, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";


//test
import EditValues from "./components/EditValues/EditValues";
import LiveStats from "./components/LiveValue/LiveValue";
import LoginStaus from './components/LoginStatus/LoginStatus';

//note: navbar ned to uses outlet

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar/>}>
      <Route index element={<EditValues/>}/>
      <Route path='/test' element={<LoginStaus/>}/>
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
