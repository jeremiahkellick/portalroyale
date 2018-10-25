import GameObject from './game_object';
import Syncronizer from './syncronizer';
import Transform from './transform';
import ExplosiveCircleRenderer from './renderers/explosive_circle_renderer';
import Collider from './collider';
import Hitpoint from './hitpoint';
import Vector from '../vector';
import Circle from './circle';

const createExplosiveCircle = ({ id, position }) => {
  const explosiveCircle = new GameObject(id, 5);
  const transform = new Transform(Vector.fromPOJO(position));
  explosiveCircle.addComponent(transform);
  const hitpoint = new Hitpoint(100);
  explosiveCircle.addComponent(hitpoint);
  new Syncronizer(id+'3', hitpoint);
  explosiveCircle.addComponent(new ExplosiveCircleRenderer());
  explosiveCircle.addComponent(new Collider(new Circle(30)));
  return explosiveCircle;
};

export default createExplosiveCircle;
