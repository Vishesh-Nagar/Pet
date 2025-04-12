import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    NGO_REGISTER_SUCCESS,
} from "./types";

import history from "../history";

export const register =
    ({ name, email, password, files }) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("files[]", files[0]);
        axios
            .post("/api/users", formData, config)
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: { ...res.data, user_type: "user" },
                });
                history.push("/");
                history.go(0);
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_FAIL,
                });
            });
    };
export const registerngo =
    ({ name, email, password, contact, address, files, license }) =>
    (dispatch) => {
        const { hno, street, city, state, pincode } = address;
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("contact", contact);
        formData.append("hno", hno);
        formData.append("street", street);

        formData.append("city", city);
        formData.append("state", state);
        formData.append("pincode", pincode);

        formData.append("license", license);
        formData.append("files[]", files[0]);

        axios
            .post("/api/ngoregister", formData, config)
            .then((res) => {
                dispatch({
                    type: NGO_REGISTER_SUCCESS,
                    payload: { ...res.data, user_type: "ngo" },
                });
                history.push("/");
                history.go(0);
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: REGISTER_FAIL,
                });
            });
    };

export const login =
    ({ email, password }) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        axios
            .post("/api/auth", body, config)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { ...res.data, user_type: "user" },
                });

                history.push("/");
                history.go(0);
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_FAIL,
                });
            });
    };

export const loginngo =
    ({ email, password }) =>
    (dispatch) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        axios
            .post("/api/ngo", body, config)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { ...res.data, user_type: "ngo" },
                });

                history.push("/");
                history.go(0);
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_FAIL,
                });
            });
    };

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};
