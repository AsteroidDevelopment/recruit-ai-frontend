import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class PageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        visit: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/visits/${id}`), headers)
          .then(res =>
            this.setState({visit: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.visit
    const formFields = defaults.defaultFullFields('visit', item)

    return <div  className="tpBlackBg">

        <Link to={`/visits/${item.visit_id}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"visits"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
