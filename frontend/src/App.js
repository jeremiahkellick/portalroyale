import React from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './game/util'; 

const App = props => (
  <div className="App">
    <header className="App-header">
      <h1>portfol.io</h1>
      <canvas
        id="canvas"
        width={`${CANVAS_WIDTH}px`}
        height={`${CANVAS_HEIGHT}px`}>
      </canvas>
    </header>
  </div>
);

export default App;
