import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from './index.js'
import Show from './show.js'
import Edit from './edit.js'
import New from './new.js'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

function PageController(props) {
    return <div className="page-container">
        <Switch>


            { //Completely protected
                curr_user ? <div>
                    <Route path="/teams/" exact component={Index} />
                    <Route path="/teams/new" exact component={New} />
                    <Route path="/teams/:id" exact component={Show} />
                    <Route path="/teams/:id/edit" exact component={Edit} />
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
    </div>
}

export default PageController;
