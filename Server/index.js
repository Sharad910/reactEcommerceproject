const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fakeStoreTestDB");

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

let userEmail = "";
app.get("/cart", (req, res) => {
  User.findOne({ email: userEmail })
    .then((user) => {
      res.json(user.cart);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/cartItems", (req, res) => {
  User.findOne({ email: userEmail })
    .then((user) => {
      if (user !== null) {
        res.json({ value: `${user.cart.length}` });
      } else {
        res.json({ value: "0" });
      }
    })
    .catch((e) => console.log(e));
});

app.post("/addtocart", (req, res) => {
  let data = req.body;
  let product = {
    id: data.id,
    title: data.title,
    price: data.price,
    image: data.image,
  };
  // console.log(req.body);
  User.findOne({ email: data.email }).then(async (result) => {
    if (result) {
      await result.updateOne({ $push: { cart: product } }).then(()=>{
        res.json("cartUpdated");
      });
    } else {
      console.log("user not registered");
    }
  });
});

app.post("/checkout", (req, res) => {
  User.findOne({ email: userEmail }).then((user) => {
    user.updateOne({ $set: { cart: [] } }).then();
  });
});

app.post("/login", (req, res) => {
  let userData = req.body;
  // console.log(userData.email);
  userEmail = userData.email;
  User.findOne({ email: userData.email }).then((result) => {
    if (result) {
      res.json("AuthenticationSuccess");
      // console.log(result);
    } else {
      User.create({ name: userData.name, email: userData.email })
        .then(() => {
          res.json("AuthenticationSuccess");
        })
        .catch((e) => console.log(e));
    }
  });
});

app.listen(8080, () => {
  console.log("server started on 8080");
});
