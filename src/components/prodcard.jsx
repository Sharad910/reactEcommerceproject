import React from "react";
import "./prodcard.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Button} from "@mui/material";
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
function Card(props){
    return(
    <div className="proda">
        <div className="prodCard">
            <div className="imgContainer">
            <img alt="product" src={props.imgsrc}></img>
            <p>{props.price}$</p>
            <Button variant="outlined" endIcon={<InventorySharpIcon/>}>buy now</Button>
            <Button variant="outlined" endIcon={<AddShoppingCartIcon/>}>add to cart</Button>
            </div>
            <div>
            <h3>{props.name}</h3>
            <p>{props.desc}</p>
            
            </div>
        </div>
    </div>
    );
}

export default Card;