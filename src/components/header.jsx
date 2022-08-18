import React from "react";
import "./header.css";
import {Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header(){
    return(<header>
        <div>
        <h3 id="brandname">FakeStore</h3>
        <p id="tagline">for the window shoppers &#128521;</p>
        </div>
        <div>
        <Button id="cartButton"endIcon={<ShoppingCartIcon/>}>cart</Button>
        <p id="cartval">cart value</p>
        </div>
    </header>);
}

export default Header;