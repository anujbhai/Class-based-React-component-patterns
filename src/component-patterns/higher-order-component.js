import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { Switch } from "../switch";

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {}
});

class Toggle extends React.Component {
  static Consumer = ToggleContext.Consumer;

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  state = {
    on: false,
    toggle: this.toggle
  };

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}

function withToggle(Component) {
  const Wrapper = React.forwardRef((props, ref) => (
    <Toggle.Consumer>
      {(toggle) => <Component {...props} toggle={toggle} ref={ref} />}
    </Toggle.Consumer>
  ));

  Wrapper.displayName = `withToggle(${
    Component.displayName || Component.name
  })`;
  hoistNonReactStatics(Wrapper, Component);
  return Wrapper;
}

const Layer1 = withToggle(({ toggle: { on } }) => (
  <>
    {`The button is ${on ? "on" : "off"}`}
    <Layer2 />
  </>
));

const Layer2 = withToggle(({ toggle: { on, toggle } }) => (
  <Switch on={on} onClick={toggle} />
));

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  );
}

export default Usage;
