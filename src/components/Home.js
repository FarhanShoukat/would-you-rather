import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Question from './Question'

const UNANSWERED_TAB = 'UNANSWERED_TAB'
const ANSWERED_TAB = 'ANSWERED_TAB'

const Home = ({ user, questions }) => {
    const [selectedTab , setSelectedTab] = useState(UNANSWERED_TAB)

    const answeredQuestionIds = Object.keys(user.answers)

    const filteredQuestions = questions.filter(({ id }) => {
        const isAnswered = answeredQuestionIds.includes(id)
        return selectedTab === ANSWERED_TAB ? isAnswered : !isAnswered
    })
        .sort((q1, q2) => q2.timestamp - q1.timestamp)

    return (
        <div className='center'>
            <div>
                <button
                    disabled={selectedTab === UNANSWERED_TAB}
                    onClick={() => setSelectedTab(UNANSWERED_TAB)}>
                    Unanswered Questions
                </button>
                <button
                    disabled={selectedTab === ANSWERED_TAB}
                    onClick={() => setSelectedTab(ANSWERED_TAB)}>
                    Answered Question
                </button>
            </div>

            <div>
                <ul className='dashboard-list'>
                    {filteredQuestions.map(({ id }) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

Home.propTypes = {
    user: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    user: users[authedUser],
    questions: Object.values(questions),
})

export default connect(mapStateToProps)(Home)