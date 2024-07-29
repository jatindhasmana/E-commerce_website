const mongoose = require("mongoose");
const Commerce = require("./models/commerce")
const MONGO_URL = "mongodb://127.0.0.1:27017/commerce"
main()
.then(console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let Allcomm = [
    {
      name: "Smartphone",
      price: 599,
      brand: "Apple",
      category: "Electronics"
    },
    {
      name: "Laptop",
      price: 1099,
      brand: "Dell",
      category: "Electronics"
    },
    {
      name: "Running Shoes",
      price: 79,
      brand: "Nike",
      category: "Sports"
    },
    {
      name: "T-shirt",
      price: 25,
      brand: "Adidas",
      category: "Fashion"
    },
    {
      name: "Headphones",
      price: 149,
      brand: "Sony",
      category: "Electronics"
    },
    {
      name: "Watch",
      price: 299,
      brand: "Casio",
      category: "Accessories"
    },
    {
      name: "Backpack",
      price: 59,
      brand: "North Face",
      category: "Accessories"
    },
    {
      name: "Sneakers",
      price: 129,
      brand: "Puma",
      category: "Fashion"
    },
    {
      name: "Camera",
      price: 899,
      brand: "Canon",
      category: "Electronics"
    },
    {
      name: "Sunglasses",
      price: 149,
      brand: "Ray-Ban",
      category: "Accessories"
    },
    {
      name: "Gaming Console",
      price: 399,
      brand: "Sony",
      category: "Electronics"
    },
    {
      name: "Jeans",
      price: 69,
      brand: "Levi's",
      category: "Fashion"
    },
    {
      name: "Fitness Tracker",
      price: 129,
      brand: "Fitbit",
      category: "Sports"
    },
    {
      name: "Tablet",
      price: 349,
      brand: "Samsung",
      category: "Electronics"
    },
    {
      name: "Dress",
      price: 89,
      brand: "Zara",
      category: "Fashion"
    },
    {
      name: "Bluetooth Speaker",
      price: 79,
      brand: "JBL",
      category: "Electronics"
    }
]

Commerce.insertMany(Allcomm);
