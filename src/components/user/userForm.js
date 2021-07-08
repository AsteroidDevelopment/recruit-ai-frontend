import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import api from '../../helpers/api'
import {Link} from 'react-router-dom'


const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false
const headers = { headers: { 'authorization': localStorage.token } }

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: curr_user,
      formColor: "transparent"
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    axios
      .put(api.authPath(`/edit`), this.state.user, headers)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data))
          this.setState({ formColor: "rgba(0,200,0,.4)", user: res.data })
          setTimeout(() => { this.setState({ formColor: "transparent" }) }, 500)
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err));
  }

  submitInfoForm = (e) => {
    e.preventDefault();
    axios
      .put(api.authPath(`/edit/info`), this.state.user.userInfo, headers)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data))
          this.setState({ formColor: "rgba(0,200,0,.4)", user: res.data })
          setTimeout(() => { this.setState({ formColor: "transparent" }) }, 500)
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })
  }

  handleInfoChange = (e) => {
    this.setState({ 
      user: { 
        ...this.state.user, 
        userInfo: {
          ...this.state.user.userInfo, 
          [e.target.name]: e.target.value 
        }
      } 
    })
  }



  handleCheck = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.checked
      }
    })
  }


  render() {
    const user = this.state.user
    const info = user.userInfo
  
    let error = []

    const basicInfo = info.user_first_name === "" || 
    info.user_last_name === "" || 
    info.user_professional_title === "" ||
    info.user_display_name === "" || 
    (!info.user_first_name || !info.user_display_name || !info.user_display_name || !info.user_professional_title)

    if(basicInfo) {error.push("Please fill out the basic information below.")}

    if(!info.team_id) {error.push("Please either create a team or find yours to join.")}

    if(info.team_id && !info.team_verified) {error.push("Awaiting team verification.")}

    console.log(info)

    return <div className="tpBlackBg">
      {!this.state.sent ?
        <div>

          {error.length > 0 ? <div style={{backgroundColor:"rgba(200,0,0,.5)"}}>{error.map(e => <p>>{e}</p>)}</div> : ""}

          { info.team_id ? <Link to={`/teams/${info.team_id}`}>See Team</Link> : <div>
              <Link to="/teams" className="nice-button">Find Your Team</Link>
              <Link to="/teams/new" className="nice-button">Create Your Team</Link>
            
            </div>}

          <h2>Account Information</h2>
          {this.state.user && this.state.user.userInfo && this.state.user.user_kind === 'end_user' ? 
          <Form onSubmit={this.submitInfoForm} className="handlerForm" style={{ width: '100%', maxWidth: '800px', margin: 'auto', backgroundColor: this.state.formColor }}>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={this.handleInfoChange} type="text"
                name={"user_first_name"} placeholder={"Legal First Name"}
                value={this.state.user.userInfo["user_first_name"]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control onChange={this.handleInfoChange} type="text"
                name={"user_last_name"} placeholder={"Legal Last Name"}
                value={this.state.user.userInfo["user_last_name"]} />
            </Form.Group>

            
            <Form.Group>
              <Form.Label>Professional Title</Form.Label>
              <Form.Control onChange={this.handleInfoChange} type="text"
                name={"user_professional_title"} placeholder={"Title"}
                value={this.state.user.userInfo["user_professional_title"]} />
            </Form.Group>

                        
            <Form.Group>
              <Form.Label>Display Name</Form.Label>
              <Form.Control onChange={this.handleInfoChange} type="text"
                name={"user_display_name"} placeholder={"Display Name"}
                value={this.state.user.userInfo["user_display_name"]} />
            </Form.Group>


            <button type='submit'>Submit</button>

          </Form> : "" }
          
          <h2>Account Settings</h2>
          <Form onSubmit={this.submitForm} className="handlerForm" style={{ width: '100%', maxWidth: '800px', margin: 'auto', backgroundColor: this.state.formColor }}>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={"user_email"} placeholder={"Email"}
                value={this.state.user["user_email"]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={"username"} placeholder={"Username"}
                value={this.state.user["username"]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Recieve email updates?</Form.Label>
              <Form.Control
                onChange={this.handleCheck} type="checkbox"
                name="mailing_list"
                checked={this.state.user.mailing_list} />
              <Form.Text>We don't send spam, we keep your email address secure, and we make our "Unsubscribe" button easy to find.</Form.Text>
            </Form.Group>

            <button type='submit'>Submit</button>

          </Form>




        </div>

        : "Thank you for your input!"
      }


    </div>
  }

}

export default UserForm
