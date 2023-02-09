import React from "react";

import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Starred from "./Pages/Starred";
import Show from "./Pages/Show";


function App() {
  return (
 
    <Routes>
      <Route  path="/" element ={<Home />}/>
      <Route  path="/starred" element ={<Starred />}/>
      <Route  path="/show/:id" element ={<Show />}/>
      
    </Routes>

  );
}

export default App;
