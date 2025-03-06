
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");
//this means that the server will accept requests from any origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Handle React routing, return all requests to React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const {itemsRouter} = require("./routers/itemsRouter");


const {errorHandlers} = require("./controllers/errorController");
const { applyTimestamps } = require("./models/TodoItem");

const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@xdb.mjwzy.mongodb.net/${process.env.MONGO_DB_DATABASE}`;


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.use(morgan('combined'));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Recived");
  console.log(req.url);
  console.log("Req body",req.body);
  next();
});

app.use(itemsRouter);


app.use(errorHandlers);

const port = process.env.PORT || 3000;


mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
