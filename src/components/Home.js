import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Question from './Question'

class Home extends Component {
    static UNANSWERED_TAB = 'UNANSWERED_TAB'
    static ANSWERED_TAB = 'ANSWERED_TAB'

    static propTypes = {
        user: PropTypes.object.isRequired,
        questions: PropTypes.array.isRequired
    }

    state = {
        selectedTab: Home.UNANSWERED_TAB
    }

    updateSelectedTab = (tab) => this.setState({
        selectedTab: tab
    })

    render() {
        const { selectedTab } = this.state
        const { user, questions } = this.props

        const answeredQuestionIds = Object.keys(user.answers)

        const filteredQuestions = questions.filter(({ id }) => {
            const isAnswered = answeredQuestionIds.includes(id)
            return selectedTab === Home.ANSWERED_TAB ? isAnswered : !isAnswered
        })
            .sort((q1, q2) => q2.timestamp - q1.timestamp)

        return (
            <div className='center'>
                <div>
                    <button
                        disabled={selectedTab === Home.UNANSWERED_TAB}
                        onClick={() => this.updateSelectedTab(Home.UNANSWERED_TAB)}>
                        Unanswered Questions
                    </button>
                    <button
                        disabled={selectedTab === Home.ANSWERED_TAB}
                        onClick={() => this.updateSelectedTab(Home.ANSWERED_TAB)}>
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
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    user: users[authedUser],
    questions: Object.values(questions),
})

export default connect(mapStateToProps)(Home)