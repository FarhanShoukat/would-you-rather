import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import queryString from 'querystring'
import { loginUser } from '../actions/authedUser'

const Login = ({ authedUser, users, dispatch, location }) => {
    const [userId, setUserId] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(loginUser(userId))
    }

    if (authedUser) {
        const forward = queryString.parse(location.search)['?forward']
        return <Redirect to={forward ? forward : '/'}/>
    }

    return (
        <div>
            <h3 className='center'>Sign In</h3>
            <form className='login-user' onSubmit={handleSubmit}>
                <select onChange={e => setUserId(e.target.value)} value={userId}>
                    <option value='' disabled>Select user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <button className='btn' type='submit' disabled={!userId}>
                    Sign In
                </button>
            </form>
        </div>
    )
}

Login.propTypes = {
    authedUser: PropTypes.string,
    users: PropTypes.array.isRequired,
}

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    users: Object.values(users),
})

export default withRouter(connect(mapStateToProps)(Login))