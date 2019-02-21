import React from 'react';
import { Button, Collapse } from 'reactstrap';

export default class CorrectInput extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onShowToggle} color="link">Correct: {this.props.children.length}</Button>
        <Collapse isOpen={this.props.open}>
          {this.props.children}
        </Collapse>
        <hr />
      </div>
    );
  }
}