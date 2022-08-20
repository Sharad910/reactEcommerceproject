/* eslint-disable react-hooks/rules-of-hooks */
import {React, useState } from "react";
import cartContext from "./cartContext";


const cartState= (props)=>{
    const [cartVal,setCartval]=useState(0);
    return(
        <cartContext.Provider value={{cartVal,setCartval}}>
            {props.children}
        </cartContext.Provider>
    )
}

export default cartState;