import React from 'react'
import axios from 'axios'

import FeedbackCard from './card.js'

const curr_user = localStorage.user ?  JSON.parse(localStorage.user) : false
const headers = { headers: {'authorization': localStorage.token} }

class FeedbackIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      filter: "unlogged",
      lastFilter: "",
      loading: true,
    }
  }

  componentDidMount = () => {
    this.loadPage();
  }

  componentDidUpdate = () => {
    if(this.state.filter !== this.state.lastFilter) {
      this.loadPage();
    }
  }

  loadPage = () => {
    axios
        .get(`https://grimwire.herokuapp.com/api/feedback/${this.state.filter}`, headers)
        .then(res =>
          this.setState({feedbacks: res.data, loading: false, lastFilter: this.state.filter})
        )
        .catch(err => console.log(err) );
  }

  toggleFilter = () => {
    this.setState({filter: this.state.filter === 'unlogged' ? 'all' : 'unlogged'})
  }

  render() {
      return <div>
        <span className="format-link" onClick={this.toggleFilter}>See {this.state.filter === 'unlogged' ? 'All Feedback' : 'Only Unseen Feedback'}</span><br />
        <h2>{this.state.filter === 'unlogged' ? 'Unseen Feedback' : 'All Feedback'}</h2>
        <div className="divider" />
        {
          this.state.feedbacks.length > 0 ?
          this.state.feedbacks.map(feedback => <div className="faq-questions">
              <FeedbackCard feedback={feedback} update={this.loadPage}/>
            </div>
          )
          : <div>{this.state.loading  ? "Loading." : "No Results."}</div>
        }
      </div>
  }
}


export default FeedbackIndex
