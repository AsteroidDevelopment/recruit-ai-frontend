import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../views/home';
import UserComponent from '../views/misc/user';
import AdminComponent from '../views/misc/admin';

import FeedbackComponent from '../views/misc/feedback';
import SupportComponent from '../components/support_tickets/controller';

import PageController from '../components/pages/page-controller'
import PostController from '../components/posts/controller'

import AthleteController from '../components/athletes/controller'
import TeamController from '../components/teams/controller'
import VisitController from '../components/visits/controller'
import MessageController from '../components/messages/controller'
import AlertController from '../components/alerts/controller'


import UserProfile from '../components/user/userProfile'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

function Body(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            {curr_user ? 
            <Route path="/" exact component={UserProfile} />
            : 
            <Route path="/" exact component={Home} />
            }           

            <Route path="/feedback" component={FeedbackComponent} />
            <Route path="/support_tickets" component={SupportComponent} />
            <Route path="/pages" component={PageController} />
            <Route path="/posts" component={PostController} />

            {/* Some protected routes, protect individully in controller */}
            <Route path="/users" render={() => <UserComponent {...props} auth={props.auth} />} />
            <Route path="/teams" component={TeamController} />
            <Route path="/athletes" component={AthleteController} />
            <Route path="/visits" component={VisitController} />

            { //Completely protected
                curr_user ? <div>
                    <Route path="/messages" component={MessageController} />
                    <Route path="/alerts" component={AlertController} />
                    <Route path="/admin" component={AdminComponent} />
                </div> : ""
            }

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1>
                <p>This page has been deleted or moved.</p>
                <hr />
                <h3>If you have accessed this page before:</h3>
                <h4>Staff</h4>
                <p>Please try logging out and logging back in.</p>
                <h4>Athletes</h4>
                <p>Please directly message the number for the team.</p>
                <hr />
                <p>Error Code: <i>MISSING_COMPONENT</i></p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default Body;
