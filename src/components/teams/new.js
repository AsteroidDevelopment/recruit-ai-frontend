import React from 'react';

import HandleForm from '../forms/handler'

import defaults from  '../../db/defaultObjects'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {}
    }
  }

  updateInfo = (apiCall) => {
    console.log(apiCall.data.user)
    localStorage.setItem('user', JSON.stringify(apiCall.data.user))
    this.props.history.push("/users/edit")
    document.location.reload(true)
  }

  render() {
    const item = this.state.post
    const formFields = defaults.defaultFullFields('team', item)

    return <div  className="tpBlackBg">

        <HandleForm item={formFields} formClass={"teams"} update={this.updateInfo} blockRedirect={true}/>
        
      </div>
  }
}

export default NewPage;
