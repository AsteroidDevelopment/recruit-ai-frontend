import React from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'

class IdList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      possibleOptions: [],
      allItems: [],
      selectionName: "",
      backgroundColor: 'white'
    }
  }

  componentDidMount = () => {
    this.updateItems()
  }
  componentWillReceiveProps = (newProps) => { this.updateItems(newProps); }

  updateItems = async (props = this.props) => {
    await this.gatherItemsAPI(props)
    this.setState({ selectionName: "" })
  }

  gatherItemsAPI = (props) => {

    switch (props.field) {
      case "influenced_id":
      case "influencer_id":
      case "creator_pantheon_id":
      case "kp_pantheon_id":
      case "sp_pantheon_id":
      case "cpa_pantheon_id":
        axios
          .get('https://grimwire.herokuapp.com/api/pantheons/nameList')
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item.pantheon_name,
                  id: item.pantheon_id
                })),
            });
          })
          .catch(err => console.log(err));
        break;

      case "symbol_kind_id":
      case "kp_kind_id":
      case "ck_kind_id":
      case "kik_kind_id":
      case "ksc_kind_id":
      case "kik_connected_info_id":

        axios
          .get('https://grimwire.herokuapp.com/api/kinds/nameList')
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item.kind_name,
                  id: item.kind_id
                })),
            });
          })
          .catch(err => console.log(err));
        break;


      case "ck_category_id":
      case "cp_prereq_id":
      case "cp_category_id":
      case "cpa_category_id":
      case "cs_category_id":
        axios
          .get('https://grimwire.herokuapp.com/api/categories/nameList')
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item.category_name,
                  id: item.category_id
                })),
            });
          })
          .catch(err => console.log(err));
        break;

      case "connected_symbol_id":
      case "main_symbol_id":
      case "sp_symbol_id":
      case "cs_symbol_id":
      case "ksc_symbol_id":
      case "sr_symbol_id":
        axios
          .get('https://grimwire.herokuapp.com/api/symbols/nameList')
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item.symbol_name,
                  id: item.symbol_id
                })),
            });
          })
          .catch(err => console.log(err));
        break;

      case "foreign_id":
        let string = props.item.foreign_class.toLowerCase()
        let plural_string = ""
        if (string === 'category') {
          plural_string = 'categories'
        } else {
          plural_string = string + 's'
        }

        axios
          .get(`https://grimwire.herokuapp.com/api/${plural_string}/nameList`)
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item[`${string}_name`],
                  id: item[`${string}_id`]
                })),
            });
          })
          .catch(err => console.log(err));
        break;


      case "sr_resource_id":
        axios
          .get('https://grimwire.herokuapp.com/api/resources/nameList')
          .then(res => {
            this.setState({
              allItems: res.data.map(
                item => ({
                  ...item,
                  name: item.resource_title,
                  id: item.resource_id
                })),
            });
          })
          .catch(err => console.log(err));
        break;


    }

  }

  handleTextChange = (e) => {
    const searchTerm = e.target.value
    if (searchTerm === "") {
      this.updateItems()
      this.setState({ possibleOptions: [] })
    } else {
      this.setState({ possibleOptions: this.state.allItems.filter(item => item.name.indexOf(searchTerm) >= 0) })
    }
  }

  handleSelectionChange = (e) => {
    this.setState({ backgroundColor: 'rgba(155,255,155, .6)' })
    const pair = e.target.value.split('-')
    const field = pair[0]
    const id = Number.parseInt(pair[1])
    const name = pair[2]
    const item = this.props.item
    const array = item[field]
    this.setState({ selectionName: pair[2] })
    this.props.handleChange(field, id)
    setTimeout(() => { this.setState({ backgroundColor: 'white' }) }, 250);
  }

  printifyName = (name) => {
    return name.replace("_id", "")
      .replace("kp_", "")
      .replace("ck_", "")
      .replace("cp_", "")
      .replace("sp_", "")
      .replace("cpa_", "")
      .replace("cs_", "")
      .replace("ksc_", "")
      .replace("kik_", "")
      .replace("sr", "")
      .replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) { return key.toUpperCase() })
  }

  render() {
    const { field, value, item } = this.props
    const { allItems, selectionName } = this.state
    const selected = allItems.filter(obj => obj.id === value)[0]


    return <div key={item.id}>
      <Form.Group>
        <Form.Label>
          {this.printifyName(field)}:
        </Form.Label>

    


        <div>



          {selectionName ? selectionName : selected ? selected.name : "Select"}


          <Form.Control
            onChange={this.handleTextChange}
            type='text' style={{ backgroundColor: this.state.backgroundColor }}
          />

          <Form.Control style={{ backgroundColor: this.state.backgroundColor }} as="select" onChange={this.handleSelectionChange}>
            <option value="-1">-please select-</option>
            {
              this.state.possibleOptions.map(option =>
                <option key={option.id} value={`${field}-${option.id}-${option.name}`} >
                  {option.name}
                </option>)
            }
          </Form.Control>
        </div>



      </Form.Group>
    </div>
  }

}



export default IdList
