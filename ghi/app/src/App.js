import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Hats from './Hats';



function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="/Hats" element={<Hats hats={props.hats}/>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
