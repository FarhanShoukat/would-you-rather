import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS } from '../actions/questions'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const question = action.question
            return {
                ...state,
                [question.id]: question
            }
        case ANSWER_QUESTION:
            const { authedUser, qId, answer } = action
            return {
                ...state,
                [qId]: {
                    ...state[qId],
                    [answer]: {
                        ...state[qId][answer],
                        votes: [...state[qId][answer].votes, authedUser]
                    }
                }
            }
        default:
            return state
    }
}