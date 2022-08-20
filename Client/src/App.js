import './App.css';
import Header from './components/header';
import Products from './components/products';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Prodid from './components/viewprod';
import Cart from './components/viewcart';
import Checkout from './components/checkout';
import Cartvalstate from './context/cart/cartvalstate';


function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Products />
    // </div>
    <Cartvalstate>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Products />}/>
    <Route path=":id" element={<Prodid/>}/>
    <Route path="cart" element={<Cart />}/>
    <Route path="/cart/checkout" element={<Checkout />}/>
    </Routes>
    </BrowserRouter>
    </Cartvalstate>
  );
}

export default App;
