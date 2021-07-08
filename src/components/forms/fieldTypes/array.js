import React from 'react'
import {Form} from 'react-bootstrap'

class ArrayField extends React.Component {
  constructor(props) {
      super(props)
      this.state = {

      }
  }

  handleArrayChange = (e) => {
    const set = e.target.name.split('-')
    const field = set[0]
    const index = set[1]
    const value = e.target.value
    const array = this.props.item[field]
    if(value === "") {
      array.splice(index, 1)
    } else if(value.indexOf(';') > -1) {
      array[index] = value.split(';')[0]
      array[array.length] = ""
    } else{
      array[index] = value
    }
    this.props.handleArrayChange(field, array)
  }
  printifyName = (name) => {
    return name.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key) { return key.toUpperCase()})
  }

  dateValue = (d) => {
    let value = new Date(d)
    
    const tz = value.getTimezoneOffset()
    let hours = value.getHours()
    hours = hours - tz/60
    console.log(value, value.setHours(hours) )
    value = value.toISOString()
    return value.substring(0, value.length - 1)
  }

  stringifyDate = (d) => {
    if(typeof d === 'string') { d = new Date(d) }

    const date = d,
    v = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getDay(),
        date.getTimezoneOffset()
    ];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const hours = v[3] > 12 ? v[3] - 12 : v[3]
    const mm = v[3] > 12 ? "pm" : "am"
    const minutes = v[4] < 10 ? `0${v[4]}` : v[4]
    return `${days[v[5]]} ${v[1]}/${v[2]} @ ${hours}:${minutes} ${mm}`
}

  render() {
    const {field, array, item} = this.props
    return <div>
    <Form.Group>
        <Form.Label>{ this.printifyName(field) }</Form.Label>
        
        { item[field].length > 0 ?
            item[ field ].map( (i, index) => <div key={index}>
              
              {this.props.datearray && i ? this.stringifyDate(i) : "Option " + (index + 1)}
              <Form.Control
                onChange={this.handleArrayChange}
                type={this.props.type || 'text'}
                { ...(this.props.datearray ? null : {value: i}) } 
                name={`${field}-${index}`} />
                -<br />
              </div> )
            : <Form.Control onChange={this.handleArrayChange} type='text' placeholder="Start typing" name={`${field}-${0}`} />}
          {!this.props.type ? <i>Hit ";" to add a new field. Backspace completely to delete one.</i> : "" }
          {this.props.datearray ? 
            (item[field][0] || item[field][1] || item[field][2] ? "" : 
            <p style={{color:'red'}}>Please choose at least one option to continue.</p>) 
          : "" }
    </Form.Group>
    </div>
  }

}

export default ArrayField
