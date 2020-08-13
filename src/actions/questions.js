import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

const addQuestion = question => ({
    type: ADD_QUESTION,
    question
});

export const handleAddQuestion = (optionOneText, optionTwoText) => (dispatch, getState) => {
    const { authedUser } = getState()

    return _saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser,
    })
        .then(question => dispatch(addQuestion(question)))
};

const answerQuestion = (authedUser, qId, answer) => ({
    type: ANSWER_QUESTION,
    authedUser,
    qId,
    answer
});

export const handleAnswerQuestion = (qId, answer) => (dispatch, getState) => {
    const { authedUser } = getState()

    _saveQuestionAnswer({ authedUser, qid: qId, answer })
        .then(() => dispatch(answerQuestion(authedUser, qId, answer)))
}