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
// Post Route
// app.post("/submit", ({body}, res) => {
//   const fitness = new Fitness(body);
//   Fitness.create(fitness)
//     .then(dbFitness => {
//       res.json(dbFitness)
//       console.log("Success!")
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })


// app.post("/submit", ({body}, res) => {
//   Fitness.create(body)
//     .then(({_id}) => Fitness.findOneAndUpdate({}, {$push: {weight: _id}}, {new: true}))
//     .then(fitness => {
//       res.json(fitness)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

// Get Route
// app.get("/exercise", (req, res) => {
//   Fitness.find({})
//   .then(dbFitness => {
//     res.json(dbFitness)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })

// app.get("/weights", (req,res) => {
//   Weight.find({})
//     .then(data => {
//       res.json(data)
//     })
// })

// Get Route by ID
// app.get("/exercise/:id", (req, res) => {
//   Fitness.findOne({_id: mongojs.ObjectId(req.params.id)})
//   .then(dbFitness => {
//     res.json(dbFitness)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })

// Get Route by populate
// app.get("/populatedWeightsExercise", (req, res) =>{
//   Fitness.find({}).populate("weight").then(data => {
//     console.log(data)
//     res.json(data);
//   }).catch(err => {
//     res.json(err);
//   })
// })

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});