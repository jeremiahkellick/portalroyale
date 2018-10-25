import React from 'react';

class EnterGame {
  contructor(props) {
    super(props);
    this.state = {
      name: "",
<<<<<<< HEAD
    }
  }

  update(prop) {
    return (e) => {
      this.setState({ [prop]: e.target.val });
=======
>>>>>>> master
    }
  }

  render() {
<<<<<<< HEAD
    <div className="name-form-container">
      <form>
        <input type="text" onChange={ update("name") } val={this.state.name}></input>
        <input type="submit" val="Play" ></input>
=======
    <div>
      <form>
        <input type="text" val={this.state.name}></input>
        <input type="submit" val="Enter" ></input>
>>>>>>> master
      </form>
    </div>
  }
}

export default EnterGame;