import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import StateInput from './components/StateInput';
import _ from 'lodash';
import update from 'immutability-helper';
import states from './states';
import CorrectInputs from './components/CorrectInputs';

let typingTimer;
let typingTimeout = 500;

function createStateInputs(states) {
  const stateInputs = [];

  _.forEach(states, () => {
    stateInputs.push({
      value: '',
      valid: false,
      invalid: false,
      feedback: '',
      correct: false,
    });
  });

  return stateInputs;
}

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
};

const localStorageKey = 'savedState';

const freshState = {
  said: [],
  stateInputs: createStateInputs(states),
  correctInputs: [],
  showCorrect: false,
};

class App extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isInputAState = this.isInputAState.bind(this);
    this.createInput = this.createInput.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleInputToggle = this.handleInputToggle.bind(this);

    const savedState = localStorage.getItem(localStorageKey);

    this.state = savedState === null ? freshState : JSON.parse(savedState);
    this.state.showCorrect = false;

  }

  hasInputBeenSaid(input) {
    let said = false;
    this.state.said.forEach(value => {
      if (value === input) {
        said = true;
      }
    });
    return said;
  }

  isInputAState(input) {
    for (const key in states) {
      if (states[input] !== void 0 || states[key].toUpperCase() === input) {
        return true;
      }
    }
    return false;
  }

  handleInputToggle() {
    this.setState(prevState => update(prevState, {
      showCorrect: { $set: !prevState.showCorrect },
    }));
  }

  handleInputChange(index) {
    return e => {
      const input = e.target.value.toUpperCase();
      this.setState((prevState) => update(prevState, {
        stateInputs: { [index]: { value: { $set: input }}}
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.state));
  }

  handleResetClick() {
    if (window.confirm('Are you sure?')) {
      this.setState(freshState);
      localStorage.removeItem(localStorageKey);
    }
  }

  handleStateInput(input) {
  }

  handleInputKeyUp(index) {
    return e => {
      let input = e.target.value.toUpperCase().trim();
      if (input === '') {
        this.setState(prevState => update(prevState, {
          stateInputs: { [index]: {
            invalid: { $set: false },
            valid: { $set: false },
            feedback: { $set: '' }
          }}
        }));
      } else {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          if (input.length > 2) {
            for (let key in states) {
              if (states[key].toUpperCase() === input) {
                input = key;
              }
            }
          }
          const isInputAState = this.isInputAState(input);
          const hasInputBeenSaid = this.hasInputBeenSaid(input);
          if (!isInputAState) {
            this.setState(prevState => update(prevState, {
              stateInputs: { [index]: {
                invalid: { $set: true },
                valid: { $set: false },
                feedback: { $set: 'Not a state' },
                correct: { $set: false },
              }}
            }));
          } else if (hasInputBeenSaid) {
            this.setState(prevState => update(prevState, {
              stateInputs: { [index]: {
                invalid: { $set: true },
                valid: { $set: false },
                feedback: { $set: 'Drink' },
                correct: { $set: false },
              }}
            }));
          } else {
            this.setState(prevState => update(prevState, {
              stateInputs: { [index]: {
                valid: { $set: true },
                invalid: { $set: false },
                feedback: { $set: '' },
                correct: { $set: false },
              }}
            }));
            const correctInput = {
              value: input,
              valid: true,
              invalid: false,
              feedback: '',
              correct: true,
            };
            setTimeout(() => {
              this.setState(prevState => update(prevState, {
                correctInputs: { $push: [correctInput] },
                stateInputs: {
                  $splice: [[index, 1]],
                },
                said: { $push: [input] }
              }));
            }, typingTimeout);
          }
        }, typingTimeout);
      }
    }
  }

  handleInputKeyDown() {
    clearTimeout(typingTimer);
  }

  createInput(input, index) {
    return (
      <StateInput
        key={index}
        number={(input.correct ? index : index + this.state.correctInputs.length) + 1}
        value={input.value}
        invalid={input.invalid}
        valid={input.valid}
        onChange={this.handleInputChange(index)}
        onKeyDown={this.handleInputKeyDown}
        onKeyUp={this.handleInputKeyUp(index)}
        feedback={input.feedback}
        disabled={input.correct}
        correct={input.correct}
      />
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Row>
          <Col xs={12}>
            <Button onClick={this.handleResetClick} className="float-right">Reset</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CorrectInputs open={this.state.showCorrect} onShowToggle={this.handleInputToggle}>
              {this.state.correctInputs.map(this.createInput)}
            </CorrectInputs>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
              {this.state.stateInputs.map(this.createInput)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
