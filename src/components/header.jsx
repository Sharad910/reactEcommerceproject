import React from "react";
import "./header.css";
function Header(){
    return(<header>
        <div>
        <h3>FakeStore</h3>
        <p>for the window shoppers &#128521;</p>
        </div>
        <div>
        <p>cart value</p>
        <button>cart</button>
        </div>
    </header>);
}

export default Header;