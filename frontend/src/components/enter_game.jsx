import React from 'react';
import { connect } from 'react-redux';
import { initializeGame } from '../actions/game_actions';

class EnterGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.initializeGame(this.state.name);
    // enter game;
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value });
    }
  }

  render() {
    return (
      <div className="enter-game">
        <form onSubmit={ this.handleSubmit }>
          <input type="text" onChange={ this.update("name") } value={ this.state.name } />
          <input type="submit" value="Play" />
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  initializeGame: (name) => dispatch(initializeGame(name))
});

export default connect( null, mapDispatchToProps )( EnterGame );
