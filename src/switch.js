import React from "react";
import "./switch.styles.css";

export class Switch extends React.Component {
  render() {
    const { on, className = "", ...props } = this.props;
    const btnClassName = [
      className,
      "toggle-btn",
      on ? "toggle-btn-on" : "toggle-btn-off"
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={() => {
            console.log("Changing");
          }}
        />

        <button className={btnClassName} aria-label="Toggle" {...props} />
      </div>
    );
  }
}
