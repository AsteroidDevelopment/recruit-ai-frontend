import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentWillReceiveProps = (newProps) => {
        this.loadPage(newProps)
    }

    loadPage = (props = this.props) => {
        axios
            .get(api.apiPath(`/posts/${props.match.params.id}`))
            .then(res =>
              this.setState({post: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const post = this.state.post
        return Object.keys(post).length > 0 ? <div className="tpBlackBg">
          <h1>{post.blog_title}</h1>
          <p> {post.blog_tags.join(', ')}</p>
          <div>
              {post.blog_text}
          </div>
        </div> : ""
    }
}

export default Page
