import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class Page extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(window.location.search)
        this.state = {
            teams: [],
            params: params,
            update: true,
            search: params.get('search') || "",
            formColor: 'transparent'
        }
    }

    componentDidMount = () => {
        this.loadPage()
    }

    componentDidUpdate = (pProps, pState) => {
        if(this.state.update) {
            this.loadPage()
        }
    }

    loadPage = (props = this.props) => {
        let params = this.state.params
        if(this.state.update){this.setState({update: false})}
        axios
            .get(api.apiPath(`/teams`+ '?' + params.toString() ))
            .then(res => { 
                this.setState({ teams: res.data, params })
            })
            .catch(err => console.log(err));
    }

    requestJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/join/${e.target.getAttribute('data-id')}`), headers)
            .then(res => { 
                this.setState({ formColor: "rgba(0,200,0,.4)" })
                localStorage.setItem('user', JSON.stringify(res.data.user))
                setTimeout(() => {
                    this.props.history.push("/users/edit");
                    document.location.reload(true);
                }, 500)
                
            })
            .catch(err => console.log(err));
    }

    searchTeamName = (e) => {
        e.preventDefault();
        const params = this.state.params
        params.set('search', this.state.search)
        this.setState({update:true, params})
    }

    handleSearch = (e) => {
        this.setState({search: e.target.value})
    }

    render() {
        const teams = this.state.teams
        return <div className="tpBlackBg" style={{backgroundColor:this.state.formColor}}>
            <h1>Team Search</h1>
            <p>Please search for your team by name.</p>
            <form onSubmit={this.searchTeamName}>
            <input onChange={this.handleSearch} value={this.state.search} />
            <button type="submit">Search</button>
            </form>
            <hr />
            {teams.map(
                (team) => <div>
                    <h3>{team.team_name}</h3>
                    <span className="format-link" onClick={this.requestJoin} data-id={team.team_id}>Request to Join</span>
                    <hr />
                </div>

            )}
            <h2>-OR-</h2>
            <Link className="nice-button" to={`/teams/new`}>Add Your Team +</Link>
        </div>
    }
}

export default Page
