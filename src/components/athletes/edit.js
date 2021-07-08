import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const headers = { headers: {'authorization': localStorage.token} }


class PageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        athlete: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/athletes/${id}`), headers)
          .then(res =>
            this.setState({athlete: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.athlete
    const formFields = defaults.defaultFullFields('athlete', item)

    return <div  className="tpBlackBg">

        <Link to={`/athletes/${item.athlete_id}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"athletes"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
