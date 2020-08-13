import {_getQuestions, _getUsers} from "../utils/_DATA";
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";

export function handleInitialData() {
    return dispatch => {
        Promise.all([_getUsers(), _getQuestions()])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
            })
    }
}