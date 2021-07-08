import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LogIn from '../../components/user/logIn'
import Register from '../../components/user/register'
import Verify from '../../components/user/verify'
import Logout from '../../components/user/logout'

import UserPage from '../../components/user/userPage'

import UserProfile from '../../components/user/userProfile'
import EditUser from '../../components/user/userForm'

import ForgottenPassword from '../../components/user/forgottenPassword'
import ResetPassword from '../../components/user/resetPassword'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return <div>
      <Switch>
        <Route path="/users/login" exact render={() => <LogIn {...this.props} auth={this.props.auth} />} />
        <Route path="/users/register" exact component={Register} />
        <Route path="/users/verify/:username/:verify_hash" exact component={Verify} />

        <Route path="/users/forgottenPassword" exact component={ForgottenPassword} />
        <Route path="/users/resetPassword/:username/:verify_hash" exact component={ResetPassword} />


        { //Completely protected
          curr_user ? <div>
            <Route path="/users/dashboard" exact component={UserProfile} />
            <Route path="/users/edit" exact component={EditUser} />
            <Route path="/users/logout" exact render={() => <Logout {...this.props} auth={this.props.auth} />} />

            <Route path="/users/profile/:id" exact component={UserPage} />

          </div> : ""
        }

        <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
          <h2>We're Sorry</h2>
          <h1>ERROR: 404 Page Not Found</h1>
          <hr />
          <h3>If you have accessed this page before:</h3>
          <h4>Staff</h4> 
          <p>Please try logging out and logging back in.</p>
          <h4>Athletes</h4> 
          <p>Please directly message the number for the team.</p>
          <hr />
          <p>Error Code: <i>ACCOUNT_ERROR</i></p>
        </div></div>} />


      </Switch>
    </div>
  }
}

export default User
