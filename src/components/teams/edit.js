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
        team: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/teams/${id}`))
          .then(res =>
            this.setState({team: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.team
    const formFields = defaults.defaultFullFields('team', item)

    return <div  className="tpBlackBg">

        <Link to={`/teams/${item.team_id}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"teams"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
