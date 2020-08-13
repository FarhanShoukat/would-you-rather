import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AnswerQuestion from './AnswerQuestion'
import QuestionDetails from './QuestionDetails'

const QuestionPage = ({ question, isAnswered }) => {
    if (!question)
        return <h1>404 Not found </h1>

    if (isAnswered)
        return <QuestionDetails id={question.id} />

    return <AnswerQuestion id={question.id} />
}

QuestionPage.propTypes = {
    question: PropTypes.object,
    isAnswered: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    const question = questions[props.match.params.id]

    return {
        question,
        isAnswered: question !== undefined && Object.keys(users[authedUser].answers).includes(question.id)
    }
}

export default connect(mapStateToProps)(QuestionPage)