import React from 'react';

const INITIAL_STATE = {
  players: [
    {
      name: "Nate Pauzenga",
      score: 33,
      id: 1
    },
    {
      name: "Joe Smith",
      score: 34,
      id: 2
    },
    {
      name: "Robot",
      score: 21,
      id: 3
    }
  ]
};

let nextId = 4;

const Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  onTick: function() {
    if (this.state.running) {
      const now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      });
    }
  },

  onStart: function() {
    this.setState({
      running: true,
      previousTime: Date.now()
    });
  },

  onStop: function() {
    this.setState({running: false});
  },

  onReset: function() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    });
  },

  render: function() {
    const seconds = Math.floor(this.state.elapsedTime / 1000);

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button> }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  },
});

const AddPlayerForm = React.createClass({
  propTypes: {
   onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      name: "",
    };
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },

  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },

  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

function Stats(props) {
  const totalPlayers = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total + player.score
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{ props.title }</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>X</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(+1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

const Scoreboard = React.createClass({
  getDefaultProps: function() {
    return {
      title: "Scoreboard"
    }
  },

  getInitialState: function() {
    return INITIAL_STATE;
  },

  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onPlayerAdd: function(name) {
    this.state.players.push({
     name: name,
     score: 0,
     id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },

  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index,delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id}/>
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  },
});

export default Scoreboard;
