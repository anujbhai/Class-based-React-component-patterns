import React from "react";
// import hoistNonReactStatics from "hoist-non-react-statics";

import { Switch } from "../switch";

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
  reset: () => {}
});

class Toggle extends React.Component {
  static Consumer = ToggleContext.Consumer;

  internalSetState(changes, callback) {
    this.setState((state) => {
      const stateToSet = [changes]
        .map((c) => (typeof c === "function" ? c(state) : c)) // handle function setState Call
        .map((c) => this.props.stateReducer(state, c))[0]; // apply state reducer

      return stateToSet;
    }, callback);
  }

  toggle = () => {
    this.internalSetState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  reset = () => {
    this.internalSetState({ on: false }, () =>
      this.props.onReset(this.state.on)
    );
  };

  state = {
    on: false,
    toggle: this.toggle,
    reset: this.reset
  };

  render() {
    const { children } = this.props;
    const ui =
      typeof children === "function" ? children(this.state) : children();

    return (
      <ToggleContext.Provider value={this.state}>{ui}</ToggleContext.Provider>
    );
  }
}

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log("onToggle", ...args),
    onReset: (...args) => console.log("onReset", ...args)
  };

  initialState = { timesClicked: 0 };

  state = this.initialState;

  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1
    }));

    this.props.onToggle(...args);
  };

  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };

  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }

    return changes;
  };

  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        stateReducer={this.toggleStateReducer}
      >
        {({ on, toggle, reset }) => (
          <div>
            <Switch on={on} onClick={toggle} />

            {timesClicked > 4 ? (
              <div data-testid="notice">
                <p>Whoa, you clicked too much!</p>
              </div>
            ) : timesClicked > 0 ? (
              <div>
                <p>Click count: {timesClicked}</p>
              </div>
            ) : null}

            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}

export default Usage;
