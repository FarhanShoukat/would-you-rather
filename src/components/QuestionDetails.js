import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ResultRow from './ResultRow'

const QuestionDetails = ({ question, user }) => {
    const { id, optionOne, optionTwo } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length

    return (
        <div className='tweet' style={{maxWidth: 400, flexDirection: 'column', padding: 0}}>
            <h3 style={{paddingLeft: 10}}>Asked by {user.name}</h3>
            <div className='tweet' style={{maxWidth: 400, padding: 0}}>
                <img
                    src={user.avatarURL}
                    alt={user.name}
                    className='avatar'
                />
                <div className='info'>
                    <span>Results:</span>
                    <ResultRow
                        text={optionOne.text}
                        isSelected={user.answers[id] === 'optionOne'}
                        optionVoters={optionOneVotes}
                        totalVoters={optionOneVotes + optionTwoVotes} />
                    <br/>
                    <ResultRow
                        text={optionTwo.text}
                        isSelected={user.answers[id] === 'optionTwo'}
                        optionVoters={optionTwoVotes}
                        totalVoters={optionOneVotes + optionTwoVotes} />
                </div>
            </div>
        </div>
    )
}

QuestionDetails.propTypes = {
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]

    return {
        question,
        user: users[question.author]
    }
}

export default connect(mapStateToProps)(QuestionDetails)