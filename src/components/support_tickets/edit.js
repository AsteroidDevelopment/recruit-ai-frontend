import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

class PageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        support_ticket: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const headers = { headers: {'authorization': localStorage.token} }
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/support-tickets/${id}`), headers)
          .then(res =>
            this.setState({support_ticket: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.support_ticket
    const formFields = defaults.defaultFullFields('support_ticket', item)

    return <div  className="tpBlackBg">

        <Link to={`/support_tickets/${item.support_ticket_id}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"support_tickets"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
