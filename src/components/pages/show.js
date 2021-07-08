import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            page: {},
            params: params,
            update: true
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        const differentArticles = this.state.page.site_page_id !== Number.parseInt(this.props.match.params.id)
        const changingUpdate = pState.update !== this.state.update
        if( this.state.update || (differentArticles && !changingUpdate) ){
            this.loadPage()
        }
    }
 
    loadPage = (props = this.props) => {
        if(this.state.update) { this.setState({update: false}) }
        axios
            .get(api.apiPath(`/pages/${props.match.params.id}`))
            .then(res => {
                const params = this.state.params
                params.set("title", res.data.page_title)
                this.setState({page: res.data, params})
            })
            .catch(err => console.log(err) );
    }

    render() {
        const page = this.state.page
        return <div className="tpBlackBg">
          <div> <Link to="/pages/1">{page.page_category}</Link> > </div>
          <h1>{page.page_title}</h1>
          <div dangerouslySetInnerHTML={{__html: page.page_body_text}} />
        </div>
    }
}

export default Page
