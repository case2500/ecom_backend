const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(bodyParser.json({limit:'20mb'}))
//app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
 app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
// app.use(express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static('public'));

const userrouter = require("./routes/userroutes.js");
const orderrouter = require("./routes/orderroutes.js")
const productrouter = require("./routes/productroutes.js")
const categoryRoute = require("./routes/categoryroutes.js");
const sliderRouter  = require("./routes/sliderrouter.js");
const companyRouter  = require("./routes/companyrouter.js");
const autonumberRouter  = require("./routes/autonumberrouter.js");
const imagerouter  = require("./routes/imagerouter.js");

app.use("/api/category", categoryRoute);
app.use("/api/product", productrouter);
app.use("/api/silder", sliderRouter );
app.use("/api/order", orderrouter);
app.use("/api", userrouter);
app.use("/api/company",companyRouter)
app.use("/api/autonumber",autonumberRouter)
app.use("/api/images", imagerouter);
//getHello

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(4000);
    console.log("Database is connected! Listening to localhost 4000");
  })
  .catch((err) => console.log(err));
