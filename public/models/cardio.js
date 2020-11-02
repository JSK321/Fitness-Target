const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardioSchema = new Schema({
    cardioDay: {
        type: String,
        required: "Select day to exercise",
        unique: true,
    },

    cardioDur: {
        type: Number,
    },

    distance: {
        type: Number,
    }
})

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;