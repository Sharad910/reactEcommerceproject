import React from "react";
import "./styles/prodcard.css";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function Card(props){
    return(
    <div className="proda">
        <div className="prodCard">
            <div className="imgContainer">
            <img alt="product" src={props.imgsrc}></img>
            <p>{props.price}$</p>
            <Link style={{textDecorationLine:"none"}} to={`/${props.id}`}>
            <Button variant="outlined" endIcon={<KeyboardArrowRightIcon/>}>View More</Button>
            </Link>
            </div>
            <div>
            <h3>{props.name}</h3>
            <p>{props.desc}</p>
            </div>
        </div>
    </div>
    );
}

export default Card;