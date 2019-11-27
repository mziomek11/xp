import React, { Component } from "react";

import { toolbarConfig } from "../../../config";

type State = {
  time: string;
};

//source https://stackoverflow.com/questions/19407305/how-to-show-only-hours-and-minutes-from-javascript-date-tolocaletimestring
function getCurrentDate() {
  const date = new Date();
  const localeSpecificTime = date.toLocaleTimeString();
  return localeSpecificTime.replace(/:\d+ /, " ");
}

class Time extends Component<{}, State> {
  private interval: NodeJS.Timeout | null = null;
  readonly state: State = {
    time: getCurrentDate()
  };

  componentDidMount() {
    const interval = setInterval(this.updateTime, 3000);
    this.interval = interval;
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  updateTime = () => {
    const newTime = getCurrentDate();
    if (newTime !== this.state.time) this.setState({ time: newTime });
  };

  render() {
    return (
      <div
        className="time"
        data-test="time"
        style={{ width: toolbarConfig.TIME_WIDTH }}
      >
        {this.state.time}
      </div>
    );
  }
}

export default Time;
