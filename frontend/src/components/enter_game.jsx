import React from 'react'; 

class EnterGame {
  contructor(props) {
    super(props); 
    this.state = {
      name: "", 
    }
  }

  render() {
    <div> 
      <form> 
        <input type="text" val={this.state.name}></input>
        <input type="submit" val="Enter" ></input>
      </form>
    </div>
  }
}

export default EnterGame; 