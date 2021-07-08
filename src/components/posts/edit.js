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
        post: {}
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}


  updateInfo = (props = this.props) => {
      const id = props.match.params.id
      axios
          .get(api.apiPath(`/posts/${id}`))
          .then(res =>
            this.setState({post: res.data})
          )
          .catch(err => console.log(err) );
  }

  render() {
    const item = this.state.post
    const formFields = defaults.defaultFullFields('post', item)

    return <div  className="tpBlackBg">

        <Link to={`/posts/${item.site_blog_id}?title=${item.blog_title}`}>Back to Page</Link>

        <HandleForm item={formFields} formClass={"posts"} update={this.updateInfo} />
        
      </div>
  }
}

export default PageEdit;
