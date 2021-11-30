import React from "react";
import { Switch } from "../switch";

class Toggle extends React.Component {
  state = {
    on: false
  };

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  };

  render() {
    return this.props.children({ on: this.state.on, toggle: this.toggle });
  }
}

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} />}
    </Toggle>
  );
}

export default Usage;
