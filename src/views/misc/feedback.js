import React from 'react'
import {Switch, Route} from 'react-router-dom'

import FeedbackProvide from '../../components/feedback/provide'
import FeedbackIndex from '../../components/feedback/index'

class Feedback extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return <div>
          <Switch>
            <Route path="/feedback/provide" exact component={FeedbackProvide} />
            <Route path="/feedback" exact component={FeedbackIndex} />
          </Switch>
        </div>
    }
}

export default Feedback
