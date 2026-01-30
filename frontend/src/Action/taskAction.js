import axios from "axios";

export const createTask = ({ title, description, toggleImp, toggleComplete }) => async (dispatch) => {
    try {
        dispatch({
            type: "createTaskRequest"
        })

        const { data } = await axios.post("api/v1/task/create",
            { title, description, toggleImp, toggleComplete },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        dispatch({
            type: "createTaskSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "createTaskFailure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getUserTasks = () => async (dispatch) => {
    try {
        dispatch({
            type: "getUserTasksRequest"
        });

        const { data } = await axios.get("api/v1/tasks");
        dispatch({
            type: "getUserTasksSuccess",
            payload: data.tasks,
        });
    } catch (error) {
        dispatch({
            type: "getUserTasksFailure",
            payload: error.message,
        });
    }
}

export const updateTask = ({ title, description, toggleImp, toggleComplete, taskId }) => async (dispatch) => {
    try {
        dispatch({
            type: "updateTaskRequest"
        });
        console.log(taskId);

        const { data } = await axios.put("api/v1/task/update",
            { title, description, toggleImp, toggleComplete, taskId },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        dispatch({
            type: "updateTaskSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updateTaskFailure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteTaskRequest"
        });
        console.log(taskId);

        const { data } = await axios.delete("api/v1/task/delete",
            { data: { taskId } }
        );
        dispatch({
            type: "deleteTaskSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteTaskFailure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getUserImpTasks = () => async (dispatch) => {
    try {
        dispatch({
            type: "getUserImpTasksRequest"
        });

        const { data } = await axios.get("api/v1/tasks/imp");
        dispatch({
            type: "getUserImpTasksSuccess",
            payload: data.tasks,
        });
    } catch (error) {
        dispatch({
            type: "getUserImpTasksFailure",
            payload: error.message,
        });
    }
}

export const getUserComTasks = () => async (dispatch) => {
    try {
        dispatch({
            type: "getUserComTasksRequest"
        });

        const { data } = await axios.get("api/v1/tasks/com");
        dispatch({
            type: "getUserComTasksSuccess",
            payload: data.tasks,
        });
    } catch (error) {
        dispatch({
            type: "getUserComTasksFailure",
            payload: error.message,
        });
    }
}