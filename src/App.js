import './App.css';
import Header from './components/header';
import Products from './components/products';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Prodid from './components/viewprod';

function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Products />
    // </div>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Products />}/>
    <Route path=":id" element={<Prodid />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
