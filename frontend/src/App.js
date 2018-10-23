import React, { Component } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './game/util'; 

class App extends Component {

  constructor(props) {
    super(props); 
    // this.state = {
    //   x
    // }; 
  }
  render() {
    let coords; 
    // if ( this.state.playerTransform ) {
    //   const { x, y } = this.state.playerTransform.position; 
    //   coords = `${x}, ${y}`; 
    //   console.log(x, y); 
    // }
    return (
      <div className="App">
        <header className="App-header">
          <h1>portfol.io</h1>
          <h1>Coordinates: { coords }</h1> 
          <canvas id="canvas" width={`${CANVAS_WIDTH}px`} height={`${CANVAS_HEIGHT}px`}></canvas>
        </header>
      </div>
    );
  }
}

export default App;
