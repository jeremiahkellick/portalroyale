import Component from './component';
import Vector from '../vector';
import key from 'keymaster';

class Input extends Component {

  constructor() {
    super(); 
    this.canShoot = false; 
    document.getElementById('root').addEventListener('mousedown', (e) => {
      this.mousePosition = new Vector( e.x, e.y);
      // console.log(this.mousePosition); 
      this.canShoot = true;
      setTimeout( () => {
        this.canShoot = false; 
      }, 10)  
    }); 
  }
  
  getMovement() {
    const movement = Vector.zero();
    if (key.isPressed('W')) movement.y -= 1;
    if (key.isPressed('A')) movement.x -= 1;
    if (key.isPressed('S')) movement.y += 1;
    if (key.isPressed('D')) movement.x += 1;
    return movement.normalized();
  }
  
  shouldShoot() {

    return this.canShoot; 
    // if ( this.canShoot ) {
    //   if ( key.isPressed('space') ) {
    //     this.canShoot = false; 
    //     setTimeout( () => {
    //       this.canShoot = true; 
    //     }, 100); 
    //     return true; 
    //   }
    // }
    // return false; 
  }


}

export default Input;
