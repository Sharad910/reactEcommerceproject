import React, { useEffect, useState } from "react";
import {prodData,prodCategory} from "./apidata";
import Card from "./prodcard";
import "./styles/products.css";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';



function Products(){
    const [prodbycat,setProdbycat]=useState([]);
    const [prods,setProds]=useState([]);
    const [categories,setCategories]=useState([]);
    const [showProd,setshowProd]=useState(false);
    useEffect(()=>{
        prodData()
            .then((data)=>{
                console.log(data);
                setProds(data);
                setProdbycat(data);
                // setshowProd(true);
            })
            .catch((e)=>{
                console.log(e);
            })
        prodCategory()
            .then((data)=>{
                console.log(data);
                setCategories(data);
                setshowProd(true);
            })
     },[])

     function filterCat(event){
        console.log(event.target.value);
        if(event.target.value==="show"){
            setProdbycat(prods);
        }
        else{
        setProdbycat(prods.filter(prod=>prod.category===event.target.value));
        }
    }
            return !showProd?<div>Loading...</div>:<div id="prodPgContainer"><div id="filters"><h3>filter</h3><hr></hr>
            <Box>
            <Typography
                id="demo-radio-buttons-group-label"
                level="body3"
                textTransform="uppercase"
                fontWeight="xl"
                sx={{ letterSpacing: '0.15rem' }}
                mb={2}
          >
            By Category
          </Typography>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="show"
                name="radio-buttons-group"
                onChange={filterCat}>{categories.map((cat)=>{
                    return (<Radio color="primary" value={cat} label={cat}></Radio>);
                    })}<Radio color="primary" value="show" label="Show All"></Radio></RadioGroup></Box></div><div>{prodbycat.map((prod)=>{
                    return <div key={prod.id} className="product"><Card name={prod.title} price={prod.price} imgsrc={prod.image} desc={prod.description} id={prod.id}/></div>
            })}</div></div>
    }

export default Products;