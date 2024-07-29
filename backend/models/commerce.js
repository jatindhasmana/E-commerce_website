const mongoose = require("mongoose");

const commSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String
});

const Commerce = mongoose.model("Commerce", commSchema);

module.exports = Commerce;
