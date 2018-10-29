import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import ExplosiveCircleRenderer from '../renderers/explosive_circle_renderer';
import Collider from '../game_components/collider';
import Hitpoint from '../game_components/hitpoint';
import Vector from '../vector';
import Circle from '../shapes/circle';
import Game from '../game';

const createExplosiveCircle = ({ id, position, health }) => {
  const explosiveCircle = new GameObject(id, 5);
  const transform = new Transform(Vector.fromPOJO(position));
  explosiveCircle.addComponent(transform);
  const hitpoint = new Hitpoint(health);
  explosiveCircle.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  explosiveCircle.addComponent(new ExplosiveCircleRenderer());
  explosiveCircle.addComponent(new Collider(new Circle(30), 0.7, 'obstacle'));

  const createExplosion = (transform) => {
    return () => {
      let options = {
        type: "explosion",
        position: transform.position.toPOJO(),
        health: 100
      };
      Game.game.sendCreateToServer( options, true );
    }
  };

  hitpoint.onDeathFunctions.push( createExplosion(transform) );

  return explosiveCircle;
};

export default createExplosiveCircle;
