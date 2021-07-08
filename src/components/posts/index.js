import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            posts: [],
            params: params,
            update: true
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        
        const differentPages = this.state.params.toString() !== new URLSearchParams(window.location.search).toString()
        const changingUpdate = pState.update !== this.state.update

        if(this.state.update || (differentPages && !changingUpdate)) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params = this.state.params
        if(params.toString() !== new URLSearchParams(window.location.search)) {
            params = new URLSearchParams(window.location.search)
        }
        if(this.state.update){this.setState({update: false})}
        axios
            .get(api.apiPath(`/posts`+ '?' + params.toString() ))
            .then(res => { 
                this.setState({ posts: res.data.pageOfItems, params })
            })
            .catch(err => console.log(err));
    }

    render() {
        const posts = this.state.posts
        return <div className="tpBlackBg">
            <h1>{posts[0] ? posts[0].blog_category : "LOADING"}</h1>
            <hr />
            {posts.map(
                (post) => <Link to={`/posts/${post.site_blog_id}`} style={{display:"block"}}>
                    <h4>{post.blog_title}</h4>
                    {post.blog_tags.join(', ')}
                    { curr_user.user_role === 3 ? <Link to={`/posts/${post.site_blog_id}/edit`}>Edit</Link> : "" }
                    </Link>

            )}
            { curr_user.user_role === 3 ? <Link to={`/posts/new`}>Add New +</Link> : "" }
        </div>
    }
}

export default Page
