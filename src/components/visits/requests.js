import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Requests extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            requests: []    
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    loadPage = () => {
        axios
            .get(api.apiPath(`/teams/join-requests`), headers)
            .then(res =>
              this.setState({requests: res.data})
            )
            .catch(err => console.log(err) );
    }

    verifyJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/verify/${e.target.getAttribute('data-id')}`), headers)
            .then(res => { 
                this.loadPage();
            })
            .catch(err => console.log(err));
    }

    declineJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/decline/${e.target.getAttribute('data-id')}`), headers)
            .then(res => { 
                this.loadPage();
            })
            .catch(err => console.log(err));
    }

    render () {
        return <div>
            <h2>Requests to Join Team</h2>
            {this.state.requests.map(req => <div> 
                {req.user_first_name} {req.user_last_name}, {req.user_professional_title}, ({req.user_email})
                
                <span className="format-link" onClick={this.verifyJoin} data-id={req.user_id}>Verify Join</span>
                <span className="format-link" onClick={this.declineJoin} data-id={req.user_id}>Decline Join</span>

                <br /><hr />
            </div>)}
        </div>
    }

}

export default Requests