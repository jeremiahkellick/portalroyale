import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import ExplosionRenderer from '../renderers/explosion_renderer';
import Collider from '../game_components/collider';
import Vector from '../vector';
import Circle from '../shapes/circle';

const createExplosion = ({ id, position}) => {
  const explosion = new GameObject(id, 9);
  const transform = new Transform(Vector.fromPOJO(position));
  explosion.addComponent(transform);
  // new Syncronizer(id+'1', hitpoint);
  explosion.addComponent(new ExplosionRenderer());
  explosion.addComponent(new Collider(new Circle(30)));
  return explosion;
};

export default createExplosion;
