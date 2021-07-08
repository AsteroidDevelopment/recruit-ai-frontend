import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Index from './index.js'

function PageController(props) {
    return <div className="page-container">
        <Switch>
            <Route path="/alerts/" exact component={Index} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code STDWTMS</p>
            </div></div>} />

        </Switch>
    </div>
}

export default PageController;
