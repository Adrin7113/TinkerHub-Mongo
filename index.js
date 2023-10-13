require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./modal/thing");
//Initializing the app

const app = express();

//Middleware

app.use(express.json());

app.use("/api/addStuff", async (req, res) => {
  const { name, email } = req.body;
  try {
    const thing = await Thing.create({ name, email });
    res.status(200).json(thing);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.use("/api/getStuff", async (req, res) => {
  try {
    const things = await Thing.find({});
    res.status(200).json(things);
  } catch (error) {
    res.status(400).json(error);
  }
});

//MongoDb Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT + ".");
    });
  })
  .catch((error) => {
    console.log(error);
  });
