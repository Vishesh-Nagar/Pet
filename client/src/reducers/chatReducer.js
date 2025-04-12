import { ADD_MESSAGE, GET_MESSAGES, GET_MESSAGE_LIST } from "../actions/types";

const initialState = { userMessages: [], messageList: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                userMessages: action.payload,
            };

        case GET_MESSAGE_LIST:
            return {
                ...state,
                messageList: action.payload,
            };

        case ADD_MESSAGE:
            return {
                ...state,
                userMessages: [...state.userMessages, action.payload],
            };
        default:
            return state;
    }
}
