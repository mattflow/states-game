import React from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

const styles = {
  group: {
    marginBottom: 10,
  },
};

export default ({ number, feedback, ...props }) => (
  <div style={styles.group}>
    <InputGroup>
      <InputGroupAddon addonType="prepend">{number.toString()}</InputGroupAddon>
      <Input {...props} /> 
    </InputGroup>
    {props.invalid && (
      <div className="text-danger">{feedback}</div>
    )}
  </div>
);