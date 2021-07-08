import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import {Row, Col} from 'reactstrap'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            visits: [],
            params: params,
            update: true,
            filter: params.get('filter') || 'team'
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        
        if(this.state.update) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params = this.state.params
       
        this.setState({update: false})
        axios
            .get(api.apiPath(`/visits`+ '?' + params.toString() ), headers)
            .then(res => { 
                this.setState({ visits: res.data, params })
            })
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

    
    handleFilter = (e) => {
        const params = this.state.params
        params.set('filter', e.target.value)
        this.setState({order: e.target.value, params, update:true})
    }

    render() {
        const visits = this.state.visits
        return <div className="tpBlackBg" style={{backgroundColor:this.state.formColor}}>
            <h1>Scheduled Visits</h1>
            <select onChange={this.handleFilter}>
                <option value="team">Team</option>
                <option value="personal">Personal</option>
            </select>
            <hr />
            <Row>
            {visits.map(
                (visit) => <Col><div>
                    <Link to={`/visits/${visit.visit_id}`}>

                    <h3>{visit.preferred_name} {visit.last_name}</h3>
                
                    <p><b>Recruiter:</b> {visit.user_display_name}</p>
            
                    <p style={{textTransform:"capitalize"}}><b>Status:</b> {visit.visit_status}</p>
                    
                    <p>
                        {visit.chosen_time ? <span>{this.stringifyDate(visit.chosen_time)}</span> : "Still pending"}
                    </p>


                    </Link>
                </div></Col>

            )}
            </Row>
            <hr />
            <i>To schedule a new visit, go through the athlete's page you wish to schedule.</i>
            <br />
            <Link to={`/athletes`}>All Athletes</Link>
        </div>
    }
}

export default Page
