import React from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import loginContext from "../context/login/loginContext";
import { useContext } from "react";
import cartContext from "../context/cart/cartContext";
import { Cartvalue } from "./apidata";

export default function Login() {
  const cart = useContext(cartContext);
  const logged = useContext(loginContext);
  async function handleLogin(response) {
    let user = jwt_decode(response.credential);
    let name = user.name;
    let email = user.email;
    await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${user.name}`, email: `${user.email}` }),
    }).then(async (res) => {
      let data = await res.json();
      console.log(data);
      const {loginToken}=data;
      // console.log(token);
      if (data.text==="Authenticated") {
        logged.setToken(loginToken);
        logged.setUserName(name);
        logged.setUserEmail(email);
        let data = { name, email,loginToken };
        localStorage.setItem("user", JSON.stringify(data));
        logged.setIsLogged(true);
        Cartvalue(loginToken)
          .then((data) => {
            cart.setCartval(data.value);
          })
          .catch((e) => console.log(e));
      } else {
        console.log("login failed");
      }
    });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      callback: handleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("login"), {
      theme: "outline",
      size: "medium",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="login"></div>
    </div>
  );
}
