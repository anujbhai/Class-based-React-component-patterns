import React from "react";
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

const Layer1 = () => (
  <Toggle.Consumer>
    {({ on }) => (
      <>
        {`The button is ${on ? "on" : "off"}`}
        <Layer2 />
      </>
    )}
  </Toggle.Consumer>
);

const Layer2 = () => (
  <Toggle.Consumer>
    {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
  </Toggle.Consumer>
);

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  );
}

export default Usage;
