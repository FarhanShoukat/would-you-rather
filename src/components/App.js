import React, { Component } from 'react'
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


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div className='container'>
                <Nav />
                {this.props.loading
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
}

const mapStateToProps = ({ questions }) => ({
    loading: questions === null
})

export default connect(mapStateToProps)(App)
