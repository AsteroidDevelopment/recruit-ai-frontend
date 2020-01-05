import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import Pagination from '../shared/pagination'
import { Container, Row, Col } from 'reactstrap'

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
        if(e.target.value === "-1") { 
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

                <Col>
                    <h4>Search</h4>
                    <input type="text" onChange={this.handleSearch} />
                    <p>Try first, last & preffered name, city & school name</p>
                </Col>
                <Col>
                    <h4>Sort</h4>
                    By
                    <select onChange={this.handleSort}>
                        <option value="preferred_name">Display Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="school_year">Grade</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                    </select>
                    <select onChange={this.handleOrder}>
                        <option value="asc">Low (A) - High (Z)</option>
                        <option value="desc">High (Z) - Low (A)</option>
                    </select>
                </Col>

                <Col>
                    <h4>Filter</h4>
                    View: <select onChange={this.handleFilter}>
                        <option value="team">Whole Team</option>
                        <option value="personal">Personal Recruits</option>
                    </select><br />

                    Filter Type: <select onChange={this.handleFilterType}>
                        <option value="-1">Select</option>
                        { Object.entries(this.state.filter_information).map(field => <option value={field[0]}>{field[0]}</option>)}
                    </select><br />
                    
                    Filter Value: <select onChange={this.handleFilterValue}>
                        <option value="-1">Select</option>
                        {this.state.filter_information[this.state.result_filter_type] ? 
                        this.state.filter_information[this.state.result_filter_type].map(field => <option value={field}>{field}</option>) : ""}
                    </select> 
                </Col>
            </Row>
            <hr />

            <Pagination pages={this.state.pager.pages} callback={this.goToPage} currentPage={this.state.pager.currentPage} totalPages={this.state.pager.totalPages} />

            <Container>
                {athletes.map(
                    (athlete) => <Row>
                        <Col>{athlete.preferred_name} {athlete.last_name}</Col>

                        <Col>{new Date(Date.now()).getFullYear() - (Number.parseInt(athlete.school_year.substr(0, 2)) - 12)}</Col>
                        <Col>{athlete.high_school_name}<br />{athlete.city}, {athlete.state}</Col>
                        <Col>{Number.parseInt(athlete.height / 12)}'{athlete.height % 12}", {athlete.weight}lbs</Col>
                        <Col><Link to={`/athletes/${athlete.athlete_id}`}>View</Link></Col>
                        <Col><Link to={`/athletes/${athlete.athlete_id}/edit`}>Update</Link></Col>

                    </Row>


                )}
            </Container>
            <Link to={`/athletes/new`}>Add New +</Link>
        </div>
    }
}

export default Page
