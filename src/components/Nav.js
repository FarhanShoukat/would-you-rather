import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {logoutUser} from '../actions/authedUser'

class Nav extends Component {
    logoutUser = e => {
        e.preventDefault()
        this.props.dispatch(logoutUser())
    }

    render() {
        const { user } = this.props

        return (
            <nav className='nav'>
                <ul>
                    {user && (
                        <Fragment>
                            <li>
                                <NavLink to='/' exact className='center' activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/add' activeClassName='active'>
                                    New Question
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    {user && (
                        <Fragment>
                            <li>
                                Hello, {user.name}
                            </li>
                            <li>
                                <img
                                    src={user.avatarURL}
                                    alt={user.name}
                                    className='nav-avatar'
                                />
                                <button className='nav-logout-btn' onClick={this.logoutUser}>Logout</button>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => ({
    user: users[authedUser],
})

export default connect(mapStateToProps)(Nav)