import React from 'react';

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

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

export default Stats;
