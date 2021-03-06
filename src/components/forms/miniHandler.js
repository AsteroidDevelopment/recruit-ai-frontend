import React from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import BuildForm from './buildForm'
import DisplayPreview from './relationships/displayPreview'

const curr_user = localStorage.user ? JSON.parse(localStorage.user) : false

class FormHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      formClass: "",
      existing: props.existing,
      showForm: false
    }
  }

  //UPDATE INFO just resets state with new props
  componentDidMount = () => { this.updateInfo(); }
  componentWillReceiveProps = (newProps) => {this.updateInfo(newProps);}
  updateInfo = (props = this.props) => { this.setState({item: props.item, formClass: props.formClass}) }

  //UPDATE ITEM is a wrapper function passed as a callback to update this state
  updateItem = (item) => { this.setState({item}) }

  //A helper function that sets up & actually makes the api call with headers, etc.
  updateAPI = async (method, url, payload, bulkAdd) => {
    const headers = { headers: {'authorization': localStorage.token} }
    var apiCall;
    console.log(bulkAdd)

    if(method === 'put') {
      apiCall = await axios.put(url, payload, headers)
    } else {
      apiCall = await axios.post(url, payload, headers)
    }
    if(!bulkAdd) { await this.props.update() }
    return apiCall
  }

  //The callback "Submit" function that gets called.
  submitForm = async (bulkAdd = false) => {
    let item = this.state.item
    const id = this.state.item.id
    delete this.state.item.id
    delete this.state.item.original_record
    const postURL = `https://grimwire.herokuapp.com/api/${this.props.info.url}`
    const putURL = `${postURL}/${id}`
    var apiCall;

    console.log(id)

    if(this.state.formClass === "images" || this.state.formClass === "thumbnail"){
      if(this.state.existing) {
        apiCall = this.updateAPI('put', putURL, this.formData(id), bulkAdd)
      } else {
        apiCall = this.updateAPI('post', postURL, this.formData(id), bulkAdd)
      }
    } else{
      if(this.state.existing) {
        apiCall = this.updateAPI('put', putURL, item, bulkAdd)
      } else {
        if(this.state.formClass === 'symbol_connections') { item.duplicateConnection = this.state.duplicateConnection }
        apiCall = this.updateAPI('post', postURL, item, bulkAdd)
      }
    }

    apiCall = await apiCall

    return {apiCall, redirect: null}
  }

  deleteItem = (e) => {
    e.preventDefault()
    const headers = { headers: {'authorization': localStorage.token} }
    if(window.confirm("Are you sure you wish to completely delete the item?")){
      axios
          .delete(`https://grimwire.herokuapp.com/api/${this.props.info.url}/${this.state.item.id}`, headers)
          .then(res =>
            this.setState({item: {}})
          )
          .catch(err => console.log(err) )
    }
  }

  toggleFormShow = (e) => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    const authShow = curr_user && Object.entries(this.state.item).length > 0
    return authShow ? <div className="mini-form-handler">
      <h5 onClick={this.toggleFormShow}>
        {this.state.existing ? "EDIT" : "ADD NEW"} 
        {this.state.showForm ? "-" : "+" }
      </h5>
  

      {this.state.showForm ?
      <div className='mini-form'>
        <BuildForm 
          item={this.state.item} 
          updateItem={this.updateItem} 
          submitForm={this.submitForm} 
          deleteItem={this.deleteItem}
          existing={this.state.existing} 
          formClass={this.state.formClass} /> 
      </div>
    : (this.state.existing ? <DisplayPreview {...this.props}  /> : "")
    }
    </div> : ""
  }

  formData = (id) => {
    const formId = `${this.state.formClass}-${id}`
    let myForm = document.getElementById(formId);
    return new FormData(myForm);
  }


}

export default withRouter(FormHandler)






