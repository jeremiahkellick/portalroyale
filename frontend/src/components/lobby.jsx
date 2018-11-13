import React from 'react';
import { connect } from 'react-redux';
import { readyUp } from '../actions/game_actions';
import { PacmanLoader } from 'react-spinners';

class Lobby extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.readyUp();
    this.props.socket.emit('ready');
  }

  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <div className="lobby">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ul>
              { this.props.players.map(player =>
                <li key={player.id}>
                  <span>{player.name}</span>
                  <div>
                    { player.ready ?
                      <i className="fas fa-check"></i> :
                      <PacmanLoader size={ 10 } color={ "#54722f" } />
                    }
                  </div>
                </li>
              ) }
            </ul>
            {
              this.props.ready ? (
                <input
                  disabled
                  type="submit"
                  value="Waiting for other players" />
              ) : (
                <input type="submit" value="Ready Up" />
              )
            }
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ game, players }) => ({
  players: Object.values(players),
  socket: game.socket,
  ready: game.ready
});

export default connect(mapStateToProps, { readyUp })(Lobby);
