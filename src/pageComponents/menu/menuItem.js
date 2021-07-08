import React from 'react'
import { withRouter } from 'react-router-dom'
import MenuDropdown from './menuDropdown'
import MenuLink from './menuLink'

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  showItem = () => {
    const item = this.props.item
    const user = localStorage.user ? JSON.parse(localStorage.user) : null
    switch (item.view) {
        case 'all':
            return true
        case 'no_user':
            return !user
        case 'logged_in':
            return user
        case 'admin':
            return user && user.user_role >= 3
        case 'end_user':
            return user && user.user_kind === 'end_user'
    }
  }



  render = () => {
    const item = this.props.item
   
    return this.showItem() ? (item.links ? 
      <MenuDropdown auth={this.props.auth} item={item} toggleDropdown={this.props.toggleDropdown} /> 
      : <MenuLink auth={this.props.auth} item={item} />) : ""
  }
}

export default withRouter(MenuItem);
