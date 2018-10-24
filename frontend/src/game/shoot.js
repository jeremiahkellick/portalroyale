import Component from './component';
import Input from './input';
import Transform from './transform';
import Game from './game'; 
import Vector from '../vector'; 
import Camera from './camera'; 

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.camera = this.gameObject.getComponent(Camera); 
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      if ( this.input.shouldShoot() ) {
        let distance = 150; 
        const playerPos = this.transform.position; 
        let newPos = playerPos.plus(new Vector( distance, 0 )); 
        const mousePos = this.input.mousePosition.plus(this.camera.getOffset()); 
        
        let rotation = Math.atan( (mousePos.y - playerPos.y) / (mousePos.x - playerPos.x) ); 

        let speed = mousePos.normalized().times(10); 
        let diff = mousePos.minus(playerPos); 
        distance = mousePos.distanceTo(playerPos);
 
        rotation = Math.acos( Math.abs(playerPos.x - mousePos.x) / distance ); 
        console.log( "playerX,", playerPos.x)
        console.log ( "mousePos", mousePos.x)
        console.log ( "diff", playerPos.x - mousePos.x)
        console.log("rotation", rotation); 
 
        speed = new Vector(10, 0); 
        
        // console.log("new pos", newPos)
          
        let options = {
          type: "bullet", 
          position: newPos, 
          speed, 
          rotation
        }
        Game.game.sendCreateToServer( options, true ); 
      } 
    }
  }
}

export default Shoot;
