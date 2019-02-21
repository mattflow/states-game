import React from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

export default ({ correct, number, feedback, ...props }) => (
  <div>
    <div style={correct ? { marginTop: 10 } : { marginBottom: 10 }}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">{number.toString()}</InputGroupAddon>
        <Input maxLength="2" {...props} /> 
      </InputGroup>
      {props.invalid && (
        <div className="text-danger">{feedback}</div>
      )}
    </div>
  </div>
);