import {
    ADD_MESSAGE,
    DELETE_MESSAGE,
    GET_MESSAGES,
    GET_MESSAGE_LIST,
} from "./types";
import axios from "axios";

export const getMessages = (id_user2) => (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user == null) return;
    axios
        .get(`../api/messages/${user.id}/${id_user2}`)
        .then((res) => {
            dispatch({
                type: GET_MESSAGES,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getMessageList = () => (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user == null) return;
    axios
        .get(`../api/messages/${user.id}/`)
        .then((res) => {
            dispatch({
                type: GET_MESSAGE_LIST,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addMessage =
    (text, position, type, uri, file, id_user2) => (dispatch, getState) => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (user == null) return;

        const formData = new FormData();
        formData.append("text", text);
        formData.append("position", window.localStorage.getItem("user"));
        formData.append("files[]", file);
        formData.append("type", type);
        formData.append("uri", uri);

        axios
            .post(`../api/messages/${user.id}/${id_user2}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": window.localStorage.getItem("token"),
                },
            })
            .then((res) => {
                dispatch({
                    type: ADD_MESSAGE,
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err));
    };
