import React from "react";
import "./styles/header.css";
import {Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";
function Header(){
    return(<header>
        <div>
        <Link to="/" style={{textDecorationLine:"none"}}><h3 id="brandname">FakeStore</h3></Link>
        <p id="tagline">for the window shoppers &#128521;</p>
        </div>
        <div>
        <Button id="cartButton"endIcon={<ShoppingCartIcon/>}>cart</Button>
        <p id="cartval">cart value</p>
        </div>
    </header>);
}

export default Header;