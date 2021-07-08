import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import {Row, Col} from 'reactstrap'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            alerts: [],
            params: params,
            update: true,
            filter: params.get('filter') || 'team'
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {

        if (this.state.update) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params = this.state.params

        this.setState({ update: false })
        axios
            .get(api.apiPath(`/alerts` + '?' + params.toString()), headers)
            .then(res => {
                this.setState({ alerts: res.data.pageOfItems, params })
            })
            .catch(err => console.log(err));
    }

    markRead = (e) => {
        const alert_id = e.target.getAttribute('data-id')
        const athlete_id = e.target.getAttribute('data-athlete-id')
        axios
            .get(api.apiPath(`/alerts/read/${e.target.getAttribute('data-id')}`), headers)
            .then(res => {
                const alert = res.data

                switch (alert.alert_type) {
                    case "new-message":
                        this.props.history.push(`/messages/${athlete_id}`)
                        break;
                    case "visit-choice":
                        this.props.history.push(`/athletes/${athlete_id}`)
                        break;
                    case "visit-upcoming":
                        this.props.history.push(`/athletes/${athlete_id}`)
                        break;
                    default:
                        this.props.history.push(`/`)
                        break;
                }
            })
            .catch(err => console.log(err));

    }

    stringifyDate = (d) => {
        if (typeof d === 'string') { d = new Date(d) }

        const date = d,
            v = [
                date.getFullYear(),
                date.getMonth() + 1,
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
        this.setState({ order: e.target.value, params, update: true })
    }

    render() {
        const alerts = this.state.alerts
        return <div className="tpBlackBg">
            <h1>Alerts</h1>
            <select onChange={this.handleFilter}>
                <option value="unread">New Alerts</option>
                <option value="all">All Alerts</option>
            </select>
            <hr />
            {alerts.length > 0 ? alerts.map(alert => <div style={{width:'100%'}} onClick={this.markRead} className='format-link' data-id={alert.alert_id} data-athlete-id={alert.alert_athlete_id}>
                <Row>
                    <Col>
                        {!alert.alert_state ? <b>NEW</b> : ""}
                    </Col>
                    <Col>
                        {alert.preferred_name} {alert.last_name} {" "}
                    </Col>
                    <Col>
                        <b>{alert.alert_type === 'new-message' ? "New Message" : ""}</b>
                        <b>{alert.alert_type === 'visit-choice' ? "Visit Update" : ""}</b>
                        <b>{alert.alert_type === 'visit-upcoming' ? "Upcoming Visit" : ""}</b>
                    </Col>

                    <Col>
                            {alert.alert_type === 'new-message' ? 'Read' : ""}
                            {alert.alert_type === 'visit-choice' ? 'Review' : ""}
                            {alert.alert_type === 'visit-upcoming' ? 'View' : ""}
                    </Col>

                    </Row></div>) : "You have no alerts."}
        </div>
    }
            }
            
export default Page