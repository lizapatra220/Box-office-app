import React from "react";
import Navs from "./Components/Navs"
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Starred from "./Pages/Starred";

function App() {
  return (
  <div>
    <Navs />
    <Routes>
      <Route  path="/" element ={<Home />}/>
      <Route  path="/starred" element ={<Starred />}/>
    
      </Routes>
  </div>
  );
}

export default App;
