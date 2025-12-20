const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

//connect MongoDB
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("PLP API running");
});


app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
