import "./App.css";
import Header from "./components/header";
import Products from "./components/products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prodid from "./components/viewprod";
import Cart from "./components/viewcart";
import Checkout from "./components/checkout";
import Cartvalstate from "./context/cart/cartvalstate";
import LoginState from "./context/login/loginState";
function App() {
  return (
    <LoginState>
      <Cartvalstate>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path=":id" element={<Prodid />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<Checkout />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </Cartvalstate>
    </LoginState>
  );
}

export default App;
