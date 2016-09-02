import React from 'react';
import AddPlayerForm from './AddPlayerForm';
import Header from './Header';
import Player from './Player'

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
