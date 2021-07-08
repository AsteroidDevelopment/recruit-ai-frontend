import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visit: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/visits/public/${props.match.params.id}`))
            .then(res =>
                this.setState({ visit: res.data })
            )
            .catch(err => console.log(err));
    }

    
    stringifyDate = (d) => {
        if(typeof d === 'string') { d = new Date(d) }

        const date = d,
        v = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getDay(),
            date.getTimezoneOffset()
        ];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const hours = v[3] > 12 ? v[3] - 12 : v[3]
        const mm = v[3] > 12 ? "pm" : "am"
        const minutes = v[4] < 10 ? `0${v[4]}` : v[4]
        return `${days[v[5]]} ${v[1]}/${v[2]} @ ${hours}:${minutes} ${mm}`
    }

    confirmChoice = (e) => {
        const visit_id = this.state.visit.visit_id
        const choice = e.target.getAttribute('data-choice')
       axios
       .put(api.apiPath(`/visits/choose/${visit_id}/${choice}`))
       .then(res =>
           this.setState({visit: res.data.visit})
       )
       .catch(err => console.log(err));

    }

    render() {
        const visit = this.state.visit
        const chosen = !!visit.chosen_time

        return <div>
            <h3>Confirm Your Visit</h3>
            
            <h1>{visit.preferred_name} ({visit.first_name} {visit.last_name})</h1>

            
            <h2>Important Information</h2>
            <h4>Address</h4>
            {visit.reporting_address || visit.visit_reporting_address}<br />
            <h4>Instructions</h4>
            {visit.reporting_instructions || visit.visit_reporting_instructions}<br />

            { chosen ? <div><hr />
                <h3>You are scheduled for:</h3>
                {console.log(visit.chosen_time, visit.time_options)}
                <h4>{this.stringifyDate(visit.chosen_time)}</h4>
            </div> : ""}

            <hr />
            { visit.visit_status === 'pending' || visit.visit_status === 'chosen' ? 
            
            <div>
            { chosen ? "You have limited time to change your option:" : <h2>Choose Your Time</h2> }
            {visit.time_options ? visit.time_options.map((t, i) => 
                <div><div className="nice-button format-link" onClick={this.confirmChoice} data-choice={i}>
                    {this.stringifyDate(t)}
                </div></div>) 
            : ""}<br /><hr />
            
            </div> 
            
            : "" }

            
            
        </div>
    }
}

export default Page
