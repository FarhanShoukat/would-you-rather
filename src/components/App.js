import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'
import AddQuestion from './AddQuestion'
import PrivateRoute from './PrivateRoute'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'


const App = ({ loading, dispatch }) => {
    useEffect(() => dispatch(handleInitialData()), [])

    return (
        <div className='container'>
            <Nav />
            {loading
                ? null
                :
                <div>
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/' exact component={Home} />
                    <PrivateRoute path='/add' component={AddQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <PrivateRoute path='/question/:id' component={QuestionPage} />
                </div>
            }
        </div>
    )
}

const mapStateToProps = ({ questions }) => ({
    loading: questions === null
})

export default connect(mapStateToProps)(App)
