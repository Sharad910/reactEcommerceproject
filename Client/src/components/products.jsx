import React, { useEffect, useState } from "react";
import { prodData, prodCategory } from "./apidata";
import Card from "./prodcard";
import "./styles/products.css";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



function Products() {
  const [prodbycat, setProdbycat] = useState([]);
  const [prods, setProds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProd, setshowProd] = useState(false);
  useEffect(() => {
    prodData()
      .then((data) => {
        // console.log(data);
        setProds(data);
        setProdbycat(data);
        // setshowProd(true);
      })
      .catch((e) => {
        console.log(e);
      });
    prodCategory().then((data) => {
      // console.log(data);
      setCategories(data);
      setshowProd(true);
    });
  }, []);

  function filterCat(event) {
    // console.log(event.target.value);
    if (event.target.value === "show") {
      setProdbycat(prods);
    } else {
      setProdbycat(
        prods.filter((prod) => prod.category === event.target.value)
      );
    }
  }
  return !showProd ? (
    <div>Loading...</div>
  ) : (
    <div id="prodPgContainer">
      <div id="filters">
        <h3>filter</h3>
        <hr></hr>
        <Box>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">By Category</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="show"
            name="radio-buttons-group"
            onChange={filterCat}
          >
            {categories.map((cat) => {
              return <FormControlLabel control={<Radio sx={{'& .JoyRadio-radio':{
                marginLeft:"12px",marginRight:"3px"
                  },'& .JoyRadio-radio:hover': {
                    bgcolor: 'white',
                  },
            }}/>} value={cat} label={cat}/>;
            })}
            <FormControlLabel control={<Radio sx={{'& .JoyRadio-radio':{
                marginLeft:"12px",marginRight:"3px"
                  },'& .JoyRadio-radio:hover': {
                    bgcolor: 'white',
                  },
            }}/>} value="show" label="show All"/>
          </RadioGroup>
          </FormControl>
        </Box>
      </div>
      <div>
        {prodbycat.map((prod) => {
          return (
            <div key={prod.id} className="product">
              <Card
                name={prod.title}
                price={prod.price}
                imgsrc={prod.image}
                desc={prod.description}
                id={prod.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
