import React  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UserStats = ({ user }) => {
    const answeredQuestions = Object.keys(user.answers).length
    const score = answeredQuestions + user.questions.length

    return (
        <div className='tweet'>
            <img
                src={user.avatarURL}
                alt={user.name}
                className='avatar'
            />
            <div className='info'>
                <span>{user.name}</span>
                <p>Answered questions: {answeredQuestions}</p>
                <p>Created questions: {user.questions.length}</p>
                <p>Score: {score}</p>
            </div>
        </div>
    )
}

UserStats.propType = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users }, { id }) => ({
    user: users[id],
})

export default connect(mapStateToProps)(UserStats)