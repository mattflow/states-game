import React from 'react';
import { Button, Collapse } from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const iconStyle = {
  fontSize: 23,
  marginRight: 5,
  marginBottom: 4,
};

export default class CorrectInput extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onShowToggle} color="link">
          {this.props.open ? <FaCaretUp style={iconStyle} /> : <FaCaretDown style={iconStyle} />}
          Correct: {this.props.children.length}
        </Button>
        <Collapse isOpen={this.props.open}>
          {this.props.children}
        </Collapse>
        <hr />
      </div>
    );
  }
}