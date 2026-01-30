const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        minLength: [3, "Title should be atleast 3 characters"],
        required: true
    },
    description: {
        type: String,
        minLength: [3, "Title should be atleast 3 characters"],
        required: true
    },
    toggleImp: {
        type:Boolean,
        default:false,
        required:true
    },
    toggleComplete: {
        type:Boolean,
        default:false,
        required:true
    },
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});
module.exports = mongoose.model("Task", taskModel);