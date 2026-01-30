const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: [50, "Cannot exceed 50 characters"],
        default: "No Description"
    },
    teamMates: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    ],
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Project", projectSchema);