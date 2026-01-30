import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginUserRequest"
        });

        const { data } = await axios.post("/api/v1/login",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        dispatch({
            type: "loginUserSuccess",
            payload: data.user
        });
    } catch (error) {
        console.error('Login error:', error);
        dispatch({
            type: "loginUserFailure",
            payload: error.message
        });
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutUserRequest",
        });

        await axios.get("/api/v1/logout");
        dispatch({
            type: "logoutUserSuccess",
        });

    } catch (error) {
        dispatch({
            type: "logoutUserFailure",
            payload: error.message,
        });
    }
}

export const registerUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "registerUserRequest",
        });

        const { data } = await axios.post("api/v1/register",
            { name, email, avatar, password },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        dispatch({
            type: "registerUserSuccess",
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: "registerUserFailure",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        });

        const { data } = await axios.get("/api/v1/me");
        dispatch({
            type: "loadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.message,
        });
    }
}