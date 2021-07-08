import React from 'react'

import HandleForm from '../forms/handler'

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPanel: false
        }
    }

    togglePanel = () => {
        this.setState({showPanel: !this.state.showPanel})
    }

    render () {
        const {component, athlete, formFields} = this.props

        return <div>

            <span onClick={this.togglePanel} className='format-link nice-button white-button' style={{margin:'10px', color: 'white'}}>
                New Visit
            </span>

            <div className="hide-panel" style={{display: this.state.showPanel ? 'block' : 'none'}}>
                <HandleForm existing={false} item={formFields} formClass={"visits"} update={component.loadPage} redirect={`/athletes/${athlete.athlete_id}`} />    
            </div>
        </div>
    }
}

export default Panel