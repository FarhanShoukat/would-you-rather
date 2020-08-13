import { RECEIVE_USERS } from '../actions/users'
import {ADD_QUESTION, ANSWER_QUESTION} from '../actions/questions'

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            const { question } = action
            const author = state[question.author]
            return {
                ...state,
                [author.id]: {
                    ...author,
                    questions: [...author.questions, question.id]
                }
            }
        case ANSWER_QUESTION:
            const { authedUser, qId, answer } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qId]: answer
                    }
                }
            }
        default:
            return state
    }
}