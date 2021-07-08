import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            messages: [],
            message: {},
            params: params,
            page: params.get('page') || 1
        }
    }

    componentDidMount = async () => {
        this.loadPage()
        
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = async (props = this.props) => {
        let params = this.state.params
       
        axios
            .get(api.apiPath(`/messages/${props.match.params.id}`+ '?' + params.toString() ), headers)
            .then(res =>{
                this.setState({ messages: [...this.state.messages, ...res.data.pageOfItems ] })
                var objDiv = document.getElementById("messages-scroll-box");
                objDiv.scrollTop = objDiv.scrollHeight;
            })
            .catch(err => console.log(err));
    }

    loadNextMessages = async() => {
        
        const params = this.state.params
        params.set('page', this.state.page + 1)
        this.setState({ page: this.state.page + 1, params})
        
        axios
        .get(api.apiPath(`/messages/${this.props.match.params.id}`+ '?' + params.toString() ), headers)
        .then(res =>{
            this.setState({ messages: [...this.state.messages, ...res.data.pageOfItems ] })
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
        

        
        return `${v[1]}/${v[2]}, ${hours}:${minutes} ${mm}`
    }

    updateInfo = (props = this.props) => {
        const id = props.match.params.id
        axios
            .get(api.apiPath(`/messages/${1}`), headers)
            .then(res => {
              this.setState({message: res.data.pageOfItems})
            })
            .catch(err => console.log(err) );
    }

    urlify = (text) => {
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return '<url>' + url + '</url>';
        })
    }

    render() {
        const messages = this.state.messages
        const item = this.state.message
        const formFields = defaults.defaultFullFields('message', item)

        return <div >
            {messages[0] ? <div>
                <h1>{messages[0].preferred_name}</h1>
            </div>: ""}
            
            <Link to={`/athletes/${this.props.match.params.id}`}>Athlete Profile</Link>
            <Link to={`/messages`}>All Messages</Link>

            <div id="messages-scroll-box"><div>

            {messages.map(m => <div className="message" style={{backgroundColor: m.message_type === 'outgoing' ? 'lightblue' : 'white'}}>

                {m.message_text ? this.urlify(m.message_text).split('<url>').map(line => <span>
                    { line.split('</url>')[1] ? <a href={line.split('</url>')[0]} target="_blank">{line.split('</url>')[0]}</a> : "" }
                    { line.split('</url>')[1] ? line.split('</url>')[1] : line.split('</url>')[0]}
                </span>)
                : <i>blank message sent</i>}
                <div className="m-date">{this.stringifyDate(m.created_at)}</div>
                {m.message_type === 'outgoing' ? m.user_display_name : ""}
                
            </div>)}

            <div onClick={this.loadNextMessages} className='message' >Load More</div>

            </div></div>

            <HandleForm item={formFields} 
            existing={false} formClass={"messages"} 
            update={this.updateInfo} redirect={`/messages/${this.props.match.params.id}`} 
            apiRoute={`/messages/send/${this.props.match.params.id}`} />

            

        </div>
    }
}

export default Page
