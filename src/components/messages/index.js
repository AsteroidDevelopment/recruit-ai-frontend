import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

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
            .get(api.apiPath(`/messages`+ '?' + params.toString() ), headers)
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

    
    handleFilter = (e) => {
        const params = this.state.params
        params.set('filter', e.target.value)
        this.setState({order: e.target.value, params, update:true})
    }

    render() {
        const messages = this.state.messages
        return <div className="tpBlackBg">
        <h3>Messages</h3>
        
        <Row>
                <Col lg={6}>
                    <input className='neatform' type="text" onChange={this.handleSearch} />
                    <p>Search Messages- Coming Soon</p>
                </Col>
                <Col lg={4}>
                </Col>

                <Col lg={2}>
                    <Link className='nice-button blue-button' to={`/athletes/new`}>Compose</Link>
                </Col>
            </Row>
        <div className="itemList">
            
            <div className="alternateRows">
            {messages.map(message => <div className="itemFlex">
                <Link to={`/messages/${message.athlete_id}`} >
                    <span style={{color:"#2298E7"}}>{message.preferred_name} {message.last_name}</span> 
                    <span>{message.user_display_name}</span>
                </Link>
            </div>)}
            </div>
            </div>
        </div>
    }
}

export default Page
