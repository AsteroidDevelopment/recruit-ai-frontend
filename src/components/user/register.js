import React from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import api from '../../helpers/api'


class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: {
            username: "",
            password: "",
            confirmPassword: "",
            user_email: "",
            user_role: 1,
            user_kind: "end_user",
            mailing_list: true
          },
          sent: false,
          error: false,
          formColor: "transparent"
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

      handleCheck = (e) => {
          this.setState({
              user: {
                  ...this.state.user,
                  [e.target.name]: e.target.checked
              }
          })
      }

    validateEmail = (email) => {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(mailformat)){
        return true;
      } else {
        return false;
      }
    }

    handleLogin = async (e) => {
      e.preventDefault();
      this.setState({formColor:"rgba(200,200,200,.3)"})
      let errors = []

      if(this.state.user.password !== this.state.user.confirmPassword) {
        errors.push("Your passwords do not match.")
      } 
      if(!this.validateEmail(this.state.user.user_email)) {
        errors.push("The email you entered is invalid.")
      }
      
      //If 0 errors so far...
      if(errors.length === 0)  {
        const userInfo = {...this.state.user}
        delete userInfo.confirmPassword
        
        await axios.post(api.registerPath(), userInfo)
        .then(res => true)
        .catch(err => errors = [...errors, ...err.response.data.error])
        
      }

      if(errors.length === 0) {
        this.setState({sent: true, error: false, formColor:"rgba(0,200,0,.3)"})
        setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
      } else {
        this.setState({error: errors, formColor:"rgba(200,0,0,.3)"})
        setTimeout(() => {this.setState({formColor: 'transparent'})}, 250)
      }
    }


    render() {
        return <div className="tpBlackBg" style={{border: "1px outset grey", borderRadius: '2px', maxWidth:'800px',margin:'40px auto', backgroundColor: '#fff', padding: '40px'}}>
            {this.state.sent ? <div>
              <h1>Thank you.</h1> 
              <h3>Please go check your email for the verification link.</h3>
              <p>If you do not see it within a few minutes, please check your spam folder</p>
            </div>:
            <Form onSubmit={this.handleLogin} style={{maxWidth:"800px", width:"100%", margin:"auto", backgroundColor:this.state.formColor}}>
            
            <h2>Create an Account</h2>
            Already have an account? Click <Link to='/users/login'>here</Link> to login.
            <hr />

            { this.state.error ? 
            <div className="health-warning">
              {this.state.error.map(err => <div>{err}</div>)}
            </div>
            : ""}
            
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="username" placeholder="username"
                      value={this.state.user.username} />
                    <Form.Text>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="text"
                      name="user_email" placeholder="user_email"
                      value={this.state.user.user_email} />
                    <Form.Text>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="password" placeholder="Password"
                      value={this.state.user.password} />
                    <Form.Text>Required</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      onChange={this.handleChange} type="password"
                      name="confirmPassword" placeholder="Confirm Password"
                      value={this.state.user.confirmPassword} />
                    <Form.Text>Required</Form.Text>
                </Form.Group>

              
                <Form.Group>
                    <Form.Label>Recieve email updates?</Form.Label>
                    <Form.Control
                      onChange={this.handleCheck} type="checkbox"
                      name="mailing_list"
                      value={this.state.user.mailing_list} />
                    <Form.Text>We don't send spam, we keep your email address secure, and we make our "Unsubscribe" button easy to find.</Form.Text>
                </Form.Group>

                <button className="nice-button" type='submit'>Register Account</button>
            </Form>
            }



            









        </div>
    }
}

export default LogIn
