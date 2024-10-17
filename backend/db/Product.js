const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price: String,
    category:String,
    userId:String,
    password: String
});
module.exports = mongoose.model("products",productSchema);