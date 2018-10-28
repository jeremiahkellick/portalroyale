import Component from './component';
import Input from './input';
import Transform from './transform';
import Game from '../game';
import PortalMovement from './portal_movement';

class Teleport extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
    this.activated = false;
  }

  update() {
    if ( this.input && !this.activated ) {
      if ( this.input.activatePortal() ) {
        const playerPos = this.transform.position;
        const portals = Object.values(Game.game.gameObjects).filter( obj => obj.type === "portal");

        portals.forEach( portal => {

          const portalTransforms = portal.getComponents(Transform);
          if (portalTransforms.length !== 2 ) return;

          const [portalPos1, portalPos2] = portalTransforms.map( t => t.position );
          const radius = portal.getComponent(PortalMovement).radius;

          if ( playerPos.distanceTo(portalPos1) < radius && radius >= 10 ) {

            this.transform.teleport(portalPos2.toPOJO());
            this.disable();
            setTimeout( () => this.enable(), 500 );
            return;
          } else if ( playerPos.distanceTo(portalPos2) < radius && radius >= 10 ) {

            this.transform.teleport(portalPos1.toPOJO());
            this.disable();
            setTimeout( () => this.enable(), 500 );
            return;
          }

        });
      }
    }
  }



  disable() {
    this.activated = true;
  }

  enable() {
    this.activated = false;
  }

}

export default Teleport;
