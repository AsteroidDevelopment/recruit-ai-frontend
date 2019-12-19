import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Index from './index.js'
import Show from './show.js'
import Edit from './edit.js'
import New from './new.js'
import Choose from './choose.js'


function PageController(props) {
    return <div className="body"><div className="page-container">
        <Switch>
            <Route path="/visits/" exact component={Index} />
            <Route path="/visits/new" exact component={New} />
            <Route path="/visits/:id" exact component={Show} />
            <Route path="/visits/:id/edit" exact component={Edit} />
            <Route path="/visits/:id/choose" exact component={Choose} />

            <Route path="/" render={() => <div className="controller"><div className="tpBlackBg">
                <h2>We're Sorry</h2>
                <h1>ERROR: 404 Page Not Found</h1> 
                <p>Error Code IABPBPBP</p>
            </div></div>} />

        </Switch>
    </div></div>
}

export default PageController;
