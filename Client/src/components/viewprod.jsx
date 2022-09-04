/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prodId } from "./apidata";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ImageMagnifier from "./maginfier";
import "./styles/viewprod.css";
import { useContext } from "react";
import cartContext from "../context/cart/cartContext";
import loginContext from "../context/login/loginContext";
import { Cartvalue } from "./apidata";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function viewProduct() {
  const logged = useContext(loginContext);
  const cart = useContext(cartContext);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [prod, setProd] = useState({});
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    prodId(id).then((data) => {
      setProd(data);
      setShow(true);
    });
  }, [id]);
  async function sendToCart() {
    await fetch("/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                  Authorization:`Bearer ${logged.token}`},
      body: JSON.stringify({
        id: `${prod.id}`,
        title: `${prod.title}`,
        price: `${prod.price}`,
        image: `${prod.image}`,
        email: `${logged.userEmail}`,
      }),
    })
      .then(async(res)=>{
      await res.json();
      await Cartvalue(logged.token)
      .then((data) => {
        cart.setCartval(data.value);
      })
      .catch((e) => console.log(e));
      })
      .catch();
  }
 function handleCart() {
    if (logged.isLogged) {
      sendToCart();
    }
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return !show ? (
    <div>Loading</div>
  ) : (
    <div id="viewprod">
      <div id="viewprodImage">
        <div>
          {/* <img id="viewImg" src={prod.image} alt={prod.title} /> */}
          <ImageMagnifier
            width={"400px"}
            height={"400px"}
            src={`${prod.image}`}
          />
        </div>
        <h4>{prod.price}$</h4>
        <Button
          onClick={handleCart}
          variant="outlined"
          endIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={logged.isLogged ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {logged.isLogged
              ? "Added to cart"
              : "Error!! login to use cart functionality"}
          </Alert>
        </Snackbar>
      </div>
      <div id="viewprodAbout">
        <p>
          <u>category</u>&gt;<u>{prod.category}</u>
        </p>
        <h2>{prod.title}</h2>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Product Rating</Typography>
          <Rating
            name="read-only"
            value={prod.rating.rate}
            precision={0.1}
            readOnly
          />
          <p id="viewReview">
            {prod.rating.rate}/5 from {prod.rating.count} reviews
          </p>
        </Box>

        <hr></hr>
        <b>Product description:</b>
        <p>{prod.description}</p>
      </div>
    </div>
  );
}

export default viewProduct;
