import React from 'react'
import axios from 'axios'
import BuildForm from './buildForm'
import { withRouter } from "react-router-dom";
import api from '../../helpers/api'


const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
      formClass: "",
      existing: (props.existing === true || props.existing === false) ? props.existing : (props.match.params.id ? true : false),
      editId: props.editId || props.match.params.id
    }
  }

  
  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}

  updateInfo = (props = this.props) => {
    this.setState({item: props.item, formClass: props.formClass})
  }
  
  //UPDATE ITEM is a wrapper function passed as a callback to update this state
  updateItem = (item) => { this.setState({item}) }

    //A helper function that sets up & actually makes the api call with headers, etc.
    updateAPI = async (method, url, payload, bulkAdd) => {
      const headers = { headers: {'authorization': localStorage.token} }
      var apiCall;
  
      if(method === 'put') {
        await axios.put(url, payload, headers)
        .then((res) => apiCall = res)
        .catch((err) => apiCall = err)
      } else {
        await axios.post(url, payload, headers)
        .then((res) => apiCall = res)
        .catch((err) => apiCall = err)
      }
      if(this.props.blockRedirect) { await this.props.update(apiCall) }
      else if(!bulkAdd) { await this.props.update() }
      return apiCall

    }
  

  submitForm = async (bulkAdd = false) => {
    let item = this.state.item
    
    const postURL = api.apiPath(`/${this.state.formClass ==="support_tickets" ? 'support-tickets' : this.state.formClass}`)
    const putURL = `${postURL}/${this.state.editId}`

    var apiCall, redirect;

    if(this.props.apiRoute){
      var overwritePath = api.apiPath(this.props.apiRoute)
    }


    if(this.state.existing) {
      apiCall = await this.updateAPI('put', overwritePath || putURL, item, bulkAdd)
      redirect = null
    } else {
      apiCall = await this.updateAPI('post', overwritePath || postURL, item, bulkAdd)
      
      redirect = this.redirectEditPath(apiCall)
    }

    return {apiCall, redirect}
  }

  deleteItem = (e) => {
    e.preventDefault()
    const headers = { headers: {'authorization': localStorage.token} }
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(api.apiPath(`/${this.state.formClass}/${this.props.match.params.id}`), headers)
          .then(res =>
            this.props.history.push(`/${this.state.formClass}`)
          )
          .catch(err => console.log(err) )
    }
  }


  render() {
    const show = curr_user || this.props.public
    return show ?
      <div className='full-form'>
        <BuildForm 
          {...this.props}
          item={this.state.item} 
          updateItem={this.updateItem} 
          submitForm={this.submitForm} 
          deleteItem={this.deleteItem}
          existing={this.state.existing} 
          formClass={this.state.formClass} /> 
      </div>
    : ""
  }

  redirectEditPath = (res) => {
    if(this.props.blockRedirect) {
      return false
    }if(this.props.redirect) {
      return this.props.redirect
    } else {
      let redirectId = res.data[this.props.redirectIdField]
      return `/${this.state.formClass}/${redirectId}/edit`
    }

  }


}

export default withRouter(FormHandler)
