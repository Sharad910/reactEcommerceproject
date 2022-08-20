/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Cartdata } from "./apidata";
import "./styles/viewcart.css";
import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useContext } from "react";
import cartContext from "../context/cart/cartContext";

function viewCart() {
  const cart=useContext(cartContext);

  async function checkout(){
    cart.setCartval(0);
    await fetch('/checkout',{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({checkout:"success"})
    }).then().catch();
  }

  const [userCart, setUserCart] = useState([]);
  const [showcart, setshowCart] = useState(false);
  useEffect(() => {
    Cartdata()
      .then((data) => {
        // console.log(data);
        setUserCart(data);
        setshowCart(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return showcart ? (
    <div id="cartContainer">
      <div>
        <h3>
          <u>Your Cart</u>
        </h3>
        <ol>
          {userCart.map((prod) => {
            return (
              <li>
                <div className="cartProducts">
                  <img className="cartImg" src={prod.image} alt="product" />
                  <div className="cartRemove">
                  <div className="cartAboutProd">
                    <h4 className="cartprodtitle">
                      <Link
                        style={{ textDecorationLine: "none" }}
                        to={`/${prod.id}`}
                      >
                        {prod.title.length > 45
                          ? `${prod.title.slice(0, 40)}...`
                          : prod.title}
                      </Link>
                    </h4>
                    <p className="cartProdPrice">${prod.price}</p>
                  </div>
                  <Tooltip title="Remove from cart">
                        <IconButton>
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div id="cartCheckout">
        <p id="cartTotal">
          <b>Cart Total- </b> $
          {userCart.reduce((total, prod) => {
            return total + Number(prod.price);
          }, 0)}
        </p>
        <Link style={{ textDecorationLine: "none" }} to="checkout">
          <Button
          onClick={checkout}
            sx={{ backgroundColor: "rgb(255, 153, 0)" }}
            variant="contained"
            color="success"
            endIcon={<ShoppingCartCheckoutIcon />}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default viewCart;
