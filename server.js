const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const userRoute = require("./route/userRoute");
const productRoute = require("./route/productRoute");
const cartRoute = require("./route/cartRoute");
const orderRoute = require("./route/orderRoute");
const paymentRoute = require("./route/paymentRoute");
const bodyParser = require('body-parser');
const cors = require("cors");
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ // specify your frontend URL
  credentials: true // allows cookies to be sent cross-origin
}));
app.use(express.json());
app.use(session({
  secret: 'Claw',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: false }
}));

//Route Middlewares 

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/payments', paymentRoute);


//Home Page 

app.get("/", (req, res) => {
    res.send("Home Page");
  });

app.use(errorHandler);


// Connect to MongoDB and start server 

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));