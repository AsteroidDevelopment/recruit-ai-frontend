import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            support_ticket: {}
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
            .get(api.apiPath(`/support-tickets/${props.match.params.id}`), headers)
            .then(res =>
              this.setState({support_ticket: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const support_ticket = this.state.support_ticket
        return <div className="tpBlackBg">
          <h1>Support Ticket #{support_ticket.support_ticket_id}</h1>
          <div><b>{support_ticket.support_ticket_state}</b> {support_ticket.support_ticket_kind}</div>
          <h3>Contact Info</h3>
          <div>{ support_ticket.require_update ? <b>Requires Update</b> : "" }</div>
          {support_ticket.support_ticket_email} ({support_ticket.support_ticket_name})
          <h3>Problem Description</h3>
          {support_ticket.support_ticket_message}
          <h3>Steps & Progress:</h3>
          {support_ticket.public_notes_text}
        </div>
    }
}

export default Page
