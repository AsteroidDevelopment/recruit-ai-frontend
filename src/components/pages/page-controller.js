import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Index from './index.js'
import Show from './show.js'
import Edit from './edit.js'
import New from './new.js'


function PageController(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/pages/" exact component={Index} />
            <Route path="/pages/new" exact component={New} />
            <Route path="/pages/:id" exact component={Show} />
            <Route path="/pages/:id/edit" exact component={Edit} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code IJTHEPC</p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default PageController;
