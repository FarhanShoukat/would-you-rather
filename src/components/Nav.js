import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logoutUser } from '../actions/authedUser'

const Nav = ({ user, dispatch }) => {
    const logOutUser = e => {
        e.preventDefault()
        dispatch(logoutUser())
    }

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
                            <button className='nav-logout-btn' onClick={logOutUser}>Logout</button>
                        </li>
                    </Fragment>
                )}
            </ul>
        </nav>
    )
}

Nav.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authedUser, users }) => ({
    user: users[authedUser],
})

export default connect(mapStateToProps)(Nav)