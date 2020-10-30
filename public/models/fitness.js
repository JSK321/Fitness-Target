// log multiple exercises in a workout on a a given day
// track the name, type, weight, sets, reps, and duration of exercise
// if the exercise is a cardio exercise, track distance traveled.

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FitnessSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: "Name of exercise is required."
    }, 
    
    type: {
        type: String,
        trim: true,
        required: "Type of exercise is required."
    },

    sets: {
        type: Number,
        required: true,
    },

    reps: {
        type: Number,
        required: true,
    },

    duration: {
        type: Number,
    }
})

const Fitness = mongoose.model("Fitness", FitnessSchema);

module.exports = Fitness;