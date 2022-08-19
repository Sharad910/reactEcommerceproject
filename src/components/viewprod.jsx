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

function viewProduct() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [prod, setProd] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    prodId(id).then((data) => {
      console.log(data);
      setProd(data);
      setShow(true);
    });
  }, [id]);

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
        <Button variant="outlined" endIcon={<AddShoppingCartIcon/>}>add to cart</Button>
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
