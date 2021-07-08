import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: []
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
            .get(api.apiPath(`/pages`))
            .then(res =>
              this.setState({pages: res.data})
            )
            .catch(err => console.log(err) );
    }

    render() {
        const pages = this.state.pages
        return <div className="tpBlackBg">
            <h1>Site Page List</h1>
            { pages.map(
                (page) => 
                <p>
                    <span className={`fas fa-${page.page_symbol}`}></span> {page.page_title} ({page.page_category})
                    <Link to={`/pages/${page.site_page_id}`}>View</Link>
                    <Link to={`/pages/${page.site_page_id}/edit`}>Edit</Link>
               
                </p>

            )}
            <Link to={`/pages/new`}>Add New +</Link>
        </div>
    }
}

export default Page
