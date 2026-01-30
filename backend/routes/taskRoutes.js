const express = require("express");
const router = express.Router();
const {
    createTask,
    getUserTasks,
    updateTask,
    deleteTask,
    getUserImpTasks,
    getUserComTasks,
} = require("../controller/taskController");
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/task/create").post(isAuthenticatedUser, createTask);
router.route("/tasks").get(isAuthenticatedUser, getUserTasks);
router.route("/tasks/imp").get(isAuthenticatedUser, getUserImpTasks);
router.route("/tasks/com").get(isAuthenticatedUser, getUserComTasks);
router.route("/task/update").put(isAuthenticatedUser, updateTask);
router.route("/task/delete").delete(isAuthenticatedUser, deleteTask);

module.exports = router;