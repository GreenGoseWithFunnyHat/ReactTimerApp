var React = require('react');
var Clock = require('Clock');
var TimerControls = require('TimerControls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countStatus: 'stopped'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countStatus !== prevState.countStatus) {
      switch(this.state.countStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0})
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
    }, 1000);
  },
  handleStatusChange: function (newStatus) {
    this.setState({countStatus: newStatus});
  },
  render: function () {
      var {count, countStatus} = this.state;
      var renderControlArea = () => {
        return <TimerControls countStatus={countStatus} onStatusChange={this.handleStatusChange}/>
    };

    return (
        <div>
          <h1 className="page-title">Timer</h1>
          <Clock totalSeconds={count}/>
          {renderControlArea()}
        </div>
      );
    }
});

module.exports = Timer;
