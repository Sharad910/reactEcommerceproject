/* eslint-disable react-hooks/rules-of-hooks */
import {React, useState } from "react";
import loginContext from "./loginContext";

const loginState= (props)=>{
    const [isLogged,setIsLogged]=useState(false);
    const [userName,setUserName]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [token,setToken]=useState("");
    return(
        <loginContext.Provider value={{isLogged,setIsLogged,userName,setUserName,userEmail,setUserEmail,token,setToken}}>
            {props.children}
        </loginContext.Provider>
    )
}

export default loginState;