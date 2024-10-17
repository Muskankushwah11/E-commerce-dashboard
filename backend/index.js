// const express = require('express');
// const cors = require("cors");
// require('./db/config');
// const User = require("./db/User");
// const Product = require("./db/Product")
// const app = express();
// app.use(express.json()); // To parse JSON request bodies

// app.use(cors());
// app.post("/register",async(req,resp) => {
//     let user = new User(req.body);
//     let result =  await user.save();
//     result = result.toObject();
//     delete result.password
//     resp.send(result);
// })

// app.post("/login", async(req,resp)=>{
//     console.log(req.body)
//     if(req.body.password && req.body.email){
//         let user = await User.findOne(req.body).select("-password");
//         if(user){
//             resp.send(user)
//         }else{
//             resp.send({result:'No User Found'})
//         }}else {
//             resp.send({result:'No User Found'})
//         }
//     }
   
 
// )
// app.post("/add-product",async(req,resp) => {
//     let product = new Product (req.body);
//     let result = await product.save();
//     resp.send(result)
// });
// app.post("/products", async (req, resp) => {
//     try {
//         let products = await Product.find();  // Use lowercase 'products'
        
//         if (products.length > 0) {
//             resp.status(200).send(products);
//         } else {
//             resp.status(404).send({ result: "No Products Found" });
//         }
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         resp.status(500).send({ error: "Internal Server Error" });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server is running on http://localhost:5000");
// });
const express = require('express');
const cors = require('cors');
require('./db/config'); // Ensure your database config is correct
const User = require('./db/User'); 
const Product = require('./db/Product');

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// User Registration
app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password; // Exclude password from response
        resp.status(201).send(result);
    } catch (error) {
        console.error("Error registering user:", error);
        resp.status(500).send({ error: "Failed to register user" });
    }
});

// User Login
app.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                resp.status(200).send(user);
            } else {
                resp.status(404).send({ result: "No User Found" });
            }
        } else {
            resp.status(400).send({ error: "Email and Password are required" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        resp.status(500).send({ error: "Login Failed" });
    }
});

// Add Product
app.post("/add-product", async (req, resp) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        resp.status(201).send(result);
    } catch (error) {
        console.error("Error adding product:", error);
        resp.status(500).send({ error: "Failed to add product" });
    }
});

// Get All Products
app.get("/products", async (req, resp) => {
    try {
        let products = await Product.find(); // Fetch all products
        if (products.length > 0) {
            resp.status(200).send(products);
        } else {
            resp.status(404).send({ result: "No Products Found" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
