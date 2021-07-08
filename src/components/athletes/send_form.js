import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import api from '../../helpers/api'

import HandleForm from '../forms/handler'

import defaults from '../../db/defaultObjects'

//***************************** */
// WHERE COACHES add a new athlete, submitting this form sends the rest of the form to the student
//*****************************

class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      display: false
    }
  }

  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => { this.updateInfo(newProps); }


  updateInfo = (props = this.props) => {
    const id = props.match.params.id
    axios
      .get(api.apiPath(`/athletes/public/${id}`))
      .then(res =>
        this.setState({ post: res.data, display: !this.state.display })
      )
      .catch(err => console.log(err));
  }

  render() {
    const id = this.props.match.params.id
    const item = this.state.post
    const formFields = defaults.defaultFullFields('athlete', item)
    delete formFields.notes
    delete formFields.application_process
    delete formFields.phone

    return <div className="tpBlackBg">
      <h1>Welcome to RecruitAI.</h1>

      {this.state.display ?
        <div>

          <h3>We are an app that makes your recruitment process much easier.</h3>
          <p>You will be able to communicate through your usual texting app (text only- no picture messages) to reach the
          whole coaching staff through one number.</p>
          <p>Occassionally, you may recieve a link for a form similar to this one.</p>

          <p>***Normal message and data rates may apply. All messages are
          reviewed by a compliance officer representing that school. RecruitAI has no ability to read your messages, and highly
          respects your privacy.</p>
          <input type="checkbox" />I agree to the terms and conditions.
  
        <h3>Please fill-in any missing information, and double check everything else.</h3>

          <HandleForm
            item={formFields}
            formClass={"athletes"}
            update={this.updateInfo}
            redirectIdField={"athlete_id"}
            editButtonText="I Agree to The Terms & Wish to Continue"
            hideDeleteButton={true}
            apiRoute={`/athletes/public/${id}`}
            public={true} />

        </div> : <div>
          <h3>Thank you.</h3>
        </div>}

    </div>
  }
}

export default NewPage;
