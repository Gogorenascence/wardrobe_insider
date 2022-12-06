import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// import HatForm from "./HatForm";
// import HatList from "./HatList";
import Shoes from "./Shoes";



// function App(props) {
//   return (
//       <>
//       <Nav />
//       <div className="container">

//       </div>
//     </>
//     // </BrowserRouter>
//   );
// }

// export default App;

function App(props) {
  return (
    <BrowserRouter>
    <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          {/* <Route path="Hats">
            <Route index element={<HatList hats={props.hats}/>} />
          </Route> */}
          <Route path="/Shoes"  element = {<Shoes shoes={props.shoes}/>}/>
        </Routes>
      </div>
     </BrowserRouter>
  );
}

export default App;
