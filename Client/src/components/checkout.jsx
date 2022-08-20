import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./styles/checkout.css";
function Checkout(){

    return(<div id="checkoutCont">
        <h2>Order Placed Successfully!! <CheckCircleIcon color="success"></CheckCircleIcon></h2>
        <p><b>Thanks for shopping with Us </b></p><FavoriteIcon color="error"></FavoriteIcon></div>);
}

export default Checkout;