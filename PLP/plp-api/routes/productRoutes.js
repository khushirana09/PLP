const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Add new products POST   create  C
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Product not added" });
    }
});

//GET Product   read all product  R 
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); //array
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

//Read single products
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Product not found" });
    }
});

//UPDATE product   PUT  U
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,     //which product
            req.body,          //new data
            { new: true }      //updated product
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Updated Failed" });
    }
});

//DELETE product DELETE  D
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete Failed" });
    }
});


module.exports = router;