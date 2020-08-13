import React  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserStats from './UserStats'

const Leaderboard = ({ users }) => {
    return (
        <ul>
            {users.map(u => (
                <li key={u.id}>
                    <UserStats id={u.id} />
                </li>
            ))}
        </ul>
    )
}

Leaderboard.propTypes = {
    users: PropTypes.array.isRequired,
}

const mapStateToProps = ({ users }) => ({
    users: Object.values(users).sort((u1, u2) =>
        (Object.keys(u2.answers).length + u2.questions.length) -
        (Object.keys(u1.answers).length + u1.questions.length)),
})

export default connect(mapStateToProps)(Leaderboard)