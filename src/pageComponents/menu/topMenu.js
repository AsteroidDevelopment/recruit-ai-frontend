import React from 'react'
import customMenuStructure from './structure'
import MenuItem from './menuItem'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import {apiPath} from '../../helpers/api'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_pages: []
    }
  }

  componentDidMount = async () => {
    const pages = await axios.get(apiPath('/pages'))
    this.setState({site_pages: pages.data})
  }

  sitePagesCategories = [['Features', 'exclamation', 'no_user'], ['About', 'question', 'all']]
  siteBlogTypes = [["News", 'newspaper'], ["Blog", 'pencil-alt']]

  sitePagesStructure = () => {
    let returnStructure = []
    this.sitePagesCategories.map(category => {
      let categoryDropdown = { name: category[0], view: category[2], symbol: category[1] }
      let dropdownOptions = []
      this.state.site_pages.map(page => {
        if(page.page_category === category[0]) {
          dropdownOptions.push({name: page.page_title, view: "all", link: `/pages/${page.site_page_id}?article=${page.page_title}`, symbol: page.page_symbol})
        }
      })
      categoryDropdown.links = dropdownOptions
      returnStructure.push(categoryDropdown)
    })
    return returnStructure
  }

  siteContentStructure = () => {
    let returnStructure = { name: "Content", view: "all", symbol: "star" }
    let dropdownOptions = []
    this.siteBlogTypes.map(name => dropdownOptions.push({name: name[0], view: 'all', link: `/posts?category=${name[0]}`, symbol: name[1] }))
    returnStructure.links = dropdownOptions
    return dropdownOptions
  }



  render = () => {

    const menuStructure = [/*this.siteContentStructure(), ...this.sitePagesStructure(), */ ...customMenuStructure, ]

    return <div className={`${this.props.showMenu ? "mobile-menu-show" : "mobile-menu-hide"}`}>
      {menuStructure.map(item => 
        <MenuItem auth={this.props.auth} item={item} toggleDropdown={this.props.toggleDropdown} />        
      ) } 
    </div>
  }
}

export default withRouter(Menu);
