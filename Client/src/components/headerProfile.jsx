import React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import loginContext from "../context/login/loginContext";
import Login from "./login";
import cartContext from "../context/cart/cartContext";
import { useContext } from "react";

export default function Headprofile() {
  const cart = useContext(cartContext);
  const logged = useContext(loginContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    logged.setUserName("");
    logged.setUserEmail("");
    localStorage.clear();
    cart.setCartval(0);
    logged.setIsLogged(false);
  };
  return logged.isLogged ? (
    <div>
      <Button onClick={handleClick}>
        <Avatar
          sx={{ marginLeft: "0px", marginRight: "10px", marginTop: "2px" }}
        >
          {logged.userName.slice(0, 1)}
        </Avatar>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  ) : (
    <div>
      <Button
        onClick={handleClick}
        sx={{ height: "40px", marginTop: "4px", marginRight: "3px" }}
        variant="contained"
        size="medium"
      >
        Login
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Login />
        </MenuItem>
      </Menu>
    </div>
  );
}
