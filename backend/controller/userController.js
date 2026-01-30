const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

//Register a user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample id",
            url: "sample url",
        }
    });
    sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter both email and password", 400));
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("Email cannot be found", 404));
    }

    const resetToken = user.getResetToken();
    const url = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordMsg = `Open this link to reset your password\n\n${url}`
    const message = `Email with reset password url sent to ${req.body.email}`;

    try {
        await sendEmail({
            mailto: req.body.email,
            subjct: "Reset Password Token",
            text: resetPasswordMsg
        });

        res.status(200).json({
            success: true,
            message
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler("Unable to send email", 500));
    }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Invalid token or token has been expired", 400));
    }
    else if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    sendToken(user, 200, res);
});

//Req user data
exports.getUserData = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.status(201).json({
        success: true,
        user,
    });
});