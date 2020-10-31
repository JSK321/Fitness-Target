const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const Fitness = require("./public/models/fitness");
// const { db } = require("./public/models/fitness");

const PORT = process.env.PORT || 3000;

// const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });

// Routes

// Post Route
app.post("/submit", ({body}, res) => {
  const fitness = new Fitness(body);
  Fitness.create(fitness)
    .then(dbFitness => {
      res.json(dbFitness)
      console.log("Success!")
    })
    .catch(err => {
      res.json(err)
    })
})

// Get Route
app.get("/exercise", (req, res) => {
  Fitness.find({})
  .then(dbFitness => {
    res.json(dbFitness)
  })
  .catch(err => {
    res.json(err)
  })
})

// Get Route by ID
app.get("/exercise/:id", (req, res) => {
  Fitness.findOne({_id: mongojs.ObjectId(req.params.id)})
  .then(dbFitness => {
    res.json(dbFitness)
  })
  .catch(err => {
    res.json(err)
  })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });