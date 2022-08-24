import { React, useContext } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./styles/checkout.css";
import loginContext from "../context/login/loginContext";
function Checkout() {
  const logged = useContext(loginContext);
  return logged.isLogged ? (
    <div id="checkoutCont">
      <h2>
        Order Placed Successfully!!{" "}
        <CheckCircleIcon color="success"></CheckCircleIcon>
      </h2>
      <p>
        <b>Thanks for shopping with Us </b>
      </p>
      <FavoriteIcon color="error"></FavoriteIcon>
    </div>
  ) : (
    <h3>Error!!! not authenticated</h3>
  );
}

export default Checkout;
