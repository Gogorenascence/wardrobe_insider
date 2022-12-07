import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Hats from './Hats';



// import HatForm from "./HatForm";
import Shoes from "./Shoes";


function App(props) {
  return (
    <BrowserRouter>
    <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/Hats" element={<Hats hats={props.hats}/>}/>
          <Route path="/Shoes"  element = {<Shoes shoes={props.shoes}/>}/>
        </Routes>
      </div>
     </BrowserRouter>
  );
}


export default App;
