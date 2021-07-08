import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import Pagination from '../shared/pagination'
import { Container, Row, Col } from 'reactstrap'

import FilterPanel from './filterpanel'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            athletes: [],
            params: params,
            update: true,
            sort: params.get('sort') || "preferred_name",
            order: params.get('order') || "asc",
            team_filter: params.get('team_filter') || "team",
            search_term: params.get('search_term') || "",
            result_filter_type: params.get('result_filter_type') || "",
            result_filter_value: params.get('result_filter_value') || "",
            pager: {},
            pageNumber: params.get('page') || 1,
            filter_information: {}
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        if (this.state.update) {
            this.loadPage()
        }
    }

    loadPage = async (props = this.props) => {
        let params = this.state.params
        this.setState({ update: false })
        const res = await axios.get(api.apiPath(`/athletes` + '?' + params.toString()), headers)
        const filter_information = await axios.get(api.apiPath(`/athletes/filter-information`), headers)

        this.setState({
            athletes: res.data.pageOfItems,
            pager: res.data.pager,
            params, update: false,
            filter_information: filter_information.data
        })
    }

    goToPage = (e) => {
        let params = this.state.params
        const pageNumber = e.target.attributes.page.value
        params.set('page', pageNumber)
        this.setState({ pageNumber, params, update: true })
        window.history.replaceState({}, "", window.location.pathname + '?' + params.toString());
    }

    handleSort = (e) => {
        const params = this.state.params
        params.set('sort', e.target.value)
        this.setState({ sort: e.target.value, params, update: true })
    }
    handleOrder = (e) => {
        const params = this.state.params
        params.set('order', e.target.value)
        this.setState({ order: e.target.value, params, update: true })
    }
    handleFilter = (e) => {
        const params = this.state.params
        params.set('team_filter', e.target.value)
        this.setState({ team_filter: e.target.value, params, update: true })
    }
    handleSearch = (e) => {
        const params = this.state.params
        params.set('search_term', e.target.value)
        this.setState({ search_term: e.target.value, params, update: true })
    }
    handleFilterType = (e) => {
        const params = this.state.params
        if (e.target.value === "-1") {
            params.set('result_filter_type', '')
            this.setState({ result_filter_type: '', params, update: true })
        } else {
            params.set('result_filter_type', e.target.value)
            this.setState({ result_filter_type: e.target.value, params, update: true })
        }
    }
    handleFilterValue = (e) => {
        const params = this.state.params
        params.set('result_filter_value', e.target.value)
        this.setState({ result_filter_value: e.target.value, params, update: true })
    }

    render() {
        const athletes = this.state.athletes
        return <div className="tpBlackBg">
            <h1>Athletes</h1>
            <Row>
                <Col lg={6}>
                    <input className='neatform' type="text" onChange={this.handleSearch} />
                    <p>Search- Try first, last & preffered name, city & school name</p>
                </Col>
                <Col lg={2}>
                </Col>
                <Col lg={2}>
                    <FilterPanel component={this} />
                </Col>

                <Col lg={2}>
                    <Link className='nice-button green-button' to={`/athletes/new`}>Add New +</Link>
                </Col>
            </Row>
            <div className="itemList">
                <Container>
                <Row className="itemListHeader">
                    <Col lg={2}>Name</Col>
                    <Col lg={1}>Weight</Col>
                    <Col lg={1}>Year</Col>
                    <Col lg={3}>School</Col>
                    <Col lg={2}>Hometown</Col>
                    <Col lg={3}></Col>
                </Row>
                </Container>
                <div className="alternateRows">
                {athletes.map(
                    (athlete) => <div><Link style={{margin:"0", padding:"10px", width:"100%"}} to={`/athletes/${athlete.athlete_id}`}><Row>
                        <Col lg={2}><p style={{color:"#2298E7"}}>{athlete.preferred_name} {athlete.last_name}</p></Col>
                        <Col lg={1}>{/*Number.parseInt(athlete.height / 12)}'{athlete.height % 12}", */}{athlete.weight}lbs</Col>
                        <Col lg={1}>{new Date(Date.now()).getFullYear() - (Number.parseInt(athlete.school_year.substr(0, 2)) - 12)}</Col>
                        <Col lg={3}>{athlete.high_school_name}</Col>
                        <Col lg={2}>{athlete.city}, {athlete.state}</Col>
                        <Col lg={3}></Col>

                    </Row></Link></div>


                )}
                </div>

                <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />

            </div>
        </div>
    }
}

export default Page
