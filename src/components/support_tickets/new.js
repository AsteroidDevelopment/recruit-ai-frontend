import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        support_ticket: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/support_tickets/${id}`))
          .then(res =>
            this.setState({support_ticket: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.support_ticket
    const formFields = defaults.defaultFullFields('support_ticket', item)
    const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

    console.log(formFields, curr_user.user_role)
    if(curr_user.user_role === 1) {
      delete formFields.private_notes_text
      delete formFields.public_notes_text
      delete formFields.support_ticket_state
    }

    return <div  className="tpBlackBg">



        <Link to={`/support_tickets/${item.site_support_ticket_id}?title=${item.site_support_ticket_title}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"support_tickets"} update={this.updateInfo} redirect={"/"} />
        
      </div>
  }
}

export default NewPage;
