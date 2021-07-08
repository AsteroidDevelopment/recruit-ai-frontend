import React from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'

import FeedbackCard from './card.js'
import {apiPath} from '../../helpers/api'

class FeedbackIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: {
        feedback_kind: -1,
        feedback_email: "",
        feedback_name: "",
        feedback_message: ""
      },
      sending: false,
      error: false,
      sent: false
    }
  }


  submitForm = (e) => {
    e.preventDefault();
    axios
        .post(apiPath(`/feedback/`), this.state.feedback)
        .then(res => {
          if(res.status === 201) {
            this.setState({sent: true})
          } else {
            console.log(res)
          }
        })
        .catch(err => console.log(err) );
  }

  feedbackKindOptions = () => {
    const options = ['Bug Report', 'Question/Concern', 'Comment/Feedback', 'Other']

    return options.map(option => <option key={option} value={options.indexOf(option)}>
      {option}
    </option>)
  }

  handleSelectChange = (e) => {
    this.setState({feedback: {...this.state.feedback, feedback_kind: e.target.value} })
  }

  handleChange = (e) => {
    this.setState({ feedback: {...this.state.feedback, [e.target.name]: e.target.value}})
  }

  render() {
      return <div>
        { !this.state.sent ?
        <div>
          <h2>Give Some Feedback</h2>
          <Form onSubmit={this.submitForm} className="handlerForm" style={{margin:'auto',backgroundColor:this.state.formColor}}>
            <Form.Group>
              <Form.Label>Feedback:</Form.Label>
              <Form.Control as="select" onChange={this.handleSelectChange} type="text"
                name={ "feedback_kind" }
                value={this.state.feedback[ "feedback_kind" ]} >
                  <option value="-1">-please select-</option>
                  { this.feedbackKindOptions() }
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={ "feedback_name" } placeholder={ "Name (Optional)" }
                value={this.state.feedback[ "feedback_name" ]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={this.handleChange} type="text"
                name={ "feedback_email" } placeholder={ "Email (Optional)" }
                value={this.state.feedback[ "feedback_email" ]} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Message *</Form.Label>
              <Form.Control as="textarea" rows={5} onChange={this.handleChange} type="text"
                name={ "feedback_message" } placeholder={ "Please leave your message." }
                value={this.state.feedback[ "feedback_message" ]} />
            </Form.Group>


            <button type='submit'>Submit</button>

          </Form>
        </div>

        : "Thank you for your input!"
      }


      </div>
  }
}


export default FeedbackIndex
