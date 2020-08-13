import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import queryString from 'querystring'
import { loginUser } from '../actions/authedUser'

class Login extends Component {
    static propTypes = {
        authedUser: PropTypes.string,
        users: PropTypes.array.isRequired,
    }

    state = {
        userId: ''
    }

    handleChange = e => {
        const userId = e.target.value
        this.setState({ userId })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.dispatch(loginUser(this.state.userId))
    }

    render() {
        const { authedUser, users } = this.props
        const { userId } = this.state

        if (authedUser) {
            const forward = queryString.parse(this.props.location.search)['?forward']
            return <Redirect to={forward ? forward : '/'}/>
        }

        return (
            <div>
                <h3 className='center'>Sign In</h3>
                <form className='login-user' onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} value={userId}>
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
}

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    users: Object.values(users),
})

export default withRouter(connect(mapStateToProps)(Login))