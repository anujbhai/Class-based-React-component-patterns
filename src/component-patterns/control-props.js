import React from "react";
import { Switch } from "../switch";

class Toggle extends React.Component {
  state = { on: false };

  isOnControlled() {
    return this.props.on !== undefined;
  }

  isOn() {
    return this.isOnControlled() ? this.props.on : this.state.on;
  }

  toggle = () => {
    if (this.isOnControlled()) {
      this.props.onToggle(!this.isOn());
    } else {
      this.setState(
        ({ on }) => ({ on: !on }),
        () => {
          this.props.onToggle(this.isOn());
        }
      );
    }
  };

  render() {
    return <Switch on={this.isOn()} onClick={this.toggle} />;
  }
}

class Usage extends React.Component {
  state = { bothOn: false, sync: true };

  handleToggle = (on) => {
    console.log("Toggle", on);
    this.setState({ bothOn: on });
  };

  toggleSync = () => {
    this.setState(({ sync }) => ({ sync: !sync }));
  };

  render() {
    const toggleProps = { onToggle: this.handleToggle };

    if (this.state.sync) {
      toggleProps.on = this.state.bothOn;
    }

    return (
      <>
        <label>
          Sync{" "}
          <input
            type="checkbox"
            checked={this.state.sync}
            onChange={this.toggleSync}
          />
        </label>
        <Toggle {...toggleProps} />
        <Toggle {...toggleProps} />
      </>
    );
  }
}

export default Usage;
