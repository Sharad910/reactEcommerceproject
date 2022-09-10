const express = require("express");
const app = express();
app.use(express.json());
const asyncHandler = require('express-async-handler')
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fakeStoreTestDB");
const JWT=require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  cart: [
    {
      id: Number,
      title: String,
      price: String,
      image: String,
    },
  ],
});

const User = mongoose.model("user", userSchema);
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

      // Get user from the token
      req.user = await User.findOne({email: decoded.userEmail});

      next()
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
})


app.post("/login", (req, res) => {
  let userData = req.body;
  let userEmail = userData.email;
  User.findOne({ email: userData.email }).then(async (result) => {
    if (result) {
      const loginToken=await JWT.sign({userEmail},process.env.JWT_SECRET_KEY,{expiresIn:"15d"});
      res.json({loginToken,text:"Authenticated"});
    } else {
      User.create({ name: userData.name, email: userData.email })
        .then(async() => {
          const loginToken=await JWT.sign({userEmail},process.env.JWT_SECRET_KEY,{expiresIn:"15d"});
          res.json({loginToken,text:"Authenticated"});
        })
        .catch((e) => console.log(e));
    }
  });
});

app.get("/cart",protect, async(req,res) => {
  let token=req.headers.authorization.split(" ")[1];
  const data=await JWT.verify(token,process.env.JWT_SECRET_KEY);
  User.findOne({ email: data.userEmail })
    .then((user) => {
      res.json(user.cart);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/cartItems",protect,async(req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  const data=await JWT.verify(token,process.env.JWT_SECRET_KEY);
  User.findOne({ email: data.userEmail })
    .then((user) => {
      if (user !== null) {
        res.json({ value: `${user.cart.length}` });
      } else {
        res.json({ value: "0" });
      }
    })
    .catch((e) => console.log(e));
});

app.post("/addtocart",protect, async(req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  const user=await JWT.verify(token,process.env.JWT_SECRET_KEY);
  let Email=user.userEmail;
  let data = req.body;
  let product = {
    id: data.id,
    title: data.title,
    price: data.price,
    image: data.image,
  };
  User.findOne({"cart.id":data.id,email:Email}).then(async(user)=>{
    if(user){
      res.json("cartUpdated");
    }
    else{User.findOne({ email: Email }).then(async (result) => {
      if (result) {
        await result.updateOne({ $push: { cart: product } }).then(()=>{
          res.json("cartUpdated");
        });
      } else {
        console.log("user not registered");
      }
    });}
  })
});

app.post("/checkout",protect,async (req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  const user=await JWT.verify(token,process.env.JWT_SECRET_KEY);
  User.findOne({ email: user.userEmail }).then((user) => {
    user.updateOne({ $set: { cart: [] } }).then();
  });
});


app.post("/modifyCart",protect, async(req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  const user=await JWT.verify(token,process.env.JWT_SECRET_KEY);
  let Email=user.userEmail;
  let data = req.body;
  User.findOne({"cart.id":data.id,email:Email}).then(async(user)=>{
   await user.updateOne({$pull:{cart:{id:data.id}}}).then(res.json("Removed")).catch((e)=>console.log(e));
})})


app.listen(8080, () => {
  console.log("server started on 8080");
});
