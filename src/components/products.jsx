import React, { useEffect, useState } from "react";
import {prodData} from "./apidata";
import Card from "./prodcard";
import "./products.css";

function Products(){
    const [prods,setProds]=useState([]);
    const [showProd,setshowProd]=useState(false);
    useEffect(()=>{
        prodData()
        .then((data)=>{
            console.log(data);
            setProds(data);
            setshowProd(true);
        })
        .catch((e)=>{
            console.log(e);
        })
     }
        ,[])
            return !showProd?<div></div>:<div id="prodPgContainer"><div id="filters"><h3>filters</h3></div><div>{prods.map((prod)=>{
                return <div key={prod.id} className="product"><Card name={prod.title} price={prod.price} imgsrc={prod.image} desc={prod.description}/></div>
            })}</div></div>
    }

export default Products;