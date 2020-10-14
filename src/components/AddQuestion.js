import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

const AddQuestion = ({ dispatch, history }) => {
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(handleAddQuestion(optionOne, optionTwo))

        history.push('/')
    }

    return (
        <div className='tweet login-user center'>
            <h2>Create New Question</h2>
            <div>
                <p>Complete the question:</p>
                <hr />
                <div className='info'>
                    <h4>Would you rather...</h4>
                    <form onSubmit={handleSubmit} className='login-user'>
                        <input
                            type='input'
                            placeholder='Enter Option One Text Here'
                            value={optionOne}
                            onChange={e => setOptionOne(e.target.value)}
                        />
                        <br/>
                        <input
                            type='input'
                            placeholder='Enter Option Two Text Here'
                            value={optionTwo}
                            onChange={e => setOptionTwo(e.target.value)}
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

export default withRouter(connect()(AddQuestion))