import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import api from '../../helpers/api'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {
            username: "",
            password: ""
          },
          formColor: 'transparent',
          error: null,
        }
    }

    handleChange = (e) => {
      this.setState({
          user: {
              ...this.state.user,
              [e.target.name]: e.target.value
          }
      })
    }

    handleLogin = (e) => {
      this.setState({formColor: 'rgba(255,255,255,.4)'})
      e.preventDefault();
      axios
          .post(api.loginPath(), this.state.user)
          .then(res => {
            this.setState({formColor: 'rgba(0,200,0,.4)'})
            const user = res.data.user
            this.props.auth.login( user, res.data.token )
            if(user.user_kind === 'end_user') {

              setTimeout(() => {
                if(user.userInfo.user_first_name && 
                  user.userInfo.user_last_name && 
                  user.userInfo.user_professional_title && 
                  user.userInfo.user_display_name) {
                  
                  window.location.replace('/?loggedIn=true')
                } else {
                  window.location.replace('/users/edit/?loggedIn=true')
                }
                
              
              
              }, 200)


            } else {
              setTimeout(() => {window.location.replace('/')}, 200)
            }

          })
          .catch((err, res) => {
            if(err.response.data.message === "Invalid Credentials.") {
              this.setState({formColor: 'rgba(200,0,0,.4)', error: "The information you entered does not match our records. Please try again."})
              setTimeout(() => {this.setState({formColor: 'transparent'})}, 2000)

            }
          });
    }

    render() {
        return <div className="tpBlackBg" style={{border: "1px outset grey", borderRadius: '2px', maxWidth:'800px',margin:'40px auto', backgroundColor: '#fff', padding: '40px'}}>
          {this.state.error || ""}
          
          <h2>Login</h2>
            Need an account? Click <Link style={{margin:'0',padding:'0',textDecoration:'underline'}} to='/users/register'>here</Link> to register.
            <Form onSubmit={this.handleLogin} style={{maxWidth:"800px", width:"100%", margin:"auto", backgroundColor: this.state.formColor}}>
                <Form.Group>
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="username" placeholder="username"
                      value={this.state.user.username} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="password" placeholder="Password"
                      value={this.state.user.password} />
                    <Form.Text>Please enter.</Form.Text>
                </Form.Group>

                    <button type='submit'>Submit</button>
            </Form>
        </div>
    }
}

export default withRouter( LogIn )
