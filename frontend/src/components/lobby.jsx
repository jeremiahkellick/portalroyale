import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/game_actions';
import Game from '../game/game';

class Lobby extends React.Component {
  handleSubmit() {
    this.props.startGame();
    Game.game.start();
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>portfol.io</h1>
        </header>
        <div className="enter-game">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ul>
              { this.props.players.map(player =>
                <li key={player.id}>{player.name}</li>
              ) }
            </ul>
            <input type="submit" value="Start" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ players }) => ({
  players: Object.values(players)
});

export default connect(mapStateToProps, { startGame })(Lobby);
