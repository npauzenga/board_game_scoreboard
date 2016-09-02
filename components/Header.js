import React from 'react';
import Stopwatch from './Stopwatch';
import Stats from './Stats';

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
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

export default Header;
