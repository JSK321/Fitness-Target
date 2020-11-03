const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./public/models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

db.Fitness.create({ name: "Fitness Plan" })
  .then(dbFitness => {
    console.log(dbFitness)
  })
  .catch(({ message }) => {
    console.log(message)
  })

//  Post Routes
app.post("/submit", ({ body }, res) => {
  console.log(Object.keys(body).length)
  if(Object.keys(body).length >= 5) {
    db.Weight.create(body)
      .then(({ _id }) => db.Fitness.findOneAndUpdate({}, { $push: { weight: _id } }, { new: true }))
      .then(dbWeight => {
        res.json(dbWeight)
      })
      .catch(err => {
        res.json(err)
      })
  } else if (Object.keys(body).length <= 3){
    db.Cardio.create(body)
      .then(({ _id }) => db.Fitness.findOneAndUpdate({}, { $push: { cardio: _id } }, { new: true }))
      .then(dbCardio => {
        res.json(dbCardio)
      })
      .catch(err => {
        res.json(err)
      })
  } 
})

app.get("/weights", (req, res) => {
  console.log("in weights")
  db.Weight.find({})
    .then(dbWeight => {
      res.json(dbWeight)
    })
    .catch(err => {
      res.json(err)
    })
})

app.get("/cardio", (req, res) => {
  db.Cardio.find({})
    .then(dbCardio => {
      res.json(dbCardio)
    })
    .catch(err => {
      res.json(err)
    })
})

app.get("/populated", (req, res) => {
  db.Fitness.find({})
    .populate("weight")
    .populate("cardio")
    .then(dbFitness => {
      res.json(dbFitness)
    })
    .catch(err => {
      res.json(err)
    })
})

app.delete("/delete/:id", (req,res) => {
  db.Fitness.remove({_id: mongojs.ObjectId(req.params.id)}, (err,data) =>{
    if(err){
      console.log(err)
      res.status(500).end()
    } else {
      res.json(data)
    }
  })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});