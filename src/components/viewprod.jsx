import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prodId } from "./apidata";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


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
    <div>
      <div>
      <div>
        <img src={prod.image} alt={prod.title} />
        </div>
        <Button variant="outlined" endIcon={<AddShoppingCartIcon/>}>add to cart</Button>
      </div>
      <div>
        <p>category&gt;{prod.category}</p>
        <h2>{prod.title}</h2>
        <hr></hr>
        <p>{prod.description}</p>
        <Box
            sx={{
                 '& > legend': { mt: 2 },
                }}>
      <Typography component="legend">Product Rating</Typography>
      <Rating name="read-only" value={prod.rating.rate} precision={0.1} readOnly />
    </Box>
    <p>{prod.rating.rate}/5 from {prod.rating.count} reviews</p>
      </div>
    </div>
  );
}

export default viewProduct;
