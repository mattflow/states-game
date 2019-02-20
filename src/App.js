import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import StateInput from './components/StateInput';
import _ from 'lodash';
import update from 'immutability-helper';
import states from './states';

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
};

class App extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isInputAState = this.isInputAState.bind(this);
    const stateInputs = [];
    _.forEach(states, () => {
      stateInputs.push({
        value: '',
        valid: false,
        invalid: false,
        feedback: '',
      });
    });
    this.state = {
      said: [],
      stateInputs,
    };
  }

  hasInputBeenSaid(input) {
    const lookupValue = input.trim().toUpperCase();
    let said = false;
    this.state.said.forEach(value => {
      if (value.toUpperCase() === lookupValue) {
        console.log(value, lookupValue)
        said = true;
      }
    });
    return said;
  }

  isInputAState(input) {
    const lookupValue = input.trim().toUpperCase();
    for (const key in states) {
      if (states[lookupValue] !== void 0 || states[key].toUpperCase() === lookupValue) {
        return true;
      }
    }
    return false;
  }


  handleInputChange(index) {
    return (e) => {
      const input = e.target.value.toUpperCase();
      const trimmedInput = input.trim();
      const hasInputBeenSaid = this.hasInputBeenSaid(trimmedInput);
      if (trimmedInput === '') {
        this.setState(prevState => {
          const change = {
            stateInputs: { [index]: {
              value: { $set: '' },
              valid: { $set: false },
              invalid: { $set: false },
              feedback: { $set: '' },
            }}
          };
          return update(prevState, change);
        });
      } else {
        const isInputAState = this.isInputAState(trimmedInput);
        const feedback = hasInputBeenSaid ? 'Drink' : !isInputAState ? 'Not a state' : '';
        const valid = isInputAState && !hasInputBeenSaid;
        this.setState(prevState => {
          const change = {
            stateInputs: { [index]: {
              value: { $set: input },
              valid: { $set: valid },
              invalid: { $set: !valid },
              feedback: { $set: feedback },
            }},
          }
          if (valid) {
            change.said = { $push: [trimmedInput] };
          }
          return update(prevState, change);
        });
      }
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Row>
          <Col xs={6}>
            <Button>Reset</Button>
          </Col>
          <Col xs={6}>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.stateInputs.map((input, index) => (
              <StateInput
                key={index}
                number={index + 1}
                value={input.value}
                invalid={input.invalid}
                valid={input.valid}
                onChange={this.handleInputChange(index)}
                feedback={input.feedback}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
