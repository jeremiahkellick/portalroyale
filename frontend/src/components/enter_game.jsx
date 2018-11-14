import React from 'react';

class EnterGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.initializeGame(this.state.name);
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value });
    }
  }

  render() {
    return (
      <div className="enter-game" >
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            onChange={ this.update("name") }
            value={ this.state.name } />
          <input className="button" type="submit" value="Play" />
          <button className="button">Demo</button>
        </form>
      </div>
    );
  }
}

export default EnterGame;