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
        page: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/pages/${id}`))
          .then(res =>
            this.setState({page: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.page
    const formFields = defaults.defaultFullFields('page', item)

    return <div  className="tpBlackBg">

        <Link to={`/pages/${item.site_page_id}?title=${item.site_page_title}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"pages"} update={this.updateInfo} redirectIdField={"site_page_id"}/>
        
      </div>
  }
}

export default NewPage;
