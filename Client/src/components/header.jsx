import React from "react";
import "./styles/header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";
import { useContext } from "react";
import cartContext from "../context/cart/cartContext";
import Badge from '@mui/material/Badge';
import IconButton from "@mui/material/IconButton";
function Header(){

    const cart=useContext(cartContext);
    return(<header>
        <div>
        <Link to="/" style={{textDecorationLine:"none"}}><h3 id="brandname">FakeStore</h3></Link>
        <p id="tagline">for the window shoppers &#128521;</p>
        </div>
        <div>
        <Link to="cart" style={{textDecorationLine:"none"}}><IconButton sx={{marginRight:"40px",marginTop:"7px"}}><Badge badgeContent={cart.cartVal} color="secondary" showZero><ShoppingCartIcon sx={{color:"white"}} /></Badge></IconButton></Link>
        </div>
    </header>);
}

export default Header;