import React from "react";
import "./styles/header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import cartContext from "../context/cart/cartContext";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Headprofile from "./headerProfile";
import loginContext from "../context/login/loginContext";
import { Cartvalue } from "./apidata";

function Header() {
  const cart = useContext(cartContext);
  const logged = useContext(loginContext);
  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      let userData = JSON.parse(loggedInUser);

      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${userData.name}`,
          email: `${userData.email}`,
        }),
      }).then(async (res) => {
        let data = await res.json();
        if (data === "AuthenticationSuccess") {
          logged.setUserName(userData.name);
          logged.setUserEmail(userData.email);
          logged.setIsLogged(true);
          Cartvalue()
            .then((data) => {
              cart.setCartval(data.value);
            })
            .catch((e) => console.log(e));
        } else {
          console.log("login failed");
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <div>
        <Link to="/" style={{ textDecorationLine: "none" }}>
          <h3 id="brandname">FakeStorez</h3>
        </Link>
        <p id="tagline">for the window shoppers &#128521;</p>
      </div>
      <div style={{ display: "flex" }}>
        <Link to="cart" style={{ textDecorationLine: "none" }}>
          <IconButton sx={{ marginRight: "10px", marginTop: "10px" }}>
            <Badge badgeContent={cart.cartVal} color="secondary" showZero>
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Link>
        <Headprofile />
      </div>
    </header>
  );
}

export default Header;
