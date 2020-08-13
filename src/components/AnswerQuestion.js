import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleAnswerQuestion } from '../actions/questions'

class AnswerQuestion extends Component {
    static OPTION_ONE = 'optionOne'
    static OPTION_TWO = 'optionTwo'

    static propTypes = {
        question: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }

    state = {
        selectedOption: AnswerQuestion.OPTION_ONE
    }

    handleChange = e => this.setState({selectedOption: e.target.value})

    handleSubmit = e => {
        e.preventDefault()

        const { dispatch, question } = this.props

        dispatch(handleAnswerQuestion(question.id, this.state.selectedOption))
    }

    render() {
        const { question, user } = this.props
        const { selectedOption } = this.state

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
                    <form className='login-user' onSubmit={this.handleSubmit}>
                        <label>
                            <input
                                type='radio'
                                value={AnswerQuestion.OPTION_ONE}
                                checked={selectedOption === AnswerQuestion.OPTION_ONE}
                                onChange={this.handleChange}
                            />
                            {question.optionOne.text}
                        </label>
                        <label>
                            <input
                                type='radio'
                                value={AnswerQuestion.OPTION_TWO}
                                checked={selectedOption === AnswerQuestion.OPTION_TWO}
                                onChange={this.handleChange}
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
}

const mapStateToProps = ({ questions, users }, { id }) => {
    const question = questions[id]

    return {
        question,
        user: users[question.author]
    }
}

export default connect(mapStateToProps)(AnswerQuestion)