import React from "react";
import "./prodcard.css";

function Card(props){
    return(
    <div className="proda">
        <div className="prodCard">
            <div className="imgContainer">
            <img alt="product" src={props.imgsrc}></img>
            <p>{props.price}$</p>
            <button>buy now</button>
            <button>add to cart</button>
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