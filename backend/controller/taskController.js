const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

//Create Task
exports.createTask = catchAsyncError(async (req, res) => {
    const { title, description, toggleImp, toggleComplete } = req.body;

    await Task.create({
        title, description, toggleImp, toggleComplete, ownerId: req.user._id
    });
    res.status(201).json({
        success: true,
        message: "Task Created"
    });
});

//Get all tasks of user
exports.getUserTasks = catchAsyncError(async (req, res) => {
    const tasks = await Task.find({ ownerId: req.user._id });

    res.status(200).json({
        success: true,
        tasks
    });
});

//Update Task
exports.updateTask = catchAsyncError(async (req, res, next) => {
    const { taskId } = req.body;
    console.log(taskId);
    let task = await Task.findById(taskId);

    if (!task) {
        return next(new ErrorHandler("Task does not exist", 404));
    }

    if (task.ownerId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 404));
    }

    task = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    });
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task Updated"
    });
});

//Delete Task
exports.deleteTask = catchAsyncError(async (req, res, next) => {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);

    if (!task) {
        return next(new ErrorHandler("Task does not exist", 404));
    }

    if (task.ownerId.toString() !== req.user.id.toString()) {
        return next(new ErrorHandler("Unauthorized", 404));
    }

    const user = await User.findById(req.user._id);
    user.tasks.forEach(async (task) => {
        if (task._id.toString() === taskId.toString()) {
            await task.deleteOne();
        }
    });
    await user.save();
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted"
    });
});

//Get Important Tasks of User
exports.getUserImpTasks = catchAsyncError(async (req, res) => {
    let tasks = await Task.find({ ownerId: req.user._id });

    tasks = tasks.filter(task => task.toggleImp === true);

    res.status(200).json({
        success: true,
        tasks
    });
});

//Get Completed Tasks of User
exports.getUserComTasks = catchAsyncError(async (req, res) => {
    let tasks = await Task.find({ ownerId: req.user._id });

    tasks = tasks.filter(task => task.toggleComplete === true);

    res.status(200).json({
        success: true,
        tasks
    });
});