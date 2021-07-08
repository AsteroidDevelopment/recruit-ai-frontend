import React from 'react'
import axios from 'axios'
import api from '../../helpers/api'
import { Link } from 'react-router-dom'
import JoinRequests from './requests'
import { Container, Row, Col } from 'reactstrap'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            team: {},
            requests: []
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
            .get(api.apiPath(`/teams/${props.match.params.id}`))
            .then(res =>
                this.setState({ team: res.data })
            )
            .catch(err => console.log(err));
    }


    declineJoin = (e) => {
        axios
            .get(api.apiPath(`/teams/decline/${e.target.getAttribute('data-id')}`), headers)
            .then(res => {
                this.loadPage();
            })
            .catch(err => console.log(err));
    }

    render() {
        const team = this.state.team
        const owned = team.account_moderator_id === curr_user.user_id

        return <div>
            <h3>Team</h3>
            <h1>{team.team_name}</h1>

            <hr />
            <h3>Staff</h3>
            <Container>
                <Row className='itemPanel itemList'>
                    {team.teamMembers ? team.teamMembers.map(s => <Col lg={6}>

                        <Link to={`/users/profile/${s.user_id}`} style={{display:'block',textAlign:'center'}}>
                            <div className="staff-square">
                                <h5>{s.user_display_name}</h5>
                                <p>{s.user_first_name} {s.user_last_name}, {s.user_professional_title}</p>
                                <p>{s.user_email}</p>
                                <p></p>

                                {s.foreign_user_id !== curr_user.user_id && owned ?
                                    <span className="format-link nice-button red-button" onClick={this.declineJoin} data-id={s.foreign_user_id}>Remove</span>
                                    : "\n\n"}
                            </div></Link>

                    </Col>)


                        : ""}
                </Row>
            </Container>
                                
            {owned ? <><br /><JoinRequests loadPage={this.loadPage} /></> : ""}

            <hr />
            <h2>Admission & Visit Settings</h2>
            <hr />
            <h4>Admissions Email</h4>
            {team.admissions_email_address}
            <h4>Visit Address</h4>
            {team.visit_reporting_address}
            <h4>Visit Instructions</h4>
            {team.visit_reporting_instructions}<br />

            <hr />
            {owned ? <Link classButton="nice-button blue-button" to={`/teams/${team.team_id}/edit`}>Edit Team Details</Link> : ""}

        </div>
    }
}

export default Page
