import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

function FieldGroup({ id, label, help, validationState, type, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl type={type} {...props} />
    </FormGroup>
  )
}

export default FieldGroup
