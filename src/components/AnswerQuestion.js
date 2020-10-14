import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { handleAnswerQuestion } from '../actions/questions'

const OPTION_ONE = 'optionOne'
const OPTION_TWO = 'optionTwo'

const AnswerQuestion = ({ question, user, dispatch }) => {
    const [selectedOption, setSelectedOption] = useState(OPTION_ONE)

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(handleAnswerQuestion(question.id, selectedOption))
    }

    return (
        <div className='tweet center' style={{maxWidth: 400}}>
            <img
                src={user.avatarURL}
                alt={user.name}
                className='avatar'
            />
            <div className='info'>
                <span>{user.name} asks:</span>
                <h4>Would you rather...</h4>
                <form className='login-user' onSubmit={handleSubmit}>
                    <label>
                        <input
                            type='radio'
                            checked={selectedOption === OPTION_ONE}
                            onChange={() => setSelectedOption(OPTION_ONE)}
                        />
                        {question.optionOne.text}
                    </label>
                    <label>
                        <input
                            type='radio'
                            checked={selectedOption === OPTION_TWO}
                            onChange={() => setSelectedOption(OPTION_TWO)}
                        />
                        {question.optionTwo.text}
                    </label>
                    <button className='btn'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

AnswerQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]

    return {
        question,
        user: users[question.author],
        dispatch: PropTypes.func.isRequired,
    }
}

export default connect(mapStateToProps)(AnswerQuestion)