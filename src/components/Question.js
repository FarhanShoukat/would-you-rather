import React  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const Question = ({ question, user }) => {
    const { id } = question
    const { name, avatarURL } = user

    return (
        <Link to={`/question/${id}`} className='login-user tweet'>
            <div>
                <img
                    src={avatarURL}
                    alt={user.name}
                    className='avatar'
                />
                <h4>{name} asks:</h4>
                <h4>Would you rather</h4>
                <p>{question.optionOne.text}</p>
                <p className='center'>or</p>
                <p>{question.optionTwo.text}</p>
            </div>
        </Link>
    )
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users, questions }, { id }) => {
    const question = questions[id]
    return {
        question,
        user: users[question.author],
    }
}

export default connect(mapStateToProps)(Question)