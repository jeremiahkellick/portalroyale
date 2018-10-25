import React from 'react';

class EnterGame {
  contructor(props) {
    super(props);
    this.state = {
      name: "",
    }
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.val });
    }
  }

  render() {
    <div className="name-form-container">
      <form>
        <input type="text" onChange={ update("name") } val={this.state.name}></input>
        <input type="submit" val="Play" ></input>
      </form>
    </div>
  }
}

export default EnterGame;