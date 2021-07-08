import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            messages: [],
            params: params,
            update: true,
            month: params.get('month'),
            year: params.get('year')
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
            .get(api.apiPath(`/messages/team-summary`+ '?' + params.toString() ), headers)
            .then(res => { 
                this.setState({ messages: res.data, params })
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

    
    
    handleMonth = (e) => {
        const params = this.state.params
        params.set('month', e.target.value)
        this.setState({month: e.target.value, params, update:true})
    }
    handleYear = (e) => {
        const params = this.state.params
        params.set('year', e.target.value)
        this.setState({year: e.target.value, params, update:true})
    }

    render() {
        const messages = this.state.messages
        let personnel_id = 0
        let athlete_id = 0
        let curr_year  = new Date(Date.now()).getFullYear() 
        let curr_month = new Date(Date.now()).getMonth() + 1 
        return <div className="tpBlackBg">
            <h1>Team Message History</h1>
            
            <select onChange={this.handleMonth}>
                <option selected={ curr_month === 2 ?'selected':false } value="1">January</option>
                <option selected={ curr_month === 2 ?'selected':false } value="2">February</option>
                <option selected={ curr_month === 3 ?'selected':false } value="3">March</option>
                <option selected={ curr_month === 4 ?'selected':false } value="4">April</option>
                <option selected={ curr_month === 5 ?'selected':false } value="5">May</option>
                <option selected={ curr_month === 6 ?'selected':false } value="6">June</option>
                <option selected={ curr_month === 7 ?'selected':false } value="7">July</option>
                <option selected={ curr_month === 8 ?'selected':false } value="8">August</option>
                <option selected={ curr_month === 9 ?'selected':false } value="9">September</option>
                <option selected={ curr_month === 10 ?'selected':false } value="10">October</option>
                <option selected={ curr_month === 11 ?'selected':false } value="11">November</option>
                <option selected={ curr_month === 12 ?'selected':false } value="12">December</option>
            </select>
            <select onChange={this.handleYear}>
                <option selected={ curr_year === 2019 ?'selected':false } value="2019">2019</option>
                <option selected={ curr_year === 2020 ?'selected':false } value="2020">2020</option>
            </select>


            {messages.map(message => <div>
                {console.log(personnel_id, message.message_personnel_id)}
                {personnel_id !== message.message_personnel_id ? <h2>
                    <hr />
                    Messages for: {message.user_display_name} 
                    <span style={{display:'none'}}>{personnel_id = message.message_personnel_id}{athlete_id = 0}</span>
                </h2> : ""}
                
                {athlete_id !== message.message_athlete_id ? <h4>
                    <hr />
                    { message.user_display_name } & {message.preferred_name} {message.last_name}
                    <span style={{display:'none'}}>{athlete_id = message.message_athlete_id}</span>
                    <hr />
                </h4> : ""}
                    <br />
                {message.message_text}<br />
                {message.message_type === 'outgoing' ? "<S" : "R>" } {this.stringifyDate(message.created_at)}<br />

            </div>)}
            <br />
        </div>
    }
}

export default Page
