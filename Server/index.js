const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cartArr=[];

app.get('/cart',(req,res)=>{
    res.json(cartArr);
})

app.get('/cartItems',(req,res)=>{
  let items =cartArr.length
  res.json({cartValue:items});
})

app.post('/addtocart',(req,res)=>{
    console.log(req.body);
    cartArr=[...cartArr,req.body];
    res.send("Added to cart");
})

app.post('/checkout',(req,res)=>{
  cartArr=[];
  res.send('checkout Successfull');
})
app.listen(8080,()=>{
    console.log("server started on 8080");
})