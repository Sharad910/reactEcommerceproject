/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prodId } from "./apidata";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ImageMagnifier from "./maginfier";
import "./styles/viewprod.css";
import { useContext } from "react";
import cartContext from "../context/cart/cartContext";
import { Cartvalue } from "./apidata";

function viewProduct() {
  const cart=useContext(cartContext);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [prod, setProd] = useState({});

  useEffect(() => {
    prodId(id).then((data) => {
      // console.log(data);
      setProd(data);
      setShow(true);
    });
  }, [id]);
  async function sendToCart(){
    await fetch('/addtocart',{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id:`${prod.id}`,title:`${prod.title}`,price:`${prod.price}`,image:`${prod.image}` })
    }).then().catch();
  }
  async function updateCart(){
    await Cartvalue().then((data)=>{
      console.log(data);
      cart.setCartval(data.cartValue);
    }).catch((e)=>console.log(e));
  }

  function handleCart(){
    sendToCart();
    updateCart();
  }
  return !show ? (
    <div>Loading</div>
  ) : (
    <div id="viewprod">
      
      <div id="viewprodImage">
      <div>
        {/* <img id="viewImg" src={prod.image} alt={prod.title} /> */}
        <ImageMagnifier width={"400px"} height={"400px"} src={`${prod.image}`} />
        </div>
        <h4>{prod.price}$</h4>
        <Button onClick={handleCart} variant="outlined" endIcon={<AddShoppingCartIcon/>}>Add to cart</Button>
      </div>
      <div id="viewprodAbout">
        <p><u>category</u>&gt;<u>{prod.category}</u></p>
        <h2>{prod.title}</h2>
        <Box
            sx={{
                 '& > legend': { mt: 2 },
                }}>
      <Typography component="legend">Product Rating</Typography>
      <Rating name="read-only" value={prod.rating.rate} precision={0.1} readOnly />
      <p id="viewReview">{prod.rating.rate}/5 from {prod.rating.count} reviews</p>
    </Box>
    
    
    <hr></hr>
    <b>Product description:</b>
    <p>{prod.description}</p>
      </div>
    </div>
  );
}

export default viewProduct;
