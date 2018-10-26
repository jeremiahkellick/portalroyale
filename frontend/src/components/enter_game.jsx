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
    console.log(this.props.submitText, this.props.formType);
    const nameInputClass = this.props.formType === "Enter Game" ? "" : "hidden"
    return (
      <div className={ this.props.formType === "Enter Game" ? "enter-game" : "game-over"} >
        <form onSubmit={ this.handleSubmit }>
          <input
            className={ nameInputClass }
            type="text"
            onChange={ this.update("name") }
            value={ this.state.name } />
          <input type="submit" value={ this.props.submitText } />
        </form>
      </div>
    );
  }
}

export default EnterGame;