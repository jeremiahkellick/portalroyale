import React from 'react';
import { capitalize } from '../game/util';
import { statsOrder } from '../reducers/stats_reducer';

class GameOver extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearStats();
    this.props.resetGame();
    this.props.initializeGame(this.state.name);
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value });
    }
  }

  renderStats() {
    const stats = this.props.stats;
    return (
      <ul>
        { statsOrder.map(stat =>
          <li key={stat}>{capitalize(stat)}: {stats[stat]}</li>
        ) }
      </ul>
    );
  }

  render() {
    return (
      <div className="game-over" >
        <form onSubmit={ this.handleSubmit }>
          { this.props.won ? (
              <p>You won!</p>
            ) : (
              <p>You were killed by {this.props.stats.killedBy}</p>
            )
          }
          { this.props.formType === "Game Over" && this.renderStats() }
          <input type="submit" value="Play Again" />
        </form>
      </div>
    );
  }
}

export default GameOver;