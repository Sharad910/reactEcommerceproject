import React from "react";
import "./header.css";
import {Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header(){
    return(<header>
        <div>
        <h3>FakeStore</h3>
        <p>for the window shoppers &#128521;</p>
        </div>
        <div>
        <Button endIcon={<ShoppingCartIcon/>}>cart</Button>
        <p>cart value</p>
        </div>
    </header>);
}

export default Header;