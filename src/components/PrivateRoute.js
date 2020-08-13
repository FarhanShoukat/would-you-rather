import React  from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path, authedUser, ...rest }) => (
    <Route
        path={path}
        {...rest}
        render={props => {
            const { url } = props.match
            return (
                authedUser
                    ? path === '/login'
                    ? <Redirect to='/' />
                    : <Component {...props} />
                    : path === '/login'
                    ? <Component {...props} />
                    : <Redirect to={`/login${url !== '/' ? `?forward=${url}` : ''}`} />
            )
        }}
    />
)

const mapStateToProps = ({ authedUser }) => ({
    authedUser,
})

export default connect(mapStateToProps)(PrivateRoute)