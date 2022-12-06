import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// import HatForm from "./HatForm";
// import HatList from "./HatList";
import ShoeList from "./ShoeList";
// import ShoeForm from "./ShoeForm";



function App(props) {
  return (
      <>
      <Nav />
      <div className="container">

      </div>
    </>
    // </BrowserRouter>
  );
}

export default App;

// function App() {
//   return (
//     // <BrowserRouter>
//     //   <Nav />
//       <div className="container">
//         <Routes>
//           <Route index element={<MainPage />} />
//           {/* <Route path="Hats">
//             <Route index element={<HatList hats={props.hats}/>} />
//           </Route> */}
//           <Route path="Shoes">
//             <Route index element={<ShoeList hats={props.shoes}/>} />
//           </Route>
//         </Routes>
//       </div>
//     // </BrowserRouter>
//   );
// }

// export default App;

// function App() {

//   return (
//     <BrowserRouter>
//       <Nav />
//       <div className="container">
//         <Routes>
//           <Route index element={<MainPage />} />
//           {/* <Route path="hats">
//             <Route path="" element={<HatsList />}></Route> */}
//               {/* <Route path=":HatsId" element={<Hats />}></Route> */}
//             {/* <Route path="new" element={<HatsForm />}></Route> */}
//           {/* </Route> */}
//           <Route path="shoes">
//             <Route path="" element={<ShoeList />}></Route>
//               <Route path=":shoeId" element={<shoe />}></Route>
//             {/* <Route path="new" element={<ShoeForm />}></Route> */}
//           </Route>
//           <Route
//                 path="*"
//                 element={
//                   <main style={{ padding: "1rem" }}>
//                     <p>There's nothing here!</p>
//                   </main>
//                 }
//               />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
