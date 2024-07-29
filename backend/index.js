const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/users")
const Product = require("./models/products")

const MONGO_URL = "mongodb://127.0.0.1:27017/commerce"
main()
.then(console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post("/register", async(req,res)=>{
  let user = await new User(req.body);
  let result = await user.save();
  result= result.toObject();
  delete result.password;
  console.log(result);
  res.send(result);
})

app.post("/login", async(req,res)=>{
  let data = req.body
  if(data.password && data.email){
  let user = await User.findOne(req.body).select("-password");
  res.send(user?user:{result:"NO Data found"});
  }else{
    res.send({result:"Sorry Try again"})
  }
})

app.post("/add-product", async(req,res)=>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result)
})

app.get("/products" , async(req,res)=>{
  let products = await Product.find();
  if(products.length>0){
    res.send(products)
  }else{
    res.send({result: "No Products found"});
  }
})

app.delete("/product/:id", async(req,res)=> {
  const result = await Product.deleteOne({_id: req.params.id})
  res.send(result)
})

app.get("/product/:id", async(req,res)=>{
  let result = await Product.findOne({_id:req.params.id})
  if(result){
    res.send(result)
  }else{
    res.send({result:"No Record Found."})
  }
})

app.put("/product/:id", async(req,res) => {
  let result = await Product.updateOne(
    {_id: req.params.id},
    {
      $set : req.body
    }
  )
  res.send(result)
})

app.get("/search/:key", async(req,res)=>{
  let result = await Product.find({
    "$or": [
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {price:{$regex:req.params.key}}
    ]
  });
  res.send(result)
})

app.listen(3000, ()=>{
    console.log("App is listening to port 3000");
})