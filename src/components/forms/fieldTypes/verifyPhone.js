import React from 'react'
import { Form } from 'react-bootstrap'

import formHelpers from '../form_helpers'

export default (props) => {
    const {field, item, callback, type, label, as_setting} = props
    const value = props.value || item[field[0]]

    const verify = () => {
        callback();

    }

    return <Form.Group>

        <Form.Label>
            { label || formHelpers.printifyName(field[0]) }- Only use 10-digit USA phone numbers, DO NOT use any formatting.
        </Form.Label>
        
        <Form.Control 
            type={type}
            onChange={callback} 
            name={field[0]} 
            value={value}
            
            />

        
        { value.length === 10 ? "" : <p style={{color:'red'}}>You must enter in a 10 digit phone number.</p> }
        { value.match(/^[0-9]+$/) ? "" : <p style={{color:'red'}}>Only enter in digits, no formatting (NO parenthesis, dashes, or spaces)</p>}
        

    </Form.Group>
}