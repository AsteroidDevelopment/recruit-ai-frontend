import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            support_tickets: []
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        const headers = { headers: {'authorization': localStorage.token} }
        axios
            .get(api.apiPath(`/support-tickets`), headers)
            .then(res =>
              this.setState({support_tickets: res.data.pageOfItems})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const support_tickets = this.state.support_tickets
        return <div className="tpBlackBg">
            <h1>Issue List</h1>
            { support_tickets.map(
                (support_ticket) => 
                <p>
                    <b>{support_ticket.support_ticket_state}</b>- {support_ticket.support_ticket_name}<br />
                    <b>Team Notes:</b> {support_ticket.private_notes_text}<br />
                    <b>Public Notes:</b> {support_ticket.public_notes_text}<br />
                    <Link to={`/support_tickets/${support_ticket.support_ticket_id}`}>View</Link>
                    <Link to={`/support_tickets/${support_ticket.support_ticket_id}/edit`}>Edit</Link>
                </p>

            )}
        </div>
    }
}

export default Page
