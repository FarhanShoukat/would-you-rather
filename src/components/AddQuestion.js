import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }

    updateOptionText = (option, text) => this.setState({[option]: text})

    handleSubmit = e => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        this.props.dispatch(handleAddQuestion(optionOne, optionTwo))

        this.props.history.push('/')
    }

    render() {
        const { optionOne, optionTwo } = this.state

        return (
            <div className='tweet login-user center'>
                <h2>Create New Question</h2>
                <div>
                    <p>Complete the question:</p>
                    <hr />
                    <div className='info'>
                        <h4>Would you rather...</h4>
                        <form onSubmit={this.handleSubmit} className='login-user'>
                            <input
                                type='input'
                                placeholder='Enter Option One Text Here'
                                value={optionOne}
                                onChange={e => this.updateOptionText('optionOne', e.target.value)}
                            />
                            <br/>
                            <input
                                type='input'
                                placeholder='Enter Option Two Text Here'
                                value={optionTwo}
                                onChange={e => this.updateOptionText('optionTwo', e.target.value)}
                            />
                            <button
                                className='btn'
                                disabled={!optionOne || !optionTwo}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(AddQuestion))