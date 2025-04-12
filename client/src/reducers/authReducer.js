import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
    isLoading: false,
    token: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            window.localStorage.setItem(
                "user",
                JSON.stringify(action.payload.user)
            );
            window.localStorage.setItem("token", action.payload.token);
            window.localStorage.setItem("user_type", action.payload.user_type);
            return {
                ...state,
                isLoading: false,
            };

        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user_type");
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
