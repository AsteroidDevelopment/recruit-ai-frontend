import React from 'react'

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
        const component = this.props.component

        return <div>

            <span onClick={this.togglePanel} className='format-link nice-button white-button' style={{margin:'10px', color: 'white'}}>
                Filter
            </span>

            <div className="hide-panel" style={{display: this.state.showPanel ? 'block' : 'none'}}>
            <h4>Sort</h4>
                    <select onChange={component.handleSort}>
                        <option value="preferred_name">Display Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="school_year">Grade</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                    </select>
                    <select onChange={component.handleOrder}>
                        <option value="asc">Low (A) - High (Z)</option>
                        <option value="desc">High (Z) - Low (A)</option>
                    </select>
                    <h4>Filter</h4>
                    <select onChange={component.handleFilter}>
                        <option value="team">Whole Team</option>
                        <option value="personal">Personal Recruits</option>
                    </select>

                    <select onChange={component.handleFilterType}>
                        <option value="-1">Select Filter</option>
                        {Object.entries(component.state.filter_information).map(field => <option value={field[0]}>{field[0]}</option>)}
                    </select>

                    <select onChange={component.handleFilterValue}>
                        <option value="-1">Select {component.state.result_filter_type}</option>
                        {component.state.filter_information[component.state.result_filter_type] ?
                            component.state.filter_information[component.state.result_filter_type].map(field => <option value={field}>{field}</option>) : ""}
                    </select>
            </div>
        </div>
    }
}

export default Panel