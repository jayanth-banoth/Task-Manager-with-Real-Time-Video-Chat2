const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter correct email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "Pasword should be atleast 6 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    tasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Task",
            required: true,
        }
    ],
    projects: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Project",
            required: true
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: String,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
}

userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);