import React from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import { Router } from 'express';

//test
import EditValues from "./components/EditValues/EditValues";
import LiveStats from "./components/LiveValue/LiveValue";



//note: navbar ned to uses outlet

const router  = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<EditValues/>}/>
    <Route path='/test' element={<LiveStats/>}/>
  </Route>
))



function App() {
  return (
    <div>
      <Navbar/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
